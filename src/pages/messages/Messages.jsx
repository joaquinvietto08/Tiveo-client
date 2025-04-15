import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './MessagesStyle';

const messages = [
  { id: '1', text: 'Buenas tardes, en 5 voy', sender: 'received' },
  { id: '2', text: 'Hola, dale te espero', sender: 'sent' },
  { id: '3', text: 'El portero de mi casa tiene roto el micrófono, pero si te escucho, tocas y bajo', sender: 'received' },
];

const renderMessage = ({ item }) => (
  <View style={[
    styles.messageContainer,
    item.sender === 'sent' ? styles.sentMessageContainer : styles.receivedMessageContainer,
  ]}>
    <Text style={styles.messageText}>{item.text}</Text>
  </View>
);

const Messages = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=58' }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.headerTitle}>John Doe</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Date Separator (Example) */}
      <View style={styles.dateSeparator}>
        <View style={styles.separatorLine} />
        <Text style={styles.dateText}>Today</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
          <Feather name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messages;