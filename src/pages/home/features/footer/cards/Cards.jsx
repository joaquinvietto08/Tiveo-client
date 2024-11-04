import React, { useRef, useState, useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./CardsStyles";
import { FlatList } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  translateAvailability,
  translateType,
} from "../../../../../utils/formatHelpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NearbyWorkersContext } from "../../../../../context/NearbyWorkersContext";

const CardButton = ({ worker, isFavorite, onToggleFavorite }) => {
  const topService = worker.services.reduce((prev, current) =>
    prev.starRating > current.starRating ? prev : current
  );

  return (
    <View style={styles.home__bottomSheet__card__cardContainer}>
      <Pressable
        android_ripple={{ color: "#E2E2E2", borderless: true }}
        style={styles.home__bottomSheet__card__button}
      >
        <View style={styles.home__bottomSheet__card__headerContainer}>
          <Image
            source={topService.bannerImage}
            style={styles.home__bottomSheet__card__headerPhoto}
          />
          <Pressable
            style={styles.home__bottomSheet__card__favContainer}
            onPress={onToggleFavorite}
          >
            {isFavorite ? (
              <MaterialIcons name="favorite" size={25} color="#ff3f3f" />
            ) : (
              <MaterialIcons
                name="favorite-outline"
                size={25}
                color="#C5C5C5"
              />
            )}
          </Pressable>
        </View>
        <View style={styles.home__bottomSheet__card__infoContainer}>
          <Text style={styles.home__bottomSheet__card__infoType}>
            {translateType(topService.serviceType)} •{" "}
          </Text>
          <AntDesign name="star" size={12} color="#F1D000" />
          <Text style={styles.home__bottomSheet__card__infoRating}>
            {topService.starRating}{" "}
          </Text>
          <Text style={styles.home__bottomSheet__card__infotTotalRatings}>
            ({topService.completedJobs})
          </Text>
        </View>
        <Text style={styles.home__bottomSheet__card__infoTitle}>
          {topService.description}
        </Text>
        <View style={styles.home__bottomSheet__card__addresContainer}>
          {topService.serviceType !== "home" && (
            <View style={styles.home__bottomSheet__card__addressView}>
              <MaterialIcons name="location-pin" size={22} color="#ACACAC" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.home__bottomSheet__card__addressText}
              >
                {topService.address}
              </Text>
            </View>
          )}
          {worker.status === "available" ? (
            <View style={styles.home__bottomSheet__card__availableView}>
              <Text style={styles.home__bottomSheet__card__availableText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          ) : (
            <View style={styles.home__bottomSheet__card__busyView}>
              <Text style={styles.home__bottomSheet__card__busyText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const Cards = () => {
  const flatListRef = useRef(null);
  const [favorites, setFavorites] = useState({});
  const { workersInGeneralLocation, workersInSiteLocation } =
    useContext(NearbyWorkersContext);
  const workers = [...workersInGeneralLocation, ...workersInSiteLocation];

  const toggleFavorite = (key) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [key]: !prevFavorites[key],
    }));
  };

  const workersWithTopService = workers.map((worker) => {
    const topService = worker.services.reduce((prev, current) =>
      prev.starRating > current.starRating ? prev : current
    );
    return {
      ...worker,
      topService,
    };
  });

  return (
    <View>
      <View style={styles.home__bottomSheet__card__subtitleContainer}>
        <Text style={styles.home__bottomSheet__card__subtitle}>Destacados</Text>
        <Text style={styles.home__bottomSheet__card__more}>Ver todos</Text>
      </View>
      <FlatList
        data={workersWithTopService}
        horizontal
        ref={flatListRef}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.home__bottomSheet__card__container}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardButton
            worker={item}
            isFavorite={!!favorites[item.uid]}
            onToggleFavorite={() => toggleFavorite(item.uid)}
          />
        )}
      />
    </View>
  );
};

export default Cards;
