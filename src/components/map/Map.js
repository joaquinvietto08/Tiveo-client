import React, { forwardRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { mapConfig } from "./mapConfig";

const Map = forwardRef(({ region, children, ...props }, ref) => {
  return (
    <MapView
      ref={ref}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      mapType="standard"
      {...mapConfig}
      {...props}
    >
      {children}
    </MapView>
  );
});

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
