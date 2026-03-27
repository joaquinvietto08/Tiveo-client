import React, { useContext, useCallback, useMemo } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import { styles } from "./ActivityStyles";
import ActivityCard from "./components/activityCard/ActivityCard";
import { doc, getFirestore, updateDoc } from "@react-native-firebase/firestore";

const Activity = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activities, openRequests, directRequests } = useContext(UserContext);
  
  // Combinar activities y requests
  const sortedItems = useMemo(() => {
    const getTime = (value) => {
      if (!value) return 0;
      if (typeof value.toDate === "function") return value.toDate().getTime();
      const date = value instanceof Date ? value : new Date(value);
      const time = date.getTime();
      return Number.isNaN(time) ? 0 : time;
    };

    const getRequestTime = (item) =>
      getTime(item?.scheduledDateTime ?? item?.createdAt);

    const getActivityTime = (item) => getTime(item?.createdAt);

    // Marcar activities y requests para diferenciarlas
    const activitiesWithType = Array.isArray(activities) 
      ? activities.map(a => ({ ...a, _isRequest: false }))
      : [];
    
    const openRequestsWithType = Array.isArray(openRequests)
      ? openRequests
          .filter((r) => r.status === "requested")
          .map((r) => ({ ...r, _isRequest: true }))
      : [];

    const directRequestsWithType = Array.isArray(directRequests)
      ? directRequests
          .filter((r) => r.status === "requested")
          .map((r) => ({ ...r, _isRequest: true }))
      : [];

    // Requests: más nuevos primero (scheduledDateTime o createdAt)
    // Activities: más nuevos según createdAt
    const sortedRequests = [...openRequestsWithType, ...directRequestsWithType].sort(
      (a, b) => getRequestTime(b) - getRequestTime(a)
    );
    const sortedActivities = [...activitiesWithType].sort(
      (a, b) => getActivityTime(b) - getActivityTime(a)
    );

    // Siempre mostrar requests arriba
    return [...sortedRequests, ...sortedActivities];
  }, [activities, openRequests, directRequests]);
  
  const hasItems = sortedItems.length > 0;
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

  const handleCancelRequest = useCallback(
    async (requestId) => {
      try {
        const requestRef = doc(db, "requests", requestId);
        await updateDoc(requestRef, { status: "cancelled" });
      } catch (error) {
        console.error("❌ Error al cancelar la solicitud:", error);
      }
    },
    [db]
  );

  const renderItem = ({ item }) => (
    <ActivityCard
      data={item}
      isRequest={item._isRequest}
      onPress={() =>
        navigation.navigate("ActivityDetail", { activityId: item.id })
      }
      onCancel={() => 
        item._isRequest 
          ? handleCancelRequest(item.id)
          : handleCancelActivity(item.id)
      }
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
        {hasItems ? (
          <FlatList
            data={sortedItems}
            keyExtractor={(item) => `${item._isRequest ? 'req' : 'act'}-${item.id}`}
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
