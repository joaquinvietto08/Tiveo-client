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
    width: 45,
    height: 45,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  workerImage: {
    width: "100%",
    height: "100%",
  },
});

export default WorkerMarker;
