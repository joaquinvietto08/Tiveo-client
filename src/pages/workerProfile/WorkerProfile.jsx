import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./WorkerProfileStyles";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/globalStyles";
import Licensed from "../../../assets/svgs/licensed";

const WorkerProfile = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { worker } = route.params;
  console.log(worker);

  return (
    <View
      style={{
        ...styles.workerProfile__mainContainer,
        paddingBottom: insets.bottom,
      }}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.80)", "transparent"]}
        style={styles.workerProfile__topGradient}
      />
      <StatusBar translucent barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={worker.bannerImage}
            style={styles.workerProfile__banner}
            resizeMode="cover"
          />
          <View style={styles.workerProfile__avatarContainer}>
            <Image
              source={worker.photoURL}
              style={styles.workerProfile__avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.workerProfile__name}>
            {worker.firstName} {worker.lastName}
          </Text>

          <View style={styles.workerProfile__ratingContainer}>
            {Array.from({ length: 5 }, (_, i) => (
              <AntDesign
                key={i}
                name="star"
                size={16}
                color={
                  i < Math.round(worker.starRating)
                    ? colors.yellow
                    : colors.gray
                }
                style={{ marginRight: 2 }}
              />
            ))}
            <Text style={styles.workerProfile__ratingText}>
              {worker.starRating} ({worker.completedJobs})
            </Text>
          </View>
          <View style={styles.workerProfile__body}>
            <Text style={styles.workerProfile__description}>
              {worker.description}
            </Text>
            {worker.services.some((s) => s.isLicensed) && (
              <View style={styles.workerProfile__licensedContainer}>
                <Text style={styles.workerProfile__licensedText}>
                  Matriculado
                </Text>
                <Licensed width={20} height={20} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkerProfile;
