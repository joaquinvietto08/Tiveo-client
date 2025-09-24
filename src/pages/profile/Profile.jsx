import { View, Text, StyleSheet, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const Profile = ({ navigation }) => {
  const handleSignOut = async () => {
    const user = auth().currentUser;

    if (user) {
      // Detectar el proveedor de autenticación
      const providerId = user.providerData[0]?.providerId;

      try {
        // Cerrar sesión de Firebase
        await auth().signOut();
        console.log("User signed out from Firebase!");

        // Verificar si el usuario está autenticado con Google
        if (providerId === "google.com") {
          try {
            await GoogleSignin.revokeAccess();
            console.log("Google access revoked!");
          } catch (error) {
            console.error("Error revoking Google access: ", error);
          }
        }

        // Verificar si el usuario está autenticado con Facebook
        if (providerId === "facebook.com") {
          try {
            const currentAccessToken =
              await AccessToken.getCurrentAccessToken();
            if (currentAccessToken) {
              await LoginManager.logOut();
              console.log("User logged out from Facebook!");
            }
          } catch (error) {
            console.error("Error logging out from Facebook: ", error);
          }
        }
      } catch (error) {
        console.error("Error signing out: ", error);
        alert("Sign out failed: " + error.message);
      }
    } else {
      console.log("No user is currently logged in.");
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