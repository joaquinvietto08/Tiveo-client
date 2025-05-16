import { useRef, useState } from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./WorkerRequestStyles";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CategoriesBottomSheet from "./features/CategoriesBottomSheet/CategoriesBottomSheet";
import MomentBottomSheet from "./features/MomentBottomSheet/MomentBottomSheet";
import CategoriesSelect from "./features/CategoriesSelect/CategoriesSelect";
import MomentSelect from "./features/MomentSelect/MomentSelect";
import Description from "./features/Description/Description";

const WorkerRequest = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { worker } = useRoute().params;
  const services = worker?.services || [];

  const snapPoints = ["45%"];

  /* Services */
  const [selectedServices, setSelectedServices] = useState([]);
  const categorySheetRef = useRef(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleOpenCategories = () => {
    setIsCategoryOpen(true);
    categorySheetRef.current?.snapToIndex(0);
  };
  const handleCloseCategories = () => {
    categorySheetRef.current?.close();
    setIsCategoryOpen(false);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  /* Moment */
  const [momentOption, setMomentOption] = useState("now");
  const momentSheetRef = useRef(null);
  const [isMomentOpen, setIsMomentOpen] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(null);

  const handleOpenMoment = () => {
    setIsMomentOpen(true);
    momentSheetRef.current?.snapToIndex(0);
  };
  const handleCloseMoment = () => {
    momentSheetRef.current?.close();
    setIsMomentOpen(false);
  };

  return (
    <View
      style={{
        ...styles.workerRequest__mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar translucent barStyle="dark-content" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.workerRequest__scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.workerRequest__header}>
            <Pressable onPress={navigation.goBack}>
              <Feather name="arrow-left" size={25} color="black" />
            </Pressable>
            <Text style={styles.workerRequest__backText}>
              Solicitar trabajador
            </Text>
          </View>
          <Description />
          <CategoriesSelect
            selectedServices={selectedServices}
            onOpenCategories={handleOpenCategories}
          />
          <MomentSelect
            momentOption={momentOption}
            setMomentOption={setMomentOption}
            handleOpenMoment={handleOpenMoment}
            scheduledDateTime={scheduledDateTime}
          />
        </ScrollView>

        <CategoriesBottomSheet
          ref={categorySheetRef}
          services={services}
          selected={selectedServices}
          onToggle={toggleService}
          snapPoints={snapPoints}
          onClose={handleCloseCategories}
          isOpen={isCategoryOpen}
        />

        <MomentBottomSheet
          ref={momentSheetRef}
          snapPoints={snapPoints}
          onClose={handleCloseMoment}
          isOpen={isMomentOpen}
          onConfirm={(chosenDate) => {
            setScheduledDateTime(chosenDate);
            setMomentOption("schedule");
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default WorkerRequest;
