import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  workerProfile__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  workerProfile__topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1000,
  },
  workerProfile__banner: {
    width: "100%",
    height: 170,
  },
  workerProfile__avatarContainer: {
    alignItems: "center",
    marginTop: -60,
  },
  workerProfile__avatar: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#fff",
  },
  workerProfile__name: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 8,
    fontFamily: "Inter-Bold",
  },
  workerProfile__ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  workerProfile__ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#444",
    fontFamily: "Inter-Regular",
  },
  workerProfile__body: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  workerProfile__description: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },

  workerProfile__licensedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },

  workerProfile__licensedText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: "Inter-Bold",
  },
});
