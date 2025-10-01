// RatingBottomSheet.jsx
import React, { forwardRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BottomSheet from "../../../../../../../components/bottomSheet/BottomSheet";
import { styles } from "./RatingBottomSheetStyles";
import { colors } from "../../../../../../../styles/globalStyles";

const RatingBottomSheet = forwardRef(
  ({ snapPoints, isOpen, onClose, onConfirm }, ref) => {
    const [selected, setSelected] = useState(0);
    const stars = [1, 2, 3, 4, 5];

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        onClose={onClose}
        overlay
        isOpen={isOpen}
        handleStyle={{ display: "none" }}
      >
        <View style={styles.rating__ratingBottomSheet__container}>
          <Text style={styles.rating__ratingBottomSheet__title}>
            Califica el trabajo
          </Text>

          <View style={styles.rating__ratingBottomSheet__stars}>
            {stars.map((star) => (
              <TouchableOpacity key={star} onPress={() => setSelected(star)}>
                <FontAwesome
                  name="star"
                  size={32}
                  color={star <= selected ? colors.yellow : colors.gray}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rating__ratingBottomSheet__buttons}>
            <TouchableOpacity
              style={[
                styles.rating__ratingBottomSheet__button,
                selected === 0
                  ? styles.rating__ratingBottomSheet__disabled
                  : styles.rating__ratingBottomSheet__confirm,
              ]}
              onPress={() => {
                if (selected > 0) {
                  onConfirm?.(selected);
                  ref?.current?.close?.();
                  onClose?.();
                }
              }}
              activeOpacity={selected === 0 ? 1 : 0.7}
            >
              <Text style={styles.rating__ratingBottomSheet__buttonText}>
                Confirmar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rating__ratingBottomSheet__button,
                styles.rating__ratingBottomSheet__cancel,
              ]}
              onPress={() => {
                ref?.current?.close?.();
                onClose?.();
              }}
            >
              <Text style={styles.rating__ratingBottomSheet__buttonCancelText}>
                En otro momento
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

export default RatingBottomSheet;
