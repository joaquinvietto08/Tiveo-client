import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  services__servicesList__mainContainer: {
    marginTop: 70,
    alignItems: "center",
    marginBottom: 120,
    paddingHorizontal: 20,
  },
  services__servicesList__container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 35,
    width: "100%",
  },
  services__servicesList__buttonView: {
    borderRadius: 7,
    marginVertical: 7,
    width: "31%",
    height: 105,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  services__servicesList__button: {
    width: "100%",
    height: 105,
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
  },
  services__servicesList__icon: {},
  services__servicesList__name: {
    fontSize: 14,
    bottom: 14,
    position: "absolute",
    fontFamily: "Inter-Light",
  },
  services__servicesList__container2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "66%",
  },
  services__servicesList__buttonView2: {
    borderRadius: 7,
    marginVertical: 7,
    width: "47%",
    height: 105,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  services__servicesList__button2: {
    width: "100%",
    height: 105,
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
  },
});
