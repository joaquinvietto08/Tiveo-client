import { forwardRef } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "../../../../../components/bottomSheet/BottomSheet";
import { styles } from "./CategoriesBottomSheetStyles";
import ServicesList from "../../../../../components/servicesList/ServicesList";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../../../styles/globalStyles";

const CategoriesBottomSheet = forwardRef(
  ({ services, selected, onToggle, snapPoints, onClose, isOpen }, ref) => {
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
          style={styles.categoriesBottomSheet__closeButton}
        >
          <AntDesign name="close" size={24} color={colors.gray} />
        </Pressable>
        <View style={styles.categoriesBottomSheet__content}>
          <Text style={styles.categoriesBottomSheet__title}>
            Selecciona la catagoria que{"\n"}se adapte a tu necesidad
          </Text>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <ServicesList
              services={services}
              selected={selected}
              onToggle={onToggle}
            />
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    );
  }
);

export default CategoriesBottomSheet;
