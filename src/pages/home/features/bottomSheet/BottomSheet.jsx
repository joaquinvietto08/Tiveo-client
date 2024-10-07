import React from 'react';
import {Text} from "react-native";
import BottomSheetComponent from "../../../../components/bottomSheet/BottomSheet"
import Location from "./location/Location";
import Cards from "./cards/Cards";
import {styles} from "./BottomSheetStyles";

const BottomSheet = ({ sheetRef }) => {

    const snapPoints = [140, 450];

    const animationConfigs = {
        duration: 400,
    };

 return (
     <BottomSheetComponent ref={sheetRef} snapPoints={snapPoints} animationConfigs={animationConfigs} indexVal={1}>
         <Location />
         <Text style={styles.home__bottomSheet__subtitle}>25 trabajadores en tu zona</Text>
         <Cards />
     </BottomSheetComponent>
 )
}

export default BottomSheet;