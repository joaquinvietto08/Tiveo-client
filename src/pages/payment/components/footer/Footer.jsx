import { View, Text } from "react-native";
import { styles } from "./FooterStyles";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/globalStyles";
import { startCheckout } from "../../utils/firebasePayment";

const Footer = () => {
  const [selectedMethod, setSelectedMethod] = useState("efectivo");

  const paymentMethods = [
    { id: "efectivo", label: "Efectivo", color: colors.green },
    { id: "tarjeta", label: "Tarjeta débito / crédito", color: colors.primary },
    { id: "mercado_pago", label: "Mercado Pago", color: colors.blue },
  ];

  const handlePay = (method) => {
    if (method === "efectivo") {
      console.log("Pago en efectivo seleccionado");
    } else {
      startCheckout({
        id: "1234545",
        title: "Trabajo de Carlos José",
        unit_price: 4000,
      });
    }
  };

  return (
    <View style={styles.payment__footer__container}>
      <View style={styles.payment__footer__methods}>
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.payment__footer__methodButton,
                {
                  borderColor: isSelected ? method.color : "#ccc",
                  backgroundColor: isSelected ? method.color + "20" : "transparent",
                },
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text
                style={[
                  styles.payment__footer__methodText,
                  isSelected && {
                    color: method.color,
                    fontWeight: "bold",
                  },
                ]}
              >
                {method.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.payment__footer__payButton}
        onPress={handlePay}
        disabled={!selectedMethod}
      >
        <Text style={styles.payment__footer__payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;