import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../../components/map/Map";
import {
  userLocation,
  fetchAddressFromCoords,
} from "../../../actions/api/userLocation";
import Feather from "@expo/vector-icons/Feather";
import Marker from "../../../components/map/locationMarker";

const LocationMap = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const { getLocation, location: selectedLocation } = route.params;
  const mapRef = useRef(null);

  const buenosAiresRegion = {
    latitude: -34.603684,
    longitude: -58.381559,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  };

  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      if (getLocation) {
        try {
          setLoading(true);
          const location = await userLocation();
          setLocation(location.coords);
          if (location) {
            const { latitude, longitude } = location.coords;
            const userRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            };

            if (mapRef.current) {
              mapRef.current.animateToRegion(userRegion, 1000);
            }

            const fetchedAddress = await fetchAddressFromCoords(
              latitude,
              longitude
            );
            setAddress(fetchedAddress);
          }
        } catch (error) {
          navigation.navigate("Location", {
            errorMsg: "Algo salió mal, vuelve a intentarlo",
          });
        } finally {
          setLoading(false);
        }
      } else if (selectedLocation) {
        setLocation({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        });
        setAddress(selectedLocation.address);
        setLoading(false);
      } else {
        const fetchedAddress = await fetchAddressFromCoords(
          buenosAiresRegion.latitude,
          buenosAiresRegion.longitude
        );
        setAddress(fetchedAddress);
        setLocation(buenosAiresRegion);
        setLoading(false);
      }
    };

    fetchLocationAndAddress();
  }, [getLocation]);

  const onRegionChangeComplete = async (location) => {
    setLocation(location);
    const fetchedAddress = await fetchAddressFromCoords(
      location.latitude,
      location.longitude
    );
    setAddress(fetchedAddress);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          ...styles.headerContainer,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Pressable style={styles.backButton} onPress={navigation.goBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
      </View>
      <Map
        ref={mapRef}
        initialRegion={buenosAiresRegion}
        showsUserLocation={!!getLocation}
        showsMyLocationButton={false}
        onRegionChangeComplete={onRegionChangeComplete}
      ></Map>
      {address ? (
        <View style={styles.markerFixed}>
          <Marker />
        </View>
      ) : null}
      <View style={styles.bottomContainer}>
        <Text
          style={{ fontFamily: "Inter-Bold", fontSize: 20, paddingLeft: 20 }}
        >
          Confirmar mi ubicacion
        </Text>
        <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {address || "Obteniendo dirección..."}
            </Text>
          </View>
          {loading || address === " " ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Pressable
              onPress={() => navigation.navigate("SaveAddress", { location })}
            >
              <Text
                style={{
                  fontFamily: "Inter-SemiBold",
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >
                Confirmar
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default LocationMap;
