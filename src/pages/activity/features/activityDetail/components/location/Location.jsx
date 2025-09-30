import React from "react";
import { View, Text } from "react-native";
import { styles } from "./LocationStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "../../../../../../styles/globalStyles";

const Location = ({ address }) => {
  return (
    <View style={styles.activityDetails__location__mainContainer}>
      <FontAwesome6 name={"location-dot"} size={18} color={colors.black} />
      <Text style={styles.activityDetails__location__label}>{address}</Text>
    </View>
  );
};

export default Location;
