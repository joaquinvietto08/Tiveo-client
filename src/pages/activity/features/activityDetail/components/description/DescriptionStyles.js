import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__description__mainContainer: {
    backgroundColor: colors.white,
    padding: 15,
    elevation: 2,
    borderRadius: 8,
  },
  activityDetails__description__title: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.black,
    marginBottom: 6,
  },
  activityDetails__description__text: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
  },
  activityDetails__description__placeholder: {
    fontFamily: "Inter-Italic",
    fontSize: 15,
    color: colors.gray,
  },
});
