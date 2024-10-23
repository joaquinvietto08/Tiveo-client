import React, {useContext} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./LocationStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import {LocationContext} from "../../../../../context/locationContext";

const Location = () => {
    const { locationData } = useContext(LocationContext);

    return (
        <View style={styles.home__bottomSheet__location__container}>
            <View style={styles.home__bottomSheet__location__buttonContainer}>
                <Pressable style={styles.home__bottomSheet__location__button}>
                    <Text
                        style={styles.home__bottomSheet__location__text}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {locationData.address}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={29} color="#000" />
                </Pressable>
            </View>
        </View>
    )
}

export default Location