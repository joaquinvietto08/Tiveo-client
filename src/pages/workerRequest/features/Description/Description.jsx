import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "./DescriptionStyles";
import * as ImagePicker from "expo-image-picker";
import TextInput from "../../../../components/inputs/textInput/TextInput";
import ImageIcon from "../../../../../assets/svgs/image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MAX_IMAGES = 4;

const Description = ({ setDescription, setImages, images }) => {
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
        setImages((prev) => [...prev, ...newUris]);
      }
    } catch (e) {
      console.warn("Error al seleccionar imágenes:", e);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <View style={styles.WR__description__description}>
      <Text style={styles.WR__description__sectionTitle}>
        Describe brevemente lo que necesitas
      </Text>
      <View style={styles.WR__description__inputContainer}>
        <TextInput
          style={styles.WR__description__inputText}
          maxLength={250}
          multiline={true}
          borderless
          placeholder={"Texto de ejemplo..."}
          onChangeText={setDescription}
        />
        <View style={styles.WR__description__hr} />
        <Pressable
          style={styles.WR__description__imageButton}
          onPress={pickImages}
        >
          <Text style={styles.WR__description__imageButtonText}>
            Agregar imagen
          </Text>
          <ImageIcon />
        </Pressable>
        {images.length > 0 && (
          <View style={styles.WR__description__imagePreviewContainer}>
            {images.map((uri, idx) => (
              <View key={idx} style={styles.WR__description__imageWrapper}>
                <Image
                  source={{ uri }}
                  style={styles.WR__description__imagePreview}
                />
                <Pressable
                  style={styles.WR__description__removeButton}
                  onPress={() => removeImage(idx)}
                >
                  <FontAwesome6 name="minus" size={18} color="black" />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Description;
