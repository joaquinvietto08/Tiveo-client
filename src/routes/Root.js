import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./MainRoutes";
import LocationRoutes from "./LocationRoutes";
import AuthRoutes from "./AuthRoutes";
import { UserContext } from "../context/UserContext";
import { LocationContext } from "../context/LocationContext";
import WorkerProfile from "../pages/workerProfile/WorkerProfile";
import WorkerRequest from "../pages/workerRequest/WorkerRequest";

const Stack = createNativeStackNavigator();

const Root = () => {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          location ? (
            <>
              <Stack.Screen name="Main" component={MainRoutes} />
              <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
              <Stack.Screen name="WorkerRequest" component={WorkerRequest} />
            </>
          ) : (
            <Stack.Screen name="Location" component={LocationRoutes} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
