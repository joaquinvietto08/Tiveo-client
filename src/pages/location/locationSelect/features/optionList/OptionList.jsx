import React, {useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./OptionListStyles";
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
        <Pressable style={styles.locationSelect__optionList__defaultContainer} onPress={handlePress}>
            <View style={styles.locationSelect__optionList__iconContainer}>
                <FontAwesome6 name={iconName} size={18} color="#FF9D00" />
            </View>
            <View style={styles.locationSelect__optionList__subContainer}>
                <Text style={styles.locationSelect__optionList__optionName}>{item.name}</Text>
            </View>
        </Pressable>
    );
};

const LocationItem = ({ item, navigation }) => {
    return (
        <Pressable style={styles.locationSelect__optionList__addressContainer}>
            <View style={styles.locationSelect__optionList__iconContainer}>
                <FontAwesome6 name="location-dot" size={18} color="black" />
            </View>
            <View style={styles.locationSelect__optionList__subContainer}>
                <Text style={styles.locationSelect__optionList__addressName}>{item.name}</Text>
                {item.details && (
                    <Text style={styles.locationSelect__optionList__addressDetails}>{item.details}</Text>
                )}
            </View>
        </Pressable>
    );
};

const OptionList = ({navigation}) => {
    /*const [error, setError] = useState(null);*/

    const renderItem = ({ item }) => {
        if (item.key === "1" || item.key === "2") {
            return (
                <DefaultItem item={item} navigation={navigation} /*setError={setError}*/ />
            );
        } else {
            return <LocationItem item={item} />;
        }
    };

    return (
        <View style={styles.locationSelect__optionList__container}>
                <FlatList
                    data={[...defaultOptions, ...exampleLocations]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                />
        </View>
    )
}

export default OptionList;