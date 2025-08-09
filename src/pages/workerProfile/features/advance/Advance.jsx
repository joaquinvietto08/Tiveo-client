import { View, Text, Pressable } from "react-native";
import { styles } from "./AdvanceStyles";
import { getIcon } from "../../../../utils/getIcons";
import {
  formatDate,
  formatPrice,
  formatTime,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../styles/globalStyles";
import LoadingButton from "../../../../components/inputs/loadingButton/LoadingButton";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";

const Advance = ({
  worker,
  values,
  onRequestScrollToBottom,
  onSuccess,
  setBlockBack,
}) => {
  const [loading, setLoading] = useState(false);
  const status = worker.moment === "now" ? "going" : "confirm";

  const handleSaveActivity = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    const activityPayload = {
      ...values,
      moment: worker.moment,
      scheduledDateTime: worker.scheduledDateTime,
      worker: {
        uid: worker.uid,
        firstName: worker.firstName,
        lastName: worker.lastName,
        photoURL: worker.photoURL,
      },
      createdAt: firestore.FieldValue.serverTimestamp(),
      status,
    };

    let ok = false;
    try {
      await firestore().collection("activity").add(activityPayload);
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

  return (
    <View style={styles.workerProfile__advance__bottom}>
      <Text style={styles.workerProfile__advance__title}>
        Detalles de solicitud
      </Text>
      <View style={styles.workerProfile__advance__valuesContainer}>
        {values.services && (
          <View style={styles.workerProfile__advance__description}>
            <Text style={styles.workerProfile__advance__locationTitle}>
              Categoria/s:
            </Text>
            <View style={styles.workerProfile__advance__servicesContainer}>
              {values.services.map((serviceKey) => {
                const IconComponent = getIcon(serviceKey);
                return (
                  <IconComponent
                    key={serviceKey}
                    height={25}
                    width={25}
                    fill={colors.black}
                  />
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.workerProfile__advance__statusRow}>
          <Text style={styles.workerProfile__advance__statusLabel}>
            Disponibilidad:
          </Text>
          <View
            style={[
              styles.workerProfile__advance__statusSubContainer,
              worker.moment === "now"
                ? styles.workerProfile__advance__statusAvailable
                : styles.workerProfile__advance__statusBusy,
            ]}
          >
            {worker.moment === "now" ? (
              <Available height={20} width={20} fill={colors.green} />
            ) : (
              <Busy height={20} width={20} fill={colors.primary} />
            )}
            <View style={styles.workerProfile__advance__status}>
              <Text
                style={[
                  styles.workerProfile__advance__statusText,
                  worker.moment === "now"
                    ? styles.workerProfile__advance__statusTextAvailable
                    : styles.workerProfile__advance__statusTextBusy,
                ]}
              >
                {worker.moment === "now"
                  ? "Ahora mismo"
                  : `${formatDate(worker.scheduledDateTime)} • ${formatTime(
                      worker.scheduledDateTime
                    )} hs`}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.workerProfile__advance__status}>
          <Text style={styles.workerProfile__advance__locationTitle}>
            Ubicación:
          </Text>
          <Text style={styles.workerProfile__advance__locationLabel}>
            {values.address.address}
          </Text>
        </View>
        {worker.message && (
          <View style={styles.workerProfile__advance__description}>
            <Text style={styles.workerProfile__advance__locationTitle}>
              Aclaraciones:
            </Text>
            <Text style={styles.workerProfile__advance__locationLabel}>
              {worker.message}
            </Text>
          </View>
        )}
        <View style={styles.workerProfile__advance__presupuesto}>
          <Text style={styles.workerProfile__advance__presupuestoTitle}>
            Presupuesto:
          </Text>
          <Text style={styles.workerProfile__advance__priceLabel}>
            {worker.price != null ? formatPrice(worker.price) : "A definir"}
          </Text>
        </View>
      </View>
      <View style={styles.workerProfile__advance__BottomContainer}>
        <LoadingButton
          text="Confirmar solicitud"
          loading={loading}
          onPress={handleSaveActivity}
        />
        <Text style={styles.workerProfile__advance__infoText}>
          Recordá que podes cancelar sin costo hasta{"\n"}15 minutos antes de
          que llegue el trabajador
        </Text>
      </View>
    </View>
  );
};

export default Advance;
