import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./ChatStyles";

const ChatItem = React.memo(({ text, sender, timestamp }) => {
  const isMe = sender === "client";
  return (
    <View
      style={[
        styles.messages__chat__item,
        isMe ? styles.messages__chat__item__me : styles.messages__chat__item__other,
      ]}
    >
      {!!text && (
        <Text style={[styles.messages__chat__text, isMe && styles.messages__chat__text__me]}>
          {text}
        </Text>
      )}
      <Text style={[styles.messages__chat__time, isMe && styles.messages__chat__time__me]}>
        {timestamp}
      </Text>
    </View>
  );
});

const Chat = ({ data }) => {
  console.log(data)
  const renderItem = useCallback(
    ({ item }) => (
      <ChatItem
        text={item.text}
        sender={item.sender}
        timestamp={item.timestamp}
      />
    ),
    []
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(it) => it.id}
      renderItem={renderItem}
      contentContainerStyle={styles.messages__chat__list}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.messages__chat__separator} />}
    />
  );
};

export default Chat;