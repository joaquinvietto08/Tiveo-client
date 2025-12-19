import { View, Text } from "react-native";
import { styles } from "./FooterStyles";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/globalStyles";
import { startCheckout } from "../../utils/firebasePayment";
import LoadingButton from "../../../../components/inputs/loadingButton/LoadingButton";

const Footer = ({
  payment,
  workerName,
  onRequestScrollToBottom,
  setBlockBack,
  onSuccess,
  setSuccesMessage,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("efectivo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paymentMethods = [
    { id: "efectivo", label: "Efectivo", color: colors.green },
    { id: "tarjeta", label: "Tarjeta débito / crédito", color: colors.primary },
    { id: "mercado_pago", label: "Mercado Pago", color: colors.blue },
  ];

  useEffect(() => {
    if (payment?.method) {
      setSelectedMethod(payment.method);
    }
  }, [payment?.method]);

  const handlePay = async () => {
    if (!payment) {
      setError(
        "Aún no se puede pagar, pedile al trabajador que genere el cobro."
      );
      setTimeout(() => setError(null), 4000);
      return;
    }

    if (payment?.status === "paid") {
      setError("Este trabajo ya está pagado.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    if (!payment.totalAmount || payment.totalAmount <= 0) {
      setError("El monto del pago no es válido.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    setError(null);
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    try {
      if (selectedMethod === "efectivo") {
        setLoading(false);
        setBlockBack(false);
        onSuccess();
        setSuccesMessage("Entregale el dinero en efectivo al trabajador");
      } else {
        await startCheckout({
          id: payment.paymentId || payment.id,
          title: `Trabajo de ${workerName}`,
          unit_price: payment.totalAmount,
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
