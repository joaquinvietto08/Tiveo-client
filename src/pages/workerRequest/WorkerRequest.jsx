import { useRef, useState } from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./WorkerRequestStyles";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRoute } from "@react-navigation/native";
import TextInput from "../../components/inputs/textInput/TextInput";
import { getIcon } from "../../utils/getIcons";
import {
  formatDate,
  formatTime,
  translateService,
} from "../../utils/formatHelpers";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CategoriesBottomSheet from "./features/CategoriesBottomSheet/CategoriesBottomSheet";
import Available from "../../../assets/svgs/worker/available";
import Busy from "../../../assets/svgs/worker/busy";
import MomentBottomSheet from "./features/MomentBottomSheet/MomentBottomSheet";

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

  console.log(scheduledDateTime);

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
          <View style={styles.workerRequest__description}>
            <Text style={styles.workerRequest__sectionTitle}>
              Describe brevemente lo que necesitas
            </Text>
            <TextInput
              style={styles.workerRequest__inputText}
              maxLength={250}
              multiline={true}
            />
            <Text style={styles.workerRequest__sectionTitle}>Imagenes gg </Text>
          </View>
          <View style={styles.workerRequest__category}>
            <Text style={styles.workerRequest__sectionTitle}>Categoría</Text>
            <View style={styles.workerRequest__tagsWrapper}>
              {selectedServices.map((srv, i) => {
                const Icon = getIcon(srv);
                return (
                  <View key={i} style={styles.workerRequest__tag}>
                    <Icon height={24} width={24} />
                    <Text style={styles.workerRequest__tagText}>
                      {translateService(srv)}
                    </Text>
                  </View>
                );
              })}
              <Pressable
                style={styles.workerRequest__categoriesSelect}
                onPress={handleOpenCategories}
              >
                <Text style={styles.workerRequest__categoriesSelectText}>
                  Seleccionar
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.workerRequest__moment}>
            <Text style={styles.workerRequest__sectionTitle}>
              Indica en que momento lo preferís
            </Text>
            <View style={styles.workerRequest__momentOptions}>
              <Pressable
                style={[
                  styles.workerRequest__momentOption,
                  momentOption === "now" &&
                    styles.workerRequest__momentOptionSelected,
                ]}
                onPress={() => setMomentOption("now")}
              >
                <Available height={30} width={30} />
                <Text style={styles.workerRequest__dateText}>
                  Ahora{"\n"}mismo
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.workerRequest__momentOption,
                  momentOption === "schedule" &&
                    styles.workerRequest__momentOptionSelected,
                ]}
                onPress={handleOpenMoment}
              >
                <Busy height={30} width={30} />
                <Text style={styles.workerRequest__timeText}>
                  {momentOption === "schedule" && scheduledDateTime
                    ? `${formatDate(scheduledDateTime)}\n${formatTime(
                        scheduledDateTime
                      )} hs`
                    : "Coordinar"}
                </Text>
              </Pressable>
            </View>
          </View>
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
