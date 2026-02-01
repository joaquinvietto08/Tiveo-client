import React, { useContext, useCallback, useMemo } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import { styles } from "./ActivityStyles";
import ActivityCard from "./components/activityCard/ActivityCard";
import { doc, getFirestore, updateDoc } from "@react-native-firebase/firestore";

const Activity = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activities } = useContext(UserContext);
  const sortedActivities = useMemo(() => {
    if (!Array.isArray(activities)) return [];

    const getTime = (value) => {
      if (!value) return 0;
      if (typeof value.toDate === "function") return value.toDate().getTime();
      const date = value instanceof Date ? value : new Date(value);
      const time = date.getTime();
      return Number.isNaN(time) ? 0 : time;
    };

    const getActivityTime = (activity) =>
      getTime(
        activity?.scheduledDateTime ??
          activity?.startedAt ??
          activity?.createdAt
      );

    return [...activities].sort(
      (a, b) => getActivityTime(b) - getActivityTime(a)
    );
  }, [activities]);
  const hasActivities = sortedActivities.length > 0;
  const db = getFirestore();

  const handleCancelActivity = useCallback(
    async (activityId) => {
      try {
        const activityRef = doc(db, "activities", activityId);
        await updateDoc(activityRef, { status: "cancelled" });
      } catch (error) {
        console.error("❌ Error al cancelar la actividad:", error);
      }
    },
    [db]
  );

  const renderItem = ({ item }) => (
    <ActivityCard
      data={item}
      onPress={() =>
        navigation.navigate("ActivityDetail", { activityId: item.id })
      }
      onCancel={() => handleCancelActivity(item.id)}
      onMessages={() =>
        navigation.navigate("Messages", {
          activityId: item.id,
          worker: item.worker,
        })
      }
      onPayment={() =>
        navigation.navigate("Payment", {
          activityId: item.id,
          worker: item.worker,
          paymentStatus: item.paymentStatus,
        })
      }
    />
  );

  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Inter-Bold",
            padding: 20,
            paddingTop: 40,
          }}
        >
          Actividad
        </Text>
        {hasActivities ? (
          <FlatList
            data={sortedActivities}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 80,
              paddingTop: 20,
            }}
            scrollEnabled={false}
          />
        ) : (
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 80,
              paddingTop: 40,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 16,
                textAlign: "center",
                color: "#8D8D8D",
              }}
            >
              Todavía no tenés actividad.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Activity;
