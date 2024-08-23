import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Facebook from "../../assets/svgs/auth/facebook";
import Google from "../../assets/svgs/auth/google";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { signInWithGoogle } from "./google_auth";

const countries = [
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { name: "Cuba", code: "+53", flag: "🇨🇺" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨" },
  { name: "El Salvador", code: "+503", flag: "🇸🇻" },
  { name: "Guatemala", code: "+502", flag: "🇬🇹" },
  { name: "Honduras", code: "+504", flag: "🇭🇳" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { name: "Panama", code: "+507", flag: "🇵🇦" },
  { name: "Paraguay", code: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "+51", flag: "🇵🇪" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "+598", flag: "🇺🇾" },
  { name: "Venezuela", code: "+58", flag: "🇻🇪" },
];

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    handleCloseBottomSheet();
  };

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ["75%"];

  const handleOpenBottomSheet = () => {
    Keyboard.dismiss();
    setIsOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
    sheetRef.current?.close();
  };

  const [phoneNumber, setPhoneNumber] = useState("");

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
        backgroundColor="#FFC107"
        barStyle="dark-content"
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Ingresa a tu cuenta</Text>
          <View style={styles.social_authContainer}>
            <Pressable
              style={styles.social_authButton}
              onPress={() =>
                signInWithGoogle()
                  .then((user) => {
                    console.log("Signed in with Google!");
                  })
                  .catch((error) => {
                    alert("Sign in failed: " + error.message);
                  })
              }
            >
              <Google />
              <Text style={styles.socialButtonText}>Continuar con Google</Text>
            </Pressable>
            <Pressable style={styles.social_authButton}>
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
          <Text style={{ color: "#8A8A8A", fontSize: 16 }}>
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
                selectionColor={"#FFC107"}
                cursorColor="black"
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setPhoneNumber(numericText);
                }}
              />
            </View>
          </View>
          <Pressable
            style={styles.confirmButton}
            //    onPress={() => navigation.navigate("MainNavigator")}
            color="#FFC107"
          >
            <Text style={{ fontSize: 16 }}>Continuar</Text>
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

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  container: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
    borderBottomWidth: 0.2,
    height: 50,
    textAlign: "center",
    borderColor: "#98A2B3",
  },
  social_authContainer: {
    marginTop: 30,
    width: "100%",
    height: 170,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  social_authButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "100%",
    height: 46,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },
  phone_authContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  selectCountry: {
    width: "30%",
    height: 52,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C8C8C8",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "68%",
    height: 52,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C8C8C8",
    paddingHorizontal: 15,
  },
  countryCodeText: {
    fontSize: 17,
    marginRight: 8,
  },
  flag: {
    fontSize: 20,
  },
  phoneInput: {
    fontSize: 17,
    height: 23,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: "#FFCB13",
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    width: "100%",
  },
  flag: {
    fontSize: 20,
  },
  countryName: {
    fontSize: 15,
  },
  countryCode: {
    fontSize: 16,
    color: "#888",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E0E0E0",
  },
});
