import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./SearchBarStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.home__searchBar__container}>
      <Pressable
        style={styles.home__searchBar__subContainer}
        onPress={() => {
          navigation.navigate("WorkerRequest", { bottom: "advance" });
        }}
      >
        <View style={styles.home__searchBar__button}>
          <Ionicons name="search-outline" size={24} color="black" />
          <Text style={styles.home__searchBar__text}>¿Que estás buscando?</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;
