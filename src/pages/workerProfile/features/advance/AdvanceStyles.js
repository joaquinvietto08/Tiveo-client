import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  workerProfile__advance__bottom: {
    flex: 1,
    gap: 15,
    paddingTop: 15,
  },
  workerProfile__advance__title: {
    paddingHorizontal: 20,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  workerProfile__advance__valuesContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 12,
    elevation: 1,
    marginHorizontal: 20,
    gap: 10,
  },
  workerProfile__advance__servicesContainer: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  workerProfile__advance__statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  workerProfile__advance__statusLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
  },
  workerProfile__advance__statusSubContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 7,
    gap: 8,
    borderRadius: 40,
    alignItems: "center",
  },
  workerProfile__advance__statusAvailable: {
    backgroundColor: "#D1F5E1",
  },
  workerProfile__advance__statusBusy: {
    backgroundColor: "#fff4e2",
  },
  workerProfile__advance__status: {
    flexDirection: "row",
    alignItems: "center",
  },
  workerProfile__advance__statusIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  workerProfile__advance__statusText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  workerProfile__advance__statusTextAvailable: {
    color: colors.green,
  },
  workerProfile__advance__statusTextBusy: {
    color: colors.primary,
  },
  workerProfile__advance__locationTitle: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  workerProfile__advance__presupuestoTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  workerProfile__advance__locationLabel: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    paddingLeft: 8,
    flexShrink: 1,
  },
  workerProfile__advance__description: {
    flexDirection: "row",
    alignItems: "center"
  },
  workerProfile__advance__presupuesto: {
    flexDirection: "row",
    marginTop: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    paddingTop: 16
  },
  workerProfile__advance__priceLabel: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    paddingLeft: 8,
    flexShrink: 1,
  },
  workerProfile__advance__BottomContainer: {
    marginTop: "auto",
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  workerProfile__advance__infoText: {
    fontSize: 12,
    fontFamily: "Inter-Light",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 8,
  },
});
