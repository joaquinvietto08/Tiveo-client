import React, { useState, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { styles } from "./FormStyles";
import TextInput from "../../../../../components/inputs/textInput/TextInput";
import PhoneInput from "../../../../../components/inputs/phoneInput/PhoneInput";

const Form = ({ onSubmit }) => {
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "🇦🇷",
    code: "+54",
  });

  const handleSubmit = () => {
    const sanitizedPhoneNumber =
      phoneNumber === ""
        ? ""
        : `${selectedCountry.code.replace("+", "")}${phoneNumber}`;

    const formData = {
      floor,
      notes,
      phoneNumber: sanitizedPhoneNumber,
      name,
    };
    onSubmit(formData);
  };

  return (
    <View>
      <TextInput
        style={styles.saveAddress__form__floorInput}
        placeholder="Piso/Departamento"
        maxLength={20}
        value={floor}
        onChangeText={setFloor}
      />
      <TextInput
        style={styles.saveAddress__form__notesInput}
        placeholder="Aclaraciones"
        maxLength={100}
        multiline={true}
        value={notes}
        onChangeText={setNotes}
      />
      <PhoneInput
        style={styles.saveAddress__form__phoneInput}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <TextInput
        style={styles.saveAddress__form__nameInput}
        maxLength={30}
        placeholder="Nombre de ubicación"
        value={name}
        onChangeText={setName}
      />
      <Pressable
        style={styles.saveAddress__form__saveButton}
        onPress={handleSubmit}
      >
        <Text style={styles.saveAddress__form__textButton}>
          Guardar direccion
        </Text>
      </Pressable>
    </View>
  );
};

export default Form;
