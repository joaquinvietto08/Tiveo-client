import React, { createContext, useContext, useEffect, useState } from "react";
import * as geofire from "geofire-common";
import { workers } from "../components/data/workersData";
import { LocationContext } from "./LocationContext";

// Crear el contexto
export const NearbyWorkersContext = createContext();

// Proveedor del contexto
export const NearbyWorkersProvider = ({ children }) => {
  const { location } = useContext(LocationContext);
  const [nearbyWorkers, setNearbyWorkers] = useState([]);

  const radiusInKm = 1;

  // Función para actualizar manualmente la lista de trabajadores cercanos
  const fetchNearbyWorkers = () => {
    if (!location) return;

    const radiusInM = radiusInKm * 1000;
    const nearby = [];

    // Calcular los límites de geohash para el área de búsqueda
    const bounds = geofire.geohashQueryBounds(
      [location.geometry.location.lat, location.geometry.location.lng],
      radiusInM
    );

    workers.forEach((worker) => {
      const { geohash: workerGeohash } = worker;

      const isInBounds = bounds.some(
        ([start, end]) => workerGeohash >= start && workerGeohash <= end
      );

      if (isInBounds) {
        nearby.push(worker);
      }
    });

    setNearbyWorkers(nearby);
  };

  useEffect(() => {
    fetchNearbyWorkers();
  }, [location, radiusInKm]);

  return (
    <NearbyWorkersContext.Provider
      value={{
        nearbyWorkers,
        fetchNearbyWorkers,
      }}
    >
      {children}
    </NearbyWorkersContext.Provider>
  );
};

export const useNearbyWorkers = () => useContext(NearbyWorkersContext);
