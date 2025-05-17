import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  categoriesBottomSheet__content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  categoriesBottomSheet__closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
    padding: 4,
  },

  categoriesBottomSheet__title: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    marginBottom: 12,
    textAlign: "center",
  },

  /* ****** */
  categoriesBottomSheet__item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  categoriesBottomSheet__itemSelected: { backgroundColor: "#e6f7ff" },
  categoriesBottomSheet__itemText: { fontSize: 16 },
  categoriesBottomSheet__itemTextSelected: {
    fontWeight: "bold",
    color: "#007AFF",
  },
});
