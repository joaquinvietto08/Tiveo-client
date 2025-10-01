import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  servicesList__mainContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  servicesList__container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  servicesList__buttonView: {
    borderRadius: 7,
    width: "31%",
    height: 105,
    backgroundColor: "#FFFFFF",
    marginVertical: 7,
  },
  servicesList__buttonViewSelected: {
    borderWidth: 1,
    borderBlockColor: colors.black,
  },
  servicesList__button: {
    width: "100%",
    height: 105,
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
  },
  servicesList__icon: {},
  servicesList__name: {
    fontSize: 14,
    bottom: 14,
    position: "absolute",
    fontFamily: "Inter-Light",
  },
});
