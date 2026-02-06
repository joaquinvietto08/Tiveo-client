import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./features/mapStyle";
import { mapConfig } from "./features/mapConfig";
import HomeMarker from "../markers/home/Home";
import WorkerMarker from "../markers/worker/WorkerMarker";
import PostulantMarker from "../markers/postulant/PostulantMarker";

const MapComponent = forwardRef(
  ({ region, user, workers, workerType, children, ...props }, ref) => {
    return (
      <MapView
        ref={ref}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType="standard"
        userInterfaceStyle="light"
        {...mapConfig}
        {...props}
      >
        {children}

        {user?.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
          >
            {user.type === "home" ? <HomeMarker /> : null}
          </Marker>
        ))}

        {workers?.map((worker, index) => (
          <WorkerMapMarker
            key={`worker-${worker?.uid || index}`}
            worker={worker}
            workerType={workerType}
            onSelectWorker={props.onSelectWorker}
          />
        ))}
      </MapView>
    );
  }
);

const WorkerMapMarker = ({ worker, workerType, onSelectWorker }) => {
  const hasRemotePhoto =
    typeof worker?.photoURL === "string" && worker.photoURL?.length > 0;
  const [tracksChanges, setTracksChanges] = useState(hasRemotePhoto);
  const timeoutRef = useRef(null);

  const handleImageLoaded = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Delay para que la imagen termine de pintarse antes de congelar (evita difuso)
    timeoutRef.current = setTimeout(() => setTracksChanges(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePress = useCallback(() => {
    onSelectWorker?.(worker?.uid);
  }, [onSelectWorker, worker?.uid]);

  return (
    <Marker
      coordinate={{ latitude: worker.lat, longitude: worker.lng }}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={tracksChanges}
      onPress={handlePress}
    >
      {workerType === "postulant" ? (
        <PostulantMarker postulant={worker} />
      ) : (
        <WorkerMarker worker={worker} onImageLoaded={handleImageLoaded} />
      )}
    </Marker>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
