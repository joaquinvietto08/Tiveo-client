import { View, Image, StyleSheet, Text } from "react-native";
import { getIcon } from "../../../../utils/getIcons";
import { colors } from "../../../../styles/globalStyles";

const WorkerMarker = ({ worker }) => {
  const services = worker?.services || [];
  const displayedServices = services.slice(0, 2);
  const extraServicesCount = services.length - displayedServices.length;

  const imageSource =
    typeof worker?.photoURL === "string"
      ? { uri: worker.photoURL }
      : worker?.photoURL || null;

  const workerInitial =
    worker?.firstName?.[0]?.toUpperCase() ||
    worker?.name?.[0]?.toUpperCase() ||
    worker?.workerName?.[0]?.toUpperCase() ||
    worker?.lastName?.[0]?.toUpperCase() ||
    "?";

  return (
    <View style={styles.map__markers__worker__markerContainer}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={styles.map__markers__worker__workerImage}
        />
      ) : (
        <View
          style={[
            styles.map__markers__worker__workerImage,
            styles.map__markers__worker__placeholder,
          ]}
        >
          <Text style={styles.map__markers__worker__placeholderText}>
            {workerInitial}
          </Text>
        </View>
      )}
      <View style={styles.map__markers__worker__servicesContainer}>
        {extraServicesCount > 0 && (
          <View style={styles.map__markers__worker__serviceIcon}>
            <Text style={styles.map__markers__worker__serviceText}>
              +{extraServicesCount}
            </Text>
          </View>
        )}
        {displayedServices.map((service, index) => {
          const ServiceIcon = getIcon(service);
          if (!ServiceIcon) return null;
          return (
            <View key={index} style={styles.map__markers__worker__serviceIcon}>
              <ServiceIcon width={16} height={16} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map__markers__worker__markerContainer: {
    width: 68,
    height: 56,
    alignItems: "center",
  },
  map__markers__worker__workerImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },
  map__markers__worker__servicesContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  map__markers__worker__serviceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: -8,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__worker__serviceText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Inter-Bold",
    marginLeft: 3,
  },
  map__markers__worker__placeholder: {
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  map__markers__worker__placeholderText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
  },
});

export default WorkerMarker;
