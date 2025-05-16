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

  workerRequest__sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 10,
  },

  /* Description */
  workerRequest__description: {
    paddingTop: 20,
  },

  workerRequest__inputText: {
    height: 100,
    textAlignVertical: "top",
  },

  /* Category */
  workerRequest__category: {
    paddingTop: 30,
  },
  workerRequest__tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  workerRequest__tag: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  workerRequest__tagIcon: {
    width: 16,
    height: 16,
    fill: colors.black,
  },
  workerRequest__tagText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  workerRequest__categoriesSelect: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.black,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  workerRequest__categoriesSelectText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "Inter-Regular",
  },

  /* Moment */

  workerRequest__moment: {
    backgroundColor: "yellow",
  },

  workerRequest__moment: {
    marginTop: 30,
  },
  workerRequest__momentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  workerRequest__momentOption: {
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
  workerRequest__momentOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  workerRequest__momentIcon: {
    marginRight: 8,
  },
  workerRequest__dateText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },

  workerRequest__timeText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
});
