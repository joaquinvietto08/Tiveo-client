import { View, Text } from "react-native";
import { styles } from "./FooterStyles";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/globalStyles";
import { startCheckout } from "../../utils/firebasePayment";
import LoadingButton from "../../../../components/inputs/loadingButton/LoadingButton";

const Footer = ({ onRequestScrollToBottom, setBlockBack, onSuccess, setSuccesMessage }) => {
  const [selectedMethod, setSelectedMethod] = useState("efectivo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paymentMethods = [
    { id: "efectivo", label: "Efectivo", color: colors.green },
    { id: "tarjeta", label: "Tarjeta débito / crédito", color: colors.primary },
    { id: "mercado_pago", label: "Mercado Pago", color: colors.blue },
  ];

  const handlePay = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    try {
      if (selectedMethod === "efectivo") {
        setLoading(false);
        setBlockBack(false);
        onSuccess();
        setSuccesMessage("Entregale el dinero en efectivo al trabajador")
      } else {
        await startCheckout({
          id: "1234545",
          title: "Trabajo de Carlos José",
          unit_price: 4000,
          onOkay: () => {
            setLoading(false);
            setTimeout(() => {
              onSuccess();
              setBlockBack(false);
            }, 1100);
          },
          onCancel: () => {
            setLoading(false);
            setBlockBack(false);
          },
          onError: () => {
            setLoading(false);
            setBlockBack(false);
            setTimeout(() => {
              setError("Algo salio mal, intentalo nuevamente");
            }, 1100);
            setTimeout(() => {
              setError(null);
            }, 4000);
          },
        });
      }
    } catch (error) {
      setLoading(false);
      setBlockBack(false);
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
                  backgroundColor: isSelected
                    ? method.color + "20"
                    : "transparent",
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
      {error && (
        <View style={styles.payment__footer__errorContainer}>
          <Text style={styles.payment__footer__errorText}>{error}</Text>
        </View>
      )}
      <LoadingButton
        text="Pagar"
        loading={loading}
        onPress={handlePay}
        paddingBottom={20}
      />
    </View>
  );
};

export default Footer;
