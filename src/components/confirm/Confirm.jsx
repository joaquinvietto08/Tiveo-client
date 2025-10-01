import React, { useRef, useEffect } from "react";
import { Animated, View, Text, Pressable } from "react-native";
import Check from "../../../assets/svgs/check.svg";
import { styles } from "./ConfirmStyles";
import { colors } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const Confirm = ({ text = "", title, buttonBack = "", setSuccess }) => {
  const navigation = useNavigation();

  // 1) Animated values
  const slideAnim = useRef(new Animated.Value(1000)).current; // contenedor abajo
  const titleOpacity = useRef(new Animated.Value(0)).current; // título invisible
  const bottomOpacity = useRef(new Animated.Value(0)).current; // bottom invisible

  useEffect(() => {
    // 2) animación de slide up (500ms)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 3) después de 1s, fadeIn del título (500ms)
    const titleTimer = setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);

    // 4) después de 3s totales, fadeIn del bottom (500ms)
    const bottomTimer = setTimeout(() => {
      Animated.timing(bottomOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(bottomTimer);
    };
  }, [slideAnim, titleOpacity, bottomOpacity]);

  const handleGoHome = () => {
    navigation.navigate("HomeIndex", { openSheet: true });
  };

  return (
    <Animated.View
      style={[
        styles.checkContainer,
        { transform: [{ translateY: slideAnim }] }, // solo slide
      ]}
    >
      <View style={styles.checkContainerTop}>
        <Check width={130} height={130} fill={colors.primary} />

        {/* 5) Título con fade */}
        <Animated.Text
          style={[styles.checkIconText, { opacity: titleOpacity }]}
        >
          {title}
        </Animated.Text>
      </View>

      {/* 6) Bottom con fade */}
      <Animated.View
        style={[styles.checkContainerBottom, { opacity: bottomOpacity }]}
      >
        <Text style={styles.checkTextBottom}>{text}</Text>
        <Pressable style={styles.checkButton} onPress={handleGoHome}>
          <Text style={styles.checkButtonText}>Volver al inicio</Text>
        </Pressable>
        {buttonBack && (
          <Text style={styles.checkButtonBack} onPress={() => setSuccess(false)}>{buttonBack}</Text>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Confirm;
