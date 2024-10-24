import { View, Text, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./SaveAddressStyle";
import Feather from "@expo/vector-icons/Feather";
import { LocationContext } from "../../../context/locationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import Form from "./features/form/Form";
import firestore from "@react-native-firebase/firestore";

const SaveAddress = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { addressComponents } = route.params;
  const { setLocationData } = useContext(LocationContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (addressComponents && addressComponents.length > 0) {
      const streetNumber = addressComponents.find((component) =>
        component.types.includes("street_number")
      );
      const streetName = addressComponents.find((component) =>
        component.types.includes("route")
      );
      if (streetName && streetNumber) {
        setAddress(`${streetName.long_name} ${streetNumber.short_name}`);
      } else {
        setAddress(`${streetName.long_name}`);
      }
    }
  }, [addressComponents]);

  const saveLocationContext = (data) => {
    setLocationData(data);
    /*     navigation.reset({
      index: 0,
      routes: [{ name: "MainNavigator" }],
    }); */
  };

  const handleSaveAddress = async (formData) => {
    const newAddressData = {
      ...formData,
      ...addressComponents,
    };

    if (formData) {
      try {
        await firestore().collection("addresses").add(newAddressData);
        saveLocationContext(newAddressData);
      } catch (error) {
        console.error("Error al guardar la dirección en Firestore:", error);
      }
    } else {
      console.log("formData está vacío, no se envía a Firestore");
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
