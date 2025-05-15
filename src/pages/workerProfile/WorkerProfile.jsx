import { View, ScrollView, Text, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./WorkerProfileStyles";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../styles/globalStyles";
import Licensed from "../../../assets/svgs/worker/licensed";
import Warranty from "../../../assets/svgs/worker/warranty";
import { getTimeExperience } from "../../utils/formatHelpers";
import Default from "./features/default/Default";

const WorkerProfile = ({ navigation, bottom = "default" }) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { worker } = route.params;

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
      <ScrollView
        contentContainerStyle={styles.workerProfile__scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Pressable
            style={styles.workerProfile__backContainer}
            onPress={navigation.goBack}
          >
            <Feather name="arrow-left" size={20} color="black" />
          </Pressable>
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
            <AntDesign name="star" size={16} color={colors.black} />
            <Text style={styles.workerProfile__ratingText}>
              {worker.starRating}
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
                {getTimeExperience(worker.joinedAt, "number")}
              </Text>
            </View>
            <Text style={styles.workerProfile__label}>
              {getTimeExperience(worker.joinedAt, "label")}
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
        {bottom === "default" && <Default worker={worker} />}
      </ScrollView>
    </View>
  );
};

export default WorkerProfile;
