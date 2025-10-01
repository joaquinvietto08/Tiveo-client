import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  payment__resumen__container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.background,
  },
  payment__resumen__title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    paddingBottom: 30,
    color: colors.black,
  },
  payment__resumen__row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  payment__resumen__label: {
    fontFamily: "Inter-Normal",
    fontSize: 16,
    color: colors.black,
  },
  payment__resumen__value: {
    fontFamily: "Inter-Normal",
    fontSize: 16,
    color: colors.black,
  },
  payment__resumen__totalLabel: {
    fontFamily: "Inter-Bold",
    marginTop: 5,
  },
  payment__resumen__totalValue: {
    fontFamily: "Inter-Bold",
    marginTop: 5,
  },
});
