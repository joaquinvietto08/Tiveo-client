import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  advanceSearch__footer__scrollView: {
    paddingHorizontal: 20,
  },
  advanceSearch__footer__postCountText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 16,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 18,
  },
  advanceSearch__footer__detailRow: {
    gap: 10,
  },
  advanceSearch__footer__iconsContainer: {
    flexDirection: "row",
  },
  advanceSearch__footer__detailText: {
    fontSize: 14,
    color: colors.gray,
    flexShrink: 1,
    fontFamily: "Inter-Medium",
  },
  advanceSearch__footer__detailIcon: {
    color: colors.gray,
    marginRight: 8,
  },
  advanceSearch__footer__momentRow: {
    flexDirection: "row",
  },
  advanceSearch__footer__momentText: {
    color: colors.gray,
    fontFamily: "Inter-Medium",
  },
  advanceSearch__footer__locationRow: {
    flexDirection: "row",
  },
  advanceSearch__footer__subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginTop: 30,
  },
  advanceSearch__footer__workersContainer: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 30,
  },
  advanceSearch__footer__noPostulantsText: {
    color: colors.gray,
    paddingHorizontal: 55,
    marginTop: 100,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  advanceSearch__footer__card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    position: "relative",
    marginHorizontal: 4
  },
  advanceSearch__footer__cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  advanceSearch__footer__avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  advanceSearch__footer__cardHeaderText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,

    flex: 1,
  },
  advanceSearch__footer__name: {
    fontSize: 16,
    color: colors.black,
    fontFamily: "Inter-SemiBold",
  },
  advanceSearch__footer__verifiedIcon: {
    marginLeft: 4,
  },
  advanceSearch__footer__ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  advanceSearch__footer__ratingValue: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginRight: 4,
    marginLeft: 2,
  },
  advanceSearch__footer__ratingCount: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: "Inter-Normal",
  },
  advanceSearch__footer__cardBody: {
    paddingLeft: 60,
  },
  advanceSearch__footer__infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  advanceSearch__footer__infoLabel: {
    fontSize: 14,
    color: colors.black,
    paddingRight: 8,
    fontFamily: "Inter-Normal",
  },
  advanceSearch__footer__infoValue: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "Inter-SemiBold",
  },
  advanceSearch__footer__infoRowMoment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  advanceSearch__footer__infoSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 8,
    borderRadius: 40,
  },
  advanceSearch__footer__infoAvailable: {
    backgroundColor: "#D1F5E1",
  },
  advanceSearch__footer__infoBusy: {
    backgroundColor: "#FFF4E2",
  },
  advanceSearch__footer__infoText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  advanceSearch__footer__infoTextAvailable: {
    color: colors.green,
  },
  advanceSearch__footer__infoTextBusy: {
    color: colors.primary,
  },
  advanceSearch__footer__messageContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  advanceSearch__footer__messageText: {
    fontSize: 13,
    fontFamily: "Inter-Normal",
    color: colors.black,
  },
});
