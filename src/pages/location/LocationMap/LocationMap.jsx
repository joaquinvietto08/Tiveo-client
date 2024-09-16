import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../../components/map/Map";
import { Marker } from "react-native-maps";
import { userLocation } from "../../../actions/api/userLocation";
import { useRoute, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Geocoder from "react-native-geocoding";

const LocationMap = () => {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { getLocation } = route.params;

  useEffect(() => {
    Geocoder.init("AIzaSyByH7AinqSs06Rbter1gh1_Zmyp4S1wVLc", {
      language: "es",
    });
  }, []);

  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      if (getLocation) {
        try {
          setLoading(true);
          const location = await userLocation();
          if (location) {
            const { latitude, longitude } = location.coords;
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });

            Geocoder.from(latitude, longitude)
              .then((json) => {
                const fullAddress = json.results[0].formatted_address;
                const addressParts = fullAddress.split(",");
                const filteredAddress = `${addressParts[0]}`;
                setAddress(filteredAddress);
              })
              .catch((error) => console.warn(error));
          }
        } catch (error) {
          navigation.navigate("Location", {
            errorMsg: "Algo salió mal, vuelve a intentarlo",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLocationAndAddress();
  }, [getLocation]);

  const onRegionChangeComplete = (region) => {
    setMapRegion(region);
    Geocoder.from(region.latitude, region.longitude)
      .then((json) => {
        const fullAddress = json.results[0].formatted_address;
        const addressParts = fullAddress.split(",");
        const filteredAddress = `${addressParts[0]}`;
        setAddress(filteredAddress);
      })
      .catch((error) => console.warn(error));
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
        region={location}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {location ? (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        ) : null}
      </Map>
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
          <Pressable>
            {loading ? (
              <ActivityIndicator size="small" color="#000" /> // Loader mientras carga
            ) : (
              <Text
                style={{
                  fontFamily: "Inter-SemiBold",
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >
                Confirmar
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LocationMap;
