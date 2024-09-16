import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "flex-end",
  },
  headerButton: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: "Inter-SemiBold",
    textDecorationLine: "underline",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: "#8D8D8D",
  },
  searchContainer: {
    marginTop: 15,
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: "Inter-Regular",
  },
  locationsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },
  addressContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#C8C8C8",
    flexDirection: "row",
  },
  addressName: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
  },
  addressDetails: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: "#8D8D8D",
  },
  errorContainer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    backgroundColor: "#FF5656",
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
  },
  errorText: {
    color: "white",
    fontFamily: "Inter-Bold",
  },
});
