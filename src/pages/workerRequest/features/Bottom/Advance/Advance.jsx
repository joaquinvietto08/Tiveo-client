import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./AdvanceStyles";
import { useRequestValues } from "../../../utils/requestValues";
import firestore from "@react-native-firebase/firestore";
import LoadingButton from "../../../../../components/inputs/loadingButton/LoadingButton";
import { useNavigation } from "@react-navigation/native";

const Advance = ({ data, onRequestScrollToBottom, setBlockBack }) => {
  const values = useRequestValues(data);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSaveRequest= async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    let requestId = null;
    let ok = false;

    try {
      const docRef = await firestore()
        .collection("requests")
        .add({
          ...values,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: "closed", // 👈 ahora el estado se guarda como "closed"
          type: "open",
        });

      requestId = docRef.id;
      ok = true;
    } catch (error) {
      console.error("❌ Error al guardar la request:", error);
    } finally {
      // 🔄 Efecto de carga y navegación con retraso suave
      setTimeout(() => setLoading(false), 3000);

      if (ok && requestId) {
        setTimeout(() => {
          navigation.navigate("AdvanceSearch", { values, requestId });
          setBlockBack(false);
        }, 4100);
      } else {
        setBlockBack(false);
      }
    }
  };

  return (
    <View style={styles.WR__advanceBottom__container}>
      <LoadingButton
        text="Buscar trabajador"
        loading={loading}
        onPress={handleSaveRequest}
        option="secondary"
      />
    </View>
  );
};

export default Advance;
