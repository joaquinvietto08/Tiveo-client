import React, { useState } from "react";
import { Text, Pressable, View, Modal } from "react-native";
import { styles } from "./CancellationStyles";
import { colors } from "../../../../../../styles/globalStyles";

const Cancellation = ({ onCancel }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Botón principal */}
      <Pressable
        style={styles.activityDetails__cancellation__mainContainer}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.activityDetails__cancellation__label}>
          Cancelar trabajo
        </Text>
      </Pressable>

      {/* Pop-up modal */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.activityDetails__cancellation__overlay}>
          <View style={styles.activityDetails__cancellation__popup}>
            <Text style={styles.activityDetails__cancellation__popupTitle}>
              ¿Deseas cancelar el trabajo solicitado?
            </Text>
            <Text style={styles.activityDetails__cancellation__popupText}>
              Esta acción no se puede deshacer.
            </Text>

            <View style={styles.activityDetails__cancellation__popupButtons}>
              <Pressable
                style={[
                  styles.activityDetails__cancellation__popupButton,
                  styles.activityDetails__cancellation__keep,
                ]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.activityDetails__cancellation__popupButtonText}>
                  Mantener solicitud
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.activityDetails__cancellation__popupButton,
                  styles.activityDetails__cancellation__cancel,
                ]}
                onPress={() => {
                  if (onCancell) onCancell();
                  setVisible(false);
                }}
              >
                <Text style={styles.activityDetails__cancellation__popupButtonCancelText}>
                  Cancelar trabajo
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Cancellation;
