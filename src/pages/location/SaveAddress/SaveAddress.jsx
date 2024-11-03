import { View, Text, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./SaveAddressStyle";
import Feather from "@expo/vector-icons/Feather";
import { LocationContext } from "../../../context/LocationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import Form from "./features/form/Form";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../../context/UserContext";

const SaveAddress = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const { addressComponents } = route.params;
  const { setLocation } = useContext(LocationContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const streetName = addressComponents.address_components[1]?.long_name;
    const streetNumber = addressComponents.address_components[0]?.short_name;
    if (streetName && streetNumber) {
      setAddress(`${streetName} ${streetNumber}`);
    } else if (streetName) {
      setAddress(streetName);
    }
  }, [addressComponents]);

  const saveLocationContext = (data) => {
    setLocation(data);
  };

  const handleSaveAddress = async (formData) => {
    const newAddressData = {
      ...formData,
      ...addressComponents,
    };

    if (formData) {
      try {
        const clientRef = firestore().collection("clients").doc(user.uid);
        saveLocationContext(newAddressData);
        const clientSnapshot = await clientRef.get();
        if (!clientSnapshot.exists) {
          console.log("El cliente no existe en Firestore.");
          return;
        }

        await clientRef.collection("addresses").add(newAddressData);
        console.log(
          "Dirección guardada en la subcolección addresses del cliente."
        );
      } catch (error) {
        console.error("Error al guardar la dirección en Firestore:", error);
      }
    } else {
      console.log("newAddressData está vacío, no se envía a Firestore");
    }
  };

  return (
    <View
      style={{
        ...styles.saveAddress__mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Host>
          <View style={styles.saveAddress__headerContainer}>
            <Pressable
              style={styles.saveAddress__backButton}
              onPress={navigation.goBack}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.saveAddress__container}>
            <Text style={styles.saveAddress__title}>Nueva direccion</Text>
          </View>
          <View style={styles.saveAddress__formContainer}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "Inter-SemiBold" }}>{address}</Text>
            </View>
            <Form onSubmit={handleSaveAddress} />
          </View>
          <View style={styles.saveAddress__bottomContainer}>
            <Pressable onPress={() => saveLocationContext(addressComponents)}>
              <Text style={styles.saveAddress__textLater}>Ahora no</Text>
            </Pressable>
          </View>
        </Host>
      </GestureHandlerRootView>
    </View>
  );
};

export default SaveAddress;
