import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./WarrantyStyles";
import WarrantyIcon from "../../../../../../../assets/svgs/worker/warranty";
import { colors } from "../../../../../../styles/globalStyles";

const Warranty = ({ }) => {
  return (
    <Pressable
      style={styles.activityDetails__warranty__button}
      onPress={""}
    >
      <WarrantyIcon width={27} height={27} fill={colors.black} />
      <Text style={styles.activityDetails__warranty__text}>
        El período de garantía ha vencido
      </Text>
    </Pressable>
  );
};

export default Warranty;
