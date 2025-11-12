import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import MapComponent from "../../../../components/map/map/Map";
import { styles } from "./MapStyles";
import { LocationContext } from "../../../../context/LocationContext";
import firestore from "@react-native-firebase/firestore";

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

const decodeGeohash = (hash) => {
  if (typeof hash !== "string" || !hash.length) return null;

  let evenBit = true;
  let lat = [-90.0, 90.0];
  let lng = [-180.0, 180.0];

  for (const char of hash.toLowerCase()) {
    const charIndex = BASE32.indexOf(char);
    if (charIndex === -1) return null;

    for (let mask = 16; mask >= 1; mask >>= 1) {
      if (evenBit) {
        const mid = (lng[0] + lng[1]) / 2;
        if (charIndex & mask) {
          lng[0] = mid;
        } else {
          lng[1] = mid;
        }
      } else {
        const mid = (lat[0] + lat[1]) / 2;
        if (charIndex & mask) {
          lat[0] = mid;
        } else {
          lat[1] = mid;
        }
      }
      evenBit = !evenBit;
    }
  }

  return {
    latitude: (lat[0] + lat[1]) / 2,
    longitude: (lng[0] + lng[1]) / 2,
  };
};

const Map = ({ onPress, postulants, onSelectWorker }) => {
  const mapRef = useRef(null);
  const { location } = useContext(LocationContext);
  const [workersWithLocation, setWorkersWithLocation] = useState([]);
  const workerLocationCache = useRef({});

  const fetchWorkerLocation = useCallback(async (uid) => {
    if (!uid) return null;

    try {
      const workersCollection = firestore().collection("workers");
      let workerDoc = await workersCollection.doc(uid).get();

      if (!workerDoc.exists) {
        const snapshot = await workersCollection
          .where("uid", "==", uid)
          .limit(1)
          .get();

        workerDoc = snapshot.docs[0];
      }

      if (!workerDoc?.exists) return null;

      const data = workerDoc.data() || {};
      return {
        lat: typeof data.lat === "number" ? data.lat : null,
        lng: typeof data.lng === "number" ? data.lng : null,
        geohash: data.geohash || null,
      };
    } catch (error) {
      console.error("Error fetching worker data for map:", error);
      return null;
    }
  }, []);

  const resolvePostulants = useCallback(
    async (postulations) => {
      const resolved = await Promise.all(
        postulations.map(async (postulation) => {
          const worker = postulation.worker;
          if (!worker?.uid) return null;

          let lat =
            typeof worker.lat === "number" ? worker.lat : undefined;
          let lng =
            typeof worker.lng === "number" ? worker.lng : undefined;
          let geohash =
            typeof worker.geohash === "string" ? worker.geohash : undefined;

          let cached = workerLocationCache.current[worker.uid];
          if (!cached) {
            cached = await fetchWorkerLocation(worker.uid);
            if (cached) {
              workerLocationCache.current[worker.uid] = cached;
            }
          }

          if (!geohash && cached?.geohash) {
            geohash = cached.geohash;
          }
          if (typeof lat !== "number" && typeof cached?.lat === "number") {
            lat = cached.lat;
          }
          if (typeof lng !== "number" && typeof cached?.lng === "number") {
            lng = cached.lng;
          }

          if (
            (typeof lat !== "number" || typeof lng !== "number") &&
            typeof geohash === "string"
          ) {
            const decoded = decodeGeohash(geohash);
            if (decoded) {
              lat = decoded.latitude;
              lng = decoded.longitude;
            }
          }

          if (typeof lat !== "number" || typeof lng !== "number") return null;

          return {
            ...worker,
            uid: worker.uid,
            lat,
            lng,
            price: postulation.budget,
            message: postulation.message,
          };
        })
      );

      return resolved.filter(Boolean);
    },
    [fetchWorkerLocation]
  );

  useEffect(() => {
    let isMounted = true;

    const loadWorkers = async () => {
      const resolved = await resolvePostulants(postulants || []);
      if (isMounted) {
        setWorkersWithLocation(resolved);
      }
    };

    loadWorkers();

    return () => {
      isMounted = false;
    };
  }, [postulants, resolvePostulants]);

  const userLatitude = location?.geometry?.location?.lat || 0;
  const userLongitude = location?.geometry?.location?.lng || 0;

  const userLocation = {
    latitude: userLatitude,
    longitude: userLongitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const user = [
    {
      latitude: userLatitude,
      longitude: userLongitude,
      type: "home",
    },
  ];

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <MapComponent
        ref={mapRef}
        initialRegion={userLocation}
        user={user}
        workers={workersWithLocation}
        onSelectWorker={onSelectWorker}
        workerType="postulant"
      />
      <View style={styles.home__map__marker}></View>
    </Pressable>
  );
};

export default Map;
