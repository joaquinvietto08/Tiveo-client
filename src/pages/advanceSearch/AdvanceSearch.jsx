import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, StatusBar, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./AdvanceSearchStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Map from "./features/map/Map";
import {
  collection,
  doc,
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

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleGoHome = async () => {
    try {
      if (requestId) {
        const requestRef = doc(collection(db, "requests"), requestId);
        await updateDoc(requestRef, { status: "cancelled" });
      }
      navigation.navigate("HomeIndex", { openSheet: true });
    } catch (error) {
      console.error("❌ Error al cancelar la solicitud:", error);
    }
  };

  useEffect(() => {
    if (!requestId) return;

    const parseDate = (value) => {
      if (!value) return null;
      if (typeof value?.toDate === "function") return value.toDate();
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    const getCoordinate = (...candidates) => {
      for (const candidate of candidates) {
        if (typeof candidate === "number") return candidate;
      }
      return null;
    };

    const parsePrice = (value) => {
      if (value === null || value === undefined) return null;
      const num = typeof value === "number" ? value : Number(value);
      return Number.isFinite(num) ? num : null;
    };

    const postulationsRef = collection(db, "postulations");
    const postulationsQuery = query(
      postulationsRef,
      where("requestId", "==", requestId)
    );

    const unsubscribe = onSnapshot(
      postulationsQuery,
      (snapshot) => {
        const nextPostulants = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const workerData = data?.worker || {};

            const lat = getCoordinate(
              workerData.lat,
              workerData?.location?.lat,
              workerData?.location?.latitude
            );
            const lng = getCoordinate(
              workerData.lng,
              workerData?.location?.lng,
              workerData?.location?.longitude
            );

            if (lat === null || lng === null) return null;

            const photoURL =
              typeof workerData.photoURL === "string"
                ? { uri: workerData.photoURL }
                : workerData.photoURL || null;

            const computedName =
              workerData.workerName ||
              workerData.name ||
              [workerData.firstName, workerData.lastName]
                .filter(Boolean)
                .join(" ")
                .trim() ||
              "Trabajador";

            return {
              ...workerData,
              uid: workerData.uid || doc.id,
              postulationId: doc.id,
              requestId: data.requestId,
              lat,
              lng,
              price: parsePrice(data.budget ?? data.price),
              message: data.message || "",
              offerAnotherTime: !!data.offerAnotherTime,
              offerMoment: data.moment || workerData.moment || null,
              offerScheduledDateTime:
                parseDate(data.date) ||
                parseDate(data.scheduledDateTime) ||
                parseDate(workerData.scheduledDateTime),
              status: data.status || "postulated",
              workerName: computedName,
              photoURL,
              starRating: Number(workerData.starRating) || 0,
              amountRating: Number(workerData.amountRating) || 0,
              completedJobs: Number(workerData.completedJobs) || 0,
              services: Array.isArray(workerData.services)
                ? workerData.services
                : [],
            };
          })
          .filter(Boolean);

        setPostulants(nextPostulants);
      },
      (error) => {
        console.error("Error escuchando postulaciones:", error);
        setPostulants([]);
      }
    );

    return () => unsubscribe();
  }, [requestId]);

  const selectedPostulant = useMemo(
    () => postulants.find((p) => p.uid === selectedWorkerId),
    [postulants, selectedWorkerId]
  );

  useEffect(() => {
    if (!selectedPostulant) return;

    navigation.navigate("WorkerProfile", {
      worker: selectedPostulant,
      bottom: "advance",
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
