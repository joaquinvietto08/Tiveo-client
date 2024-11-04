import React, { createContext, useContext, useEffect, useState } from "react";
import * as geofire from "geofire-common";
import { workers } from "../components/data/workersData";
import { LocationContext } from "../context/LocationContext";

// Crear el contexto
export const NearbyWorkersContext = createContext();

// Proveedor del contexto
export const NearbyWorkersProvider = ({ children }) => {
  const { location } = useContext(LocationContext); // Obtenemos la ubicación actual del usuario
  const [workersInSiteLocation, setWorkersInSiteLocation] = useState([]);
  const [workersInGeneralLocation, setWorkersInGeneralLocation] = useState([]);

  const radiusInKm = 1;

  // Función para actualizar manualmente la lista de trabajadores cercanos
  const fetchNearbyWorkers = () => {
    if (!location) return;

    const radiusInM = radiusInKm * 1000;
    const nearbyWorkersInSite = [];
    const nearbyWorkersInGeneral = [];

    // Calcular los límites de geohash para el área de búsqueda
    const bounds = geofire.geohashQueryBounds(
      [location.geometry.location.lat, location.geometry.location.lng],
      radiusInM
    );

    workers.forEach((worker) => {
      const { geohash: workerGeohash, services } = worker;

      const isInBounds = bounds.some(
        ([start, end]) => workerGeohash >= start && workerGeohash <= end
      );

      if (!isInBounds) return;

      let isAtServiceLocation = false;
      services.forEach((service) => {
        if (
          (service.serviceType === "onsite" ||
            service.serviceType === "flexible") &&
          service.geohash === workerGeohash
        ) {
          isAtServiceLocation = true;
        }
      });

      if (isAtServiceLocation) {
        nearbyWorkersInSite.push(worker);
      } else {
        nearbyWorkersInGeneral.push(worker);
      }
    });

    setWorkersInSiteLocation(nearbyWorkersInSite);
    setWorkersInGeneralLocation(nearbyWorkersInGeneral);
  };

  useEffect(() => {
    // Actualizar la lista de trabajadores inicialmente cuando se monta el componente
    fetchNearbyWorkers();
  }, [location, radiusInKm]);

  return (
    <NearbyWorkersContext.Provider
      value={{
        workersInSiteLocation,
        workersInGeneralLocation,
        fetchNearbyWorkers, // Exponemos la función para ser llamada desde otros componentes
      }}
    >
      {children}
    </NearbyWorkersContext.Provider>
  );
};

export const useNearbyWorkers = () => useContext(NearbyWorkersContext);
