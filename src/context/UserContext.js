import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [openRequests, setOpenRequests] = useState([]);     // solicitudes para postularse
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

    const unsubscribe = firestore()
      .collection("activities")
      .where("user.userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
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
    const openQuery = firestore()
      .collection("requests")
      .where("user.userId", "==", user.uid)
      .where("type", "==", "open");

    const directQuery = firestore()
      .collection("requests")
      .where("user.userId", "==", user.uid)
      .where("type", "==", "direct");

    const unsubOpen = openQuery.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setOpenRequests(data);
    });

    const unsubDirect = directQuery.onSnapshot((snapshot) => {
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
