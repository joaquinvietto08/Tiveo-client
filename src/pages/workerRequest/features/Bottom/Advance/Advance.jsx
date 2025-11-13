import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./AdvanceStyles";
import { useRequestValues } from "../../../utils/requestValues";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "@react-native-firebase/firestore";
import LoadingButton from "../../../../../components/inputs/loadingButton/LoadingButton";
import { useNavigation } from "@react-navigation/native";
import { uploadRequestImages } from "../../../utils/uploadRequestImages";

const db = getFirestore();

const Advance = ({ data, onRequestScrollToBottom, setBlockBack }) => {
  const values = useRequestValues(data);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSaveRequest = async () => {
    const hasDescription = Boolean(values?.description?.trim());
    const hasServices = Array.isArray(values?.services) && values.services.length > 0;

    if (!hasDescription || !hasServices) {
      Alert.alert(
        "Datos incompletos",
        "Necesitás agregar una descripción y al menos una categoría para enviar esta solicitud."
      );
      return;
    }

    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    let requestId = null;
    let ok = false;

    try {
      const requestRef = doc(collection(db, "requests"));
      const uploadedImages = await uploadRequestImages(values.images, {
        requestId: requestRef.id,
        userId: values?.client?.userId,
      });

      await setDoc(requestRef, {
        ...values,
        images: uploadedImages,
        createdAt: serverTimestamp(),
        status: "requested",
        type: "open",
      });

      requestId = requestRef.id;
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
