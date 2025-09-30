import React from "react";
import { View, Text } from "react-native";
import { styles } from "./DescriptionStyles";

const Description = ({ description }) => {
  const hasDescription = description && description.trim() !== "";

  return (
    <View style={styles.activityDetails__description__mainContainer}>
      <Text style={styles.activityDetails__description__title}>
        Descripción
      </Text>

      <Text
        style={
          hasDescription
            ? styles.activityDetails__description__text
            : styles.activityDetails__description__placeholder
        }
      >
        {hasDescription
          ? description
          : "No se ingresó una descripción."}
      </Text>
    </View>
  );
};

export default Description;
