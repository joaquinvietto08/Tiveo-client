import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { View, StatusBar, Text, Pressable, BackHandler } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./AdvanceSearchStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Map from "./features/map/Map";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "@react-native-firebase/firestore";
import Footer from "./features/footer/Footer";
import Feather from "@expo/vector-icons/Feather";

const db = getFirestore();

const AdvanceSearch = () => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { values, requestId } = route.params;

  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [postulants, setPostulants] = useState([]);
  const workerCacheRef = useRef({});

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleGoHome = useCallback(async () => {
    try {
      if (requestId) {
        const requestRef = doc(collection(db, "requests"), requestId);
        await updateDoc(requestRef, { status: "cancelled" });
      }
      navigation.navigate("HomeIndex", { openSheet: true });
    } catch (error) {
      console.error("❌ Error al cancelar la solicitud:", error);
    }
  }, [navigation, requestId]);

  // Bloquear el back del celular: solo se sale con el botón "Cancelar búsqueda"
  useEffect(() => {
    const backSub = BackHandler.addEventListener("hardwareBackPress", () => {
      return true; // consume el evento, no navega
    });
    return () => backSub.remove();
  }, []);

  useEffect(() => {
    if (!requestId) return;

    let isActive = true;
    const postulationsRef = collection(db, "postulations");
    const postulationsQuery = query(
      postulationsRef,
      where("requestId", "==", requestId)
    );

    const unsubscribe = onSnapshot(
      postulationsQuery,
      (snapshot) => {
        const basePostulants = snapshot.docs
          .map((postulationDoc) => {
            const data = postulationDoc.data();
            if (!data?.worker?.uid) return null;
            return {
              postulationId: postulationDoc.id,
              ...data,
            };
          })
          .filter(Boolean);

        const enrichPostulations = async () => {
          const enhanced = await Promise.all(
            basePostulants.map(async (postulation) => {
              const worker = postulation.worker;
              if (!worker?.uid) return null;

              try {
                if (!workerCacheRef.current[worker.uid]) {
                  const workerDoc = await getDoc(
                    doc(collection(db, "workers"), worker.uid)
                  );
                  workerCacheRef.current[worker.uid] = workerDoc.exists
                    ? workerDoc.data()
                    : {};
                }

                const workerData = workerCacheRef.current[worker.uid] || {};

                const parsedLat =
                  typeof worker.lat === "number"
                    ? worker.lat
                    : typeof workerData.lat === "number"
                    ? workerData.lat
                    : Number(workerData.lat);
                const parsedLng =
                  typeof worker.lng === "number"
                    ? worker.lng
                    : typeof workerData.lng === "number"
                    ? workerData.lng
                    : Number(workerData.lng);

                const mergedWorker = {
                  ...workerData,
                  ...worker,
                  photoURL:
                    worker.photoURL ||
                    workerData.photoURL ||
                    workerData.photo ||
                    "",
                  geohash: worker.geohash || workerData.geohash,
                  lat: Number.isFinite(parsedLat) ? parsedLat : undefined,
                  lng: Number.isFinite(parsedLng) ? parsedLng : undefined,
                  starRating:
                    worker.starRating ??
                    workerData.starRating ??
                    workerData.rating ??
                    workerData.averageRating ??
                    0,
                  amountRating:
                    worker.amountRating ??
                    workerData.amountRating ??
                    workerData.ratingCount ??
                    workerData.totalRatings ??
                    0,
                  completedJobs:
                    worker.completedJobs ??
                    workerData.completedJobs ??
                    workerData.completed ??
                    0,
                };

                return { ...postulation, worker: mergedWorker };
              } catch (error) {
                console.error(
                  "❌ Error al obtener datos del trabajador:",
                  error
                );
                return postulation;
              }
            })
          );

          if (isActive) {
            setPostulants(enhanced.filter(Boolean));
          }
        };

        enrichPostulations();
      },
      (error) => {
        console.error("Error escuchando postulaciones:", error);
        setPostulants([]);
      }
    );

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [requestId]);

  const selectedPostulant = useMemo(
    () =>
      postulants.find(
        (postulation) => postulation.worker?.uid === selectedWorkerId
      ),
    [postulants, selectedWorkerId]
  );

  useEffect(() => {
    if (!selectedPostulant?.worker) return;

    console.log("desde Search:");
    console.log(selectedPostulant);
    navigation.navigate("WorkerProfile", {
      worker: selectedPostulant.worker,
      bottom: "advance",
      postulation: selectedPostulant,
      values,
      requestId,
    });
    setSelectedWorkerId(null);
  }, [selectedPostulant, navigation, requestId, values]);

  return (
    <View style={styles.advanceSearch__mainContainer}>
      <StatusBar translucent barStyle="dark-content" />
      <GestureHandlerRootView>
        <Pressable
          style={styles.advanceSearch__cancelButton}
          onPress={handleGoHome}
        >
          <Feather name="arrow-left" size={24} color="black" />
          <Text>Cancelar búsqueda</Text>
        </Pressable>
        <Map
          onPress={handleMapPress}
          postulants={postulants}
          onSelectWorker={(workerId) => setSelectedWorkerId(workerId)}
        />
        <View
          style={{
            ...styles.advanceSearch__container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        ></View>
        <Footer
          sheetRef={sheetRef}
          values={values}
          workers={postulants}
          requestId={requestId}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default AdvanceSearch;
