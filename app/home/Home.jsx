import React from "react";
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

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
            <Feather name="grid" size={24} color="black" />
          </Pressable>
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
});

export default Home;
