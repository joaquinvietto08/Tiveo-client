import React, { createContext, useContext, useEffect, useState } from "react";
import * as geofire from "geofire-common";
import firestore from "@react-native-firebase/firestore";
import { LocationContext } from "./LocationContext";

// Crear el contexto
export const NearbyWorkersContext = createContext();

// Proveedor del contexto
export const NearbyWorkersProvider = ({ children }) => {
  const { location } = useContext(LocationContext);
  const [nearbyWorkers, setNearbyWorkers] = useState([]);

  const radiusInKm = 1;

  // Función para actualizar manualmente la lista de trabajadores cercanos
  const fetchNearbyWorkers = async () => {
    const latitude = location?.geometry?.location?.lat;
    const longitude = location?.geometry?.location?.lng;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      setNearbyWorkers([]);
      return;
    }

    try {
      const center = [latitude, longitude];
      const radiusInM = radiusInKm * 1000;
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const queries = bounds.map(([start, end]) =>
        firestore()
          .collection("workers")
          .orderBy("geohash")
          .startAt(start)
          .endAt(end)
          .get()
      );

      const snapshots = await Promise.all(queries);
      const nearby = [];
      const seenWorkerIds = new Set();

      snapshots.forEach((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (seenWorkerIds.has(doc.id)) return;

          const data = doc.data();
          const workerGeohash = data?.geohash;
          if (!workerGeohash) return;

          const workerStatus = (data?.status || "").toLowerCase();
          if (workerStatus === "inactive") return;

          const lat =
            typeof data?.lat === "number"
              ? data.lat
              : typeof data?.location?.lat === "number"
              ? data.location.lat
              : typeof data?.location?.latitude === "number"
              ? data.location.latitude
              : null;

          const lng =
            typeof data?.lng === "number"
              ? data.lng
              : typeof data?.location?.lng === "number"
              ? data.location.lng
              : typeof data?.location?.longitude === "number"
              ? data.location.longitude
              : null;

          if (lat === null || lng === null) return;

          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          if (distanceInKm > radiusInKm) return;

          const normalizedStatus =
            workerStatus === "active" ? "available" : workerStatus || "busy";

          const services = Array.isArray(data?.services) ? data.services : [];

          seenWorkerIds.add(doc.id);
          nearby.push({
            ...data,
            uid: data?.uid || doc.id,
            lat,
            lng,
            status: normalizedStatus,
            firstName: data?.firstName || data?.name || data?.workerName || "",
            lastName: data?.lastName || "",
            name: data?.name || data?.firstName || "",
            workerName: data?.workerName || data?.name || "",
            photoURL: data?.photoURL || data?.photo || "",
            services,
          });
        });
      });

      setNearbyWorkers(nearby);
    } catch (error) {
      console.error("Error fetching nearby workers:", error);
      setNearbyWorkers([]);
    }
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
