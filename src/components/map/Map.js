import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { mapConfig } from "./mapConfig";

const Map = ({ region, children, ...props }) => {
  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      initialRegion={region}
      mapType="standard"
      {...mapConfig}
      {...props}
    >
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
