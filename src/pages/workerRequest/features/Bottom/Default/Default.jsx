import { Image, Text, View } from "react-native";
import { styles } from "./DefaultStyles";
import { AntDesign } from "@expo/vector-icons";
import { useRequestValues } from "../../../utils/requestValues";
import firestore from "@react-native-firebase/firestore";
import LoadingButton from "../../../../../components/inputs/loadingButton/LoadingButton";
import { useState } from "react";

const Default = ({ worker, data, onRequestScrollToBottom }) => {
  const values = useRequestValues(data, worker);
  const [loading, setLoading] = useState(false);

  const handleSaveActivity = async () => {
    onRequestScrollToBottom?.();

    setLoading(true);
    try {
      await firestore()
        .collection("activity")
        .add({
          ...values,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: "pending",
        });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <View style={styles.WR__defaultBottom__container}>
      <View style={styles.WR__defaultBottom__hr}></View>
      <View style={styles.WR__defaultBottom__worker}>
        <Image
          source={worker.photoURL}
          style={styles.WR__defaultBottom__image}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.WR__defaultBottom__name}>
            {worker.firstName} {worker.lastName}
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
        onPress={handleSaveActivity}
      />
      <Text style={styles.WR__defaultBottom__infoText}>
        Recordá que podes cancelar sin costo hasta{"\n"}15 minutos antes de que
        llegue el trabajador
      </Text>
    </View>
  );
};

export default Default;
