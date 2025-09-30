import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__categories__mainContainer: {
  },
  activityDetails__categories__title: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    color: colors.gray,
    marginBottom: 10,
  },
  activityDetails__categories__list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  activityDetails__categories__chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  activityDetails__categories__label: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.black,
  },
  activityDetails__categories__placeholder: {
    fontFamily: "Inter-Italic",
    fontSize: 14,
    color: colors.gray,
  },
});
