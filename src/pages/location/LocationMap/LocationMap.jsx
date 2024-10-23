import { View, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  userLocation,
  fetchAddressFromCoords,
} from "../../../actions/api/userLocation";
import Feather from "@expo/vector-icons/Feather";
import Footer from "./features/footer/Footer";
import Map from "./features/map/Map";

const LocationMap = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const { getLocation, selectedLocation } = route.params;
  const mapRef = useRef(null);

  const buenosAiresRegion = {
    latitude: -34.603684,
    longitude: -58.381559,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  };

  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      try {
        setLoading(true);

        if (selectedLocation) {
          const userRegion = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          };
          setLocation(userRegion);
          setAddress(selectedLocation.address);

          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current.animateToRegion(userRegion, 1000);
            }, 500);
          }
        } else if (getLocation) {
          const location = await userLocation();
          const { latitude, longitude } = location.coords;
          const userRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          };
          const fetchedAddress = await fetchAddressFromCoords(
            latitude,
            longitude
          );
          setLocation(userRegion);
          setAddress(fetchedAddress);

          if (mapRef.current) {
            mapRef.current.animateToRegion(userRegion, 1000);
          }
        } else {
          const fetchedAddress = await fetchAddressFromCoords(
            buenosAiresRegion.latitude,
            buenosAiresRegion.longitude
          );
          setAddress(fetchedAddress);
          setLocation(buenosAiresRegion);
        }
      } catch (error) {
        navigation.navigate("LocationSelect", {
          errorMsg: "Algo salió mal, vuelve a intentarlo",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndAddress();
  }, [getLocation, selectedLocation]);

  const onRegionChangeComplete = async (location) => {
    setLocation(location);
    const fetchedAddress = await fetchAddressFromCoords(
      location.latitude,
      location.longitude
    );
    setAddress(fetchedAddress);
  };

  return (
    <View style={styles.locationMap__mainContainer}>
      <GestureHandlerRootView>
        <View
          style={{
            ...styles.locationMap__headerContainer,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <Pressable
            style={styles.locationMap__backButton}
            onPress={navigation.goBack}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
        </View>
        <Map
          ref={mapRef}
          getLocation={getLocation}
          onRegionChangeComplete={onRegionChangeComplete}
          address={address}
        />
        <Footer
          address={address}
          loading={loading}
          location={location}
          navigation={navigation}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default LocationMap;
