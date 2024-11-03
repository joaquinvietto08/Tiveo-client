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
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  workerImage: {
    width: "100%",
    height: "100%",
  },
});

export default WorkerMarker;
