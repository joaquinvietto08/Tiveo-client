import { StyleSheet } from "react-native";
import { colors } from "../../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  activityDetails__location__mainContainer: {
    backgroundColor: colors.white,
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activityDetails__location__label: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.black,
  },
});
