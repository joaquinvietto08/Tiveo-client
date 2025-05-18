import React, { forwardRef, useState, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet from "../../../../../components/bottomSheet/BottomSheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./MomentBottomSheetStyles";
import { colors } from "../../../../../styles/globalStyles";
import { formatDate, formatTime } from "../../../../../utils/formatHelpers";

const MomentBottomSheet = forwardRef(
  ({ snapPoints, onClose, isOpen, onConfirm }, ref) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState(null);
    const [show, setShow] = useState(false);

    const minimumDate = useMemo(() => new Date(), []);
    const maximumDate = useMemo(() => {
      const d = new Date();
      d.setDate(d.getDate() + 15);
      return d;
    }, []);

    const showDatePicker = () => {
      setMode("date");
      setShow(true);
    };
    const showTimePicker = () => {
      setMode("time");
      setShow(true);
    };

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
            <Pressable
              style={styles.momentBottomSheet__dateSelector}
              onPress={showDatePicker}
            >
              <Text style={styles.momentBottomSheet__momentSelectorText}>
                {formatDate(date.toISOString())}
              </Text>
            </Pressable>
            <View style={styles.momentBottomSheet__hr}></View>
            <Pressable
              style={styles.momentBottomSheet__timeSelector}
              onPress={showTimePicker}
            >
              <Text style={styles.momentBottomSheet__momentSelectorText}>
                {formatTime(date.toISOString())} hs
              </Text>
            </Pressable>
          </View>

          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="default"
              onChange={(e, sel) => {
                setShow(false);
                if (sel) {
                  if (mode === "date") setDate(sel);
                  else {
                    const d = new Date(date);
                    d.setHours(sel.getHours(), sel.getMinutes());
                    setDate(d);
                  }
                }
              }}
              minimumDate={minimumDate}
              maximumDate={mode === "date" ? maximumDate : undefined}
            />
          )}

          <Text style={styles.momentBottomSheet__infoText}>
            Podes coordinar con un trabajador con{"\n"}
            hasta 15 días de anticipación. Mas información
          </Text>
          <Pressable
            style={styles.momentBottomSheet__confirmButton}
            onPress={() => {
              onConfirm(date);
              onClose();
            }}
          >
            <Text style={styles.momentBottomSheet__confirmText}>Confirmar</Text>
          </Pressable>
        </View>
      </BottomSheet>
    );
  }
);

export default MomentBottomSheet;
