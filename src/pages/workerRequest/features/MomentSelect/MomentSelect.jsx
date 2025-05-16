import { View, Pressable, Text } from "react-native";
import { styles } from "./MomentSelectStyles";
import Available from "../../../../../assets/svgs/worker/available.svg";
import Busy from "../../../../../assets/svgs/worker/busy.svg";
import { formatDate, formatTime } from "../../../../utils/formatHelpers";

const MomentSelect = ({
  momentOption,
  setMomentOption,
  handleOpenMoment,
  scheduledDateTime,
}) => {
  return (
    <View style={styles.WR__momentSelect__moment}>
      <Text style={styles.WR__momentSelect__sectionTitle}>
        Indica en que momento lo preferís
      </Text>
      <View style={styles.WR__momentSelect__momentOptions}>
        <Pressable
          style={[
            styles.WR__momentSelect__momentOption,
            momentOption === "now" &&
              styles.WR__momentSelect__momentOptionSelected,
          ]}
          onPress={() => setMomentOption("now")}
        >
          <Available height={30} width={30} />
          <Text style={styles.WR__momentSelect__dateText}>
            Ahora{"\n"}mismo
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.WR__momentSelect__momentOption,
            momentOption === "schedule" &&
              styles.WR__momentSelect__momentOptionSelected,
          ]}
          onPress={handleOpenMoment}
        >
          <Busy height={30} width={30} />
          <Text style={styles.WR__momentSelect__timeText}>
            {momentOption === "schedule" && scheduledDateTime
              ? `${formatDate(scheduledDateTime)}\n${formatTime(
                  scheduledDateTime
                )} hs`
              : "Coordinar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MomentSelect;
