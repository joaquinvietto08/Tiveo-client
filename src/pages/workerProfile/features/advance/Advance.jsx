import { View, Text, Pressable, Alert } from "react-native";
import { styles } from "./AdvanceStyles";
import { getIcon } from "../../../../utils/getIcons";
import {
  formatDate,
  formatPrice,
  formatTime,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";
import { colors } from "../../../../styles/globalStyles";
import LoadingButton from "../../../../components/inputs/loadingButton/LoadingButton";
import { useMemo, useState } from "react";
import {
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "@react-native-firebase/firestore";

const Advance = ({
  worker,
  postulation,
  values,
  requestId,
  onRequestScrollToBottom,
  onSuccess,
  setBlockBack,
}) => {
  const db = getFirestore();
  const [loading, setLoading] = useState(false);

  const priceValue =
    postulation?.price != null
      ? Number(postulation.price)
      : postulation?.budget != null
        ? Number(postulation.budget)
        : null;

  const displayMoment = postulation?.offerAnotherTime
    ? postulation?.offerMoment || "scheduled"
    : values?.moment;

  const rawDisplayDate =
    postulation?.offerAnotherTime && postulation?.offerScheduledDateTime
      ? postulation.offerScheduledDateTime
      : values?.scheduledDateTime;

  const parseToDate = useMemo(
    () => (value) => {
      if (!value) return null;
      if (typeof value?.toDate === "function") return value.toDate();
      if (value instanceof Date)
        return Number.isNaN(value.getTime()) ? null : value;
      if (typeof value === "number") {
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? null : d;
      }
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    },
    [],
  );

  const scheduledDate = useMemo(() => {
    const offered = parseToDate(rawDisplayDate);
    if (offered) return offered;

    const requestDate = parseToDate(values?.scheduledDateTime);
    if (requestDate) return requestDate;

    const fallback = parseToDate(postulation?.date);
    return fallback;
  }, [
    parseToDate,
    rawDisplayDate,
    values?.scheduledDateTime,
    postulation?.date,
  ]);

  const displayDateLabel = scheduledDate
    ? `${formatDate(scheduledDate)} • ${formatTime(scheduledDate)} hs`
    : "Programado (a coordinar)";

  const handleSaveActivity = async () => {
    onRequestScrollToBottom?.();
    setLoading(true);
    setBlockBack(true);

    const payloadMoment = displayMoment || "scheduled";
    const payloadDate = scheduledDate?.toISOString?.() || scheduledDate || "";

    let ok = false;

    try {
      if (requestId) {
        const requestRef = doc(collection(db, "requests"), requestId);
        await updateDoc(requestRef, {
          moment: payloadMoment,
          scheduledDateTime: scheduledDate || null,
        });
      }

      // 🛰️ Llamada al endpoint de Cloud Function
      const response = await fetch(
        "https://createactivityfromrequest-fpeb5gaoea-uc.a.run.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestId, // ID de la solicitud existente
            newStatus: "confirm",
            moment: payloadMoment,
            scheduledDateTime: payloadDate,
            postulationId: postulation?.postulationId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result?.success) {
        ok = true;
      } else {
        throw new Error(result?.message || "Error desconocido");
      }
    } catch (error) {
      console.error("❌ Error al crear activity desde request:", error);
      Alert.alert(
        "Error",
        "No se pudo confirmar la solicitud. Inténtalo nuevamente.",
      );
    } finally {
      // ⏳ Simulación de carga visual
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      if (ok) {
        setTimeout(() => {
          onSuccess(); // ✅ Avanza al siguiente paso del flujo
        }, 4100);
      } else {
        setBlockBack(false);
      }
    }
  };

  const isNow = displayMoment === "now" && !postulation?.offerAnotherTime;

  return (
    <View style={styles.workerProfile__advance__bottom}>
      <Text style={styles.workerProfile__advance__title}>
        Detalles de solicitud
      </Text>

      <View style={styles.workerProfile__advance__valuesContainer}>
        {values.services && (
          <View style={styles.workerProfile__advance__description}>
            <Text style={styles.workerProfile__advance__locationTitle}>
              Categoría/s:
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
              isNow
                ? styles.workerProfile__advance__statusAvailable
                : styles.workerProfile__advance__statusBusy,
            ]}
          >
            {isNow ? (
              <Available height={20} width={20} fill={colors.green} />
            ) : (
              <Busy height={20} width={20} fill={colors.primary} />
            )}
            <View style={styles.workerProfile__advance__status}>
              <Text
                style={[
                  styles.workerProfile__advance__statusText,
                  isNow
                    ? styles.workerProfile__advance__statusTextAvailable
                    : styles.workerProfile__advance__statusTextBusy,
                ]}
              >
                {isNow ? "Ahora mismo" : displayDateLabel}
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

        {postulation?.message && (
          <View style={styles.workerProfile__advance__description}>
            <Text style={styles.workerProfile__advance__locationTitle}>
              Aclaraciones:
            </Text>
            <Text style={styles.workerProfile__advance__locationLabel}>
              {postulation.message}
            </Text>
          </View>
        )}

        <View style={styles.workerProfile__advance__presupuesto}>
          <Text style={styles.workerProfile__advance__presupuestoTitle}>
            Presupuesto:
          </Text>
          <Text style={styles.workerProfile__advance__priceLabel}>
            {priceValue != null ? formatPrice(priceValue) : "A definir"}
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
          Recordá que el presupuesto solo es estimativo{"\n"}y no representa el
          monto real final del trabajo.
        </Text>
      </View>
    </View>
  );
};

export default Advance;
