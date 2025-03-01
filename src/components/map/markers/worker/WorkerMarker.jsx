import React from "react";
import { View, Image, StyleSheet, Text} from "react-native";
import { getIcon } from "../../../../utils/getIcons";

const WorkerMarker = ({ worker }) => {
  const displayedServices = worker.services.slice(0, 2);
  const extraServicesCount = worker.services.length - displayedServices.length;

  return (
    <View style={styles.markerContainer}>
      <Image source={worker.photoURL} style={styles.workerImage} />
      <View style={styles.servicesContainer}>
        {extraServicesCount > 0 && (
          <View style={styles.serviceIcon}>
            <Text style={styles.extraText}>+{extraServicesCount}</Text>
          </View>
        )}
        {displayedServices.map((service, index) => {
          const ServiceIcon = getIcon(service.service); // Obtén el ícono correspondiente
          return (
            <View key={index} style={styles.serviceIcon}>
              <ServiceIcon width={16} height={16} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 68,
    height: 56,
    alignItems: "center",
  },
  workerImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },
  servicesContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: -8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  extraText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 3,
  },
});

export default WorkerMarker;
