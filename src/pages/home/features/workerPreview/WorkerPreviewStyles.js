import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  home__workerPreview__mainContainer: {
    height: "auto",
    width: "100%",
    marginBottom: 160,
    paddingHorizontal: 10,
  },
  home__workerPreview__contentContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  home__workerPreview__image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
  },
  home__workerPreview__info: {
    flex: 1,
  },
  home__workerPreview__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  home__workerPreview__name: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  home__workerPreview__ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  home__workerPreview__ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  home__workerPreview__description: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#ACACAC",
  },
  home__workerPreview__availableContainer: {
    marginTop: 8,
    backgroundColor: "#D1F5E1",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  home__workerPreview__availableText: {
    fontSize: 12,
    color: "#00B383",
    fontFamily: "Inter-Bold",
  },
  home__workerPreview__busyContainer: {
    marginTop: 8,
    backgroundColor: "rgba(255, 157, 0, 0.14)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  home__workerPreview__busyText: {
    fontSize: 12,
    color: "#FF9D00",
    fontFamily: "Inter-Bold",
  },
});
