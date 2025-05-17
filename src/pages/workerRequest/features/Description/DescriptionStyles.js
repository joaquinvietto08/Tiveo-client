import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  WR__description__sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 10,
  },
  WR__description__description: {
    paddingTop: 20,
  },
  WR__description__inputContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  WR__description__inputText: {
    height: 100,
    textAlignVertical: "top",
  },
  WR__description__hr: {
    height: 1,
    width: "90%",
    backgroundColor: colors.gray,
    alignSelf: "center",
  },

  WR__description__imageButton: {
    marginTop: 10,
    marginLeft: 15,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    gap: 8,
    marginBottom: 10,
  },
  WR__description__imageButtonText: {
    fontFamily: "Inter-Regular",
  },
});
