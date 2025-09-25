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

  const getStyleCard = (status) => {
    return styles[`home__bottomSheet__statusCard__card__${status}`] || {};
  };

  const getStyleTitle = (status) => {
    return styles[`home__bottomSheet__statusCard__title__${status}`] || {};
  };

  const getStyleMomentText = (status) => {
    return styles[`home__bottomSheet__statusCard__momentText__${status}`] || {};
  };

  const getStyleMessagesButton = (status) => {
    return (
      styles[`home__bottomSheet__statusCard__messagesButton__${status}`] || {}
    );
  };

  const getStyleDetailsButton = (status) => {
    return (
      styles[`home__bottomSheet__statusCard__detailsButton__${status}`] || {}
    );
  };

  const getStyleMessagesButtonText = (status) => {
    return (
      styles[`home__bottomSheet__statusCard__messagesButtonText__${status}`] ||
      {}
    );
  };

  const getStyleDetailsButtonText = (status) => {
    return (
      styles[`home__bottomSheet__statusCard__detailsButtonText__${status}`] ||
      {}
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
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
                getStyleMessagesButton(status),
              ]}
              onPress={() =>
                navigation.navigate("Payment", { activityId, worker })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__messagesButtonText,
                  getStyleMessagesButtonText(status),
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
              style={[
                styles.home__bottomSheet__statusCard__detailsButton,
                getStyleDetailsButton(status),
              ]}
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__detailsButtonText,
                  getStyleDetailsButtonText(status),
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
                getStyleMessagesButton(status),
              ]}
              onPress={() =>
                navigation.navigate("Messages", { activityId, worker })
              }
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__messagesButtonText,
                  getStyleMessagesButtonText(status),
                ]}
              >
                Mensajes
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.home__bottomSheet__statusCard__detailsButton,
                getStyleDetailsButton(status),
              ]}
            >
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__detailsButtonText,
                  getStyleDetailsButtonText(status),
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
      style={[styles.home__bottomSheet__statusCard__card, getStyleCard(status)]}
    >
      <View style={styles.home__bottomSheet__statusCard__servicesContainer}>
        <Text
          style={[
            styles.home__bottomSheet__statusCard__servicesText,
            getStyleTitle(status),
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
                  fill={
                    status === "working" || status === "going"
                      ? colors.black
                      : colors.primary
                  }
                />
              );
            })}
            {extraCount > 0 && (
              <Text
                style={[
                  styles.home__bottomSheet__statusCard__extraText,
                  {
                    color:
                      status === "working" || status === "going"
                        ? colors.black
                        : colors.primary,
                  },
                ]}
              >
                +{extraCount}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.home__bottomSheet__statusCard__momentContainer}>
        {status === "pending" ? (
          <>
            {moment === "now" ? (
              <>
                <Available height={22} width={22} fill={colors.primary} />

                <Text
                  style={[
                    styles.home__bottomSheet__statusCard__momentText,
                    status !== "pending" && { color: colors.white },
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
                    status !== "pending" && { color: colors.white },
                  ]}
                >
                  Programado {formatDate(scheduledDateTime)}{" "}
                  {formatTime(scheduledDateTime)} hs
                </Text>
              </>
            )}
          </>
        ) : status === "confirm" ? (
          <>
            <Busy height={22} width={22} fill={colors.primary} />
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                getStyleMomentText(status),
              ]}
              numberOfLines={1}
            >
              Programado {formatDate(scheduledDateTime)}{" "}
              {formatTime(scheduledDateTime)} hs
            </Text>
          </>
        ) : status === "going" ? (
          <>
            <Available height={22} width={22} fill={colors.black} />
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                getStyleMomentText(status),
              ]}
              numberOfLines={1}
            >
              En camino a {address}
            </Text>
          </>
        ) : status === "done" ? (
          <>
            <Text
              style={[
                styles.home__bottomSheet__statusCard__momentText,
                getStyleMomentText(status),
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
              getStyleMomentText(status),
            ]}
          >
            {name} está trabando...
          </Text>
        )}
      </View>
      <View style={styles.home__bottomSheet__statusCard__statusContainer}>
        {renderStatus(status)}
      </View>
    </Pressable>
  );
};

export default StatusCard;
