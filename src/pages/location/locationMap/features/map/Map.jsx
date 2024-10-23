import React, { forwardRef } from "react";
import MapComponent from "../../../../../components/map/map/Map";
import {View} from "react-native";
import Pin from "../../../../../components/map/markers/pin/Pin"

const Map = forwardRef(({ getLocation, onRegionChangeComplete, address}, ref ) => {
    const buenosAiresRegion = {
        latitude: -34.603684,
        longitude: -58.381559,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
    };

    return (
        <View>
            <MapComponent
                ref={ref}
                initialRegion={buenosAiresRegion}
                showsUserLocation={!!getLocation}
                showsMyLocationButton={false}
                onRegionChangeComplete={onRegionChangeComplete}
            />
            {address ? (
                <Pin />
            ) : null}
        </View>
    );
});

export default Map;
