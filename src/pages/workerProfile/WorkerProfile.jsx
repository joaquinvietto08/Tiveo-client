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
  const { worker, bottom = "default", values } = route.params;
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
            {Array.from({ length: 5 }).map((_, i) => {
              const idx = i + 1;
              const filledStars = Math.floor(worker.starRating);
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
            <Text style={styles.workerProfile__ratingText}>
              {worker.starRating}
            </Text>
            <Text style={styles.workerProfile__ratingText}>
              ({worker.amountRating})
            </Text>
          </View>
          <View style={styles.workerProfile__body}>
            <Text style={styles.workerProfile__description}>
              {worker.description}
            </Text>
            {worker.services.some((s) => s.isLicensed) && (
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
            values={values}
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
