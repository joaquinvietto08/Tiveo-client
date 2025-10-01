import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  WR__defaultBottom__container: {
    marginTop: "auto",
    paddingBottom: 20,
  },
  WR__defaultBottom__hr: {
    height: 1,
    backgroundColor: colors.gray,
    width: "150%",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  WR__defaultBottom__worker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  WR__defaultBottom__name: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  WR__defaultBottom__ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    borderRadius: 6,
    paddingRight: 6,
  },
  WR__defaultBottom__ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  WR__defaultBottom__image: {
    width: 60,
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#fff",
  },
  WR__defaultBottom__button: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WR__defaultBottom__buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  WR__defaultBottom__infoText: {
    fontSize: 12,
    fontFamily: "Inter-Light",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 8,
  },
});
