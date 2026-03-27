import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { styles } from "./PaymentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles/globalStyles";
import Warranty from "../../../assets/svgs/worker/warranty";
import Resumen from "./components/resumen/Resumen";
import Footer from "./components/footer/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Confirm from "../../components/confirm/Confirm";
import { usePayment } from "../../hooks/usePayment";

const Payment = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const { activityId, worker, paymentStatus } = route.params ?? {};
  const { payment, loading: paymentLoading, error: paymentError } =
    usePayment(activityId);

  const workerName = useMemo(() => {
    const fullName = [worker?.firstName, worker?.lastName]
      .filter(Boolean)
      .join(" ");
    return worker?.workerName || fullName || "el trabajador";
  }, [worker]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Trabajo pagado");

  const handleSuccess = () => {
    setSuccess(true);
  };

  const [blockBack, setBlockBack] = useState(false);
  useEffect(() => {
    if (blockBack) {
      const backHandlerSub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      const removeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });

      return () => {
        backHandlerSub.remove();
        removeBeforeRemove();
      };
    }
  }, [blockBack, navigation]);

  const renderPaymentContent = () => {
    if (paymentLoading) {
      return (
        <View style={styles.payment__infoContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.payment__infoText}>Buscando pago...</Text>
        </View>
      );
    }

    if (!payment) {
      if (paymentStatus === "created") {
        return (
          <View style={styles.payment__infoContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.payment__infoText}>
              Estamos preparando el pago...
            </Text>
            {paymentError && (
              <Text style={styles.payment__infoError}>{paymentError}</Text>
            )}
          </View>
        );
      }

      return (
        <View style={styles.payment__infoContainer}>
          <Text style={styles.payment__infoTitle}>Aún no se puede pagar</Text>
          <Text style={styles.payment__infoText}>
            Pedile al trabajador que genere el cobro desde su app para poder
            pagarlo por acá.
          </Text>
          {paymentError && (
            <Text style={styles.payment__infoError}>{paymentError}</Text>
          )}
        </View>
      );
    }

    return (
      <>
        <Resumen payment={payment} />
        <View style={styles.payment__warrantyContainer}>
          <Warranty width={40} height={40} fill={colors.primary} />
          <Text style={styles.payment__warrantyText}>
            Pagando el trabajo por la app contás con la protección de la
            garantía.
          </Text>
        </View>
        <Footer
          payment={payment}
          workerName={workerName}
          activityId={activityId}
          onRequestScrollToBottom={scrollToBottom}
          onSuccess={handleSuccess}
          setBlockBack={setBlockBack}
          setSuccesMessage={setSuccessMessage}
        />
      </>
    );
  };

  return (
    <View
      style={[
        styles.payment__mainContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.payment__scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={colors.primary} />
        <Pressable
          style={styles.payment__backContainer}
          onPress={navigation.goBack}
        >
          <Feather name="arrow-left" size={20} color="black" />
        </Pressable>
        <View style={styles.payment__header}>
          <Text style={styles.payment__worker}>
            ¡{workerName} terminó su trabajo!
          </Text>
        </View>
        {renderPaymentContent()}
      </ScrollView>

      {success && (
        <Confirm
          title={successMessage}
          text={
            "Podés ver los detalles del trabajo y pago realizado en tu historial de actividad"
          }
          setSuccess={setSuccess}
        />
      )}
    </View>
  );
};

export default Payment;
