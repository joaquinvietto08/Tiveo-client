import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Electricity from "../../assets/svgs/home/electricity";
import Plumbing from "../../assets/svgs/home/plumbing";
import Gas from "../../assets/svgs/home/gas";
import Gardening from "../../assets/svgs/home/gardening";
import Locksmith from "../../assets/svgs/home/locksmith";
import Painting from "../../assets/svgs/home/painting";
import Construction from "../../assets/svgs/home/construction";
import Pool from "../../assets/svgs/home/pool";
import Carpentry from "../../assets/svgs/home/carpentry";
import Glass from "../../assets/svgs/home/glass";
import Pets from "../../assets/svgs/home/pets";
import Security from "../../assets/svgs/home/security";
import Ironwork from "../../assets/svgs/home/ironwork";
import Technology from "../../assets/svgs/home/technology";
import Beauty from "../../assets/svgs/home/beauty";
import Vehicles from "../../assets/svgs/home/vehicles";
import Freight from "../../assets/svgs/home/freight";
import Events from "../../assets/svgs/home/events";
import Photography from "../../assets/svgs/home/photography";
import Music from "../../assets/svgs/home/music";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const services = [
  { key: "1", icon: Electricity, name: "Electricidad" },
  { key: "2", icon: Plumbing, name: "Plomeria" },
  { key: "3", icon: Gas, name: "Gas" },
  { key: "4", icon: Gardening, name: "Jardineria" },
  { key: "5", icon: Locksmith, name: "Cerrajeria" },
  { key: "6", icon: Painting, name: "Pintura" },
  { key: "7", icon: Construction, name: "Construccion" },
  { key: "8", icon: Pool, name: "Pileta" },
  { key: "9", icon: Carpentry, name: "Carpinteria" },
  { key: "10", icon: Glass, name: "Vidrios" },
  { key: "11", icon: Pets, name: "Mascotas" },
  { key: "12", icon: Security, name: "Seguridad" },
  { key: "13", icon: Ironwork, name: "Herreria" },
  { key: "14", icon: Technology, name: "Tecnologia" },
  { key: "15", icon: Beauty, name: "Belleza" },
  { key: "16", icon: Vehicles, name: "Vehiculos" },
  { key: "17", icon: Freight, name: "Fletes" },
  { key: "18", icon: Events, name: "Eventos" },
];

const services2 = [
  { key: "19", icon: Photography, name: "Fotografia" },
  { key: "20", icon: Music, name: "Musica" },
];

const ServiceButton = ({ item }) => (
  <View style={styles.service_buttonView}>
    <Pressable
      android_ripple={{ color: "#E2E2E2", borderless: true }}
      style={styles.serviceButton}
    >
      <item.icon style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{item.name}</Text>
    </Pressable>
  </View>
);

const ServiceButton2 = ({ item }) => (
  <View style={styles.service_buttonView2}>
    <Pressable
      android_ripple={{ color: "#E2E2E2", borderless: true }}
      style={styles.serviceButton2}
    >
      <item.icon style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{item.name}</Text>
    </Pressable>
  </View>
);

const Services = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_servicesContainer}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Servicios</Text>
          <View style={styles.servicesContainer}>
            {services.map((item) => (
              <ServiceButton key={item.key} item={item} />
            ))}
          </View>
          <View style={styles.servicesContainer2}>
            {services2.map((item) => (
              <ServiceButton2 key={item.key} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  scrollViewContainer: {},
  main_servicesContainer: {
    marginTop: 70,
    alignItems: "center",
    marginBottom: 120,
    paddingHorizontal: 20,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 35,
    width: "100%",
  },
  service_buttonView: {
    borderRadius: 7,
    marginVertical: 7,
    width: "31%",
    height: 105,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceButton: {
    width: "100%",
    height: 105,
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
  },
  serviceIcon: {},
  serviceName: {
    fontWeight: "light",
    fontSize: 14,
    bottom: 14,
    position: "absolute",
  },
  servicesContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "66%",
  },
  service_buttonView2: {
    borderRadius: 7,
    marginVertical: 7,
    width: "47%",
    height: 105,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceButton2: {
    width: "100%",
    height: 105,
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
  },
});

export default Services;
