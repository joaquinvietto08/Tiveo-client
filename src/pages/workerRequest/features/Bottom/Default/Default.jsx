import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./DefaultStyles";
import { AntDesign } from "@expo/vector-icons";
import { useRequestValues } from "../../../utils/requestValues";
import firestore from "@react-native-firebase/firestore";

const Default = ({ worker, data }) => {
  const values = useRequestValues(data, worker);

  const handleSaveWorkRequest = async () => {
    try {
      await firestore()
        .collection("workRequest")
        .add({
          ...values,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: "pending",
        });
    } catch (error) {
      console.error(error);
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
      <Pressable
        style={styles.WR__defaultBottom__button}
        onPress={handleSaveWorkRequest}
      >
        <Text style={styles.WR__defaultBottom__buttonText}>
          Enviar solicitud
        </Text>
      </Pressable>
      <Text style={styles.WR__defaultBottom__infoText}>
        Recordá que podes cancelar sin costo hasta{"\n"}15 minutos antes de que
        llegue el trabajador
      </Text>
    </View>
  );
};

export default Default;
