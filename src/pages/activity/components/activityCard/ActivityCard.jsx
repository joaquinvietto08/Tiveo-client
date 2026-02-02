import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { getIcon } from "../../../../utils/getIcons";
import {
  formatDate,
  formatTime,
  translateStatus,
} from "../../../../utils/formatHelpers";
import { styles } from "./ActivityCardStyles";
import Busy from "../../../../../assets/svgs/worker/busy.svg";
import { colors } from "../../../../styles/globalStyles";

const MAX_SERVICES = 5;

const ActivityCard = ({ data, onPress, onCancel, onMessages, onPayment, isRequest = false }) => {
  const displayed = data.services?.slice(0, MAX_SERVICES);
  const extraCount = data.services?.length - displayed?.length;
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const handleConfirmCancel = () => {
    setIsCancelModalVisible(false);
    onCancel?.();
  };

  const handlePress = () => {
    if (!isRequest) {
      onPress?.();
    }
  };

  return (
    <View style={styles.activity__activityCard__card}>
      <Pressable
        android_ripple={isRequest ? null : { color: colors.white }}
        onPress={handlePress}
        style={{ padding: 15 }}
      >
        {/* Header */}
        <View style={styles.activity__activityCard__cardHeader}>
          <View style={styles.activity__activityCard__cardIconsContainer}>
            <Text style={styles.activity__activityCard__cardTitle}>
              {isRequest 
                ? (data.services?.length > 0 ? "Solicitud de" : "Solicitud")
                : (data.services?.length > 0 ? "Trabajo de" : "Trabajo")}
            </Text>
            {data.services?.length > 0 && (
              <>
                {displayed?.map((serviceKey) => {
                  const IconComponent = getIcon(serviceKey);
                  return (
                    IconComponent && (
                      <IconComponent
                        key={serviceKey}
                        height={26}
                        width={26}
                        style={{ marginLeft: 4 }}
                      />
                    )
                  );
                })}
                {extraCount > 0 && (
                  <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
                    +{extraCount}
                  </Text>
                )}
              </>
            )}
          </View>
          {data.moment === "scheduled" &&
            (data.status === "confirm" ||
              data.status === "pending" ||
              data.status === "requested") && (
              <Busy height={22} width={22} fill={colors.black} />
            )}
        </View>

        {/* Dirección */}
        <Text style={styles.activity__activityCard__cardAddress}>
          {data.address?.address}
        </Text>

        {/* Fecha / Estado */}
        <View style={styles.activity__activityCard__cardFooter}>
          <Text style={styles.activity__activityCard__cardDate}>
            {formatDate(data.scheduledDateTime ?? data.createdAt)} •{" "}
            {formatTime(data.scheduledDateTime ?? data.createdAt)} hs
          </Text>
          <Text 
            style={[
              styles.activity__activityCard__cardStatus,
              data.warranty === "claimed" && { color: "#FF6B35" }
            ]}
          >
            {isRequest 
              ? (data.status === "cancelled" ? "Cancelada" : "Esperando respuesta")
              : data.warranty === "claimed"
                ? "Garantía reclamada"
                : translateStatus(data.status, data.moment)}
          </Text>
        </View>
      </Pressable>

      {/* Requests: solo mostrar botón cancelar */}
      {isRequest && data.status !== "cancelled" && (
        <View style={styles.activity__activityCard__optionContainer}>
          <Pressable
            style={[styles.activity__activityCard__cancelButton, { flex: 1 }]}
            onPress={() => setIsCancelModalVisible(true)}
          >
            <Text style={{ color: "red", fontFamily: "Inter-Bold" }}>
              Cancelar solicitud
            </Text>
          </Pressable>
        </View>
      )}

      {/* Activities: lógica normal */}
      {!isRequest &&
        data.status !== "pending" &&
        data.status !== "cancelled" &&
        (data.warranty === "claimed" ? (
          <View style={styles.activity__activityCard__optionContainer}>
            <Pressable
              style={styles.activity__activityCard__messagesButton}
              onPress={onMessages}
            >
              <Text style={{ color: "white", fontFamily: "Inter-Bold" }}>
                Mensajes
              </Text>
            </Pressable>
          </View>
        ) : data.status === "done" ? (
          <>
            {(data.paymentStatus === "pending" ||
              data.paymentStatus === "pending-approve" ||
              data.paymentStatus === "created") && (
              <View style={styles.activity__activityCard__optionContainer}>
                <Pressable
                  style={styles.activity__activityCard__paymentButton}
                  onPress={onPayment}
                >
                  <Text style={{ color: "black", fontFamily: "Inter-Bold" }}>
                    Realizar pago
                  </Text>
                </Pressable>
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.activity__activityCard__optionContainer}>
              <Pressable
                style={styles.activity__activityCard__cancelButton}
                onPress={() => setIsCancelModalVisible(true)}
              >
                <Text style={{ color: "red", fontFamily: "Inter-Bold" }}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                style={styles.activity__activityCard__messagesButton}
                onPress={onMessages}
              >
                <Text style={{ color: "white", fontFamily: "Inter-Bold" }}>
                  Mensajes
                </Text>
              </Pressable>
            </View>
          </>
        ))}
      <Modal
        transparent
        animationType="fade"
        visible={isCancelModalVisible}
        onRequestClose={() => setIsCancelModalVisible(false)}
      >
        <View style={styles.activity__activityCard__modalOverlay}>
          <View style={styles.activity__activityCard__modalContent}>
            <Text style={styles.activity__activityCard__modalTitle}>
              {isRequest 
                ? "¿Deseas cancelar esta solicitud?"
                : "¿Deseas cancelar el trabajo solicitado?"}
            </Text>
            <Text style={styles.activity__activityCard__modalText}>
              Esta acción no se puede deshacer.
            </Text>

            <View style={styles.activity__activityCard__modalButtons}>
              <Pressable
                style={[
                  styles.activity__activityCard__modalButton,
                  styles.activity__activityCard__modalKeepButton,
                ]}
                onPress={() => setIsCancelModalVisible(false)}
              >
                <Text style={styles.activity__activityCard__modalButtonText}>
                  Mantener solicitud
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.activity__activityCard__modalButton,
                  styles.activity__activityCard__modalCancelButton,
                ]}
                onPress={handleConfirmCancel}
              >
                <Text
                  style={styles.activity__activityCard__modalButtonCancelText}
                >
                  {isRequest ? "Cancelar solicitud" : "Cancelar trabajo"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivityCard;
