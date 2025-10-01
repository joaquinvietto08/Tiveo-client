import { View, Pressable, Text } from "react-native";
import { styles } from "./CategoriesSelectStyles";
import { translateService } from "../../../../utils/formatHelpers";
import { getIcon } from "../../../../utils/getIcons";

const CategoriesSelect = ({ selectedServices, onOpenCategories }) => {
  return (
    <View style={styles.WR__categoriesSelect__category}>
      <Text style={styles.WR__categoriesSelect__sectionTitle}>Categoría</Text>
      <View style={styles.WR__categoriesSelect__tagsWrapper}>
        {selectedServices.map((srv, i) => {
          const Icon = getIcon(srv);
          return (
            <View key={i} style={styles.WR__categoriesSelect__tag}>
              <Icon height={24} width={24} />
              <Text style={styles.WR__categoriesSelect__tagText}>
                {translateService(srv)}
              </Text>
            </View>
          );
        })}
        <Pressable
          style={styles.WR__categoriesSelect__categoriesSelect}
          onPress={onOpenCategories}
        >
          <Text style={styles.WR__categoriesSelect__categoriesSelectText}>
            Seleccionar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoriesSelect;
