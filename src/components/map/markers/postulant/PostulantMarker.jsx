import { View, Image, StyleSheet, Text } from "react-native";
import { formatPrice } from "../../../../utils/formatHelpers";
import { colors } from "../../../../styles/globalStyles";

const PostulantMarker = ({ postulant }) => {
  const priceValue =
    postulant.price != null && postulant.price !== ""
      ? postulant.price
      : postulant.budget != null && postulant.budget !== ""
      ? postulant.budget
      : null;
  const priceText = priceValue != null ? formatPrice(priceValue) : null;

  const imageSource =
    typeof postulant.photoURL === "string"
      ? { uri: postulant.photoURL }
      : postulant.photoURL || null;

  const workerInitial =
    postulant.workerName?.[0]?.toUpperCase() ||
    postulant.name?.[0]?.toUpperCase() ||
    postulant.firstName?.[0]?.toUpperCase() ||
    "T";

  return (
    <View style={styles.map__markers__postulant__markerContainer}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={styles.map__markers__postulant__postulantImage}
        />
      ) : (
        <View
          style={[
            styles.map__markers__postulant__postulantImage,
            styles.map__markers__postulant__placeholder,
          ]}
        >
          <Text style={styles.map__markers__postulant__placeholderText}>
            {workerInitial}
          </Text>
        </View>
      )}
      <View style={styles.map__markers__postulant__priceContainer}>
        <Text style={styles.map__markers__postulant__priceText}>
          {priceText ?? "A definir"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map__markers__postulant__markerContainer: {
    minHeight: 56,
    alignItems: "center",
  },
  map__markers__postulant__postulantImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },
  map__markers__postulant__placeholder: {
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  map__markers__postulant__placeholderText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
  },
  map__markers__postulant__postulantContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  map__markers__postulant__notPriceContainer: {
    height: 24,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__postulant__priceContainer: {
    height: 24,
    borderRadius: 20,
    marginTop: -10,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__postulant__priceText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
});

export default PostulantMarker;
