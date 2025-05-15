import { forwardRef } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import { styles } from "./MomentBottomSheetStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../../styles/globalStyles";

const MomentBottomSheet = forwardRef(({ snapPoints, onClose, isOpen }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onClose={onClose}
      overlay
      isOpen={isOpen}
      handleStyle={{ display: "none" }}
    >
      <Pressable
        onPress={onClose}
        style={styles.momentBottomSheet__closeButton}
      >
        <AntDesign name="close" size={24} color={colors.gray} />
      </Pressable>
      <View style={styles.momentBottomSheet__content}>
        <Text style={styles.momentBottomSheet__title}>
          Elije fecha y hora{"\n"}que prefieras
        </Text>
        <View style={styles.momentBottomSheet__momentContainer}>
          <Pressable style={styles.momentBottomSheet__momentSelector}>
            <Text style={styles.momentBottomSheet__momentSelectorText}>
              Jueves 13
            </Text>
          </Pressable>
          <View style={styles.momentBottomSheet__hr}></View>
          <Pressable style={styles.momentBottomSheet__momentSelector}>
            <Text style={styles.momentBottomSheet__momentSelectorText}>
              17:30hs
            </Text>
          </Pressable>
        </View>
        <Text style={styles.momentBottomSheet__infoText}>
          Podes coordinar con un trabajador con{"\n"}
          hasta 15 días de anticipación. Mas información
        </Text>
        <Pressable style={styles.momentBottomSheet__confirmButton}>
          <Text style={styles.momentBottomSheet__confirmText}>Confirmar</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
});

export default MomentBottomSheet;
