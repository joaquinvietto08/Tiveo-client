import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./LocationStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRoute } from "@react-navigation/native";

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
];

const DefaultItem = ({ item, navigation }) => {
  let iconName;

  if (item.key === "1") {
    iconName = "location-crosshairs";
  } else if (item.key === "2") {
    iconName = "map-pin";
  }

  const handlePress = () => {
    if (item.key === "1") {
      navigation.navigate("LocationMap", { getLocation: true });
    } else if (item.key === "2") {
      navigation.navigate("LocationMap", { getLocation: false });
    }
  };

  return (
    <Pressable style={styles.addressContainer} onPress={handlePress}>
      <View style={{ width: 20, alignItems: "center" }}>
        <FontAwesome6 name={iconName} size={18} color="black" />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.addressName}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const LocationItem = ({ item, navigation }) => {
  return (
    <Pressable style={styles.addressContainer}>
      <View style={{ width: 20, alignItems: "center" }}>
        <FontAwesome6 name="location-dot" size={18} color="black" />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.addressName}>{item.name}</Text>
        {item.details && (
          <Text style={styles.addressDetails}>{item.details}</Text>
        )}
      </View>
    </Pressable>
  );
};

const Location = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.errorMsg) {
      setError(route.params.errorMsg);
      setTimeout(() => {
        setError(null);
        navigation.setParams({ errorMsg: undefined });
      }, 5000);
    }
  }, [route.params?.errorMsg]);

  const renderItem = ({ item }) => {
    if (item.key === "1" || item.key === "2") {
      return (
        <DefaultItem item={item} navigation={navigation} setError={setError} />
      );
    } else {
      return <LocationItem item={item} />;
    }
  };

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
            data={[...defaultOptions, ...exampleLocations]}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Chau</Text>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Location;
