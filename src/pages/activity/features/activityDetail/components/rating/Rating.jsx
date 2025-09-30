import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./RatingStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../../../../../styles/globalStyles";

const Rating = ({ rating, status, onRate }) => {
  const isDone = status === "done";
  const hasRating = rating !== undefined && rating !== null;

  const getText = () => {
    if (!isDone) {
      return "Aún no es posible calificar el trabajo";
    }
    if (isDone && !hasRating) {
      return "Califica el trabajo realizado";
    }
    return `Calificado con ${rating}`;
  };

  return (
    <View style={styles.activityDetails__rating__mainContainer}>
      {isDone && !hasRating ? (
        <Pressable
          style={styles.activityDetails__rating__button}
          onPress={onRate}
        >
          <FontAwesome name="star" size={20} color={colors.black} />
          <Text style={styles.activityDetails__rating__text}>{getText()}</Text>
        </Pressable>
      ) : (
        // Estado fijo
        <>
          <FontAwesome
            name="star"
            size={20}
            color={hasRating ? colors.yellow : colors.black}
          />
          <Text style={styles.activityDetails__rating__text}>{getText()}</Text>
        </>
      )}
    </View>
  );
};

export default Rating;
