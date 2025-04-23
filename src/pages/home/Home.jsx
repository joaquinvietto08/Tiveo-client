import React, { useRef, useState, useEffect } from "react";
import { View, StatusBar, ScrollView, RefreshControl } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./HomeStyles";
import Map from "./features/map/Map";
import ServiceList from "./features/serviceList/ServiceList";
import Footer from "./features/footer/Footer";
import SearchBar from "./features/searchBar/SearchBar";
import WorkerPreview from "./features/workerPreview/WorkerPreview";
import { useNearbyWorkers } from "../../context/NearbyWorkersContext";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const { fetchNearbyWorkers, nearbyWorkers } = useNearbyWorkers();

  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const selectedWorker = nearbyWorkers.find(
    (worker) => worker.uid === selectedWorkerId
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  useEffect(() => {
    setFilteredWorkers(nearbyWorkers);
  }, [nearbyWorkers]);

  const handleServiceFilter = (service) => {
    if (service.name === "Todos") {
      setFilteredWorkers(nearbyWorkers);
    } else {
      setFilteredWorkers(
        nearbyWorkers.filter((worker) =>
          worker.services.some((s) => s.service === service.name)
        )
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNearbyWorkers();
    setIsRefreshing(false);
  };

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.home__mainContainer}>
      <StatusBar translucent barStyle="dark-content" />
      <GestureHandlerRootView>
        <Map
          onPress={handleMapPress}
          filteredWorkers={filteredWorkers}
          onSelectWorker={(workerId) => setSelectedWorkerId(workerId)}
        />
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
            <ServiceList
              navigation={navigation}
              onServiceSelect={handleServiceFilter}
            />
          </ScrollView>
        </View>
        <WorkerPreview
          worker={selectedWorker}
          onClose={() => setSelectedWorkerId(null)}
        />
        <Footer sheetRef={sheetRef} filteredWorkers={filteredWorkers} />
      </GestureHandlerRootView>
    </View>
  );
};

export default Home;
