import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
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
  function onAuthStateChanged(u) {
    setUser(u);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
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
      where("user.userId", "==", user.uid)
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
      where("user.userId", "==", user.uid),
      where("type", "==", "open")
    );

    const directQuery = query(
      collection(db, "requests"),
      where("user.userId", "==", user.uid),
      where("type", "==", "direct")
    );

    const unsubOpen = onSnapshot(openQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setOpenRequests(data);
    });

    const unsubDirect = onSnapshot(directQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setDirectRequests(data);
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
