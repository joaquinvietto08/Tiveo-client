import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import React, { useState, useContext, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./SaveAddressStyle";
import Feather from "@expo/vector-icons/Feather";
import { LocationContext } from "../../../context/locationContext"; // Importamos el contexto
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { countries } from "../../../utils/countries";
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";

const SaveAddress = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { location, address } = route.params;

  // Variables para guardar los datos ingresados
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [locationName, setLocationName] = useState("");
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

  const { setLocationData } = useContext(LocationContext); // Obtenemos la función para guardar la ubicación global

  const handleSave = (shouldSave) => {
    // Construimos el JSON compartido entre ambas opciones
    const locationData = {
      address: address,
      floor: floor,
      notes: notes,
      locationName: locationName,
      latitude: location.latitude,
      longitude: location.longitude,
      phoneNumber: `${selectedCountry.code} ${phoneNumber}`, // Concatenamos código del país y número
    };

    // Guardamos la ubicación globalmente (compartido en ambas opciones)
    setLocationData(locationData);

    if (shouldSave) {
      // Si selecciona "Guardar", mostramos el JSON para futuras operaciones
      console.log("JSON a guardar:", locationData);
    }

    // Resetear la pila de navegación para que no pueda volver atrás
    navigation.reset({
      index: 0,
      routes: [{ name: "MainNavigator" }],
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Nueva direccion</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: "Inter-SemiBold" }}>{address}</Text>
          </View>
          <TextInput
            style={styles.inputContainer2}
            placeholder="Piso/Departamento"
            placeholderTextColor="#8A8A8A"
            selectionColor={"#FF9D00"}
            cursorColor="black"
            maxLength={20}
            value={floor}
            onChangeText={setFloor}
          ></TextInput>

          <View style={styles.inputContainer3}>
            <TextInput
              style={{ fontFamily: "Inter-Regular" }}
              placeholder="Aclaraciones"
              placeholderTextColor="#8A8A8A"
              selectionColor={"#FF9D00"}
              cursorColor="black"
              maxLength={100}
              multiline={true}
              value={notes}
              onChangeText={setNotes}
            ></TextInput>
          </View>
          <View style={styles.phone_Container}>
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
                selectionColor={"#FF9D00"}
                cursorColor="black"
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setPhoneNumber(numericText);
                }}
              />
            </View>
          </View>
          <TextInput
            style={styles.inputContainer}
            placeholder="Nombre de ubicacion"
            placeholderTextColor="#8A8A8A"
            selectionColor={"#FF9D00"}
            cursorColor="black"
            maxLength={20}
            value={locationName}
            onChangeText={setLocationName}
          ></TextInput>
        </View>
        <View style={styles.bottomContainer}>
          <Pressable style={styles.saveButton} onPress={() => handleSave(true)}>
            <Text style={styles.textButton}>Guardar direccion</Text>
          </Pressable>
          <Pressable
            style={{ marginTop: 25 }}
            onPress={() => handleSave(false)}
          >
            <Text style={styles.textLater}>Ahora no</Text>
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

export default SaveAddress;
