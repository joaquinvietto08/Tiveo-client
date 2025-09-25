import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  payment__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  payment__scrollContent: {
    flexGrow: 1,
  },
  payment__backContainer: {
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 15,
    right: 0,
    zIndex: 1000,
  },
  payment__header: {
    backgroundColor: colors.primary,
    flex: 1,
    minHeight: 200,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
  },
  payment__worker: {
    fontFamily: "Inter-Medium",
    fontSize: 22,
    color: colors.black,
    textAlign: "center",
  },
  payment__warrantyContainer: {
    borderWidth: 1,
    borderRadius: 4,
    gap: 8,
    borderColor: colors.black,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 40,
    flexDirection: "row",
    marginBottom: 20
  },
  payment__warrantyText: {
    fontFamily: "Inter-Normal",
    flex: 1,
  },
});
