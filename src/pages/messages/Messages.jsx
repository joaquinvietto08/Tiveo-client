import React, { useEffect, useMemo, useState, useContext } from "react";
import { StatusBar, View } from "react-native";
import { styles } from "./MessagesStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles/globalStyles";
import Chat from "./features/chat/Chat";
import Header from "./features/header/Header";
import Bottom from "./features/bottom/Bottom";
import { UserContext } from "../../context/UserContext";
import {
  listenMessages,
  sendTextMessage,
  sendImageMessage,
} from "./utils/firebaseChat";

const formatTime = (ts) => {
  try {
    const d = ts?.toDate?.() ? ts.toDate() : new Date();
    return d.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const Messages = ({ route }) => {
  const { activityId, worker } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const myUid = user?.uid;
  const [rawMessages, setRawMessages] = useState([]);

  // Suscripción a Firestore
  useEffect(() => {
    if (!activityId) return;
    const unsub = listenMessages(activityId, setRawMessages);
    return () => unsub && unsub();
  }, [activityId]);

  // Mapear a lo que tu Chat espera
  const DATA = useMemo(() => {
    return rawMessages.map((m) => {
      return {
        id: m.id,
        text: m.text || "",
        imageUrl: m.type === "image" ? m.imageUrl : undefined,
        type: m.type,
        sender: m.sender,
        timestamp: formatTime(m.createdAt),
      };
    });
  }, [rawMessages, myUid]);

  const handleSendText = async (text) => {
    if (!text?.trim()) return;
    await sendTextMessage({
      activityId,
      text: text.trim(),
      clientId: myUid,
    });
  };

  const handleSendImage = async ({ uri }) => {
    if (!uri) return;
    if (!activityId || !myUid) {
      console.warn("Faltan ids", { activityId, myUid });
      return;
    }
    await sendImageMessage({ activityId, uri, clientId: myUid });
  };

  return (
    <View
      style={[
        styles.messages__mainContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Header worker={worker} />
      <Chat data={[...DATA].reverse()} />
      <Bottom onSendText={handleSendText} onSendImage={handleSendImage} />
    </View>
  );
};

export default Messages;
