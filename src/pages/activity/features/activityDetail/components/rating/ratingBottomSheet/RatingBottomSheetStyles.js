import { StyleSheet } from "react-native";
import { colors } from "../../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  rating__ratingBottomSheet__container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  rating__ratingBottomSheet__title: {
    fontFamily: "Inter-Medium",
    fontSize: 18,
    marginBottom: 20,
    color: colors.black,
  },
  rating__ratingBottomSheet__stars: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  rating__ratingBottomSheet__buttons: {
    marginTop: 10,
    gap: 8
  },
  rating__ratingBottomSheet__button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  rating__ratingBottomSheet__disabled: {
  backgroundColor: colors.lightGray,
},

  rating__ratingBottomSheet__cancel: {
  },
  rating__ratingBottomSheet__confirm: {
    backgroundColor: colors.primary,
  },
  rating__ratingBottomSheet__buttonText: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    color: colors.white,
  },
  rating__ratingBottomSheet__buttonCancelText: {
    fontFamily: "Inter-Normal",
    fontSize: 15,
    color: colors.black,
    textDecorationLine: "underline"
  }
});
