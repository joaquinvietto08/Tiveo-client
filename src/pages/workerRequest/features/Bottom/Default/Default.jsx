import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./DefaultStyles";
import { AntDesign } from "@expo/vector-icons";
import { useRequestValues } from "../../../utils/requestValues";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "@react-native-firebase/firestore";
import LoadingButton from "../../../../../components/inputs/loadingButton/LoadingButton";
import { uploadRequestImages } from "../../../utils/uploadRequestImages";

const db = getFirestore();

const Default = ({
  worker,
  data,
  onRequestScrollToBottom,
  onSuccess,
  setBlockBack,
}) => {
  const values = useRequestValues(data, worker);

  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

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
        type: "direct",
      });
      ok = true;
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      // segundo timeout para onSuccess y desbloquear
      if (ok) {
        setTimeout(() => {
          onSuccess();
        }, 4100);
      } else {
        setBlockBack(false);
      }
    }
  };

  const imageSource =
    typeof worker.photoURL === "string"
      ? { uri: worker.photoURL }
      : worker.photoURL;
  const workerDisplayName =
    worker.workerName ||
    worker.name ||
    worker.firstName ||
    "Trabajador";

  return (
    <View style={styles.WR__defaultBottom__container}>
      <View style={styles.WR__defaultBottom__hr}></View>
      <View style={styles.WR__defaultBottom__worker}>
        <Image
          source={imageSource}
          style={styles.WR__defaultBottom__image}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.WR__defaultBottom__name}>
            {workerDisplayName}
          </Text>
          <View style={styles.WR__defaultBottom__ratingContainer}>
            <AntDesign name="star" size={16} />
            <Text style={styles.WR__defaultBottom__ratingText}>
              {worker.starRating}
            </Text>
            <Text style={styles.WR__defaultBottom__ratingText}>
              ({worker.completedJobs})
            </Text>
          </View>
        </View>
      </View>
      <LoadingButton
        text="Enviar solicitud"
        loading={loading}
        onPress={handleSendRequest}
      />
      <Text style={styles.WR__defaultBottom__infoText}>
        Recordá que podes cancelar sin costo hasta{"\n"}15 minutos antes de que
        llegue el trabajador
      </Text>
    </View>
  );
};

export default Default;
