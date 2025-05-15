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

const Default = ({ worker }) => {
  const navigation = useNavigation();
  const services = worker?.services || [];
  const isAvailable = worker.status === "available";

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
