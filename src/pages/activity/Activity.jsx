import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import activityData from "../../components/data/activityData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  formatDate,
  formatTime,
  translateService,
  formatPrice,
  translateStatus,
} from "../../utils/formatHelpers";
import { getIcon } from "../../utils/getIcons";
import { styles } from "./ActivityStyles";

const Activity = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_activityContainer}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Actividad</Text>
          <View style={styles.activityContainer}>
            {activityData.map((data) => {
              const IconComponent = getIcon(data.service);
              const statusStyle =
                data.status !== "pending" && data.status !== "scheduled";
              return (
                <View key={data.id} style={styles.main_activityButton}>
                  <View
                    style={[
                      styles.activity_buttonView,
                      statusStyle && { borderRadius: 7 },
                    ]}
                  >
                    <Pressable
                      android_ripple={{ color: "#E2E2E2", borderless: true }}
                      style={styles.activityButton}
                      onPress={() =>
                        navigation.navigate("ActivityDetail", { data })
                      }
                    >
                      <View style={styles.iconContainer}>
                        <IconComponent />
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1,
                        }}
                      >
                        <View style={styles.main_infoContainer}>
                          <View style={styles.infoContainer}>
                            <View style={styles.serviceContainer}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                                numberOfLines={2}
                              >
                                {translateService(data.service)}
                              </Text>
                              {data.status === "finished" && (
                                <Text>{formatPrice(data.price)}</Text>
                              )}
                            </View>
                            <View style={styles.timeContainer}>
                              {data.status === "scheduled" && (
                                <Ionicons
                                  name="time-outline"
                                  size={24}
                                  color="black"
                                />
                              )}
                            </View>
                          </View>

                          <View style={styles.statusContainer}>
                            <View style={styles.dateTimeContainer}>
                              <Text style={styles.text_dateTime}>
                                {formatDate(data.dateTime)} •{" "}
                                {formatTime(data.dateTime)} hs
                              </Text>
                            </View>
                            <Text>{translateStatus(data.status)}</Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                  {data.status === "scheduled" && (
                    <View style={styles.optionContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? "#BFBFBF" : "#FFFFFF",
                          },
                          styles.cancellButton,
                        ]}
                      >
                        <Text style={{ color: "red" }}>Cancelar</Text>
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? "#BFBFBF" : "#FFFFFF",
                          },
                          styles.messagesButton,
                        ]}
                      >
                        <Text>Mensajes</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Activity;
