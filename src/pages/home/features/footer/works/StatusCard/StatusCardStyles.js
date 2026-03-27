import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__bottomSheet__statusCard__card: {
    borderRadius: 10,
    width: 300,
    height: 130,
    padding: 15,
  },
  home__bottomSheet__statusCard__card__default: {
    backgroundColor: colors.black,
  },
  home__bottomSheet__statusCard__card__requested: {
    backgroundColor: colors.white,
    borderWidth: 1,
  },

  /* ********************* */

  home__bottomSheet__statusCard__servicesContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  /* ******************** */

  home__bottomSheet__statusCard__servicesText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
  },

  /* ********************* */

  home__bottomSheet__statusCard__servicesIconContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  home__bottomSheet__statusCard__extraText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },

  home__bottomSheet__statusCard__statusContainer: {
    marginTop: "auto",
  },
  home__bottomSheet__statusCard__statusText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },

  /* **************** */

  home__bottomSheet__statusCard__momentContainer: {
    flexDirection: "row",
    gap: 6,
    paddingTop: 4,
    alignItems: "center",
  },

  /* **************** */
  home__bottomSheet__statusCard__momentText: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    flexShrink: 1,
  },

  /* buttons container */
  home__bottomSheet__statusCard__confirmContainer: {
    flexDirection: "row",
    height: 40,
    gap: 10,
    justifyContent: "space-between",
  },

  /* **************** */
  home__bottomSheet__statusCard__messagesButton: {
    height: "auto",
    borderRadius: 6,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },

  /* **************** */

  home__bottomSheet__statusCard__detailsButton: {
    borderWidth: 1,
    borderRadius: 6,
    height: "auto",
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  home__bottomSheet__statusCard__detailsButton__requested: {
    borderColor: colors.black,
  },
  home__bottomSheet__statusCard__detailsButton__default: {
    borderColor: colors.white,
  },

  /* **************** */
  home__bottomSheet__statusCard__messagesButtonText: {
    fontFamily: "Inter-SemiBold",
  },
  home__bottomSheet__statusCard__messagesButtonText__requested: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__messagesButtonText__default: {
    color: colors.black,
  },

  /* **************** */

  home__bottomSheet__statusCard__detailsButtonText: {
    fontFamily: "Inter-SemiBold",
  },
});
