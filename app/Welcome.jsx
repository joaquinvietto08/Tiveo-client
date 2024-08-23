import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tiveo from "../assets/svgs/welcomeTiveo";

const Welcome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.container}>
        <Tiveo style={styles.appLogo} />
        <Text style={styles.subtitle}>
          Encuentra la persona ideal para solucionar tus problemas
        </Text>
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate("Login")}
          color="#FFC107"
        >
          <Text style={{ fontSize: 16 }}>Comenzar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },

  circle1: {
    position: "absolute",
    top: -230,
    left: -50,
    width: 450,
    height: 450,
    backgroundColor: "rgba(255, 203, 19, 0.41)",
    borderRadius: 300,
  },
  circle2: {
    position: "absolute",
    top: -175,
    left: 207,
    width: 342,
    height: 342,
    backgroundColor: "rgba(255, 203, 19, 0.43)",
    borderRadius: 200,
  },
  container: {
    marginTop: 240,
    alignItems: "center",
    flex: 1,
    paddingBottom: 70,
    paddingHorizontal: 20,
  },
  appLogo: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    width: "72%",
  },
  startButton: {
    marginTop: "auto",
    backgroundColor: "#FFCB13",
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
