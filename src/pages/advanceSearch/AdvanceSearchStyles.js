import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  advanceSearch__mainContainer: {
    flex: 1,
  },
  advanceSearch__container: {
    position: "absolute",
    width: "100%",
  },
  advanceSearch__cancelButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    zIndex: 2,
    top: 50,
    left: 15,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 40,
    padding: 8,
    backgroundColor: "rgba(246, 246, 246, 0.84)",
  },
});
