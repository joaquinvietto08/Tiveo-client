import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBar from "../components/tabBar/TabBar";
import Home from "../pages/home/Home";
import Services from "../pages/services/Services";
import Activity from "../pages/activity/Activity";
import Profile from "../pages/profile/Profile";
import ActivityDetail from "../pages/activity/ActivityDetail";
import { NearbyWorkersProvider } from "../context/NearbyWorkersContext";
import WorkerProfile from "../pages/workerProfile/WorkerProfile";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeIndex" component={Home} />
      <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
    </Stack.Navigator>
  );
};

const ServicesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServicesIndex" component={Services} />
    </Stack.Navigator>
  );
};

const ActivityStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActivityIndex" component={Activity} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileIndex" component={Profile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainRoutes = () => {
  return (
    <NearbyWorkersProvider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Servicios" component={ServicesStack} />
        <Tab.Screen name="Actividad" component={ActivityStack} />
        <Tab.Screen name="Mi perfil" component={ProfileStack} />
      </Tab.Navigator>
    </NearbyWorkersProvider>
  );
};

export default MainRoutes;
