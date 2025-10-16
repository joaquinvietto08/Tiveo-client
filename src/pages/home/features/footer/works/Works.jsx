import { useContext, useMemo } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../../../../context/UserContext";
import { styles } from "./WorksStyles";
import StatusCard from "./StatusCard/StatusCard";

const MAX_SERVICES = 6;

const Works = () => {
  const { activities, directRequests } = useContext(UserContext);

  // Orden de prioridad de estados
  const statusPriority = ["requested", "confirm", "going", "working", "done"];

  // 🧩 Combinamos ambas listas y las ordenamos por prioridad
  const mergedData = useMemo(() => {
    const combined = [...(activities || []), ...(directRequests || [])];
    return combined
      .filter((item) => statusPriority.includes(item.status))
      .sort(
        (a, b) =>
          statusPriority.indexOf(a.status) - statusPriority.indexOf(b.status)
      );
  }, [activities, directRequests]);

  const renderItem = ({ item }) => {
    const {
      id,
      worker = {},
      services = [],
      address = {},
      status = "",
      moment = "",
      paymentStatus = "",
      scheduledDateTime = "",
    } = item;

    const displayed = services.slice(0, MAX_SERVICES);
    const extraCount = services.length - displayed.length;
    const addressText = address?.address?.split(",")[0] || "Sin dirección";
    const name = worker?.firstName || "Sin nombre";

    return (
      <StatusCard
        activityId={id}
        payment={paymentStatus}
        worker={worker}
        status={status}
        displayedServices={displayed}
        extraCount={extraCount}
        services={services}
        address={addressText}
        moment={moment}
        scheduledDateTime={scheduledDateTime}
        name={name}
      />
    );
  };

  return (
    <View style={styles.home__bottomSheet__works__container}>
      <FlatList
        data={mergedData}
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
