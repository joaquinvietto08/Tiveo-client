import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__cancellation__mainContainer: {
    padding: 15,
    alignItems: "center",
    gap: 10,
  },
  activityDetails__cancellation__label: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "red",
  },
  activityDetails__cancellation__overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  activityDetails__cancellation__popup: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  activityDetails__cancellation__popupTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    marginBottom: 8,
    color: colors.black,
    textAlign: "center",
  },
  activityDetails__cancellation__popupText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: colors.gray,
  },
  activityDetails__cancellation__popupButtons: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center "
  },
  activityDetails__cancellation__popupButton: {
    flex: 1,
    padding: 8,
    height: 60,
    justifyContent: "center",
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activityDetails__cancellation__keep: {
    backgroundColor: colors.primary,
  },
  activityDetails__cancellation__cancel: {},
  activityDetails__cancellation__popupButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    color: colors.white,
    textAlign: "center",
  },
  activityDetails__cancellation__popupButtonCancelText: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    color: "red",
    textAlign: "center",
  },
});
