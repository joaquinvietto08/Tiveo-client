import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__serviceList__container: {
    marginVertical: 10,
  },
  home__serviceList__button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 0.5,
  },
  home__serviceList__activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  home__serviceList__inactiveButton: {
    borderColor: colors.gray,
    backgroundColor: "rgba(255, 255, 255, 0.69)",
  },
  home__serviceList__activeText: {
    fontFamily: "Inter-Medium",
    color: "#fff",
  },
  home__serviceList__inactiveText: {
    fontFamily: "Inter-Regular",
    color: colors.gray,
  },
  home__serviceList__flatList: {
    paddingHorizontal: 20,
  },
});
