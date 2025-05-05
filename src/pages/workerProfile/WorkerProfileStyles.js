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
    marginTop: 12,
    gap: 6,
  },
  workerProfile__licensedText: {
    fontSize: 13,
    color: colors.gray,
    fontFamily: "Inter-Bold",
  },
  workerProfile__divider: {
    height: 1,
    backgroundColor: colors.gray,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  workerProfile__experienceSection: {
    paddingLeft: 10,
    gap: 10,
  },
  workerProfile__row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  workerProfile__leftFixed: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  workerProfile__number: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "#000",
  },
  workerProfile__label: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    color: "#000",
    flex: 1,
    lineHeight: 18,
    marginTop: 2,
  },
  workerProfile__guaranteeRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  workerProfile__guaranteeTitleContainer: {
    paddingTop: 4,
  },
  workerProfile__guaranteeTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    color: "#000",
    flex: 1,
  },
  workerProfile__guaranteeDescription: {
    fontSize: 13,
    fontFamily: "Inter-Light",
  }  
});
