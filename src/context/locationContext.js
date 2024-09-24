import React, { createContext, useState } from "react";

// Crear el contexto
export const LocationContext = createContext();

// Proveedor del contexto
export const LocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState(null); // Estado inicial de la ubicación

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};
