import React, { useRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import BottomSheet from "../../../../components/bottomSheet/BottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
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
import Licensed from "../../../../../assets/svgs/worker/licensed";
import { useNavigation } from "@react-navigation/native";

const Footer = ({ sheetRef, values, workers }) => {
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
                  Programado {formatDate(scheduledDateTime)}{" "}
                  {formatTime(scheduledDateTime)} hs
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
            workers.map((w) => (
              <Pressable
                key={w.uid}
                style={styles.advanceSearch__footer__card}
                android_ripple={{ color: "#E2E2E2", borderless: false }}
                onPress={() => navigation.navigate("WorkerProfile", { worker: w,  bottom:"advance" })}
              >
                {/* Header de la tarjeta */}
                <View style={styles.advanceSearch__footer__cardHeader}>
                  <Image
                    source={
                      typeof w.photoURL === "string"
                        ? { uri: w.photoURL }
                        : w.photoURL
                    }
                    style={styles.advanceSearch__footer__avatar}
                  />
                  <View style={styles.advanceSearch__footer__cardHeaderText}>
                    <Text style={styles.advanceSearch__footer__name}>
                      {w.firstName} {w.lastName.charAt(0)}.
                    </Text>
                    <Licensed
                      width={16}
                      height={16}
                      style={styles.advanceSearch__footer__verifiedIcon}
                    />
                  </View>
                  <View style={styles.advanceSearch__footer__ratingContainer}>
                    <AntDesign name="star" size={12} color={colors.black} />
                    <Text style={styles.advanceSearch__footer__ratingValue}>
                      {w.starRating.toFixed(1)}
                    </Text>
                    <Text style={styles.advanceSearch__footer__ratingCount}>
                      ({w.completedJobs})
                    </Text>
                  </View>
                </View>

                {/* Body de la tarjeta */}
                <View style={styles.advanceSearch__footer__cardBody}>
                  <View style={styles.advanceSearch__footer__infoRow}>
                    <Text style={styles.advanceSearch__footer__infoLabel}>
                      Presupuesto:
                    </Text>
                    <Text style={styles.advanceSearch__footer__infoValue}>
                      {w.price != null ? formatPrice(w.price) : "A definir"}
                    </Text>
                  </View>
                  <View style={styles.advanceSearch__footer__infoRow}>
                    <View style={styles.advanceSearch__footer__iconBox}>
                      {w.moment === "now" ? (
                        <Available height={20} width={20} fill={colors.black} />
                      ) : (
                        <Busy height={20} width={20} fill={colors.black} />
                      )}
                    </View>

                    <Text style={styles.advanceSearch__footer__infoValue}>
                      {w.moment === "now"
                        ? "Ahora mismo"
                        : formatDate(w.scheduledDateTime) +
                          " • " +
                          formatTime(w.scheduledDateTime) +
                          " hs"}
                    </Text>
                  </View>
                  {w.message && (
                    <View
                      style={styles.advanceSearch__footer__messageContainer}
                    >
                      <Text style={styles.advanceSearch__footer__messageText}>
                        {w.message}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default Footer;
