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
import { usePayment } from "../../../../../../hooks/usePayment";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Payment = ({ activityId, paymentStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const { payment, loading } = usePayment(activityId);

  const isPendingStatus =
    paymentStatus === "pending" || paymentStatus === "pending-approve";
  const isCreatedStatus = paymentStatus === "created";

  const isNoPayment =
    !payment || isPendingStatus || payment?.status === "pending" || loading;

  const getPendingLabel = () => {
    if (loading) return "Cargando pago...";
    if (isCreatedStatus) {
      return "Estamos preparando el pago.";
    }
    if (isPendingStatus || !payment) {
      return "Aún no hay pago. Pídele al trabajador que genere el cobro al finalizar su trabajo.";
    }
    return null;
  };

  const toggleExpand = () => {
    if (isNoPayment) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  const renderServices = () => {
    if (!payment?.services?.length) return null;

    const hideServiceAmounts = payment.services.every(
      (service) => Number(service.amount || 0) === 0
    );

    return payment.services.map((s, index) => {
      const amount = Number(s.amount || 0);
      return (
        <View key={index} style={styles.activityDetails__payment__row}>
          <Text style={styles.activityDetails__payment__label}>
            {s.category === "service_fee"
              ? "Tarifa de servicio"
              : `Trabajo de ${translateService(
                  s.category || "servicio"
                ).toLowerCase()}`}
          </Text>
          <Text style={styles.activityDetails__payment__amount}>
            {hideServiceAmounts ? "" : `$${amount.toLocaleString("es-AR")}`}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.activityDetails__payment__mainContainer}>
      <Pressable
        style={styles.activityDetails__payment__header}
        onPress={toggleExpand}
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

      {isNoPayment && (
        <Text style={styles.activityDetails__payment__pendingMessage}>
          {getPendingLabel()}
        </Text>
      )}

      {!isNoPayment && expanded && (
        <View style={styles.activityDetails__payment__content}>
          {renderServices()}

          <View style={styles.activityDetails__payment__row__total}>
            <Text style={styles.activityDetails__payment__totalLabel}>
              Total
            </Text>
            <Text style={styles.activityDetails__payment__totalAmount}>
              ${Number(payment?.totalAmount || 0).toLocaleString("es-AR")}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Payment;
