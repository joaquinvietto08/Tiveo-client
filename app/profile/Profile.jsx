import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Profile = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      // Revocar acceso de Google
      await GoogleSignin.revokeAccess();
      console.log("Google access revoked!");

      // Cerrar sesión de Firebase
      await auth().signOut();
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Sign out failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Agregar celular</Text>
      <Pressable
        style={styles.button}
        //      onPress={() => navigation.navigate("AddPhone")}
      >
        <Text>Details</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text>Cerrar sesion</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 20,
    width: 200,
    height: 40,
    backgroundColor: "#FDD146",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default Profile;
