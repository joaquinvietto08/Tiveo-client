import React from "react";
import { View, Text } from "react-native";
import { styles } from "./DefaultStyles";
import { getIcon } from "../../../../utils/getIcons";
import {
  translateService,
  translateAvailabilityRequest,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";

const Default = ({ worker }) => {
  const services = worker?.services || [];

  return (
    <View style={styles.workerProfile__default__Bottom}>
      <Text style={styles.workerProfile__default__sectionTitle}>
        Servicios que ofrece
      </Text>
      <View style={styles.workerProfile__default__tagsWrapper}>
        {services.map((serviceObj, index) => {
          const IconComponent = getIcon(serviceObj.service);
          return (
            <View key={index} style={styles.workerProfile__default__tag}>
              <IconComponent height={24} width={24} />
              <Text style={styles.workerProfile__default__tagText}>
                {translateService(serviceObj.service)}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.workerProfile__default__StatusContainer}>
        <View style={styles.workerProfile__default__StatusRow}>
          <Text style={styles.workerProfile__default__StatusLabel}>
            Disponibilidad:
          </Text>
          <View style={styles.workerProfile__default__StatusIconContainer}>
            {worker.status === "available" ? (
              <Available height={20} width={20} />
            ) : (
              <Busy height={20} width={20} />
            )}
          </View>
          <View style={styles.workerProfile__default__Status}>
            <Text style={styles.workerProfile__default__StatusText}>
              {translateAvailabilityRequest(worker.status)}
            </Text>
          </View>
        </View>
        {worker.status === "available" ? (
          <View style={styles.workerProfile__default__buttonWrapperAvailable}>
            <Text style={styles.workerProfile__default__buttonTextAvailable}>
              Solicitar ahora
            </Text>
          </View>
        ) : (
          <View style={styles.workerProfile__default__buttonWrapperBusy}>
            <Text style={styles.workerProfile__default__buttonTextBusy}>
              Coordinar visita
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Default;
