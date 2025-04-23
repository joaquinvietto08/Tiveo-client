import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getIcon } from "../../utils/getIcons";
import {
  translateService,
  translateStatus,
  formatDate,
  formatTime,
  formatPrice,
} from "../../utils/formatHelpers";
import { colors } from "../../styles/globalStyles";

//temporal
import Valentino from "../../../assets/images/data/7.png";
import Luciano from "../../../assets/images/data/2.png";
import Calixto from "../../../assets/images/data/3.png";

//temporal
const workerImages = {
  7: Valentino,
  2: Luciano,
  3: Calixto,
};

const formatPriceByStatus = (price, status) => {
  if (status === "on-progress" || status === "scheduled") {
    return "Pendiente";
  }
  if (status === "finished") {
    if (price === null) {
      return "Pago no registrado";
    }
    return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  return "";
};

const translateReservePaymentType = (paymentType) => {
  if (paymentType === "cash") {
    return "Efectivo";
  }
  if (paymentType === "credit_card") {
    return "Crédito";
  }
};

const translatePaymentType = (paymentType) => {
  if (paymentType === "cash") {
    return "Efectivo";
  }
  if (paymentType === "credit_card") {
    return "Crédito";
  }
};

const ActivityDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { data } = route.params;
  const IconComponent = getIcon(data.service);
  const workerImageSource = workerImages[data.worker.workerId];
  const [arrowUp, setArrowUp] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setArrowUp(!arrowUp);
    Animated.timing(animation, {
      toValue: arrowUp ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, data.price === null ? 100 : 200],
    }),
  };

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.arrowContainer}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text style={{ fontSize: 17 }}>Detalles de trabajo</Text>
        </View>
        <View style={styles.main_infoContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}
              >
                Trabajo de {translateService(data.service)}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "light", marginRight: 3 }}
                >
                  {translateStatus(data.status)}
                </Text>
                {data.status === "scheduled" && (
                  <Ionicons name="time-outline" size={22} color="black" />
                )}
              </View>
            </View>
            <IconComponent />
          </View>
          <View style={styles.workerContainer}>
            <View style={{ alignItems: "flex-end", width: "45%" }}>
              <Image source={workerImageSource} style={styles.workerImage} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 17 }} numberOfLines={2}>
                {data.worker.firstName} {data.worker.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.text_dateTime}>
              {formatDate(data.dateTime)} • {formatTime(data.dateTime)} hs
            </Text>
          </View>
          {data.status !== "cancelled" && (
            <View style={styles.priceContainer}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {formatPriceByStatus(data.price, data.status)}
              </Text>
            </View>
          )}

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, marginLeft: 10 }}>
                  {data.address.street} {data.address.floor}
                  {data.address.apartment} {data.address.instructions}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.detailsContainer, marginBottom: 20 }}>
              {data.place === "at-home" && (
                <Foundation name="home" size={26} color="black" />
              )}
              {data.place === "on-site" && (
                <FontAwesome6 name="shop" size={20} color="black" />
              )}
              <Text style={{ fontSize: 17, marginLeft: 10 }}>
                {data.place === "at-home"
                  ? "Trabajo a domicilio"
                  : "Trabajo en sitio"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 17, color: "#606060" }}>Descripcion:</Text>
            <View style={styles.descriptionContainer}>
              <Text style={{ fontSize: 16, color: "#606060" }}>
                {data.description ? data.description : "No hay descripción"}
              </Text>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          <View>
            <Pressable
              style={{
                ...styles.detailsContainer,
                justifyContent: "space-between",
              }}
              onPress={handlePress}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="receipt"
                  size={24}
                  color="black"
                />
                <Text style={{ fontSize: 17, marginLeft: 10 }}>Ver pago</Text>
              </View>

              <MaterialIcons
                name={arrowUp ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={34}
                color="black"
              />
            </Pressable>
            <Animated.View
              style={[styles.main_paymentContainer, animatedStyle]}
            >
              <View
                style={{ ...styles.payment_detailsContainer, marginBottom: 15 }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Metodo de pago
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5 name="money-bill" size={24} color="#0E8A22" />
                  <Text
                    style={{ fontWeight: "bold", fontSize: 15, marginLeft: 5 }}
                  >
                    {translateReservePaymentType(data.reservePaymentType)}
                  </Text>
                </View>
              </View>
              <View style={styles.payment_detailsContainer}>
                <Text style={{ fontSize: 15 }}>Reserva</Text>
                <Text style={{ fontSize: 15 }}>
                  {formatPrice(data.reservePrice)}
                </Text>
              </View>
              <View
                style={{ ...styles.payment_detailsContainer, marginBottom: 15 }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Metodo de pago
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5 name="money-bill" size={24} color="#0E8A22" />
                  <Text
                    style={{ fontWeight: "bold", fontSize: 15, marginLeft: 5 }}
                  >
                    {translatePaymentType(data.paymentType)}
                  </Text>
                </View>
              </View>
              <View style={styles.payment_detailsContainer}>
                <Text style={{ fontSize: 15 }}>Servicio</Text>
                <Text style={{ fontSize: 15 }}>{formatPrice(data.price)}</Text>
              </View>
            </Animated.View>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  arrowContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  main_infoContainer: {
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 7,
    padding: 15,
    marginBottom: 60,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  workerContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  workerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: "cover",
  },
  nameContainer: {
    marginLeft: 15,
    justifyContent: "center",
    width: "55%",
  },
  lineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#BFBFBF",
    marginVertical: 30,
  },
  dateTimeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  text_dateTime: {
    color: "#606060",
    fontSize: 14,
  },
  priceContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    width: "85%",
    alignSelf: "center",
    marginTop: 6,
  },
  main_paymentContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  payment_detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ActivityDetail;
