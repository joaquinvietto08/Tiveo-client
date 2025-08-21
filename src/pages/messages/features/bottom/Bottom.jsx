import React, { useState, useEffect } from "react";
import { Alert, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextInputComponent from "../../../../components/inputs/textInput/TextInput";
import ImageIcon from "../../../../../assets/svgs/image";
import { colors } from "../../../../styles/globalStyles";
import { styles } from "./BottomStyles";

const MAXLEN = 100;

const Bottom = ({ onSendText }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    try {
      await onSendText?.(t);
    } catch (e) {
      console.warn("Error al enviar:", e);
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  };

  return (
    <View style={styles.messages__bottom__container}>
      <View style={styles.messages__bottom__subcontainer}>
        <Pressable
          style={styles.messages__bottom__imageButton}
          onPress={() => {}}
        >
          <ImageIcon />
        </Pressable>

        <TextInputComponent
          placeholder="Escribe un mensaje..."
          style={styles.messages__bottom__input}
          borderless
          multiline
          maxLength={MAXLEN}
          value={text}
          onChangeText={setText}
        />
      </View>

      <Pressable
        style={[
          styles.messages__bottom__sendButton,
          !text.trim() && { opacity: 0.5 },
        ]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Ionicons name="send" size={24} color={colors.black} />
      </Pressable>
    </View>
  );
};

export default Bottom;
