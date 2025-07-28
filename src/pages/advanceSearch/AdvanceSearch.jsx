import React, { useRef, useState, useEffect } from "react";
import { View, StatusBar, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./AdvanceSearchStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Map from "./features/map/Map";
import Footer from "./features/footer/Footer";
import Feather from "@expo/vector-icons/Feather";
import postulantsData from "../../components/data/postulantsData";
import { workers } from "../../components/data/workersData";

const AdvanceSearch = () => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { values, requestId } = route.params;

  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [postulants, setPostulants] = useState([]);

  useEffect(() => {
    const merged = postulantsData.map((post) => {
      const workerInfo = workers.find((w) => w.uid === post.uid) || {};
      return {
        ...workerInfo,
        ...post,
      };
    });
    setPostulants(merged);
  }, []);

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };
  const handleGoHome = () => {
    navigation.navigate("HomeIndex", { openSheet: true });
  };

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
        <Footer sheetRef={sheetRef} values={values} trabajadores={postulants} />
      </GestureHandlerRootView>
    </View>
  );
};

export default AdvanceSearch;
