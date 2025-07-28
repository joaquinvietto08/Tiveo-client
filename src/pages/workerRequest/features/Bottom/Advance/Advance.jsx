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

  const handleSaveActivity = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    let requestId = null;
    try {
      const docRef = await firestore()
        .collection("request")
        .add({
          ...values,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: "requested",
        });
      requestId = docRef.id;
      ok = true;
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      if (ok && requestId) {
        setTimeout(() => {
          navigation.navigate("AdvanceSearch", { values, requestId });
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
        onPress={handleSaveActivity}
        option="secondary"
      />
    </View>
  );
};

export default Advance;
