import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
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
import headerPic from "../../assets/images/baner-carpinteria.jpg";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    <Feather name="grid" size={24} color={isActive ? "#fff" : "#8D8D8D"} />
    <Text style={isActive ? styles.activeText : styles.inactiveText}>
      {item.name}
    </Text>
  </Pressable>
);

const workers = [
  {
    key: "1",
    service: "gardening",
    headerPhoto: headerPic,
    type: "home-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "available",
    address: "",
  },
  {
    key: "2",
    service: "electricity",
    headerPhoto: headerPic,
    type: "home-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "busy",
    address: "",
  },
  {
    key: "3",
    service: "plumbing",
    headerPhoto: headerPic,
    type: "home-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "available",
    address: "",
  },
  {
    key: "4",
    service: "paint",
    headerPhoto: headerPic,
    type: "place-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "busy",
    address: "Marcelo T de Alvear 360",
  },
  {
    key: "5",
    service: "paint",
    headerPhoto: headerPic,
    type: "place-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "available",
    address: "Marcelo T de Alvear 3602",
  },
  {
    key: "6",
    service: "paint",
    headerPhoto: headerPic,
    type: "home-service",
    rating: "4.8",
    totalRatings: "23",
    title: "Servicio de carpintería de todo tipo y bla bla",
    status: "busy",
    address: "",
  },
];

const translateField = (field, value) => {
  const translations = {
    service: {
      gardening: "Jardinería",
      carpentry: "Carpintería",
      electricity: "Electricidad",
      plumbing: "Plomería",
      paint: "Pintura",
    },
    type: {
      "home-service": "Servicio a domicilio",
      "place-service": "Servicio en lugar",
    },
    status: {
      available: "Disponible",
      busy: "Contactar",
    },
  };

  return translations[field] && translations[field][value]
    ? translations[field][value]
    : value;
};

const CardButton = ({ item, isFavorite, onToggleFavorite }) => (
  <View style={styles.cardView}>
    <Pressable
      android_ripple={{ color: "#E2E2E2", borderless: true }}
      style={styles.cardButton}
    >
      <View style={styles.card_headerContainer}>
        <Image source={item.headerPhoto} style={styles.headerPhoto} />
        <Pressable style={styles.card_favContainer} onPress={onToggleFavorite}>
          {isFavorite ? (
            <MaterialIcons name="favorite" size={25} color="#ff3f3f" />
          ) : (
            <MaterialIcons name="favorite-outline" size={25} color="#C5C5C5" />
          )}
        </Pressable>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoType}>
          {translateField("type", item.type)} •{" "}
        </Text>
        <AntDesign name="star" size={12} color="#F1D000" />
        <Text style={styles.infoRating}>{item.rating} </Text>
        <Text style={styles.info_totalRatings}>({item.totalRatings})</Text>
      </View>
      <Text style={styles.infoTitle}>{item.title}</Text>
      <View style={styles.bottom_cardContainer}>
        {item.address !== "" && (
          <View style={styles.addressView}>
            <MaterialIcons name="location-pin" size={22} color="#ACACAC" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.addressText}
            >
              {item.address}
            </Text>
          </View>
        )}
        {item.status === "available" ? (
          <View style={styles.availableView}>
            <Text style={styles.availableText}>
              {translateField("status", item.status)}
            </Text>
          </View>
        ) : (
          <View style={styles.busyView}>
            <Text style={styles.busyText}>
              {translateField("status", item.status)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  </View>
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
      flatListRef2.current?.scrollToIndex({
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

  const sheetRef = useRef(null);
  const snapPoints = [140, 420];

  const flatListRef2 = useRef(null);

  const animationConfigs = {
    duration: 400,
  };

  const handleMapPress = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const [favorites, setFavorites] = useState({});
  const toggleFavorite = (key) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [key]: !prevFavorites[key],
    }));
  };

  return (
    <View
      style={{
        ...styles.mainContainer,
      }}
    >
      <StatusBar translucent barStyle="dark-content" />
      <GestureHandlerRootView style={styles.gestureHandler}>
        <Pressable onPress={handleMapPress} style={{ flex: 1 }}>
          <Map />
        </Pressable>
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
              ref={flatListRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.flatListContent}
              renderItem={renderItem}
            />
          </View>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={1}
          handleIndicatorStyle={{ backgroundColor: "#D8D8D8" }}
          animationConfigs={animationConfigs}
          backgroundStyle={{
            backgroundColor: "#F8F8F8",
            shadowColor: "#000",
            elevation: 7,
          }}
        >
          <BottomSheetView style={styles.bottom_viewContainer}>
            <Text style={styles.bottomTitle}>25 trabajadores en tu zona</Text>
          </BottomSheetView>
          <View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.bottomSubtitle}>Destacados</Text>
              <Text style={styles.bottomMore}>Ver todos</Text>
            </View>
            <FlatList
              data={workers}
              horizontal
              ref={flatListRef2}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.cardsContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <CardButton
                  item={item}
                  isFavorite={!!favorites[item.key]}
                  onToggleFavorite={() => toggleFavorite(item.key)}
                />
              )}
            />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  gestureHandler: {
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
    backgroundColor: "#FF9D00",
    borderColor: "#FF9D00",
  },
  inactiveButton: {
    borderColor: "#8D8D8D",
    backgroundColor: "rgba(255, 255, 255, 0.69)",
  },
  activeText: {
    fontWeight: "500",
    marginLeft: 10,
    color: "#fff",
  },
  inactiveText: {
    marginLeft: 10,
    color: "#8D8D8D",
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  handleStyle: {
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  bottom_viewContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 25,
  },
  bottomTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomSubtitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  bottomMore: {
    fontSize: 14,
    color: "#FF9D00",
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  cardView: {
    borderRadius: 10,
    marginRight: 15,
    width: 260,
    height: 220,
    backgroundColor: "#FFFFFF",
  },
  cardButton: {
    width: 260,
    height: 220,
    position: "relative",
  },
  card_headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerPhoto: {
    width: 260,
    height: 110,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  card_favContainer: {
    position: "absolute",
    height: 40,
    width: 40,
    right: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 8,
  },
  infoType: {
    fontSize: 12,
    color: "#ACACAC",
    fontWeight: "500",
  },
  infoRating: {
    fontSize: 12,
    color: "#F1D000",
    fontWeight: "500",
  },
  info_totalRatings: {
    fontSize: 12,
    color: "#ACACAC",
    fontWeight: "500",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  bottom_cardContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 8,
    flexDirection: "row",
  },
  addressView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    paddingLeft: 3,
    paddingBottom: 1,
  },
  addressText: {
    maxWidth: 140,
    fontSize: 12,
    fontWeight: "800",
    color: "#ACACAC",
  },
  availableView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0, 255, 128, 0.14)",
    marginRight: 8,
  },
  availableText: {
    fontSize: 13,
    color: "#00EC7E",
    fontWeight: "600",
  },
  busyView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255, 157, 0, 0.14)",
    marginRight: 8,
  },
  busyText: {
    fontSize: 13,
    color: "#FF9D00",
    fontWeight: "600",
  },
});

export default Home;
