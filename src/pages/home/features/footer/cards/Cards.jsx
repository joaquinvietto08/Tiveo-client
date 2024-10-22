import {Image, Pressable, Text, View} from "react-native";
import {styles} from "./CardsStyles";
import {FlatList} from "react-native-gesture-handler";
import {workers} from "../../../../../components/data/workersData";
import React, {useRef, useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {translateAvailability, translateType} from "../../../../../utils/formatHelpers";
import AntDesign from "@expo/vector-icons/AntDesign";

const CardButton = ({item, isFavorite, onToggleFavorite}) => (
    <View style={styles.home__bottomSheet__card__cardContainer}>
        <Pressable
            android_ripple={{color: "#E2E2E2", borderless: true}}
            style={styles.home__bottomSheet__card__button}
        >
            <View style={styles.home__bottomSheet__card__headerContainer}>
                <Image source={item.headerPhoto} style={styles.home__bottomSheet__card__headerPhoto}/>
                <Pressable style={styles.home__bottomSheet__card__favContainer} onPress={onToggleFavorite}>
                    {isFavorite ? (
                        <MaterialIcons name="favorite" size={25} color="#ff3f3f"/>
                    ) : (
                        <MaterialIcons name="favorite-outline" size={25} color="#C5C5C5"/>
                    )}
                </Pressable>
            </View>
            <View style={styles.home__bottomSheet__card__infoContainer}>
                <Text style={styles.home__bottomSheet__card__infoType}>{translateType(item.type)} • </Text>
                <AntDesign name="star" size={12} color="#F1D000"/>
                <Text style={styles.home__bottomSheet__card__infoRating}>{item.rating} </Text>
                <Text style={styles.home__bottomSheet__card__infotTotalRatings}>({item.totalRatings})</Text>
            </View>
            <Text style={styles.home__bottomSheet__card__infoTitle}>{item.title}</Text>
            <View style={styles.home__bottomSheet__card__addresContainer}>
                {item.address !== "" && (
                    <View style={styles.home__bottomSheet__card__addressView}>
                        <MaterialIcons name="location-pin" size={22} color="#ACACAC"/>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.home__bottomSheet__card__addressText}
                        >
                            {item.address}
                        </Text>
                    </View>
                )}
                {item.availability === "available" ? (
                    <View style={styles.home__bottomSheet__card__availableView}>
                        <Text style={styles.home__bottomSheet__card__availableText}>
                            {translateAvailability(item.availability)}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.home__bottomSheet__card__busyView}>
                        <Text style={styles.home__bottomSheet__card__busyText}>
                            {translateAvailability(item.availability)}
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    </View>
);

const Cards = () => {
    const flatListRef = useRef(null);
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (key) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [key]: !prevFavorites[key],
        }));
    };

    return (
        <View>
            <View style={styles.home__bottomSheet__card__subtitleContainer}>
                <Text style={styles.home__bottomSheet__card__subtitle}>Destacados</Text>
                <Text style={styles.home__bottomSheet__card__more}>Ver todos</Text>
            </View>
            <FlatList
                data={workers}
                horizontal
                ref={flatListRef}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.home__bottomSheet__card__container}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <CardButton
                        item={item}
                        isFavorite={!!favorites[item.key]}
                        onToggleFavorite={() => toggleFavorite(item.key)}
                    />
                )}
            />
        </View>)
}

export default Cards