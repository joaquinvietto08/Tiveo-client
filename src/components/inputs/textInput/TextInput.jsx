import React from "react";
import { TextInput } from "react-native";
import { styles } from "./TextInputStyles";

const TextInputComponent = ({
  style,
  placeholder,
  placeholderTextColor = "#8A8A8A",
  selectionColor = "#FF9D00",
  cursorColor = "black",
  maxLength,
  value,
  onChangeText,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.inputs__textInput__container, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      cursorColor={cursorColor}
      maxLength={maxLength}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default TextInputComponent;
