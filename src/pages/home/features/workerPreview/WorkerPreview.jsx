import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { styles } from "./WorkerPreviewStyles";
import { AntDesign } from "@expo/vector-icons";
import { translateAvailability } from "../../../../utils/formatHelpers";
import { useNavigation } from "@react-navigation/native";

const WorkerPreview = ({ worker, onClose }) => {
  const navigation = useNavigation();

  if (!worker) return null;

  const imageSource =
    typeof worker.photoURL === "string"
      ? { uri: worker.photoURL }
      : worker.photoURL || null;
  const displayName =
    worker.workerName ||
    worker.name ||
    worker.firstName ||
    "Trabajador";
  const workerInitial = displayName?.[0]?.toUpperCase() || "?";

  return (
    <View style={styles.home__workerPreview__mainContainer}>
      <Pressable
        style={styles.home__workerPreview__contentContainer}
        onPress={() => navigation.navigate("WorkerProfile", { worker })}
        android_ripple={{ color: "#E2E2E2", borderless: false }}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.home__workerPreview__image}
          />
        ) : (
          <View
            style={[
              styles.home__workerPreview__image,
              styles.home__workerPreview__placeholder,
            ]}
          >
            <Text style={styles.home__workerPreview__placeholderText}>
              {workerInitial}
            </Text>
          </View>
        )}

        <View style={styles.home__workerPreview__info}>
          <View style={styles.home__workerPreview__header}>
            <Text style={styles.home__workerPreview__name}>
              {displayName}
            </Text>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={20} color="gray" />
            </Pressable>
          </View>

          <View style={styles.home__workerPreview__ratingContainer}>
            <AntDesign name="star" size={14} color="black" />
            <Text style={styles.home__workerPreview__ratingText}>
              {worker.starRating} ({worker.amountRating})
            </Text>
          </View>

          <Text
            style={styles.home__workerPreview__description}
            numberOfLines={2}
          >
            {worker.description}
          </Text>

          {worker.status === "available" ? (
            <View style={styles.home__workerPreview__availableContainer}>
              <Text style={styles.home__workerPreview__availableText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          ) : (
            <View style={styles.home__workerPreview__busyContainer}>
              <Text style={styles.home__workerPreview__busyText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default WorkerPreview;
