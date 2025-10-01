import React, { useContext } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import { styles } from "./ActivityStyles";
import ActivityCard from "./components/activityCard/ActivityCard";

const Activity = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activity } = useContext(UserContext);

  const renderItem = ({ item }) => (
    <ActivityCard
      data={item}
      onPress={() =>
        navigation.navigate("ActivityDetail", { activityId: item.id })
      }
      onCancel={() => console.log("Cancelar", item.id)}
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
        <FlatList
          data={activity}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 80,
            paddingTop: 20,
          }}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Activity;
