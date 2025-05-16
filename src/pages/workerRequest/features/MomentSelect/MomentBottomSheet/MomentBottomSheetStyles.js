import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  momentBottomSheet__content: {
    flex: 1,
    alignItems: "center",
  },

  momentBottomSheet__closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
    padding: 4,
  },

  momentBottomSheet__title: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
    textAlign: "center",
  },

  /*  */
  momentBottomSheet__momentContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 20,
  },
  momentBottomSheet__dateSelector: {
    width: 130,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  momentBottomSheet__timeSelector: {
    width: 130,
    height: "100%",
    justifyContent: "center",
    paddingLeft: 20,
  },
  momentBottomSheet__momentSelectorText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  momentBottomSheet__hr: {
    width: 1.5,
    backgroundColor: colors.gray,
    height: "100%",
  },
  /*  */
  momentBottomSheet__infoText: {
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  momentBottomSheet__confirmButton: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: 14,
    paddingHorizontal: 65,
    borderRadius: 10,
    marginBottom: 30,
  },
  momentBottomSheet__confirmText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
  },
});
