import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Services from "./services/Services";
import Home from "./home/Home";
import Activity from "./activity/Activity";
import Profile from "./profile/Profile";
import TabBar from "../components/TabBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActivityDetail from "./activity/ActivityDetail";

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
  return (
    <SafeAreaProvider>
      <NavigationContainer style={{}}>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;

/*
const Main = () => {
  return (
    <View style={{ flexGrow: 1 }}>
      <StatusBar style="dark" />
      <Home />
    </View>
  );
};

export default Main;
*/
