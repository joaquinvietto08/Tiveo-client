import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../../components/map/Map";
import {
  userLocation,
  fetchAddressFromCoords,
} from "../../../actions/api/userLocation";
import { useRoute, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Marker from "../../../../assets/svgs/map/marker";

const LocationMap = () => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { getLocation } = route.params;

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
      } else {
        const fetchedAddress = await fetchAddressFromCoords(
          buenosAiresRegion.latitude,
          buenosAiresRegion.longitude
        );
        setAddress(fetchedAddress);
        setLoading(false);
      }
    };

    fetchLocationAndAddress();
  }, [getLocation]);

  const onRegionChangeComplete = async ({ latitude, longitude }) => {
    const fetchedAddress = await fetchAddressFromCoords(latitude, longitude);
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
            <Pressable>
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
