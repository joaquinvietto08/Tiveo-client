import { View, Text, FlatList } from "react-native";
import { styles } from "./ResumenStyles";
import { formatPrice } from "../../../../utils/formatHelpers";

const Resumen = () => {
  const items = [
    { id: "1", label: "Trabajo de plomería", value: 24000 },
    { id: "30", label: "Total", isTotal: true, value: 25000 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.payment__resumen__row}>
      <Text
        style={[
          styles.payment__resumen__label,
          item.isTotal && styles.payment__resumen__totalLabel,
        ]}
      >
        {item.label}
      </Text>
      <Text
        style={[
          styles.payment__resumen__value,
          item.isTotal && styles.payment__resumen__totalValue,
        ]}
      >
        {formatPrice(item.value)}
      </Text>
    </View>
  );

  return (
    <View style={styles.payment__resumen__container}>
      <Text style={styles.payment__resumen__title}>Resumen del trabajo</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Resumen;
