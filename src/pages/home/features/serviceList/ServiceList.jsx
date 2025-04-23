import React, { useRef, useState } from "react";
import { getIcon } from "../../../../utils/getIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./ServiceListStyles";
import Feather from "@expo/vector-icons/Feather";
import { translateService } from "../../../../utils/formatHelpers";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../../../styles/globalStyles";

const initialServices = [
  { key: "1", name: "Todos" },
  { key: "2", name: "electricity" },
  { key: "3", name: "plumbing" },
  { key: "4", name: "gardening" },
  { key: "5", name: "locksmith" },
  { key: "6", name: "painting" },
  { key: "7", name: "construction" },
  { key: "8", name: "pets" },
  { key: "100", name: "Ver más" },
];

const ServiceButton = ({ item, isActive, onPress }) => {
  const IconComponent =
    item.key !== "1" && item.key !== "100" ? getIcon(item.name) : null;
  return (
    <Pressable
      style={[
        styles.home__serviceList__button,
        isActive
          ? styles.home__serviceList__activeButton
          : styles.home__serviceList__inactiveButton,
      ]}
      onPress={onPress}
    >
      {item.key === "1" ? (
        <Feather
          name="grid"
          size={24}
          color={isActive ? "#fff" : colors.gray}
          style={{ marginRight: 10 }}
        />
      ) : item.key !== "100" ? (
        <IconComponent
          fill={isActive ? "#fff" : colors.gray}
          height={24}
          width={24}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <Text
        style={
          isActive
            ? styles.home__serviceList__activeText
            : styles.home__serviceList__inactiveText
        }
      >
        {translateService(item.name)}
      </Text>
    </Pressable>
  );
};

const ServiceList = ({ navigation, onServiceSelect }) => {
  const [selectedService, setSelectedService] = useState({
    key: "1",
    name: "Todos",
  });
  const flatListRef = useRef(null);

  const handleServicePress = (item) => {
    if (item.key === "100") {
      navigation.navigate("Services");
    } else {
      setSelectedService(item);
      onServiceSelect(item);
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
        viewPosition: 0.1,
      });
    }
  };

  const filteredServices = initialServices.filter(
    (service) => service.key !== selectedService.key
  );

  const renderItem = ({ item }) => (
    <ServiceButton
      item={item}
      isActive={item.key === selectedService.key}
      onPress={() => handleServicePress(item)}
    />
  );

  return (
    <View style={styles.home__serviceList__container}>
      <FlatList
        data={[selectedService, ...filteredServices]}
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.home__serviceList__flatList}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ServiceList;
