import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export const userLocation = async () => {
  const maxRetries = 3;
  const retryDelay = 2000;

  const getLocationWithRetry = async (attempt = 1) => {
    try {
      console.log(`Intentando obtener la ubicación, intento ${attempt}`);

      // Intentar obtener la ubicación
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Si obtenemos la ubicación, la devolvemos
      return location;
    } catch (error) {
      console.log(`Error en el intento ${attempt}:`, error);

      // Si fallamos y todavía tenemos intentos restantes, esperamos y reintentamos
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return getLocationWithRetry(attempt + 1);
      } else {
        // Si alcanzamos el número máximo de intentos, lanzamos el error
        throw new Error(
          "No se pudo obtener la ubicación después de varios intentos."
        );
      }
    }
  };

  try {
    // Solicitamos los permisos de ubicación
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permiso para acceder a la ubicación denegado.");
    }

    // Intentamos obtener la ubicación con reintentos
    let location = await getLocationWithRetry();
    return location;
  } catch (error) {
    console.log("Error al obtener la ubicación después de reintentos:", error);
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

    return `${streetName} ${streetNumber}`;
  } catch (error) {
    console.warn("Error fetching address: ", error);
    return "";
  }
};
