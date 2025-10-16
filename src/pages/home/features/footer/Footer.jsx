import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import Location from "./location/Location";
import Cards from "./cards/Cards";
import { styles } from "./FooterStyles";
import Works from "./works/Works";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { UserContext } from "../../../../context/UserContext";

const Footer = ({ sheetRef, filteredWorkers }) => {
  const { activities, directRequests } = useContext(UserContext);
  const combined = [...(activities || []), ...(directRequests || [])];
  const workers = [...filteredWorkers];
  const [snapPoints, setSnapPoints] = useState(
    workers.length > 0 ? [140, 450] : [200, 200]
  );
  const [initialRender, setInitialRender] = useState(true);

  const animationConfigs = {
    duration: 400,
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    if (workers.length === 0 && combined.length === 0) {
      setSnapPoints([200, 200]);
    } else if (workers.length === 0 && combined.length > 0) {
      setSnapPoints([140, 350]);
    } else {
      setSnapPoints([140, 450]);
    }
  }, [workers.length, combined.length]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      animationConfigs={animationConfigs}
    >
      <Location />
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={styles.home__footer__scrollView}
      >
        {combined.length > 0 && <Works />}
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
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default Footer;
