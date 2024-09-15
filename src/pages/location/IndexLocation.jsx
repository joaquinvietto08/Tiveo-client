import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import { styles } from "./LocationStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const defaultOptions = [
  { key: "1", name: "Mi ubicación actual" },
  { key: "2", name: "Seleccionar en el mapa" },
];

const exampleLocations = [
  { key: "3", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "4", name: "Chacabuco 757" },
  { key: "5", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "6", name: "Chacabuco 757" },
  { key: "7", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "8", name: "Chacabuco 757" },
  { key: "9", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "10", name: "Chacabuco 757" },
  { key: "11", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "12", name: "Chacabuco 757" },
  { key: "13", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "14", name: "Chacabuco 757" },
  { key: "15", name: "Casa", details: "Marcelo T. de Alvear 360" },
  { key: "16", name: "Chacabuco 757" },
];

const LocationItem = ({ item }) => {
  let iconName;

  if (item.key === "1") {
    iconName = "location-crosshairs";
  } else if (item.key === "2") {
    iconName = "map-pin";
  } else {
    iconName = "location-dot";
  }
  return (
    <Pressable style={styles.addressContainer}>
      <FontAwesome6 name={iconName} size={18} color="black" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.addressName}>{item.name}</Text>
        {item.details && (
          <Text style={styles.addressDetails}>{item.details}</Text>
        )}
      </View>
    </Pressable>
  );
};

const IndexLocation = () => {
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("");
  const [locationsFromDB, setLocationsFromDB] = useState(exampleLocations);

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerButton}>
          <Text style={styles.headerText}>Ver perfil</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Elije tu ubicación</Text>
        <Text style={styles.subtitle}>
          Necesitamos tu ubicacion para mostrarte los trabajadores disponibles
          en tu zona
        </Text>
        <TextInput
          style={styles.searchContainer}
          placeholder="Buscar direccion"
          selectionColor={"#FF9D00"}
          cursorColor="black"
          value={inputValue}
          onChangeText={setInputValue}
        />
      </View>
      <View style={styles.locationsContainer}>
        {inputValue === "" ? (
          <FlatList
            data={[...defaultOptions, ...locationsFromDB]}
            renderItem={({ item }) => <LocationItem item={item} />}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Chau</Text>
        )}
      </View>
    </View>
  );
};

export default IndexLocation;
