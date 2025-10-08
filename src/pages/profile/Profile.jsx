import { useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "./ProfileStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext"; // ajustá la ruta según tu proyecto
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { LocationContext } from "../../context/LocationContext";

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const { setLocation } = useContext(LocationContext);

  const handleSignOut = async () => {
    const currentUser = auth().currentUser;
    setLocation(null);

    if (currentUser) {
      const providerId = currentUser.providerData[0]?.providerId;
      try {
        await auth().signOut();
        console.log("Sesión cerrada en Firebase.");

        if (providerId === "google.com") {
          try {
            await GoogleSignin.revokeAccess();
            console.log("Sesión de Google cerrada.");
          } catch (error) {
            console.error("Error cerrando sesión de Google:", error);
          }
        }

        if (providerId === "facebook.com") {
          try {
            const currentAccessToken =
              await AccessToken.getCurrentAccessToken();
            if (currentAccessToken) {
              await LoginManager.logOut();
              console.log("Sesión de Facebook cerrada.");
            }
          } catch (error) {
            console.error("Error cerrando sesión de Facebook:", error);
          }
        }
      } catch (error) {
        console.error("Error cerrando sesión:", error);
        alert("Error al cerrar sesión: " + error.message);
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  };

  return (
    <View
      style={[
        styles.profile__mainContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.profile__header}>
        {user?.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={styles.profile__avatar}
          />
        ) : (
          <View style={styles.profile__avatarPlaceholder}>
            <Text style={styles.profile__avatarInitial}>
              {user?.displayName?.[0]?.toUpperCase() || "?"}
            </Text>
          </View>
        )}
        <Text style={styles.profile__name}>
          {user?.displayName || "Usuario"}
        </Text>
      </View>

      <View style={styles.profile__options}>
        <Pressable
          style={styles.profile__button}
          onPress={() => navigation.navigate("Activity")}
        >
          <Text style={styles.profile__buttonText}>Mi actividad</Text>
        </Pressable>
        <Pressable
          style={styles.profile__button}
          onPress={() => navigation.navigate("Support")}
        >
          <Text style={styles.profile__buttonText}>Ayuda</Text>
        </Pressable>

        <Pressable
          style={[styles.profile__button, styles.profile__logout]}
          onPress={handleSignOut}
        >
          <Text
            style={[styles.profile__buttonText, styles.profile__logoutText]}
          >
            Cerrar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
