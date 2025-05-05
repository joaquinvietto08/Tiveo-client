import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  workerProfile__default__Bottom: {
    paddingHorizontal: 20,
    flex: 1,
  },
  workerProfile__default__sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  workerProfile__default__tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  workerProfile__default__tag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  workerProfile__default__tagIcon: {
    width: 16,
    height: 16,
  },
  workerProfile__default__tagText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  workerProfile__default__icon: {

  },
  workerProfile__default__availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  workerProfile__default__availabilityLabel: {
    fontFamily: "Inter-SemiBold",
    marginRight: 8,
  },

  workerProfile__default__availabilityNow: {
    flexDirection: "row",
    alignItems: "center",
  },

  workerProfile__default__availabilityIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  workerProfile__default__availabilityText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  workerProfile__default__buttonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  workerProfile__default__buttonText: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
});
