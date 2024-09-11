import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { getIcon } from "../../utils/getIcons";
import { styles } from "./ServicesStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { services } from "../../utils/servicesData";

const ServiceButton = ({ item }) => {
  const IconComponent = getIcon(item.icon);
  return (
    <View style={styles.service_buttonView}>
      <Pressable
        android_ripple={{ color: "#E2E2E2", borderless: true }}
        style={styles.serviceButton}
      >
        <IconComponent style={styles.serviceIcon} />
        <Text style={styles.serviceName}>{item.name}</Text>
      </Pressable>
    </View>
  );
};

const ServiceButton2 = ({ item }) => {
  const IconComponent = getIcon(item.icon);
  return (
    <View style={styles.service_buttonView2}>
      <Pressable
        android_ripple={{ color: "#E2E2E2", borderless: true }}
        style={styles.serviceButton2}
      >
        <IconComponent style={styles.serviceIcon} />
        <Text style={styles.serviceName}>{item.name}</Text>
      </Pressable>
    </View>
  );
};

const Services = () => {
  const insets = useSafeAreaInsets();
  const firstServiceButtons = services
    .slice(0, 18)
    .map((item) => <ServiceButton key={item.key} item={item} />);

  const secondServiceButtons = services
    .slice(18)
    .map((item) => <ServiceButton2 key={item.key} item={item} />);

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_servicesContainer}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Servicios</Text>
          <View style={styles.servicesContainer}>{firstServiceButtons}</View>
          <View style={styles.servicesContainer2}>{secondServiceButtons}</View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;
