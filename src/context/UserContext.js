import React, { useState, useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged as onAuthStateChangedListener } from "@react-native-firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "@react-native-firebase/firestore";

export const UserContext = createContext();

const db = getFirestore();

export function UserProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [openRequests, setOpenRequests] = useState([]); // solicitudes para postularse
  const [directRequests, setDirectRequests] = useState([]); // solicitudes directas a trabajadores

  // 🔐 Escuchar cambios de sesión
  function handleAuthStateChanged(u) {
    setUser(u);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChangedListener(getAuth(), handleAuthStateChanged);
    return () => subscriber();
  }, []);

  // 📡 Escuchar actividades del usuario
  useEffect(() => {
    if (!user) {
      setActivities([]);
      return;
    }

    const activitiesQuery = query(
      collection(db, "activities"),
      where("client.clientId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(activitiesQuery, (snapshot) => {
      const activitiesData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          scheduledDateTime: data?.scheduledDateTime?.toDate?.() || null,
        };
      });
      setActivities(activitiesData);
    });

    return () => unsubscribe();
  }, [user]);

  // 📡 Escuchar requests del usuario (separadas por tipo)
  useEffect(() => {
    if (!user) {
      setOpenRequests([]);
      setDirectRequests([]);
      return;
    }

    // consultas paralelas
    const openQuery = query(
      collection(db, "requests"),
      where("client.clientId", "==", user.uid),
      where("type", "==", "open")
    );

    const directQuery = query(
      collection(db, "requests"),
      where("client.clientId", "==", user.uid),
      where("type", "==", "direct")
    );

    const mapRequest = (doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.(),
        scheduledDateTime: data.scheduledDateTime?.toDate?.() ?? null,
      };
    };

    const unsubOpen = onSnapshot(openQuery, (snapshot) => {
      setOpenRequests(snapshot.docs.map(mapRequest));
    });

    const unsubDirect = onSnapshot(directQuery, (snapshot) => {
      setDirectRequests(snapshot.docs.map(mapRequest));
    });

    return () => {
      unsubOpen();
      unsubDirect();
    };
  }, [user]);

  if (initializing) return null;

  return (
    <UserContext.Provider
      value={{
        user,
        activities,
        openRequests,
        directRequests,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
