import { Pressable, Text, View } from "react-native";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import { styles } from "./StatusCardStyles";
import { getIcon } from "../../../../../../utils/getIcons";
import { colors } from "../../../../../../styles/globalStyles";
import Available from "../../../../../../../assets/svgs/worker/available.svg";
import Busy from "../../../../../../../assets/svgs/worker/busy.svg";
import { formatDate, formatTime } from "../../../../../../utils/formatHelpers";
import { useNavigation } from "@react-navigation/native";

const StatusCard = ({
  activityId,
  worker,
  status,
  extraCount,
  services,
  displayedServices,
  address,
  scheduledDateTime,
  moment,
  payment,
  name,
}) => {
  const navigation = useNavigation();
  const isRequested = status === "requested";

  const cardVariantStyle = isRequested
    ? styles.home__bottomSheet__statusCard__card__requested
    : styles.home__bottomSheet__statusCard__card__default;
  const textColor = isRequested ? colors.black : colors.white;
  const detailsButtonStyle = [
    styles.home__bottomSheet__statusCard__detailsButton,
    isRequested
      ? styles.home__bottomSheet__statusCard__detailsButton__requested
      : styles.home__bottomSheet__statusCard__detailsButton__default,
  ];

  console.log(payment)
  const hasScheduledDate = Boolean(scheduledDateTime);

  const getScheduledLabel = () =>
    hasScheduledDate
      ? `Programado ${formatDate(scheduledDateTime)} ${formatTime(
          scheduledDateTime
        )} hs`
      : "Programado (a coordinar)";

  const renderStatus = () => {
    switch (status) {
      case "requested":
        return (
          <>
            <Text style={styles.home__bottomSheet__statusCard__statusText}>
              Esperando confirmación...
            </Text>
            <ProgressBar styleAttr="Horizontal" color={colors.primary} />
          </>
        );
      case "done":
        return (
          <View style={styles.home__bottomSheet__statusCard__confirmContainer}>
            <Pressable
              style={[
                styles.home__bottomSheet__statusCard__messagesButton,
              ]}
              onPress={() =>
                navigation.navigate("Payment", { activityId, worker })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__messagesButtonText,
                  { color: textColor },
                ]}
              >
                {payment === "pending" ? (
                  <Text>Realizar pago</Text>
                ) : (
                  <Text>Modificar pago</Text>
                )}
              </Text>
            </Pressable>
            <Pressable
              style={detailsButtonStyle}
              onPress={() =>
                navigation.navigate("ActivityDetail", { activityId })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__detailsButtonText,
                  { color: textColor },
                ]}
              >
                Ver detalles
              </Text>
            </Pressable>
          </View>
        );
      default:
        return (
          <View style={styles.home__bottomSheet__statusCard__confirmContainer}>
            <Pressable
              style={[
                styles.home__bottomSheet__statusCard__messagesButton,
              ]}
              onPress={() =>
                navigation.navigate("Messages", { activityId, worker })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__messagesButtonText,
                  { color: textColor },
                ]}
              >
                Mensajes
              </Text>
            </Pressable>
            <Pressable
              style={detailsButtonStyle}
              onPress={() =>
                navigation.navigate("ActivityDetail", { activityId })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__detailsButtonText,
                  { color: textColor },
                ]}
              >
                Ver detalles
              </Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <Pressable
      style={[
        styles.home__bottomSheet__statusCard__card,
        cardVariantStyle,
      ]}
    >
      <View style={styles.home__bottomSheet__statusCard__servicesContainer}>
        <Text
          style={[
            styles.home__bottomSheet__statusCard__servicesText,
            { color: textColor },
          ]}
        >
          {services.length > 0 ? "Trabajo de" : "Trabajo"}
        </Text>
        {services.length > 0 && (
          <View
            style={styles.home__bottomSheet__statusCard__servicesIconContainer}
          >
            {displayedServices.map((serviceKey) => {
              const IconComponent = getIcon(serviceKey);
              return (
                <IconComponent
                  key={serviceKey}
                  height={20}
                  width={20}
                  fill={colors.primary}
                />
              );
            })}
            {extraCount > 0 && (
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__extraText,
                  { color: colors.primary },
                ]}
              >
                +{extraCount}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.home__bottomSheet__statusCard__momentContainer}>
        {status === "requested" ? (
          <>
            {moment === "now" ? (
              <>
                <Available height={22} width={22} fill={colors.primary} />
                <Text
                  style={[
                    styles.home__bottomSheet__statusCard__momentText,
                    { color: textColor },
                  ]}
                >
                  Ahora mismo
                </Text>
              </>
            ) : (
              <>
                <Busy height={20} width={20} fill={colors.primary} />
                <Text
                  style={[
                    styles.home__bottomSheet__statusCard__momentText,
                    { color: textColor },
                  ]}
                >
                  {getScheduledLabel()}
                </Text>
              </>
            )}
          </>
        ) : status === "confirm" ? (
          <>
            {moment === "now" ? (
              <Available height={22} width={22} fill={colors.primary} />
            ) : (
              <Busy height={22} width={22} fill={colors.primary} />
            )}
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                { color: textColor },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {moment === "now" ? "Ahora mismo" : getScheduledLabel()}
            </Text>
          </>
        ) : status === "going" ? (
          <>
            <Available height={22} width={22} fill={colors.primary} />
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                { color: textColor },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              En camino a {address}
            </Text>
          </>
        ) : status === "done" ? (
          <>
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                { color: textColor },
              ]}
              numberOfLines={1}
            >
              {name} completo su trabajo
            </Text>
          </>
        ) : (
          <Text
            style={[
              styles.home__bottomSheet__statusCard__momentText,
              { color: textColor },
            ]}
          >
            {name} está trabando...
          </Text>
        )}
      </View>
      <View style={styles.home__bottomSheet__statusCard__statusContainer}>
        {renderStatus()}
      </View>
    </Pressable>
  );
};

export default StatusCard;
