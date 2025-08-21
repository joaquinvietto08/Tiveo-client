import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./HeaderStyles";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../styles/globalStyles";

const Header = ({worker}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.messages__header__container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.messages__header__button}
      >
        <Feather name="arrow-left" size={24} color={colors.black}/>
      </Pressable>
      <View style={styles.messages__header__workerContainer}>
        <Image
          source={worker.profilePicture}
          style={styles.messages__header__workerImage}
        />
        <Text style={styles.messages__header__nameText} numberOfLines={2}>
          {worker.firstName} {worker.lastName}
        </Text>
      </View>
    </View>
  );
};

export default Header;
