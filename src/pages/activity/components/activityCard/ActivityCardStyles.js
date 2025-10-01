import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activity__activityCard__card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  activity__activityCard__cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
    justifyContent: "space-between",
  },
  activity__activityCard__cardIconsContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activity__activityCard__cardTitle: {
    fontSize: 16,
    marginRight: 4,
    fontFamily: "Inter-Bold",
  },
  activity__activityCard__cardAddress: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    fontFamily: "Inter-Regular",
  },
  activity__activityCard__cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activity__activityCard__cardDate: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: "Inter-Light",
  },
  activity__activityCard__cardStatus: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  activity__activityCard__optionContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
  activity__activityCard__cancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderBottomLeftRadius: 8,
  },
  activity__activityCard__messagesButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.black,
    borderBottomRightRadius: 8,
  },
  activity__activityCard__paymentButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
