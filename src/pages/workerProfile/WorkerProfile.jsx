import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  BackHandler,
} from "react-native";
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
import Advance from "./features/advance/Advance";
import Confirm from "../../components/confirm/Confirm";
import { useEffect, useRef, useState } from "react";

const WorkerProfile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {
    worker,
    bottom = "default",
    values,
    requestId,
    postulation,
  } = route.params;
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const [blockBack, setBlockBack] = useState(false);
  useEffect(() => {
    if (blockBack) {
      const backHandlerSub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      const removeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });

      return () => {
        backHandlerSub.remove();
        removeBeforeRemove();
      };
    }
  }, [blockBack, navigation]);

  const [success, setSuccess] = useState(false);

  const bannerSource = worker?.bannerImage
    ? worker.bannerImage
    : null;
  const avatarSource =
    typeof worker?.photoURL === "string"
      ? { uri: worker.photoURL }
      : worker?.photoURL || null;

  const displayName =
    worker?.workerName ||
    worker?.name ||
    worker?.firstName ||
    "Trabajador";
  const workerInitial = displayName?.[0]?.toUpperCase() || "?";

  const hasLicensed = worker?.services?.some?.(
    (service) => typeof service === "object" && service.isLicensed
  );

  const joinedAtDate = (() => {
    if (worker?.joinedAt?.toDate) return worker.joinedAt.toDate();
    if (worker?.joinedAt?.seconds) {
      return new Date(worker.joinedAt.seconds * 1000);
    }
    if (typeof worker?.joinedAt === "string") return new Date(worker.joinedAt);
    if (worker?.joinedAt instanceof Date) return worker.joinedAt;
    return null;
  })();

  const experienceNumber = joinedAtDate
    ? getTimeExperience(joinedAtDate.toISOString(), "number")
    : 0;
  const experienceLabel = joinedAtDate
    ? getTimeExperience(joinedAtDate.toISOString(), "label")
    : "Experiencia en Tiveo";

  const starRating = Number(worker?.starRating) || 0;
  const amountRating = Number(worker?.amountRating) || 0;
  const completedJobs = Number(worker?.completedJobs) || 0;

  const handleSuccess = () => {
    setSuccess(true);
  };

  return (
    <View
      style={{
        ...styles.workerProfile__mainContainer,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        translucent
        barStyle={success ? "dark-content" : "light-content"}
      />
      <ScrollView
        ref={scrollRef}
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
          <LinearGradient
            colors={["rgba(0,0,0,0.80)", "transparent"]}
            style={styles.workerProfile__topGradient}
          />
          {bannerSource ? (
            <Image
              source={bannerSource}
              style={styles.workerProfile__banner}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.workerProfile__banner,
                { backgroundColor: colors.lightGray },
              ]}
            />
          )}
          <View style={styles.workerProfile__avatarContainer}>
            {avatarSource ? (
              <Image
                source={avatarSource}
                style={styles.workerProfile__avatar}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.workerProfile__avatar,
                  {
                    backgroundColor: colors.lightGray,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text
                  style={{ fontSize: 32, fontFamily: "Inter-Bold", color: colors.black }}
                >
                  {workerInitial}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.workerProfile__name}>{displayName}</Text>

          <View style={styles.workerProfile__ratingContainer}>
            {Array.from({ length: 5 }).map((_, i) => {
              const idx = i + 1;
              const filledStars = Math.floor(starRating);
              return (
                <AntDesign
                  key={idx}
                  name="star"
                  size={16}
                  color={idx <= filledStars ? colors.primary : colors.lightGray}
                  style={{ marginHorizontal: 2 }}
                />
              );
            })}
            <Text style={styles.workerProfile__ratingText}>{starRating}</Text>
            <Text style={styles.workerProfile__ratingText}>
              ({amountRating})
            </Text>
          </View>
          <View style={styles.workerProfile__body}>
            {worker?.description ? (
              <Text style={styles.workerProfile__description}>
                {worker.description}
              </Text>
            ) : null}
            {hasLicensed && (
              <View style={styles.workerProfile__licensedContainer}>
                <Licensed width={18} height={18} />
                <Text style={styles.workerProfile__licensedText}>
                  Matriculado
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.workerProfile__experienceSection}>
          <View style={styles.workerProfile__row}>
            <View style={styles.workerProfile__leftFixed}>
              <Text style={styles.workerProfile__number}>
                {experienceNumber}
              </Text>
            </View>
            <Text style={styles.workerProfile__label}>
              {experienceLabel}
            </Text>
          </View>

          <View style={styles.workerProfile__row}>
            <View style={styles.workerProfile__leftFixed}>
              <Text style={styles.workerProfile__number}>
                {completedJobs}
              </Text>
            </View>
            <Text style={[styles.workerProfile__label]}>
              Trabajos realizados
            </Text>
          </View>
        </View>
        <View style={styles.workerProfile__guaranteeWrapper}>
          <View style={styles.workerProfile__guaranteeRow}>
            <Warranty width={30} height={30} fill={colors.primary} />
            <View style={styles.workerProfile__guaranteeTitleContainer}>
              <Text style={styles.workerProfile__guaranteeTitle}>
                Trabajo protegido con garantía
              </Text>
              <Text style={styles.workerProfile__guaranteeDescription}>
                Pagando el trabajo por la app contás con la protección de la
                garantía.
              </Text>
            </View>
          </View>
        </View>
        {bottom === "default" && <Default worker={worker} />}
        {bottom === "advance" && (
          <Advance
            worker={worker}
            postulation={postulation}
            values={values}
            requestId={requestId}
            onRequestScrollToBottom={scrollToBottom}
            onSuccess={handleSuccess}
            setBlockBack={setBlockBack}
          />
        )}
      </ScrollView>
      {success && (
        <Confirm
          title="Trabajo confirmado"
          text={"Podés ver el estado de la solicitud en el inicio."}
        />
      )}
    </View>
  );
};

export default WorkerProfile;
