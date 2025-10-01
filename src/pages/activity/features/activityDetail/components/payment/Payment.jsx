import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { styles } from "./PaymentStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "../../../../../../styles/globalStyles";
import { translateService } from "../../../../../../utils/formatHelpers";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const currentPayment = {
  paymentId: "p_001",
  activityId: "a_12345",
  clientId: "u_123",
  workerId: "w_456",
  status: "paid", // "pending" | "pending-approve" | "paid" | "failed"
  method: "card", // "efectivo" | "tarjeta" | "mercado_pago"
  transactionId: "mp_98765",
  services: [
    { category: "plumbing", amount: 24000 },
    { category: "service_fee", amount: 1000 },
  ],
  totalAmount: 25000,
  createdAt: "2025-08-20T20:10:35.000Z",
  updatedAt: "2025-08-20T20:12:00.000Z",
};

const Payment = ({ payment }) => {
  const [expanded, setExpanded] = useState(false);
  const paymentMethods = [
    { id: "cash", label: "Efectivo", color: colors.green },
    { id: "card", label: "Tarjeta débito / crédito", color: colors.primary },
    { id: "mercado_pago", label: "Mercado Pago", color: colors.blue },
  ];

  const currentMethod = paymentMethods.find(
    (m) => m.id === currentPayment.method
  ) || {
    label: currentPayment.method,
    color: colors.black,
  };

  const isNoPayment =
    !currentPayment ||
    currentPayment.status === "pending" ||
    currentPayment.status === "pending-approve";

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.activityDetails__payment__mainContainer}>
      <Pressable
        style={styles.activityDetails__payment__header}
        onPress={() => {
          if (!isNoPayment) toggleExpand();
        }}
      >
        <View style={styles.activityDetails__payment__headerLeft}>
          <FontAwesome6 name="receipt" size={18} color={colors.black} />
          <Text style={styles.activityDetails__payment__title}>
            {isNoPayment ? "Aún no hay pago" : "Ver pago"}
          </Text>
        </View>

        {!isNoPayment && (
          <FontAwesome6
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.black}
          />
        )}
      </Pressable>

      {!isNoPayment && expanded && (
        <View style={styles.activityDetails__payment__content}>
          {currentPayment.services.map((s, index) => (
            <View key={index} style={styles.activityDetails__payment__row}>
              <Text style={styles.activityDetails__payment__label}>
                {s.category === "service_fee"
                  ? "Tarifa de servicio"
                  : `Trabajo de ${translateService(s.category).toLowerCase()}`}
              </Text>
              <Text style={styles.activityDetails__payment__amount}>
                ${s.amount.toLocaleString("es-AR")}
              </Text>
            </View>
          ))}

          <View style={styles.activityDetails__payment__row}>
            <Text style={styles.activityDetails__payment__totalLabel}>
              Total
            </Text>
            <Text style={styles.activityDetails__payment__totalAmount}>
              ${currentPayment.totalAmount.toLocaleString("es-AR")}
            </Text>
          </View>

          {/* Método */}
          <View style={styles.activityDetails__payment__methodContainer}>
            <Text style={styles.activityDetails__payment__methodTitle}>
              Método de pago
            </Text>
            <View
              style={[
                styles.activityDetails__payment__methodChip,
                {
                  borderColor: currentMethod.color,
                  backgroundColor: currentMethod.color + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.activityDetails__payment__methodText,
                  { color: currentMethod.color },
                ]}
              >
                {currentMethod.label}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Payment;
