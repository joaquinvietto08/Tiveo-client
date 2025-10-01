import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  checkContainer: {
    backgroundColor: colors.background,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 150,
    alignItems: "center",
    zIndex: 999,
    justifyContent: "space-between",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  checkContainerTop: {
    alignItems: "center",
  },
  checkIconText: {
    paddingTop: 20,
    color: colors.primary,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 22,
  },
  checkContainerBottom: {
    width: "100%",
  },
  checkTextBottom: {
    fontFamily: "Inter-Normal",
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 12,
  },
  checkButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkButtonText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  checkButtonBack: {
    color: colors.black,
    fontFamily: "Inter-Normal",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 20
  },
});
