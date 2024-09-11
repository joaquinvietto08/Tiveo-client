import React, { useState, useRef } from "react";
import { View, Text, Image, Pressable, StatusBar } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { getIcon } from "../../utils/getIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../components/map/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./HomeStyles";
import {
  translateType,
  translateAvailability,
} from "../../utils/formatHelpers";
import { workers } from "../../components/data/workersData";
import image from "../../../assets/images/data/2.png";

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
        <Text style={styles.infoType}>{translateType(item.type)} • </Text>
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
        {item.availability === "available" ? (
          <View style={styles.availableView}>
            <Text style={styles.availableText}>
              {translateAvailability(item.availability)}
            </Text>
          </View>
        ) : (
          <View style={styles.busyView}>
            <Text style={styles.busyText}>
              {translateAvailability(item.availability)}
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
        viewPosition: 0.2,
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
  const snapPoints = [140, 450];

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
          <View style={styles.searchContainer}>
            <View style={styles.searchContainer2}>
              <Pressable style={styles.searchButton}>
                <Ionicons name="search-outline" size={24} color="black" />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>Buscar...</Text>
              </Pressable>
              <Pressable style={styles.user_picButton}>
                <Image source={image} style={styles.picProfile} />
              </Pressable>
            </View>
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
            <View style={styles.locationContainer}>
              <Pressable style={styles.locationButton}>
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
          </BottomSheetView>
          <View>
            <Text style={styles.bottomTitle}>25 trabajadores en tu zona</Text>
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

export default Home;
