import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  WR__location__container: {
    paddingTop: 20,
  },
  WR__location__title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    marginBottom: 10,
  },
  WR__location__addressContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#e8e8e8ff",
  },
  WR__location__label: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  WR__location__address: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: colors.black,
  },
  WR__location__addressPlaceholder: {
    color: colors.gray,
  },
  WR__location__inputGroup: {
    marginBottom: 14,
  },
  WR__location__inputLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    marginBottom: 6,
  },
  WR__location__instructionsInput: {
    minHeight: 70,
    textAlignVertical: "top",
  },
});
