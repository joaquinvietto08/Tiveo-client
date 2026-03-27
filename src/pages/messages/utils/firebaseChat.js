import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

const db = getFirestore();
const conversationsCol = collection(db, "conversations");

export async function ensureConversation(activityId, clientId, workerId) {
  const ref = doc(conversationsCol, activityId);
  const snap = await getDoc(ref);
  if (!snap.exists) {
    const payload = {
      activityId,
      createdAt: serverTimestamp(),
    };
    if (clientId != null) payload.clientId = clientId;
    if (workerId != null) payload.workerId = workerId;
    await setDoc(ref, payload);
  }
  return ref;
}

export async function sendTextMessage({
  activityId,
  text,
  clientId,
  workerId,
}) {
  if (!activityId) throw new Error("activityId requerido");
  if (!clientId) throw new Error("clientId requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = doc(collection(convoRef, "messages"));

  await setDoc(msgRef, {
    type: "text",
    text: text ?? "",
    clientId,
    sender: "client",
    createdAt: serverTimestamp(),
  });

  return msgRef.id;
}

/** Mensaje de uso de garantía: formato distinto al mensaje del cliente (sender "system"). */
export async function sendWarrantyClaimMessage({
  activityId,
  clientId,
  workerId,
}) {
  if (!activityId) throw new Error("activityId requerido");
  if (!clientId) throw new Error("clientId requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = doc(collection(convoRef, "messages"));

  await setDoc(msgRef, {
    type: "warranty_claim",
    text: "Se ha hecho uso de la garantía de este trabajo. Por favor, coordinen la fecha y hora de la visita mediante este chat.",
    sender: "system",
    createdAt: serverTimestamp(),
  });

  return msgRef.id;
}

/* ***************************************************************************** */

export async function sendImageMessage({ activityId, uri, clientId, workerId }) {
  if (!activityId) throw new Error("activityId requerido");
  if (!clientId) throw new Error("clientId requerido");
  if (!uri) throw new Error("uri requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = doc(collection(convoRef, "messages"));

  await setDoc(msgRef, {
    type: "image",
    clientId,
    sender: "client",
    imageUrl: null,
    createdAt: serverTimestamp(),
  });

  const storageRef = storage().ref(`messages/${activityId}/${msgRef.id}.jpg`);

  let snapshot;
  try {
    snapshot = await storageRef.putFile(uri);
  } catch (e) {
    console.warn("❌ Error real en putFile:", {
      code: e?.code,
      message: e?.message,
    });
    throw e;
  }

  try {
    const url = await storage().ref(snapshot.metadata.fullPath).getDownloadURL();
    await updateDoc(msgRef, { imageUrl: url });
    return msgRef.id;
  } catch (e) {
    console.warn("❌ Error en getDownloadURL:", {
      code: e?.code,
      message: e?.message,
    });
    try {
      await deleteDoc(msgRef);
    } catch {}
    throw e;
  }
}

/* ***************************************************************************** */

export function listenMessages(activityId, onChange) {
  if (!activityId) {
    console.warn("listenMessages llamado sin activityId");
    return () => {};
  }

  const convoRef = doc(conversationsCol, activityId);
  const messagesQuery = query(
    collection(convoRef, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    messagesQuery,
    (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      onChange(items);
    },
    (error) => {
      console.warn("Error en listenMessages:", error);
      onChange([]);
    }
  );
}
