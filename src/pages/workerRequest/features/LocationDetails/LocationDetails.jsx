import React from "react";
import { View, Text } from "react-native";
import TextInput from "../../../../components/inputs/textInput/TextInput";
import { styles } from "./LocationDetailsStyles";

const LocationDetails = ({
  location,
  addressDetails = {},
  onChangeField,
}) => {
  const addressLine = location?.formatted_address
    ? location.formatted_address.split(",")[0]
    : null;

  const handleChange = (field) => (value) => {
    onChangeField?.(field, value);
  };

  return (
    <View style={styles.WR__location__container}>
      <Text style={styles.WR__location__title}>Datos del hogar</Text>

      <View style={styles.WR__location__addressContainer}>
        <Text
          style={[
            styles.WR__location__address,
            !addressLine && styles.WR__location__addressPlaceholder,
          ]}
          numberOfLines={2}
        >
          {addressLine || "Seleccioná una ubicación para continuar"}
        </Text>
      </View>

      <View style={styles.WR__location__inputGroup}>
        <Text style={styles.WR__location__inputLabel}>Piso / Dpto</Text>
        <TextInput
          placeholder="Ej: 8D"
          value={addressDetails.floor ?? ""}
          onChangeText={handleChange("floor")}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.WR__location__inputGroup}>
        <Text style={styles.WR__location__inputLabel}>
          Indicaciones especiales
        </Text>
        <TextInput
          placeholder="Ej: Portón negro, timbre roto..."
          value={addressDetails.instructions ?? ""}
          onChangeText={handleChange("instructions")}
          multiline
          style={styles.WR__location__instructionsInput}
        />
      </View>

      <View style={styles.WR__location__inputGroup}>
        <Text style={styles.WR__location__inputLabel}>Teléfono de contacto</Text>
        <TextInput
          placeholder="Ej: 3515555555"
          value={addressDetails.phone ?? ""}
          onChangeText={handleChange("phone")}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

export default LocationDetails;
