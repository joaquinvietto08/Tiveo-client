import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__bottomSheet__card__subtitleContainer: {
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  home__bottomSheet__card__subtitle: {
    fontSize: 17,
    fontFamily: "Inter-Bold",
  },
  home__bottomSheet__card__more: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: "Inter-Regular",
  },
  home__bottomSheet__card__container: {
    paddingHorizontal: 20,
  },
  home__bottomSheet__card__cardContainer: {
    borderRadius: 10,
    marginRight: 15,
    width: 260,
    height: 220,
    backgroundColor: "#FFFFFF",
  },
  home__bottomSheet__card__button: {
    width: 260,
    height: 220,
    position: "relative",
  },
  home__bottomSheet__card__headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  home__bottomSheet__card__headerPhoto: {
    width: 260,
    height: 110,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  home__bottomSheet__card__infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 8,
  },
  home__bottomSheet__card__infoType: {
    fontSize: 12,
    color: "#ACACAC",
    fontFamily: "Inter-Medium",
  },
  home__bottomSheet__card__infoRating: {
    fontSize: 12,
    color: colors.yellow,
    fontFamily: "Inter-Medium",
  },
  home__bottomSheet__card__infotTotalRatings: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: "Inter-Medium",
  },
  home__bottomSheet__card__infoTitle: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  home__bottomSheet__card__addresContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 8,
    flexDirection: "row",
  },
  home__bottomSheet__card__addressView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    paddingLeft: 3,
    paddingBottom: 1,
  },
  home__bottomSheet__card__addressText: {
    maxWidth: 140,
    fontSize: 11,
    fontFamily: "Inter-ExtraBold",
    color: "#ACACAC",
  },
  home__bottomSheet__card__availableView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "#D1F5E1",
    marginRight: 8,
  },
  home__bottomSheet__card__availableText: {
    fontSize: 13,
    color: colors.green,
    fontFamily: "Inter-SemiBold",
  },
  home__bottomSheet__card__busyView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255, 157, 0, 0.14)",
    marginRight: 8,
  },
  home__bottomSheet__card__busyText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: "Inter-SemiBold",
  },
});
