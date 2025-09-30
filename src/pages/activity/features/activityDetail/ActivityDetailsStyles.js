import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activity__activityDetail__mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  activity__activityDetail__scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  activity__activityDetail__header: {
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
    gap: 12,
  },
  activity__activityDetail__title: {
    fontFamily: "Inter-Normal",
    fontSize: 18,
  },
  activity__activityDetail__bodyContainer: {
    gap: 20,
    paddingTop: 20
  },
  activity__activityDetail__helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 30,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    gap: 4,
  },

  activity__activityDetail__helpText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
  },
});
