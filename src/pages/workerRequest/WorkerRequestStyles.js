import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  workerRequest__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  workerRequest__scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  workerRequest__header: {
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
    gap: 12,
  },
  workerRequest__backText: {
    fontFamily: "Inter-Normal",
    fontSize: 18,
  },
});
