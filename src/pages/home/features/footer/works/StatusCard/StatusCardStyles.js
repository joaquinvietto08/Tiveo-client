import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__bottomSheet__statusCard__card: {
    borderRadius: 10,
    width: 300,
    height: 130,
    padding: 15,
  },
  home__bottomSheet__statusCard__card__done: {
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  home__bottomSheet__statusCard__card__requested: {
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  home__bottomSheet__statusCard__card__confirm: {
    backgroundColor: colors.black,
  },
  home__bottomSheet__statusCard__card__going: {
    backgroundColor: colors.primary,
  },
  home__bottomSheet__statusCard__card__working: {
    backgroundColor: colors.primary,
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
  home__bottomSheet__statusCard__title__done: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__title__requested: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__title__confirm: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__title__going: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__title__working: {
    color: colors.white,
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
  },
  home__bottomSheet__statusCard__momentText__done: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__momentText__requested: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__momentText__confirm: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__momentText__going: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__momentText__working: {
    color: colors.white,
  },

  /* going/working */
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
  },
  home__bottomSheet__statusCard__messagesButton__done: {
    backgroundColor: colors.primary,
  },
  home__bottomSheet__statusCard__messagesButton__confirm: {
    backgroundColor: colors.white,
  },
  home__bottomSheet__statusCard__messagesButton__going: {
    backgroundColor: colors.black,
  },
  home__bottomSheet__statusCard__messagesButton__working: {
    backgroundColor: colors.black,
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
  home__bottomSheet__statusCard__detailsButton__done: {
    borderColor: colors.black,
  },
  home__bottomSheet__statusCard__detailsButton__confirm: {
    borderColor: colors.white,
  },
  home__bottomSheet__statusCard__detailsButton__going: {
    borderColor: colors.black,
  },
  home__bottomSheet__statusCard__detailsButton__working: {
    borderColor: colors.black,
  },

  /* **************** */
  home__bottomSheet__statusCard__messagesButtonText: {
    fontFamily: "Inter-SemiBold",
  },
  home__bottomSheet__statusCard__messagesButtonText__done: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__messagesButtonText__confirm: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__messagesButtonText__going: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__messagesButtonText__working: {
    color: colors.white,
  },

  /* **************** */

  home__bottomSheet__statusCard__detailsButtonText: {
    fontFamily: "Inter-SemiBold",
  },
  home__bottomSheet__statusCard__detailsButtonText__done: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__detailsButtonText__confirm: {
    color: colors.white,
  },
  home__bottomSheet__statusCard__detailsButtonText__going: {
    color: colors.black,
  },
  home__bottomSheet__statusCard__detailsButtonText__working: {
    color: colors.black,
  },
  /* ************* */
});
