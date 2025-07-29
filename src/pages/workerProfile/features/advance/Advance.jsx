import { View, Text, Pressable } from "react-native";
import { styles } from "./AdvanceStyles";
import { getIcon } from "../../../../utils/getIcons";
import {
  translateService,
  translateAvailabilityRequest,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available";
import Busy from "../../../../../assets/svgs/worker/busy";
import { useNavigation } from "@react-navigation/native";

const Advance = ({ worker }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.workerProfile__advance__Bottom}>
     
    </View>
  );
};

export default Advance;
