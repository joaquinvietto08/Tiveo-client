import React, { useEffect } from "react";
import { styles } from "./BottomStyles";
import { Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextInputComponent from "../../../../components/inputs/textInput/TextInput";
import ImageIcon from "../../../../../assets/svgs/image";
import { colors } from "../../../../styles/globalStyles";

const Bottom = () => {
  useEffect(() => {
    // Pedimos permiso para acceder a la galería
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Para subir imágenes necesitas habilitar el acceso a la galería."
        );
      }
    })();
  }, []);

  const pickImages = async () => {
    if (images.length >= MAX_IMAGES) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 4 - images.length,
      });
      if (!result.canceled) {
        const newUris = result.assets.map((asset) => asset.uri);
      }
    } catch (e) {
      console.warn("Error al seleccionar imágenes:", e);
    }
  };

  return (
    <View style={styles.messages__bottom__container}>
      <View style={styles.messages__bottom__subcontainer}>
        <Pressable
          style={styles.messages__bottom__imageButton}
          onPress={pickImages}
        >
          <ImageIcon />
        </Pressable>
        <TextInputComponent
          placeholder={"Escribe un mensaje..."}
          style={styles.messages__bottom__input}
          borderless
          multiline={true}
          maxLength={100}
        />
      </View>
      <Pressable style={styles.messages__bottom__sendButton}>
        <Ionicons name="send" size={24} color={colors.black} />
      </Pressable>
    </View>
  );
};

export default Bottom;
