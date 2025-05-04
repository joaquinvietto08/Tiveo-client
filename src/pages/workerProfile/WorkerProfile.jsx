import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./WorkerProfileStyles";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/globalStyles";
import Licensed from "../../../assets/svgs/worker/licensed";
import Warranty from "../../../assets/svgs/worker/warranty";
import { getMonthsOfExperience } from "../../utils/formatHelpers";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

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
                <Licensed width={18} height={18} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.workerProfile__divider} />
        <View style={styles.workerProfile__experienceSection}>
          <View style={styles.workerProfile__row}>
            <View style={styles.workerProfile__leftFixed}>
              <Text style={styles.workerProfile__number}>
                {getMonthsOfExperience(worker.joinedAt)}
              </Text>
            </View>
            <Text style={styles.workerProfile__label}>
              Meses de experiencia en Tiveo.
            </Text>
          </View>

          <View style={styles.workerProfile__row}>
            <View style={styles.workerProfile__leftFixed}>
              <Text style={styles.workerProfile__number}>
                {worker.completedJobs}
              </Text>
            </View>
            <Text style={[styles.workerProfile__label]}>
              Trabajos realizados
            </Text>
          </View>

          <View style={styles.workerProfile__guaranteeWrapper}>
            <View style={styles.workerProfile__guaranteeRow}>
              <View style={styles.workerProfile__leftFixed}>
                <Warranty width={30} height={30} fill={colors.primary} />
              </View>
              <View style={styles.workerProfile__guaranteeTitleContainer}>
                <Text style={styles.workerProfile__guaranteeTitle}>
                  Trabajo protegido con garantía
                </Text>
                <Text style={styles.workerProfile__guaranteeDescription}>
                  Pagando el trabajo por la app contás con la {"\n"}
                  protección de la garantía.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.workerProfile__divider} />

        <View style={styles.workerProfile__Bottom}>
          <Text style={styles.workerProfile__sectionTitle}>
            Servicios que ofrece
          </Text>
          <View style={styles.workerProfile__tagsWrapper}>
            {["Jardinería", "Gas", "Plomería", "Carpintería"].map(
              (service, index) => (
                <View key={index} style={styles.workerProfile__tag}>
                  {/* Podés reemplazar esta Image por un SVG si tenés */}

                  <Text style={styles.workerProfile__tagText}>{service}</Text>
                </View>
              )
            )}
          </View>

          <View style={styles.workerProfile__availabilityRow}>
            <Text style={styles.workerProfile__availabilityLabel}>
              Disponibilidad:
            </Text>
            <View style={styles.workerProfile__availabilityNow}>
              <Text style={styles.workerProfile__availabilityText}>
                Ahora mismo
              </Text>
            </View>
          </View>

          <View style={styles.workerProfile__buttonWrapper}>
            <Text style={styles.workerProfile__buttonText}>
              Solicitar ahora
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkerProfile;
