import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./CardsStyles";
import { FlatList } from "react-native-gesture-handler";
import { translateAvailability } from "../../../../../utils/formatHelpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../../../styles/globalStyles";

const CardButton = ({ worker }) => {
  return (
    <View style={styles.home__bottomSheet__card__cardContainer}>
      <Pressable
        android_ripple={{ color: "#E2E2E2", borderless: true }}
        style={styles.home__bottomSheet__card__button}
      >
        <View style={styles.home__bottomSheet__card__headerContainer}>
          <Image
            source={worker.bannerImage}
            style={styles.home__bottomSheet__card__headerPhoto}
          />
        </View>

        <Text style={styles.home__bottomSheet__card__infoTitle}>
          {worker.description}
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
        <Text style={styles.home__bottomSheet__card__more}>Ver todos</Text>
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
