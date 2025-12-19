import { View, Text, FlatList } from "react-native";
import { styles } from "./ResumenStyles";
import { formatPrice, translateService } from "../../../../utils/formatHelpers";

const Resumen = ({ payment }) => {
  const services = payment?.services || [];
  const totalAmount = payment?.totalAmount ?? 0;

  const items = [
    ...services.map((service, index) => ({
      id: `${service.category || "service"}-${index}`,
      label:
        service.category === "service_fee"
          ? "Tarifa de servicio"
          : `Trabajo de ${translateService(
              service.category || "servicio"
            ).toLowerCase()}`,
      value: service.amount ?? 0,
    })),
    { id: "total", label: "Total", isTotal: true, value: totalAmount },
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
