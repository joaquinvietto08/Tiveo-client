import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../../components/map/Map"; // Tu componente personalizado de Map
import { Marker } from "react-native-maps"; // El marcador que usaremos para mostrar la ubicación
import { userLocation } from "../../../actions/api/userLocation"; // Función para obtener la ubicación
import { useRoute, useNavigation } from "@react-navigation/native";

const LocationMap = () => {
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState(null); // Estado para la ubicación del usuario
  const route = useRoute();
  const navigation = useNavigation();
  const { getLocation } = route.params;

  useEffect(() => {
    const fetchLocation = async () => {
      if (getLocation) {
        try {
          const location = await userLocation(); // Llama a la función que obtiene la ubicación
          if (location) {
            // Establece la ubicación con los valores de latitud y longitud
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01, // Para el zoom inicial
              longitudeDelta: 0.01,
            });
          }
        } catch (error) {
          // Si hay un error, regresa a la pantalla anterior con un mensaje de error
          navigation.navigate("Location", {
            errorMsg: "Algo salió mal, vuelve a intentarlo",
          });
        }
      }
    };

    fetchLocation();
  }, [getLocation]);

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Map region={location}>
        {location ? (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
          />
        ) : null}
      </Map>
    </View>
  );
};

export default LocationMap;
