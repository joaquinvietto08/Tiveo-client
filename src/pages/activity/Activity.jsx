import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import electricity from "../../../assets/svgs/home/electricity";
import plumbing from "../../../assets/svgs/home/plumbing";
import gas from "../../../assets/svgs/home/gas";
import gardening from "../../../assets/svgs/home/gardening";
import locksmith from "../../../assets/svgs/home/locksmith";
import painting from "../../../assets/svgs/home/painting";
import construction from "../../../assets/svgs/home/construction";
import pool from "../../../assets/svgs/home/pool";
import carpentry from "../../../assets/svgs/home/carpentry";
import glass from "../../../assets/svgs/home/glass";
import pets from "../../../assets/svgs/home/pets";
import security from "../../../assets/svgs/home/security";
import ironwork from "../../../assets/svgs/home/ironwork";
import technology from "../../../assets/svgs/home/technology";
import beauty from "../../../assets/svgs/home/beauty";
import vehicles from "../../../assets/svgs/home/vehicles";
import freight from "../../../assets/svgs/home/freight";
import events from "../../../assets/svgs/home/events";
import photography from "../../../assets/svgs/home/photography";
import music from "../../../assets/svgs/home/music";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import activityData from "../../components/data/activityData";
import Ionicons from "@expo/vector-icons/Ionicons";

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("es-AR", { month: "short", day: "numeric" });
};

const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const serviceIcons = {
  electricity,
  plumbing,
  gas,
  gardening,
  locksmith,
  painting,
  construction,
  pool,
  carpentry,
  glass,
  pets,
  security,
  ironwork,
  technology,
  beauty,
  vehicles,
  freight,
  events,
  photography,
  music,
};

const translateService = (service) => {
  const serviceMap = {
    electricity: "Electricidad",
    plumbing: "Plomeria",
    gas: "Gas",
    gardening: "Jardineria",
    locksmith: "Cerrajeria",
    painting: "Pintura",
    construction: "Construccion",
    pool: "Pileta",
    carpentry: "Carpinteria",
    glass: "Vidrios",
    pets: "Mascotas",
    security: "Seguridad",
    ironwork: "Herreria",
    technology: "Tecnologia",
    beauty: "Belleza",
    vehicles: "Vehiculos",
    freight: "Fletes",
    events: "Eventos",
    photography: "Fotografia",
    music: "Musica",
  };

  return serviceMap[service] || service;
};

const formatPrice = (price) => {
  if (price === null) {
    return "Pago no registrado";
  }
  return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const translateStatus = (status) => {
  const statusMap = {
    pending: "Pendiente",
    cancelled: "Cancelado",
    finished: "Finalizado",
    scheduled: "Programado",
  };

  return statusMap[status] || status;
};

const Activity = ({ navigation }) => {
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
        <View style={styles.main_activityContainer}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Actividad</Text>
          <View style={styles.activityContainer}>
            {activityData.map((data) => {
              const IconComponent = serviceIcons[data.service];
              const statusStyle =
                data.status !== "pending" && data.status !== "scheduled";
              return (
                <View key={data.id} style={styles.main_activityButton}>
                  <View
                    style={[
                      styles.activity_buttonView,
                      statusStyle && { borderRadius: 7 },
                    ]}
                  >
                    <Pressable
                      android_ripple={{ color: "#E2E2E2", borderless: true }}
                      style={styles.activityButton}
                      onPress={() =>
                        navigation.navigate("ActivityDetail", { data })
                      }
                    >
                      <View style={styles.iconContainer}>
                        <IconComponent />
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1,
                        }}
                      >
                        <View style={styles.main_infoContainer}>
                          <View style={styles.infoContainer}>
                            <View style={styles.serviceContainer}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                                numberOfLines={2}
                              >
                                {translateService(data.service)}
                              </Text>
                              {data.status === "finished" && (
                                <Text>{formatPrice(data.price)}</Text>
                              )}
                            </View>
                            <View style={styles.timeContainer}>
                              {data.status === "scheduled" && (
                                <Ionicons
                                  name="time-outline"
                                  size={24}
                                  color="black"
                                />
                              )}
                            </View>
                          </View>

                          <View style={styles.statusContainer}>
                            <View style={styles.dateTimeContainer}>
                              <Text style={styles.text_dateTime}>
                                {formatDate(data.dateTime)} •{" "}
                                {formatTime(data.dateTime)} hs
                              </Text>
                            </View>
                            <Text>{translateStatus(data.status)}</Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                  {data.status === "scheduled" && (
                    <View style={styles.optionContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? "#BFBFBF" : "#FFFFFF",
                          },
                          styles.cancellButton,
                        ]}
                      >
                        <Text style={{ color: "red" }}>Cancelar</Text>
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? "#BFBFBF" : "#FFFFFF",
                          },
                          styles.messagesButton,
                        ]}
                      >
                        <Text>Mensajes</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  scrollViewContainer: {},
  main_activityContainer: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  activityContainer: {
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 120,
    width: "100%",
  },
  main_activityButton: {
    marginBottom: 22,
  },
  activity_buttonView: {
    //   borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: 91,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 2,
    marginBottom: -5,
  },
  activityButton: {
    height: 91,
    width: "100%",
    flexDirection: "row",
    padding: 13,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
    backgroundColor: "#F4F4F4",
    borderRadius: 7,
  },
  main_infoContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  serviceContainer: {
    width: "80%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  timeContainer: {
    width: 25,
    height: 25,
  },
  dateTimeContainer: { flexDirection: "row" },
  text_dateTime: {
    color: "#606060",
    fontSize: 13,
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionContainer: {
    height: 50,
    flexDirection: "row",
    zIndex: 1,
    overflow: "hidden",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#BFBFBF",
  },
  cancellButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#BFBFBF",
  },
  messagesButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
