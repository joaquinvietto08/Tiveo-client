import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  messages__chat__list: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 10
  },

  messages__chat__item: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  messages__chat__item__other: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  messages__chat__item__me: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },

  messages__chat__text: {
    color: colors.black,
    fontFamily: "Inter-Regular",
  },

  messages__chat__text__me: {
    color: colors.white,
  },

  messages__chat__time: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: "Inter-Regular",
    textAlign: "right",
    color: colors.black,
  },

  messages__chat__time__me: {
    color: colors.white,
  },
});
