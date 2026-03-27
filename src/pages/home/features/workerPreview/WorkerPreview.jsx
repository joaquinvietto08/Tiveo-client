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
  "Trabajador";

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
            <View style={styles.home__workerPreview__nameContainer}>
              <Text style={styles.home__workerPreview__name}>
                {worker.firstName} {worker.lastName}
              </Text>
              <Text style={styles.home__workerPreview__workerName}>
                {worker.workerName}
              </Text>
            </View>

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
