import React from "react";
import { View, Image, StyleSheet } from "react-native";

const WorkerMarker = ({ photoURL }) => {
  return (
    <View style={styles.markerContainer}>
      <Image source={photoURL} style={styles.workerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 35,
    height: 35,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  workerImage: {
    width: "100%",
    height: "100%",
  },
});

export default WorkerMarker;
