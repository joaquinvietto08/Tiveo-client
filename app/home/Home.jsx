import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import Tiveo from "../../assets/svgs/tiveo";
import Electricity from "../../assets/svgs/home/electricity";
import Plumbing from "../../assets/svgs/home/plumbing";
import Gas from "../../assets/svgs/home/gas";
import Gardening from "../../assets/svgs/home/gardening";
import Locksmith from "../../assets/svgs/home/locksmith";
import Painting from "../../assets/svgs/home/painting";
import Construction from "../../assets/svgs/home/construction";
import Pool from "../../assets/svgs/home/pool";
import Carpentry from "../../assets/svgs/home/carpentry";
import Glass from "../../assets/svgs/home/glass";
import Pets from "../../assets/svgs/home/pets";
import Security from "../../assets/svgs/home/security";
import Ironwork from "../../assets/svgs/home/ironwork";
import Technology from "../../assets/svgs/home/technology";
import Beauty from "../../assets/svgs/home/beauty";
import Vehicles from "../../assets/svgs/home/vehicles";
import Freight from "../../assets/svgs/home/freight";
import Events from "../../assets/svgs/home/events";
import Photography from "../../assets/svgs/home/photography";
import Music from "../../assets/svgs/home/music";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../Map";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import image from "../../assets/images/data/2.png";
import Feather from "@expo/vector-icons/Feather";

const initialServices = [
  { key: "1", name: "Todos" },
  { key: "2", name: "Electricidad" },
  { key: "3", name: "Plomeria" },
  { key: "4", name: "Jardinería" },
  { key: "5", name: "Cerrajería" },
  { key: "6", name: "Pintura" },
  { key: "7", name: "Construcción" },
  { key: "8", name: "Vidrios" },
  { key: "100", name: "Ver más" },
];

const ServiceButton = ({ item, isActive, onPress }) => (
  <Pressable
    style={[
      styles.serviceButton,
      isActive ? styles.activeButton : styles.inactiveButton,
    ]}
    onPress={onPress}
  >
    <Feather name="grid" size={24} color={isActive ? "#000" : "#B7B7B7"} />
    <Text style={isActive ? styles.activeText : styles.inactiveText}>
      {item.name}
    </Text>
  </Pressable>
);

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedService, setSelectedService] = useState({
    key: "1",
    name: "Todos",
  });
  const flatListRef = useRef(null);

  const handleServicePress = (item) => {
    if (item.key === "100") {
      navigation.navigate("Services");
    } else {
      setSelectedService(item);
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
        viewPosition: 0.1,
      });
    }
  };

  const filteredServices = initialServices.filter(
    (service) => service.key !== selectedService.key
  );

  const renderItem = ({ item }) => (
    <ServiceButton
      item={item}
      isActive={item.key === selectedService.key}
      onPress={() => handleServicePress(item)}
    />
  );

  return (
    <View
      style={{
        ...styles.mainContainer,
      }}
    >
      <StatusBar translucent barStyle="dark-content" />
      <Map />
      <View
        style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.user_picContainer}>
            <Pressable style={styles.user_picButton}>
              <Image source={image} style={styles.picProfile} />
            </Pressable>
          </View>
          <View style={styles.locationContainer}>
            <Pressable style={styles.locationButton}>
              <MaterialIcons name="location-pin" size={24} color="black" />
              <Text
                style={styles.locationText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Marcelo T de Alvear 360
              </Text>
              <Icon name="keyboard-arrow-down" size={29} color="#000" />
            </Pressable>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>Buscar...</Text>
          </Pressable>
        </View>
        <View style={styles.servicesListContainer}>
          <FlatList
            data={[selectedService, ...filteredServices]}
            renderItem={renderItem}
            ref={flatListRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  container: {
    position: "absolute",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 90,
    paddingTop: 30,
    justifyContent: "flex-end",
  },
  user_picContainer: {
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "flex-end",
    position: "absolute",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  user_picButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  picProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  locationContainer: {
    alignItems: "center",
    width: "100%",
    position: "absolute",
  },
  locationButton: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 215,
  },
  locationText: {
    fontWeight: "bold",
    fontSize: 14,
    overflow: "hidden",
    maxWidth: 160,
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingTop: 15,
  },
  searchButton: {
    width: "100%",
    height: 53,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 22,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  servicesListContainer: {
    marginVertical: 10,
  },
  serviceButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: "#FFCB13",
    borderColor: "#FFCB13",
  },
  inactiveButton: {
    backgroundColor: "white",
    borderColor: "#B7B7B7",
  },
  activeText: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  inactiveText: {
    marginLeft: 10,
    color: "#B7B7B7",
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
});

export default Home;
