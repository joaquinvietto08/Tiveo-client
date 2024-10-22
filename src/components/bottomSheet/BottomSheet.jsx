import React, { forwardRef } from "react";
import { Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { styles } from "./BottomSheetStyles";

const BottomSheetComponent = forwardRef(
  (
    {
      children,
      snapPoints,
      indexVal,
      isOpen = true,
      overlay = false,
      onClose,
      ...props
    },
    ref
  ) => {
    const bottomSheetProps = {
      ref,
      snapPoints,
      handleIndicatorStyle: { backgroundColor: "#D8D8D8" },
      backgroundStyle: {
        backgroundColor: "#F8F8F8",
        shadowColor: "#000",
        elevation: 20,
      },
      ...props,
    };

    return (
      <>
        {overlay && isOpen && (
          <Pressable style={styles.bottomSheet__overlay} onPress={onClose} />
        )}
        <BottomSheet {...bottomSheetProps}>{children}</BottomSheet>
      </>
    );
  }
);

export default BottomSheetComponent;
