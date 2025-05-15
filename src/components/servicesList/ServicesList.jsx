import { View, Pressable, Text } from "react-native";
import { getIcon } from "../../utils/getIcons";
import { styles } from "./ServicesListStyles";
import { translateService } from "../../utils/formatHelpers";

const ServicesList = ({ services, selected = [], onToggle }) => {
  return (
    <View style={styles.servicesList__mainContainer}>
      <View style={styles.servicesList__container}>
        {services.map((item) => {
          const key = item.service;
          const Icon = getIcon(key);
          const isSelected = selected.includes(key);
          const label = translateService(key);
          return (
            <View
              key={key}
              style={[
                styles.servicesList__buttonView,
                isSelected && styles.servicesList__buttonViewSelected,
              ]}
            >
              <Pressable
                android_ripple={{ color: "#E2E2E2", borderless: true }}
                style={styles.servicesList__button}
                onPress={() => onToggle(key)}
              >
                <Icon style={styles.servicesList__icon} />
                <Text style={[styles.servicesList__name]}>{label}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ServicesList;
