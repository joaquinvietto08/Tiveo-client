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
  const workerStatus = (worker?.status || "").toLowerCase();
  const isAvailable = workerStatus === "available";

  return (
    <View style={styles.workerProfile__default__Bottom}>
      <View style={styles.workerProfile__default__tagsWrapperContainer}>
        <Text style={styles.workerProfile__default__sectionTitle}>
          Servicios que ofrece
        </Text>
        <View style={styles.workerProfile__default__tagsWrapper}>
          {services.map((service, index) => {
            const IconComponent = getIcon(service);
            const translatedLabel = translateService(service);
            return (
              <View
                key={`${service}-${index}`}
                style={styles.workerProfile__default__tag}
              >
                {IconComponent && <IconComponent height={24} width={24} />}
                <Text style={styles.workerProfile__default__tagText}>
                  {translatedLabel}
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
              isAvailable
                ? styles.workerProfile__default__StatusAvailable
                : styles.workerProfile__default__StatusBusy,
            ]}
          >
            {isAvailable ? (
              <Available height={20} width={20} fill={colors.green} />
            ) : (
              <Busy height={20} width={20} fill={colors.primary} />
            )}
            <View style={styles.workerProfile__default__Status}>
              <Text
                style={[
                  styles.workerProfile__default__StatusText,
                  isAvailable
                    ? styles.workerProfile__default__StatusTextAvailable
                    : styles.workerProfile__default__StatusTextBusy,
                ]}
              >
                {translateAvailabilityRequest(isAvailable ? "available" : "busy")}
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
