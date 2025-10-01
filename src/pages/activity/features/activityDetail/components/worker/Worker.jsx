import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./WorkerStyles";
import { formatPrice, formatDate, formatTime } from "../../../../../../utils/formatHelpers";
const Worker = ({  worker, createdAt, price, status, moment, paymentStatus }) => {
  // ⚠️ Mock de imagen (después reemplazás con worker.profilePicture o workerId)
  const mockImage =
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg";

  const hasPrice = price !== undefined && price !== null;
  const fullName = `${worker.firstName} ${worker.lastName}`;

  const getSubtitle = () => {
    switch (status) {
      case "pending":
        return "Esperando confirmación";
      case "done":
        if (paymentStatus === "pending") return "Realizar pago";
        if (paymentStatus === "pending-approve") return "Modificar pago";
        return "Trabajo realizado por";
      case "on-going":
        return "Trabajador en camino";
      case "confirm":
        return moment === "scheduled"
          ? "Trabajo programado"
          : "Trabajo confirmado";
      case "cancelled":
        return "Cancelado";
      default:
        return "Trabajo realizado por";
    }
  };


  return (
    <View style={styles.activityDetails__worker__mainContainer}>
      <Text style={styles.activityDetails__worker__subtitle}>
        {getSubtitle()}
      </Text>

      <Image
        source={{ uri: mockImage }}
        style={styles.activityDetails__worker__avatar}
      />

      <Text style={styles.activityDetails__worker__name}>{fullName}</Text>

      <Text style={styles.activityDetails__worker__date}>{formatDate(createdAt)} •{" "}{formatTime(createdAt)}</Text>

      <Text
        style={
          hasPrice
            ? styles.activityDetails__worker__price
            : styles.activityDetails__worker__pricePlaceholder
        }
      >
        {hasPrice ? formatPrice(price) : "Precio a definir"}
      </Text>
    </View>
  );
};

export default Worker;
