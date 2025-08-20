import React from "react";
import { StatusBar, View } from "react-native";
import { styles } from "./MessagesStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles/globalStyles";
import Chat from "./features/chat/Chat";
import Header from "./features/header/Header";
import Bottom from "./features/bottom/Bottom";

const DATA = [

];

const Messages = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.messages__mainContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Header />
      <Chat data={DATA} />
      <Bottom />
    </View>
  );
};

export default Messages;
