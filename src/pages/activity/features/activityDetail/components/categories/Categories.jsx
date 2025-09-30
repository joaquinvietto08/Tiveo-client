import React from "react";
import { View, Text } from "react-native";
import { styles } from "./CategoriesStyles";
import { getIcon } from "../../../../../../utils/getIcons";
import { translateService } from "../../../../../../utils/formatHelpers";

const Categories = ({ services = [] }) => {
  const hasCategories = services && services.length > 0;

  return (
    <View style={styles.activityDetails__categories__mainContainer}>
      <Text style={styles.activityDetails__categories__title}>Categorías</Text>

      {hasCategories ? (
        <View style={styles.activityDetails__categories__list}>
          {services.map((service) => {
            const Icon = getIcon(service);
            const label = translateService(service);

            return (
              <View
                key={service}
                style={styles.activityDetails__categories__chip}
              >
                {Icon ? (
                  <Icon height={24} width={24}/>
                ) : null}
                <Text style={styles.activityDetails__categories__label}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.activityDetails__categories__placeholder}>
          No se seleccionaron categorías.
        </Text>
      )}
    </View>
  );
};

export default Categories;
