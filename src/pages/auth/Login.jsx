import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import { styles } from "./LoginStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Facebook from "../../../assets/svgs/auth/facebook";
import Google from "../../../assets/svgs/auth/google";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { signInWithGoogle } from "../../actions/api/google_auth";
import { signInWithFacebook } from "../../actions/api/facebook_auth";
import { countries } from "../../utils/countries";
import firestore from "@react-native-firebase/firestore";
import { colors } from "../../styles/globalStyles";

const Login = () => {
  const insets = useSafeAreaInsets();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ["75%"];

  const selectCountry = (country) => {
    setSelectedCountry(country);
    handleCloseBottomSheet();
  };

  const handleOpenBottomSheet = () => {
    Keyboard.dismiss();
    setIsOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
    sheetRef.current?.close();
  };

  const checkAndCreateClient = async (user) => {
    try {
      const clientRef = firestore().collection("clients").doc(user.uid);
      const clientSnapshot = await clientRef.get();

      if (!clientSnapshot.exists) {
        await clientRef.set({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        console.log("Cliente creado en Firestore.");
      } else {
        console.log("Cliente ya existe en Firestore.");
      }
    } catch (error) {
      console.error("Error al verificar o crear cliente:", error);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((user) => {
        console.log(user);
        checkAndCreateClient(user.user);
      })
      .catch((error) => {
        alert("Sign in failed: " + error.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((user) => {
        console.log("Signed in with Facebook!");
        checkAndCreateClient(user.user);
      })
      .catch((error) => {
        alert("Sign in failed: " + error.message);
      });
  };

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
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Ingresa a tu cuenta</Text>
          <View style={styles.social_authContainer}>
            <Pressable
              style={styles.social_authButton}
              onPress={handleGoogleSignIn}
            >
              <Google />
              <Text style={styles.socialButtonText}>Continuar con Google</Text>
            </Pressable>
            <Pressable
              style={styles.social_authButton}
              onPress={handleFacebookSignIn}
            >
              <Facebook size={24} />
              <Text style={styles.socialButtonText}>
                Continuar con Facebook
              </Text>
            </Pressable>
            <Pressable style={styles.social_authButton}>
              <Icon name="email" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Continuar con correo</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: "#8A8A8A",
              fontSize: 16,
              fontFamily: "Inter-Regular",
            }}
          >
            O con tu celular
          </Text>
          <View style={styles.phone_authContainer}>
            <Pressable
              style={styles.selectCountry}
              onPress={handleOpenBottomSheet}
            >
              <Text style={styles.flag}>{selectedCountry.flag}</Text>
              <Icon name="keyboard-arrow-down" size={29} color="#000" />
            </Pressable>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
              <TextInput
                style={styles.phoneInput}
                keyboardType="numeric"
                maxLength={15}
                value={phoneNumber}
                placeholder="Ej: 123456789"
                placeholderTextColor="#8A8A8A"
                selectionColor={colors.primary}
                cursorColor="black"
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setPhoneNumber(numericText);
                }}
              />
            </View>
          </View>
          <Pressable style={styles.confirmButton} color={colors.primary}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter-Medium",
                color: "#fff",
              }}
            >
              Continuar
            </Text>
          </Pressable>
        </View>

        {isOpen && (
          <Pressable style={styles.overlay} onPress={handleCloseBottomSheet} />
        )}

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          onClose={handleCloseBottomSheet}
        >
          <BottomSheetView style={styles.contentContainer}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.countryItem}
                  onPress={() => selectCountry(item)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ ...styles.flag, marginRight: 10 }}>
                      {item.flag}
                    </Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                  </View>
                  <Text style={styles.countryCode}>{item.code}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

export default Login;
