import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__rating__mainContainer: {
    backgroundColor: colors.white,
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activityDetails__rating__button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1
  },
  activityDetails__rating__text: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.black,
  },
});
