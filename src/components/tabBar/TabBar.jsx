import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "#FF9D00";
  const greyColor = "#8B8B8B";

  const icons = {
    Home: (props) => (
      <Octicons name="home" size={22} color={greyColor} {...props} />
    ),
    Servicios: (props) => (
      <Feather name="grid" size={23} color={greyColor} {...props} />
    ),
    Actividad: (props) => (
      <FontAwesome5 name="list-ul" size={20} color={greyColor} {...props} />
    ),
    "Mi perfil": (props) => (
      <FontAwesome5 name="user" size={20} color={greyColor} {...props} />
    ),
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <Pressable
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole="Button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={styles.tabBarItemContainer}>
              {icons[route.name] &&
                icons[route.name]({
                  color: isFocused ? primaryColor : greyColor,
                })}
            </View>
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 13,
                fontFamily: "Inter-Medium",
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    flexDirection: "row",
    height: 75,
    width: "100%",
    bottom: 0,
    backgroundColor: "#F8F8F8",
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarItemContainer: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
