import { View, Pressable, Text } from "react-native";
import { getIcon } from "../../utils/getIcons";
import { styles } from "./ServicesListStyles";
import { translateService } from "../../utils/formatHelpers";

const ServicesList = ({ services, selected = [], onToggle }) => {
  const normalizedServices = Array.isArray(services)
    ? services
        .map((item, index) => {
          if (!item) return null;
          if (typeof item === "string") {
            return { key: item, label: item, index };
          }
          const key = item.service || item.name || item.key;
          if (!key) return null;
          return { key, label: key, index };
        })
        .filter(Boolean)
    : [];

  const isSingleItem = normalizedServices.length === 1;

  return (
    <View style={styles.servicesList__mainContainer}>
      <View
        style={[
          styles.servicesList__container,
          isSingleItem && styles.servicesList__containerSingle,
        ]}
      >
        {normalizedServices.map(({ key, label, index }) => {
          const Icon = getIcon(label);
          const isSelected = Array.isArray(selected) && selected.includes(key);
          const translatedLabel = translateService(label);
          const placeholderLetter = translatedLabel
            ? translatedLabel.charAt(0).toUpperCase()
            : "?";

          return (
            <View
              key={`${key}-${index}`}
              style={[
                styles.servicesList__buttonView,
                isSingleItem && styles.servicesList__buttonViewSingle,
                isSelected && styles.servicesList__buttonViewSelected,
              ]}
            >
              <Pressable
                android_ripple={{ color: "#E2E2E2", borderless: true }}
                style={styles.servicesList__button}
                onPress={() => onToggle?.(key)}
              >
                {Icon ? (
                  <Icon style={styles.servicesList__icon} />
                ) : (
                  <View style={styles.servicesList__placeholder}>
                    <Text style={styles.servicesList__placeholderText}>
                      {placeholderLetter}
                    </Text>
                  </View>
                )}
                <Text style={[styles.servicesList__name]}>
                  {translatedLabel}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ServicesList;
