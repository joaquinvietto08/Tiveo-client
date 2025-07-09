import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./LoadingButtonStyles";
import * as Progress from "react-native-progress";
import { colors } from "../../../styles/globalStyles";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const LoadingButton = ({ text, color = "primary", loading, onPress }) => {
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    let timeout1, timeout2, timeout3;

    if (loading) {
      setProgress(0);
      setShowLoading(true);
      timeout1 = setTimeout(() => setProgress(0.6), 500);
      timeout2 = setTimeout(() => setProgress(0.9), 1500);
    } else {
      timeout2 = setTimeout(() => setProgress(1), 500);
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [loading]);

  const progressBarProps = {
    progress,
    width: screenWidth - 39,
    color: colors[color],
    height: 50,
    borderRadius: 10,
    unfilledColor: "#FFC362",
    borderWidth: 0,
    animationType: "timing",
    useNativeDriver: true,
  };

  return (
    <>
      <Modal transparent visible={showLoading} animationType="fade">
        <View style={styles.inputs__loadingButton__overlay}>
          <View style={styles.inputs__loadingButton__progressWrapper}>
            <Progress.Bar {...progressBarProps} />
            <Text style={styles.inputs__loadingButton__progressText}>
              {text}
            </Text>
          </View>
        </View>
      </Modal>
      <Pressable
        disabled={loading}
        onPress={onPress}
        style={styles.inputs__loadingButton__button}
      >
        <Text style={styles.inputs__loadingButton__text}>{text}</Text>
      </Pressable>
    </>
  );
};

export default LoadingButton;
