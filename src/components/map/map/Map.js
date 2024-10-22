import React, { forwardRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./features/mapStyle";
import { mapConfig } from "./features/mapConfig";

const MapComponent = forwardRef(
  ({ region, markers, children, ...props }, ref) => {
    return (
      <MapView
        ref={ref}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType="standard"
        {...mapConfig}
        {...props}
      >
        {children}

        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          >
            {/* Si el marcador es para el hogar, usar un SVG personalizado */}
            {marker.type === "home" ? (
              <SvgHomeMarker /> // Componente SVG personalizado para el hogar
            ) : (
              // Otros marcadores pueden ser imágenes o íconos personalizados
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                // Ruta de tu imagen para los trabajadores
              />
            )}
          </Marker>
        ))}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
