import { View, Text, Pressable } from "react-native";
import { styles } from "./DefaultStyles";
import { getIcon } from "../../../../utils/getIcons";
import {
  translateService,
  translateAvailabilityRequest,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../styles/globalStyles";

const Default = ({ worker }) => {
  const navigation = useNavigation();
  const services = worker?.services || [];
  const isAvailable = worker.status === "available";

  return (
    <View style={styles.workerProfile__default__Bottom}>
      <View style={styles.workerProfile__default__tagsWrapperContainer}>
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
      </View>

      <View style={styles.workerProfile__default__StatusContainer}>
        <View style={styles.workerProfile__default__StatusRow}>
          <Text style={styles.workerProfile__default__StatusLabel}>
            Disponibilidad:
          </Text>
          <View
            style={[
              styles.workerProfile__default__StatusSubContainer,
              worker.status === "available"
                ? styles.workerProfile__default__StatusAvailable
                : styles.workerProfile__default__StatusBusy,
            ]}
          >
            {worker.status === "available" ? (
              <Available height={20} width={20} fill={colors.green} />
            ) : (
              <Busy height={20} width={20} fill={colors.primary} />
            )}
            <View style={styles.workerProfile__default__Status}>
              <Text
                style={[
                  styles.workerProfile__default__StatusText,
                  worker.status === "available"
                    ? styles.workerProfile__default__StatusTextAvailable
                    : styles.workerProfile__default__StatusTextBusy,
                ]}
              >
                {translateAvailabilityRequest(worker.status)}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={
            isAvailable
              ? styles.workerProfile__default__buttonWrapperAvailable
              : styles.workerProfile__default__buttonWrapperBusy
          }
          onPress={() => navigation.navigate("WorkerRequest", { worker })}
        >
          <Text
            style={
              isAvailable
                ? styles.workerProfile__default__buttonTextAvailable
                : styles.workerProfile__default__buttonTextBusy
            }
          >
            {isAvailable ? "Solicitar ahora" : "Coordinar visita"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Default;
