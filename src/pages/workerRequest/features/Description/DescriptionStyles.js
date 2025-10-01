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
  WR__description__imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 20,
    marginBottom: 8,
  },
  WR__description__imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  WR__description__imageWrapper: {
    position: "relative",
  },
  WR__description__removeButton: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.8)",
    top: 2,
    right: 10,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
