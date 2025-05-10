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
    gap: 8,
    marginBottom: 16,
  },
  workerProfile__default__tag: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  workerProfile__default__tagIcon: {
    width: 16,
    height: 16,
    fill: colors.black,
  },
  workerProfile__default__tagText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  workerProfile__default__StatusContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  workerProfile__default__StatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  workerProfile__default__StatusLabel: {
    fontFamily: "Inter-SemiBold",
    marginRight: 8,
  },

  workerProfile__default__StatusIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  workerProfile__default__Status: {
    flexDirection: "row",
    alignItems: "center",
  },

  workerProfile__default__StatusIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  workerProfile__default__StatusText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  workerProfile__default__buttonWrapperAvailable: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  workerProfile__default__buttonTextAvailable: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  workerProfile__default__buttonWrapperBusy: {
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  workerProfile__default__buttonTextBusy: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
});
