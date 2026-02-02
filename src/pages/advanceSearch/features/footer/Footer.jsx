import React, { useRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./FooterStyles";
import { getIcon } from "../../../../utils/getIcons";
import { colors } from "../../../../styles/globalStyles";
import {
  formatDate,
  formatTime,
  formatPrice,
} from "../../../../utils/formatHelpers";
import Available from "../../../../../assets/svgs/worker/available.svg";
import Busy from "../../../../../assets/svgs/worker/busy.svg";
import { useNavigation } from "@react-navigation/native";

const Footer = ({ sheetRef, values, workers, requestId }) => {
  const snapPoints = [90, 700];
  const animationConfigs = { duration: 400 };
  const scrollRef = useRef(null);
  const navigation = useNavigation();

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      animationConfigs={animationConfigs}
      onChange={(index) => {
        if (index === 0 && scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0, animated: false });
        }
      }}
    >
      <BottomSheetScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={styles.advanceSearch__footer__scrollView}
      >
        <Text style={styles.advanceSearch__footer__postCountText}>
          {workers.length === 0
            ? "Buscando trabajadores"
            : workers.length === 1
            ? "Un trabajador postulado"
            : `${workers.length} trabajadores postulados`}
        </Text>
        <View style={styles.advanceSearch__footer__detailRow}>
          <View style={styles.advanceSearch__footer__iconsContainer}>
            {values.services.map((serviceKey) => {
              const IconComponent = getIcon(serviceKey);
              return (
                <IconComponent
                  key={serviceKey}
                  height={30}
                  width={30}
                  fill={colors.gray}
                />
              );
            })}
          </View>
          {values.description ? (
            <Text style={styles.advanceSearch__footer__detailText}>
              {values.description}
            </Text>
          ) : null}
          <View style={styles.advanceSearch__footer__momentRow}>
            {values.moment === "now" ? (
              <>
                <Available
                  height={22}
                  width={22}
                  fill={colors.gray}
                  style={styles.advanceSearch__footer__detailIcon}
                />
                <Text style={styles.advanceSearch__footer__momentText}>
                  Ahora mismo
                </Text>
              </>
            ) : (
              <>
                <Busy
                  height={20}
                  width={20}
                  fill={colors.gray}
                  style={styles.advanceSearch__footer__detailIcon}
                />
                <Text style={styles.advanceSearch__footer__momentText}>
                  Programado {formatDate(values.scheduledDateTime)}{" "}
                  {formatTime(values.scheduledDateTime)} hs
                </Text>
              </>
            )}
          </View>
          <View style={styles.advanceSearch__footer__locationRow}>
            <FontAwesome6
              name="location-dot"
              size={20}
              color={colors.black}
              style={styles.advanceSearch__footer__detailIcon}
            />
            <Text style={styles.advanceSearch__footer__detailText}>
              {values.address.address}
            </Text>
          </View>
        </View>
        <Text style={styles.advanceSearch__footer__subtitle}>
          Trabajadores encontrados
        </Text>
        <View style={styles.advanceSearch__footer__workersContainer}>
          {workers.length === 0 ? (
            <Text style={styles.advanceSearch__footer__noPostulantsText}>
              Aquí aparecerán los trabajadores que se postulen a tu solicitud
            </Text>
          ) : (
            workers.map((postulation) => {
              const worker = postulation.worker;
              if (!worker) return null;

              const hasAlternateOffer = !!postulation.offerAnotherTime;

              const displayMoment = hasAlternateOffer
                ? postulation.offerMoment || "scheduled"
                : values.moment;

              const rawDate =
                hasAlternateOffer &&
                (postulation.offerScheduledDateTime ||
                  postulation.scheduledDateTime ||
                  postulation.date)
                  ? postulation.offerScheduledDateTime ||
                    postulation.scheduledDateTime ||
                    postulation.date
                  : values.scheduledDateTime;

              const displayDate =
                rawDate && typeof rawDate?.toDate === "function"
                  ? rawDate.toDate()
                  : rawDate;

              const isNow = displayMoment === "now" && !hasAlternateOffer;

              const photoSource =
                typeof worker.photoURL === "string"
                  ? { uri: worker.photoURL }
                  : null;

              const workerName =
                worker.workerName || worker.name || worker.firstName || "";
              const workerInitial = workerName?.[0] || "";

              const ratingValue = Number(
                worker.starRating ??
                  worker.rating ??
                  worker.averageRating ??
                  0
              );
              const ratingCount = Number(
                worker.amountRating ??
                  worker.ratingCount ??
                  worker.totalRatings ??
                  0
              );

              const priceValue =
                postulation.price != null && postulation.price !== ""
                  ? postulation.price
                  : postulation.budget != null && postulation.budget !== ""
                  ? postulation.budget
                  : null;

              return (
                <Pressable
                  key={worker.uid}
                  style={styles.advanceSearch__footer__card}
                  android_ripple={{ color: "#E2E2E2", borderless: false }}
                  onPress={() =>
                    navigation.navigate("WorkerProfile", {
                      worker,
                      postulation,
                      bottom: "advance",
                      values,
                      requestId,
                    })
                  }
                >
                  <View style={styles.advanceSearch__footer__cardHeader}>
                    {photoSource ? (
                      <Image
                        source={photoSource}
                        style={styles.advanceSearch__footer__avatar}
                      />
                    ) : (
                      <View
                        style={[
                          styles.advanceSearch__footer__avatar,
                          styles.advanceSearch__footer__avatarPlaceholder,
                        ]}
                      >
                        <Text style={styles.advanceSearch__footer__avatarInitial}>
                          {workerInitial}
                        </Text>
                      </View>
                    )}
                    <View style={styles.advanceSearch__footer__cardHeaderText}>
                      <Text style={styles.advanceSearch__footer__name}>
                        {workerName}
                      </Text>
                    </View>
                    <View style={styles.advanceSearch__footer__ratingContainer}>
                      <AntDesign
                        name="star"
                        size={12}
                        color={
                          ratingValue > 0 ? colors.primary : colors.lightGray
                        }
                      />
                      <Text style={styles.advanceSearch__footer__ratingValue}>
                        {ratingValue.toFixed(1)}
                      </Text>
                      <Text style={styles.advanceSearch__footer__ratingCount}>
                        ({ratingCount || 0})
                      </Text>
                    </View>
                  </View>

                  <View style={styles.advanceSearch__footer__cardBody}>
                    <View style={styles.advanceSearch__footer__infoRow}>
                      <Text style={styles.advanceSearch__footer__infoLabel}>
                        Presupuesto:
                      </Text>
                      <Text style={styles.advanceSearch__footer__infoValue}>
                        {priceValue != null && priceValue !== "" ? formatPrice(priceValue) : "A definir"}
                      </Text>
                    </View>
                    <View style={styles.advanceSearch__footer__infoRowMoment}>
                      <View
                        style={[
                          styles.advanceSearch__footer__infoSubContainer,
                          isNow
                            ? styles.advanceSearch__footer__infoAvailable
                            : styles.advanceSearch__footer__infoBusy,
                        ]}
                      >
                        {isNow ? (
                          <Available
                            height={20}
                            width={20}
                            fill={colors.green}
                          />
                        ) : (
                          <Busy
                            height={20}
                            width={20}
                            fill={colors.primary}
                          />
                        )}
                        <Text
                          style={[
                            styles.advanceSearch__footer__infoText,
                            isNow
                              ? styles.advanceSearch__footer__infoTextAvailable
                              : styles.advanceSearch__footer__infoTextBusy,
                          ]}
                        >
                          {isNow || !displayDate
                            ? isNow
                              ? "Ahora mismo"
                              : "A coordinar"
                            : `${formatDate(displayDate)} • ${formatTime(
                                displayDate
                              )} hs`}
                        </Text>
                      </View>
                    </View>
                    {postulation.message ? (
                      <View
                        style={styles.advanceSearch__footer__messageContainer}
                      >
                        <Text style={styles.advanceSearch__footer__messageText}>
                          {postulation.message}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default Footer;
