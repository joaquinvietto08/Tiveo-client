import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  WR__momentSelect__moment: {
    backgroundColor: "yellow",
  },
  WR__momentSelect__sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 10,
  },
  WR__momentSelect__moment: {
    marginTop: 30,
  },
  WR__momentSelect__momentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  WR__momentSelect__momentOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
  WR__momentSelect__momentOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  WR__momentSelect__momentIcon: {
    marginRight: 8,
  },
  WR__momentSelect__dateText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  WR__momentSelect__timeText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
});
