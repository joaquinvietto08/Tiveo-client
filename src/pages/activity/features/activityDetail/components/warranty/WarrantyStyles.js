import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__warranty__button: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activityDetails__warranty__text: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: colors.black,
  },
});
