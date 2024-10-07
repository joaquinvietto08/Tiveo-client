import React, { forwardRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheetComponent = forwardRef(({ children, snapPoints, indexVal, ...props }, ref) => {
    return (
        <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            index={indexVal}
            handleIndicatorStyle={{ backgroundColor: "#D8D8D8" }}
            backgroundStyle={{
                backgroundColor: "#F8F8F8",
                shadowColor: "#000",
                elevation: 7,
            }}
            {...props}
        >
            {children}
        </BottomSheet>
    );
});

export default BottomSheetComponent;