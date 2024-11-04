import React, { useRef, useState } from "react";
import { View, StatusBar, ScrollView, RefreshControl } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./HomeStyles";
import Map from "./features/map/Map";
import ServiceList from "./features/serviceList/ServiceList";
import Footer from "./features/footer/Footer";
import SearchBar from "./features/searchBar/SearchBar";
import { useNearbyWorkers } from "../../context/NearbyWorkersContext";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const { fetchNearbyWorkers } = useNearbyWorkers();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNearbyWorkers(); // Llamar a la función para actualizar los trabajadores
    setIsRefreshing(false);
  };

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.home__mainContainer}>
      <StatusBar translucent barStyle="dark-content" />
      <GestureHandlerRootView>
        <Map onPress={handleMapPress} />
        <View
          style={{
            ...styles.home__container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <SearchBar />
            <ServiceList navigation={navigation} />
          </ScrollView>
        </View>
        <Footer sheetRef={sheetRef} />
      </GestureHandlerRootView>
    </View>
  );
};

export default Home;
