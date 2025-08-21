// ./utils/firebaseChat.js
import firestore from "@react-native-firebase/firestore";

const conversationsCol = firestore().collection("conversations");

export async function ensureConversation(activityId, clientId, workerId) {
  const ref = conversationsCol.doc(activityId);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      activityId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      clientId, 
      workerId
    });
  }
  return ref;
}

export async function sendTextMessage({ activityId, text, clientId, workerId }) {
  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = convoRef.collection("messages").doc();
  await msgRef.set({
    text,
    clientId,
    createdAt: firestore.FieldValue.serverTimestamp(),
    sender: "client"
  });
  return msgRef.id;
}

export function listenMessages(activityId, onChange) {
  return conversationsCol
    .doc(activityId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .onSnapshot((snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(items);
    });
}
