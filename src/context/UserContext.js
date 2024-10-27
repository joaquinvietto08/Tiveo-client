import React, { useState, useEffect, createContext } from "react";
import auth from "@react-native-firebase/auth";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
