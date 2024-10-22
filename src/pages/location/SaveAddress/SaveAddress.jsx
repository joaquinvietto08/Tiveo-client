import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./SaveAddressStyle";
import Feather from "@expo/vector-icons/Feather";
import { LocationContext } from "../../../context/locationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import Form from "./features/form/Form";

const SaveAddress = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { location, address } = route.params;
  const { setLocationData } = useContext(LocationContext);

  const handleSave = (formData) => {
    const locationData = {
      ...formData,
      address: address,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    console.log("Datos que se guardarán:", locationData);

    setLocationData(locationData);

    navigation.reset({
      index: 0,
      routes: [{ name: "MainNavigator" }],
    });
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
            <Form onSubmit={handleSave} />
          </View>
          <View style={styles.saveAddress__bottomContainer}>
            <Pressable onPress={() => handleSave(false)}>
              <Text style={styles.saveAddress__textLater}>Ahora no</Text>
            </Pressable>
          </View>
        </Host>
      </GestureHandlerRootView>
    </View>
  );
};

export default SaveAddress;
