import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-get-random-values';
import { StatusBar } from "expo-status-bar";
import Root from "./src/routes/Root";
import { UserProvider } from "./src/context/UserContext";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <LocationProvider>
          <StatusBar style="dark" />
          <Root />
        </LocationProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
