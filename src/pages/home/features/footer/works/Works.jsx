import { useContext } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../../../../context/UserContext";
import { styles } from "./WorksStyles";
import StatusCard from "./StatusCard/StatusCard";

const MAX_SERVICES = 6;

const Works = () => {
  const { activity } = useContext(UserContext);
  const statusPriority = ["done", "going", "pending", "working", "confirm"];

  const filteredRequests = activity
    .filter((item) => statusPriority.includes(item.status))
    .sort((a, b) => {
      return (
        statusPriority.indexOf(a.status) - statusPriority.indexOf(b.status)
      );
    });

  const renderItem = ({ item }) => {
    const id = item.id;
    const worker = item.worker|| {};
    const services = item.services || [];
    const address = item.address.address.split(",")[0] || [];
    const status = item.status || [];
    const moment = item.moment || [];
    const payment = item.paymentStatus || [];
    const name = item.worker.firstName || [];
    const scheduledDateTime = item.scheduledDateTime || [];
    const displayed = services.slice(0, MAX_SERVICES);
    const extraCount = services.length - displayed.length;

    return (
      <StatusCard
        activityId={id}
        payment={payment}
        worker={worker}
        status={status}
        displayedServices={displayed}
        extraCount={extraCount}
        services={services}
        address={address}
        moment={moment}
        scheduledDateTime={scheduledDateTime}
        name={name}
      />
    );
  };

  return (
    <View style={styles.home__bottomSheet__works__container}>
      <FlatList
        data={filteredRequests}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.home__bottomSheet__works__listContainer}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Works;
