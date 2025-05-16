import { View, Text } from "react-native";
import { styles } from "./DescriptionStyles";
import TextInput from "../../../../components/inputs/textInput/TextInput";

const Description = () => {
  return (
    <View style={styles.WR__description__description}>
      <Text style={styles.WR__description__sectionTitle}>
        Describe brevemente lo que necesitas
      </Text>
      <TextInput
        style={styles.WR__description__inputText}
        maxLength={250}
        multiline={true}
      />
      <Text style={styles.WR__description__sectionTitle}>Imagenes gg </Text>
    </View>
  );
};

export default Description;
