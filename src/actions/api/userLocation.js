import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export const userLocation = async () => {
  try {
    // Intentar obtener la ubicación con precisión alta, máximo 10 segundos de caché, y con un timeout de 5 segundos
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000, // Usar caché de hasta 10 segundos
      timeout: 5000, // Tiempo máximo de espera de 5 segundos
    });

    // Si obtenemos la ubicación, la devolvemos
    return location;
  } catch (error) {
    console.log("Error al obtener la ubicación:", error.message);
    throw error;
  }
};

export const fetchAddressFromCoords = async (latitude, longitude) => {
  try {
    Geocoder.init("AIzaSyByH7AinqSs06Rbter1gh1_Zmyp4S1wVLc", {
      language: "es",
    });
    const json = await Geocoder.from(latitude, longitude);
    const addressComponents = json.results[0].address_components;

    const streetNumber =
      addressComponents.find((component) =>
        component.types.includes("street_number")
      )?.long_name || "";

    const streetName =
      addressComponents.find((component) => component.types.includes("route"))
        ?.long_name || "";
    if (streetName === "" && streetNumber === "") {
      return `Calle sin especificar`;
    } else {
      return `${streetName} ${streetNumber}`;
    }
  } catch (error) {
    console.warn("Error fetching address: ", error);
    return "";
  }
};
