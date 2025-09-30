import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__payment__mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    padding: 15,
  },
  activityDetails__payment__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityDetails__payment__headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activityDetails__payment__title: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.black,
  },
  activityDetails__payment__noPaymentText: {
    fontFamily: "Inter-Italic",
    fontSize: 15,
    color: colors.gray,
    marginLeft: 10,
  },
  activityDetails__payment__content: {
    marginTop: 15,
    gap: 4,
  },
  activityDetails__payment__row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityDetails__payment__label: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
  },
  activityDetails__payment__amount: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
  },
  activityDetails__payment__totalLabel: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.black,
    paddingTop: 8,
  },
  activityDetails__payment__totalAmount: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.black,
  },
  activityDetails__payment__methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityDetails__payment__methodTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    color: colors.black,
    marginTop: 10,
    marginBottom: 6,
  },
  activityDetails__payment__methodChip: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activityDetails__payment__methodText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.green,
  },
  activityDetails__payment__pendingMessage: {
    fontFamily: "Inter-Italic",
    fontSize: 14,
    color: colors.gray,
  },
});
