import React, {useContext, useRef} from 'react'
import {Pressable, View} from "react-native";
import MapComponent from "../../../../components/map/Map";
import {styles} from "./MapStyles";
import {LocationContext} from "../../../../context/locationContext";

const Map = ({ onPress }) => {
    const mapRef = useRef(null);
    const { locationData } = useContext(LocationContext);

    const userLocation = {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <Pressable onPress={onPress} style={{ flex: 1 }}>
            <MapComponent ref={mapRef} initialRegion={userLocation} />
            <View style={styles.home__map__marker}>
            </View>
        </Pressable>
    )
}

export default Map