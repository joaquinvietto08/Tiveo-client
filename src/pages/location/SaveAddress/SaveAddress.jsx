import { View, Text } from "react-native";
import React from "react";

const SaveAddress = ({ route }) => {
  const { location } = route.params;
  return (
    <View>
      <Text>Latitud: {location.latitude}</Text>
      <Text>Longitud: {location.longitude}</Text>
    </View>
  );
};

export default SaveAddress;
