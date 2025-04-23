import React, { useContext, useRef } from "react";
import { Pressable, View } from "react-native";
import MapComponent from "../../../../components/map/map/Map";
import { styles } from "./MapStyles";
import { LocationContext } from "../../../../context/LocationContext";

const Map = ({ onPress, filteredWorkers, onSelectWorker }) => {
  const mapRef = useRef(null);
  const { location } = useContext(LocationContext);

  const userLocation = {
    latitude: location.geometry.location.lat - 0.015,
    longitude: location.geometry.location.lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const user = [
    {
      latitude: userLocation.latitude + 0.015,
      longitude: userLocation.longitude,
      type: "home",
    },
  ];

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <MapComponent
        ref={mapRef}
        initialRegion={userLocation}
        user={user}
        workers={filteredWorkers}
        onSelectWorker={onSelectWorker}
      />
      <View style={styles.home__map__marker}></View>
    </Pressable>
  );
};

export default Map;
