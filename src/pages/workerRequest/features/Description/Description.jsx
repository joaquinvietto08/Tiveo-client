import { View, Text, Pressable } from "react-native";
import { styles } from "./DescriptionStyles";
import TextInput from "../../../../components/inputs/textInput/TextInput";
import Image from "../../../../../assets/svgs/image";

const Description = () => {
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
        />
        <View style={styles.WR__description__hr} />
        <Pressable style={styles.WR__description__imageButton}>
          <Text style={styles.WR__description__imageButtonText}>
            Subir imagen
          </Text>
          <Image />
        </Pressable>
      </View>
    </View>
  );
};

export default Description;
