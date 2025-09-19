import { View, Pressable, Text } from "react-native";
import { styles } from "./MomentSelectStyles";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";
import { formatDate, formatTime } from "../../../../utils/formatHelpers";
import { colors } from "../../../../styles/globalStyles";

const MomentSelect = ({
  momentOption,
  setMomentOption,
  handleOpenMoment,
  setScheduledDateTime,
  scheduledDateTime,
  isAvailable,
}) => {
  return (
    <View style={styles.WR__momentSelect__moment}>
      <Text style={styles.WR__momentSelect__sectionTitle}>
        Indica en que momento lo preferís
      </Text>
      <View style={styles.WR__momentSelect__momentOptions}>
        <Pressable
          disabled={!isAvailable}
          style={[
            styles.WR__momentSelect__momentOption,
            momentOption === "now" &&
              styles.WR__momentSelect__momentOptionSelected,
          ]}
          onPress={() => {
            setMomentOption("now");
            setScheduledDateTime(null);
          }}
        >
          <Available
            height={30}
            width={30}
            fill={isAvailable ? "#000" : colors.gray}
          />
          <Text
            style={[
              styles.WR__momentSelect__dateText,
              !isAvailable && { color: colors.gray },
            ]}
          >
            Ahora{"\n"}mismo
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.WR__momentSelect__momentOption,
            momentOption === "scheduled" &&
              styles.WR__momentSelect__scheduleOptionSelected,
          ]}
          onPress={handleOpenMoment}
        >
          <Busy
            height={30}
            width={30}
            fill={momentOption === "scheduled" ? colors.white : ""}
          />
          {momentOption === "scheduled" && scheduledDateTime ? (
            <View>
              <Text style={styles.WR__momentSelect__timeText} numberOfLines={1}>
                {formatDate(scheduledDateTime)}
              </Text>
              <Text style={styles.WR__momentSelect__timeText}>
                {formatTime(scheduledDateTime)} hs
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.WR__momentSelect__disableTimeText,
                !isAvailable && { color: colors.white },
              ]}
            >
              {isAvailable ? "Coordinar" : "Seleccionar"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default MomentSelect;
