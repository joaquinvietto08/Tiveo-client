import React from "react";
import { View, Text } from "react-native";
import { styles } from "./DefaultStyles";
import { getIcon } from "../../../../utils/getIcons";
import { translateService } from "../../../../utils/formatHelpers";

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
              <IconComponent style={styles.workerProfile__default__icon} />
              <Text style={styles.workerProfile__default__tagText}>
                {translateService(serviceObj.service)}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.workerProfile__default__availabilityRow}>
        <Text style={styles.workerProfile__default__availabilityLabel}>
          Disponibilidad:
        </Text>
        <View style={styles.workerProfile__default__availabilityNow}>
          <Text style={styles.workerProfile__default__availabilityText}>
            Ahora mismo
          </Text>
        </View>
      </View>

      <View style={styles.workerProfile__default__buttonWrapper}>
        <Text style={styles.workerProfile__default__buttonText}>
          Solicitar ahora
        </Text>
      </View>
    </View>
  );
};

export default Default;
