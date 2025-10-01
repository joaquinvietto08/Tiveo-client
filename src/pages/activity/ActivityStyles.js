import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  main_activityContainer: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  activityContainer: {
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 120,
    width: "100%",
  },
  main_activityButton: {
    marginBottom: 22,
  },
  activity_buttonView: {
    //   borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: 91,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 2,
    marginBottom: -5,
  },
  activityButton: {
    height: 91,
    width: "100%",
    flexDirection: "row",
    padding: 13,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
    backgroundColor: colors.background,
    borderRadius: 7,
  },
  main_infoContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  serviceContainer: {
    width: "80%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  timeContainer: {
    width: 25,
    height: 25,
  },
  dateTimeContainer: { flexDirection: "row" },
  text_dateTime: {
    color: "#606060",
    fontSize: 13,
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionContainer: {
    height: 50,
    flexDirection: "row",
    zIndex: 1,
    overflow: "hidden",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,

  },
  cancellButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  messagesButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  }
});
