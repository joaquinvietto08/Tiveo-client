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

  useEffect(() => {
    const backSub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleGoHome();
      return true;
    });

    return () => backSub.remove();
  }, [handleGoHome]);

  useEffect(() => {
    if (!requestId) return;

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
            if (!data?.worker?.uid) return null;
            return {
              postulationId: doc.id,
              ...data,
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
