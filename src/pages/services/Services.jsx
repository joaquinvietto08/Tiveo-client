import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./ServicesStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServicesList from "./features/servicesList/ServicesList";

const Services = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.services__mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
          <ServicesList />
      </ScrollView>
    </View>
  );
};

export default Services;
