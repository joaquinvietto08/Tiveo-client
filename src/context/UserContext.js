import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);

  // Monitor auth state
  function onAuthStateChanged(u) {
    setUser(u);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  // Subscribe to all activity for this user
  useEffect(() => {
    if (!user) {
      setActivity([]);
      return;
    }

    const unsubscribe = firestore()
      .collection("activity")
      .where("user.userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        const requests = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convierte createdAt y scheduledDateTime a Date
            createdAt: data.createdAt?.toDate(),
            scheduledDateTime: data.scheduledDateTime?.toDate(),
          };
        });
        setActivity(requests);
      });
    return () => unsubscribe();
  }, [user]);

  if (initializing) return null;

  return (
    <UserContext.Provider value={{ user, activity }}>
      {children}
    </UserContext.Provider>
  );
}
