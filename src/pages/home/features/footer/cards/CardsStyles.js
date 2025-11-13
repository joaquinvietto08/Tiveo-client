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
  home__bottomSheet__card__container: {
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 4
  },
  home__bottomSheet__card__cardContainer: {
    borderRadius: 12,
    width: 260,
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  home__bottomSheet__card__button: {
    width: "100%",
    padding: 12,
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    height: "auto"
  },
  home__bottomSheet__card__content: {
    gap: 8,
  },
  home__bottomSheet__card__profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 4,
  },
  home__bottomSheet__card__avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
  },
  home__bottomSheet__card__profileInfo: {
    flex: 1,
  },
  home__bottomSheet__card__infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
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
    paddingHorizontal: 4,
  },
  home__bottomSheet__card__description: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    paddingHorizontal: 4,
  },
  home__bottomSheet__card__chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 4,
  },
  home__bottomSheet__card__chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.black,
    gap: 6,
  },
  home__bottomSheet__card__chipText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.black,
  },
  home__bottomSheet__card__statusContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 12,
    paddingHorizontal: 4,
  },
  home__bottomSheet__card__availableView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "#D1F5E1",
    marginLeft: 8,
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
    marginLeft: 8,
  },
  home__bottomSheet__card__busyText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: "Inter-SemiBold",
  },
});
