import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { styles } from "./WorkerPreviewStyles";
import { AntDesign } from "@expo/vector-icons";
import { translateAvailability } from "../../../../utils/formatHelpers";
import { useNavigation } from "@react-navigation/native";

const WorkerPreview = ({ worker, onClose }) => {
  const navigation = useNavigation();

  if (!worker) return null;

  return (
    <View style={styles.home__workerPreview__mainContainer}>
      <Pressable
        style={styles.home__workerPreview__contentContainer}
        onPress={() => navigation.navigate("WorkerProfile", { worker })}
        android_ripple={{ color: "#E2E2E2", borderless: false }}
      >
        <Image
          source={worker.photoURL}
          style={styles.home__workerPreview__image}
        />

        <View style={styles.home__workerPreview__info}>
          <View style={styles.home__workerPreview__header}>
            <Text style={styles.home__workerPreview__name}>
              {worker.firstName} {worker.lastName}
            </Text>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={20} color="gray" />
            </Pressable>
          </View>

          <View style={styles.home__workerPreview__ratingContainer}>
            <AntDesign name="star" size={14} color="black" />
            <Text style={styles.home__workerPreview__ratingText}>
              {worker.starRating} ({worker.completedJobs})
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
