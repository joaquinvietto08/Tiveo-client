import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { mapConfig } from "./mapConfig";

const Map = () => {
  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      initialRegion={{
        latitude: -34.603684,
        longitude: -58.381559,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      mapType="standard"
      {...mapConfig}
    ></MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
