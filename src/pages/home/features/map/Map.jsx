import React, { useContext, useRef } from "react";
import { Pressable, View } from "react-native";
import MapComponent from "../../../../components/map/map/Map";
import { styles } from "./MapStyles";
import { LocationContext } from "../../../../context/LocationContext";

const Map = ({ onPress }) => {
  const mapRef = useRef(null);
  const { location } = useContext(LocationContext);

  const userLocation = {
    latitude: location.geometry.location.lat,
    longitude: location.geometry.location.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <MapComponent ref={mapRef} initialRegion={userLocation} />
      <View style={styles.home__map__marker}></View>
    </Pressable>
  );
};

export default Map;
