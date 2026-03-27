import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./ActivityDetailsStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../../../styles/globalStyles";
import Location from "./components/location/Location";
import Description from "./components/description/Description";
import Rating from "./components/rating/Rating";
import Warranty from "./components/warranty/Warranty";
import Categories from "./components/categories/Categories";
import Worker from "./components/worker/Worker";
import Payment from "./components/payment/Payment";
import { useContext, useRef, useState, useCallback } from "react";
import RatingBottomSheet from "./components/rating/ratingBottomSheet/RatingBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Cancellation from "./components/cancellation/Cancellation";
import { styles as cancellationStyles } from "./components/cancellation/CancellationStyles";
import { UserContext } from "../../../../context/UserContext";
import { doc, getFirestore, updateDoc } from "@react-native-firebase/firestore";
import { sendWarrantyClaimMessage } from "../../../messages/utils/firebaseChat";
import { isWarrantyClaimable } from "./components/warranty/Warranty";
import { usePayment } from "../../../../hooks/usePayment";

const ActivityDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { activityId } = route.params;
  const { activities, user } = useContext(UserContext);
  const data = activities?.find((a) => a.id === activityId);
  const { payment } = usePayment(activityId);
  const ratingSheetRef = useRef(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [warrantyConfirmVisible, setWarrantyConfirmVisible] = useState(false);
  const db = getFirestore();

  const sendRatingWebhook = useCallback(
    async (value) => {
      try {
        await fetch("https://rateactivity-fpeb5gaoea-uc.a.run.app", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activityId, rating: value }),
        });
      } catch (error) {
        console.warn("❌ Error enviando rating a webhook:", error);
      }
    },
    [activityId]
  );

const helpMessage = `Consulta sobre trabajo realizado por ${data.worker.firstName} ${data.worker.lastName}.`;

  const handleOpenRating = () => {
    setIsRatingOpen(true);
    ratingSheetRef.current?.snapToIndex(0);
  };

  const handleCloseRating = () => {
    ratingSheetRef.current?.close();
    setIsRatingOpen(false);
  };

  const handleCancelActivity = useCallback(async () => {
    try {
      const activityRef = doc(db, "activities", activityId);
      await updateDoc(activityRef, { status: "cancelled" });
    } catch (error) {
      console.error("❌ Error al cancelar la actividad:", error);
    }
  }, [db, activityId]);

  const handleConfirmRating = useCallback(
    async (value) => {
      try {
        const activityRef = doc(db, "activities", activityId);
        await updateDoc(activityRef, {
          rating: value,
          updatedAt: new Date(),
        });
        await sendRatingWebhook(value);
      } catch (error) {
        console.error("❌ Error al guardar el rating:", error);
      }
    },
    [db, activityId, sendRatingWebhook]
  );

  const handleWarrantyPress = useCallback(async () => {
    if (!data || !isWarrantyClaimable(data.warranty)) return;
    const workerId = data.worker?.uid ?? data.worker?.id;
    const clientId = user?.uid;
    if (!clientId || !workerId) return;
    setWarrantyConfirmVisible(false);
    try {
      const activityRef = doc(db, "activities", activityId);
      await updateDoc(activityRef, { warranty: "claimed" });
      await sendWarrantyClaimMessage({
        activityId,
        clientId,
        workerId,
      });
      navigation.navigate("Messages", {
        activityId,
        worker: data.worker,
      });
    } catch (error) {
      console.error("❌ Error al usar garantía:", error);
    }
  }, [data, activityId, user?.uid, db, navigation]);

  const handleWarrantyOpenConfirm = useCallback(() => {
    if (data && isWarrantyClaimable(data.warranty)) setWarrantyConfirmVisible(true);
  }, [data]);

  return (
    <View
      style={{
        ...styles.activity__activityDetail__mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <GestureHandlerRootView>
        <ScrollView
          contentContainerStyle={styles.activity__activityDetail__scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.activity__activityDetail__header}>
            <Pressable onPress={navigation.goBack}>
              <Feather name="arrow-left" size={25} color="black" />
            </Pressable>
            <Text style={styles.activity__activityDetail__title}>
              Detalles de trabajo
            </Text>
          </View>
          <View style={styles.activity__activityDetail__bodyContainer}>
            <Worker
              worker={data.worker}
              createdAt={data.createdAt}
              price={data.price}
              budget={data.budget}
              status={data.status}
              moment={data.moment}
              paymentStatus={data.paymentStatus}
              totalAmount={payment?.totalAmount}
            />
            <Categories services={data.services} />
            <Location address={data.address.address} />
            <Description description={data.description} />
            <Payment
              activityId={activityId}
              paymentStatus={data.paymentStatus}
            />
            <Rating
              rating={data.rating}
              status={data.status}
              paymentStatus={data.paymentStatus}
              onRate={handleOpenRating}
            />
            <Warranty
              warranty={data.warranty}
              onPress={handleWarrantyOpenConfirm}
            />
            {data.status !== "done" && data.status !== "cancelled" && (
              <Cancellation onCancel={handleCancelActivity} />
            )}
          </View>

          <View style={styles.activity__activityDetail__helpContainer}>
            <MaterialIcons name="help" size={20} color={colors.black} />
            <Text 
            style={styles.activity__activityDetail__helpText}
                      onPress={() => navigation.navigate("Support", {message: helpMessage, activityId: activityId})}
            >Ayuda</Text>
          </View>
        </ScrollView>
        <RatingBottomSheet
          ref={ratingSheetRef}
          snapPoints={["40%"]}
          isOpen={isRatingOpen}
          onClose={handleCloseRating}
          onConfirm={(value) => {
            handleConfirmRating(value);
            handleCloseRating();
          }}
        />

        <Modal
          transparent
          animationType="fade"
          visible={warrantyConfirmVisible}
          onRequestClose={() => setWarrantyConfirmVisible(false)}
        >
          <View style={cancellationStyles.activityDetails__cancellation__overlay}>
            <View style={cancellationStyles.activityDetails__cancellation__popup}>
              <Text style={cancellationStyles.activityDetails__cancellation__popupTitle}>
                ¿Deseas reclamar la garantía?
              </Text>
              <Text style={cancellationStyles.activityDetails__cancellation__popupText}>
                Se enviará un mensaje al trabajador para coordinar la visita.
              </Text>
              <View style={cancellationStyles.activityDetails__cancellation__popupButtons}>
                <Pressable
                  style={[
                    cancellationStyles.activityDetails__cancellation__popupButton,
                    { backgroundColor: colors.lightGray },
                  ]}
                  onPress={() => setWarrantyConfirmVisible(false)}
                >
                  <Text
                    style={[
                      cancellationStyles.activityDetails__cancellation__popupButtonText,
                      { color: colors.black },
                    ]}
                  >
                    No
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    cancellationStyles.activityDetails__cancellation__popupButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => handleWarrantyPress()}
                >
                  <Text
                    style={[
                      cancellationStyles.activityDetails__cancellation__popupButtonText,
                      { color: colors.black },
                    ]}
                  >
                    Sí, reclamar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </GestureHandlerRootView>
    </View>
  );
};

export default ActivityDetail;
