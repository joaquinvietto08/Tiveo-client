import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  BackHandler,
} from "react-native";
import { styles } from "./PaymentStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles/globalStyles";
import Warranty from "../../../assets/svgs/worker/warranty";
import Resumen from "./components/resumen/Resumen";
import Footer from "./components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Confirm from "../../components/confirm/Confirm";

const Payment = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const workerName = "Carlos José";

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
        <Resumen />
        <View style={styles.payment__warrantyContainer}>
          <Warranty width={40} height={40} fill={colors.primary} />
          <Text style={styles.payment__warrantyText}>
            Pagando el trabajo por la app contas con la proteccion de la
            garantia.
          </Text>
        </View>
        <Footer
          onRequestScrollToBottom={scrollToBottom}
          onSuccess={handleSuccess}
          setBlockBack={setBlockBack}
          setSuccesMessage={setSuccessMessage}
        />
      </ScrollView>

      {success && (
        <Confirm
          title={successMessage}
          text={
            "Podes ver los detalles del trabajo y pago realizado en tu historial actividad"
          }
          buttonBack={"Cambiar metodo de pago"}
          setSuccess={setSuccess}
        />
      )}
    </View>
  );
};

export default Payment;
