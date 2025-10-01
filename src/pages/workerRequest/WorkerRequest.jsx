import { useRef, useState, useEffect } from "react";
import { View, ScrollView, Pressable, Text, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./WorkerRequestStyles";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CategoriesBottomSheet from "./features/CategoriesSelect/CategoriesBottomSheet/CategoriesBottomSheet";
import MomentBottomSheet from "./features/MomentSelect/MomentBottomSheet/MomentBottomSheet";
import CategoriesSelect from "./features/CategoriesSelect/CategoriesSelect";
import MomentSelect from "./features/MomentSelect/MomentSelect";
import Description from "./features/Description/Description";
import Default from "./features/Bottom/Default/Default";
import Advance from "./features/Bottom/Advance/Advance";
import { servicesData } from "../../utils/servicesData";
import Confirm from "../../components/confirm/Confirm";

const WorkerRequest = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { bottom = "default", worker, initialSelectedServices = [] } = route.params;

  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const scrollRef = useRef(null);

  const advancedServices = servicesData.map((s) => ({
    service: s.name,
    key: s.key,
  }));
  const services = bottom === "default" ? worker?.services : advancedServices;

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const snapPoints = ["45%"];

  /* Services */
  const [selectedServices, setSelectedServices] = useState(initialSelectedServices);
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
  const isAvailable = worker?.status === "busy" ? false : true;
  const [momentOption, setMomentOption] = useState(
    isAvailable ? "now" : "scheduled"
  );
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

  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  };

  const [blockBack, setBlockBack] = useState(false);

  useEffect(() => {
    if (blockBack) {
      const backHandlerSub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      const removeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });

      return () => {
        backHandlerSub.remove();
        removeBeforeRemove();
      };
    }
  }, [blockBack, navigation]);

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
          ref={scrollRef}
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
          <Description
            setImages={setImages}
            setDescription={setDescription}
            images={images}
          />
          <CategoriesSelect
            selectedServices={selectedServices}
            onOpenCategories={handleOpenCategories}
          />
          <MomentSelect
            momentOption={momentOption}
            setMomentOption={setMomentOption}
            handleOpenMoment={handleOpenMoment}
            setScheduledDateTime={setScheduledDateTime}
            scheduledDateTime={scheduledDateTime}
            isAvailable={isAvailable}
          />
          {bottom === "default" ? (
            <Default
              worker={worker}
              data={[
                description,
                images,
                selectedServices,
                momentOption,
                scheduledDateTime,
              ]}
              onRequestScrollToBottom={scrollToBottom}
              onSuccess={handleSuccess}
              setBlockBack={setBlockBack}
            />
          ) : (
            <Advance
              data={[
                description,
                images,
                selectedServices,
                momentOption,
                scheduledDateTime,
              ]}
              onRequestScrollToBottom={scrollToBottom}
              setBlockBack={setBlockBack}
            />
          )}
        </ScrollView>

        {success && (
          <Confirm
            title="Solicitud enviada"
            text={
              "Recordá que este trabajo todavía no está confirmado.\nPodés ver el estado en el inicio."
            }
          />
        )}

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
            setMomentOption("scheduled");
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default WorkerRequest;
