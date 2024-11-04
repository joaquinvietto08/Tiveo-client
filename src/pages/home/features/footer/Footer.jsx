import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import Location from "./location/Location";
import Cards from "./cards/Cards";
import { styles } from "./FooterStyles";

const Footer = ({ sheetRef, filteredGeneralWorkers, filteredSiteWorkers }) => {
  const workers = [...filteredGeneralWorkers, ...filteredSiteWorkers];
  const [snapPoints, setSnapPoints] = useState(
    workers.length > 0 ? [140, 450] : [200, 200]
  );

  const animationConfigs = {
    duration: 400,
  };

  useEffect(() => {
    // Actualizar el índice del BottomSheet cuando cambien los trabajadores
    if (workers.length === 0) {
      setSnapPoints([200, 200]);
    } else {
      setSnapPoints([140, 450]);
    }
  }, [workers.length]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      animationConfigs={animationConfigs}
      index={1}
    >
      <Location />
      {workers.length > 0 ? (
        <>
          <Text style={styles.home__footer__subtitle}>
            {workers.length === 1
              ? "Un trabajador en tu zona"
              : `${workers.length} trabajadores en tu zona`}
          </Text>
          <Cards workers={workers} />
        </>
      ) : (
        <Text style={styles.home__footer__subtitle}>
          No se encontraron trabajadores en tu zona.
        </Text>
      )}
    </BottomSheet>
  );
};

export default Footer;
