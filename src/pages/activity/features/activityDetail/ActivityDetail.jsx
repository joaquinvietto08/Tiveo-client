import { View, Text, ScrollView, Pressable } from "react-native";
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
import { useContext, useRef, useState } from "react";
import RatingBottomSheet from "./components/rating/ratingBottomSheet/RatingBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Cancellation from "./components/cancellation/Cancellation";
import { UserContext } from "../../../../context/UserContext";

const ActivityDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { activityId } = route.params;
  const { activity } = useContext(UserContext);
  const data = activity?.find((a) => a.id === activityId);
  const ratingSheetRef = useRef(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const handleOpenRating = () => {
    setIsRatingOpen(true);
    ratingSheetRef.current?.snapToIndex(0);
  };

  const handleCloseRating = () => {
    ratingSheetRef.current?.close();
    setIsRatingOpen(false);
  };

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
              status={data.status}
              moment={data.moment}
              paymentStatus={data.paymentStatus}
            />
            <Categories services={data.services} />
            <Location address={data.address.address} />
            <Description description={data.description} />
            <Payment payment={data.paymentStatus} />
            <Rating
              rating={data.rating}
              status={data.status}
              onRate={handleOpenRating}
            />
            <Warranty />
            {data.status !== "done" && data.status !== "cancelled" && (
              <Cancellation />
            )}
          </View>

          <View style={styles.activity__activityDetail__helpContainer}>
            <MaterialIcons name="help" size={20} color={colors.black} />
            <Text style={styles.activity__activityDetail__helpText}>Ayuda</Text>
          </View>
        </ScrollView>
        <RatingBottomSheet
          ref={ratingSheetRef}
          snapPoints={["40%"]}
          isOpen={isRatingOpen}
          onClose={handleCloseRating}
          onConfirm={(value) => {
            console.log("Rating confirmado:", value);
            handleCloseRating();
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default ActivityDetail;
