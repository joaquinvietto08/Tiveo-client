import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  WR__categoriesSelect__category: {
    paddingTop: 30,
  },
  WR__categoriesSelect__sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 10,
  },
  WR__categoriesSelect__tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  WR__categoriesSelect__tag: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  WR__categoriesSelect__tagIcon: {
    width: 16,
    height: 16,
    fill: colors.black,
  },
  WR__categoriesSelect__tagText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  WR__categoriesSelect__categoriesSelect: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.black,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  WR__categoriesSelect__categoriesSelectText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "Inter-Regular",
  },
});
