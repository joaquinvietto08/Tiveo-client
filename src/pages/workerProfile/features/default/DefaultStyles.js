import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  workerProfile__default__Bottom: {
    flex: 1,
    gap: 15,
  },
  workerProfile__default__tagsWrapperContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
    borderRadius: 12,
    elevation: 1,
    marginHorizontal: 20,
  },
  workerProfile__default__sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter-Bold",
  },
  workerProfile__default__tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  workerProfile__default__tag: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 8,
  },
  workerProfile__default__tagIcon: {
    width: 16,
    height: 16,
    fill: colors.black,
  },
  workerProfile__default__tagText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "Inter-Medium",
  },
  workerProfile__default__StatusContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray
  },
  workerProfile__default__StatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  workerProfile__default__StatusLabel: {
    fontFamily: "Inter-SemiBold",
  },
  workerProfile__default__StatusSubContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 8,
    borderRadius: 40,
  },
  workerProfile__default__StatusAvailable: {
    backgroundColor: "#D1F5E1",
  },
  workerProfile__default__StatusBusy: {
    backgroundColor: "#fff4e2",
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
    fontFamily: "Inter-SemiBold",
  },
  workerProfile__default__StatusTextAvailable: {
    color: colors.green,
  },
  workerProfile__default__StatusTextBusy: {
    color: colors.primary,
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
