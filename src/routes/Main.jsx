import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react"; // No useContext
import Services from "../pages/services/Services";
import Home from "../pages/home/Home";
import Activity from "../pages/activity/Activity";
import Profile from "../pages/profile/Profile";
import TabBar from "../components/tabBar/TabBar";
import ActivityDetail from "../pages/activity/ActivityDetail";
import Welcome from "../pages/auth/Welcome";
import Login from "../pages/auth/Login";
import auth from "@react-native-firebase/auth";
import Location from "../pages/location/Location/Location";
import LocationMap from "../pages/location/LocationMap/LocationMap";
import SaveAddress from "../pages/location/SaveAddress/SaveAddress";
import { LocationProvider } from "../context/locationContext"; // Solo importamos LocationProvider

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          title: "Servicios",
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          title: "Actividad",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Mi perfil",
        }}
      />
    </Tab.Navigator>
  );
}

const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); // Estado del usuario autenticado

  // Verifica el estado de autenticación
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaProvider>
      <LocationProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="LocationMap" component={LocationMap} />
                <Stack.Screen name="SaveAddress" component={SaveAddress} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
                <Stack.Screen
                  name="ActivityDetail"
                  component={ActivityDetail}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </LocationProvider>
    </SafeAreaProvider>
  );
};

export default Main;
