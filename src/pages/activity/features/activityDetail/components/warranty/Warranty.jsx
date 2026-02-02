import React, { useMemo } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./WarrantyStyles";
import WarrantyIcon from "../../../../../../../assets/svgs/worker/warranty";
import { colors } from "../../../../../../styles/globalStyles";

const parseWarrantyDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getWarrantyLabel = (warranty) => {
  const empty = warranty == null || warranty === "";
  if (empty || warranty === "unavailable") {
    return "Todavía no disponible";
  }
  if (warranty === "claimed" || warranty === "solved") {
    return "Garantía usada";
  }
  const endDate = parseWarrantyDate(warranty);
  if (!endDate) return "Todavía no disponible";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diffMs = end - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Se venció";
  if (diffDays === 0) return "Vence hoy";
  return `${diffDays} días restantes de garantía`;
};

/** true si la garantía existe, no está usada y no está vencida (se puede reclamar). */
export const isWarrantyClaimable = (warranty) => {
  if (warranty == null || warranty === "" || warranty === "unavailable") return false;
  if (warranty === "claimed") return false;
  const endDate = parseWarrantyDate(warranty);
  if (!endDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  return end >= today;
};

const Warranty = ({ warranty, onPress }) => {
  const label = useMemo(() => getWarrantyLabel(warranty), [warranty]);

  return (
    <Pressable
      style={styles.activityDetails__warranty__button}
      onPress={onPress}
    >
      <WarrantyIcon width={27} height={27} fill={colors.black} />
      <Text style={styles.activityDetails__warranty__text}>{label}</Text>
    </Pressable>
  );
};

export default Warranty;
