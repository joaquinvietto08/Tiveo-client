import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  profile__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profile__header: {
    alignItems: "center",
    marginBottom: 50,
  },
  profile__avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profile__avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  profile__avatarInitial: {
    fontFamily: "Inter-Bold",
    fontSize: 40,
    color: colors.gray,
  },
  profile__name: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: colors.black,
  },
  profile__options: {
    width: "100%",
    alignItems: "center",
  },
  profile__button: {
    width: "80%",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profile__buttonText: {
    fontFamily: "Inter-Medium",
    color: colors.white,
    fontSize: 16,
  },
  profile__logout: {
    backgroundColor: "transparent",
  },
  profile__logoutText: {
    color: "red",
  },
});
