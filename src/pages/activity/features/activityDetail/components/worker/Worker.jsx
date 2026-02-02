import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./WorkerStyles";
import { formatPrice, formatDate, formatTime } from "../../../../../../utils/formatHelpers";
const Worker = ({ worker, createdAt, price, budget, status, moment, paymentStatus, totalAmount }) => {

  const hasBudget = budget !== undefined && budget !== null;
  const hasPrice = price !== undefined && price !== null;
  const hasTotal = totalAmount !== undefined && totalAmount !== null;

  const getPriceText = () => {
    if (paymentStatus === "paid" && hasTotal) return formatPrice(totalAmount);
    if (paymentStatus === "paid" && hasPrice) return formatPrice(price);
    if (hasBudget && paymentStatus !== "paid") return `Presupuesto ${formatPrice(budget)}`;
    return hasPrice ? formatPrice(price) : "Precio a definir";
  };

  const hasAnyValue = hasBudget || hasPrice || hasTotal;

  const getSubtitle = () => {
    switch (status) {
      case "pending":
        return "Esperando confirmación";
      case "done":
        if (
          paymentStatus === "pending" ||
          paymentStatus === "pending-approve" ||
          paymentStatus === "created"
        )
          return "Realizar pago";
        return "Trabajo realizado por";
      case "going":
        return "Trabajador en camino";
      case "on-progress":
        return "Trabajo siendo realizado por";
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
        source={{ uri: worker.photoURL }}
        style={styles.activityDetails__worker__avatar}
      />

      <Text style={styles.activityDetails__worker__name}>{worker.firstName} {worker.lastName}</Text>
      <Text style={styles.activityDetails__worker__workerName}>{worker.workerName}</Text>

      <Text style={styles.activityDetails__worker__date}>{formatDate(createdAt)} •{" "}{formatTime(createdAt)}</Text>

      <Text
        style={
          hasAnyValue
            ? styles.activityDetails__worker__price
            : styles.activityDetails__worker__pricePlaceholder
        }
      >
        {getPriceText()}
      </Text>
    </View>
  );
};

export default Worker;
