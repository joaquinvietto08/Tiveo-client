import React from "react";
import { Text } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import Location from "./location/Location";
import Cards from "./cards/Cards";
import { styles } from "./FooterStyles";

const Footer = ({ sheetRef }) => {
  const snapPoints = [140, 450];

  const animationConfigs = {
    duration: 400,
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      animationConfigs={animationConfigs}
      index={1}
    >
      <Location />
      <Text style={styles.home__footer__subtitle}>
        25 trabajadores en tu zona
      </Text>
      <Cards />
    </BottomSheet>
  );
};

export default Footer;
