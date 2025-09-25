import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  payment__footer__container: {
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    padding: 20,
  },
  payment__footer__subtitle: {
    fontFamily: "Inter-Normal",
    fontSize: 16,
    marginBottom: 10,
    color: colors.black,
    fontWeight: "600",
  },
  payment__footer__methods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 5
  },
  payment__footer__methodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  payment__footer__methodText: {
    fontFamily: "Inter-Normal",
    fontSize: 14,
    color: colors.gray,
  },
  payment__footer__payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payment__footer__payButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter-Normal",
    fontWeight: "bold",
  },
});
