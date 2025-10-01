import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__worker__mainContainer: {
    alignItems: "center",
  },
  activityDetails__worker__subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
    paddingBottom: 20,
  },
  activityDetails__worker__avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  activityDetails__worker__name: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
    marginBottom: 4,
  },
  activityDetails__worker__date: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
  activityDetails__worker__price: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
  },
  activityDetails__worker__pricePlaceholder: {
    fontFamily: "Inter-BoldItalic",
    fontSize: 16,
    color: colors.black,
  },
});
