import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./AdvanceStyles";
import { useRequestValues } from "../../../utils/requestValues";
import firestore from "@react-native-firebase/firestore";
import LoadingButton from "../../../../../components/inputs/loadingButton/LoadingButton";
import { useNavigation } from "@react-navigation/native";
import { uploadRequestImages } from "../../../utils/uploadRequestImages";

const Advance = ({ data, onRequestScrollToBottom, setBlockBack }) => {
  const values = useRequestValues(data);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSaveRequest = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    let requestId = null;
    let ok = false;

    try {
      const requestRef = firestore().collection("requests").doc();
      const uploadedImages = await uploadRequestImages(values.images, {
        requestId: requestRef.id,
        userId: values?.client?.userId,
      });

      await requestRef.set({
        ...values,
        images: uploadedImages,
        createdAt: firestore.FieldValue.serverTimestamp(),
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
