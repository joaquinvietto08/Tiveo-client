import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./CardsStyles";
import { FlatList } from "react-native-gesture-handler";
import {
  translateAvailability,
  translateService,
} from "../../../../../utils/formatHelpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../../../styles/globalStyles";
import { getIcon } from "../../../../../utils/getIcons";
import { useNavigation } from "@react-navigation/native";

const CardButton = ({ worker }) => {
  const navigation = useNavigation();
  const services = worker?.services || [];
  const displayName =
    worker?.workerName || worker?.name || worker?.firstName || "Trabajador";
  const photoUri = worker?.photo || worker?.photoURL;

  return (
    <View style={styles.home__bottomSheet__card__cardContainer}>
      <Pressable
        android_ripple={{ color: "#E2E2E2" }}
        style={styles.home__bottomSheet__card__button}
        onPress={() => navigation.navigate("WorkerProfile", { worker })}
      >
        <View style={styles.home__bottomSheet__card__content}>
          <View style={styles.home__bottomSheet__card__profile}>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={styles.home__bottomSheet__card__avatar}
              />
            ) : null}
            <View style={styles.home__bottomSheet__card__profileInfo}>
              <Text style={styles.home__bottomSheet__card__infoTitle}>
                {displayName}
              </Text>
              <View style={styles.home__bottomSheet__card__infoContainer}>
                <AntDesign name="star" size={12} color={colors.yellow} />
                <Text style={styles.home__bottomSheet__card__infoRating}>
                  {worker.starRating}{" "}
                </Text>
                <Text style={styles.home__bottomSheet__card__infotTotalRatings}>
                  ({worker.completedJobs})
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.home__bottomSheet__card__description} numberOfLines={2}>
            {worker?.description}
          </Text>

          {services.length > 0 && (
            <View style={styles.home__bottomSheet__card__chipsWrapper}>
              {services.map((service) => {
                const IconComponent = getIcon(service);
                const label = translateService(service);

                return (
                  <View
                    key={service}
                    style={styles.home__bottomSheet__card__chip}
                  >
                    {IconComponent ? (
                      <IconComponent width={16} height={16} />
                    ) : null}
                    <Text style={styles.home__bottomSheet__card__chipText}>
                      {label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.home__bottomSheet__card__statusContainer}>
          {worker.status === "available" ? (
            <View style={styles.home__bottomSheet__card__availableView}>
              <Text style={styles.home__bottomSheet__card__availableText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          ) : (
            <View style={styles.home__bottomSheet__card__busyView}>
              <Text style={styles.home__bottomSheet__card__busyText}>
                {translateAvailability(worker.status)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const Cards = ({ workers }) => {
  return (
    <View>
      <View style={styles.home__bottomSheet__card__subtitleContainer}>
        <Text style={styles.home__bottomSheet__card__subtitle}>Destacados</Text>
      </View>

      <FlatList
        data={workers}
        horizontal
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.home__bottomSheet__card__container}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CardButton worker={item} />}
      />
    </View>
  );
};

export default Cards;
