import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "#FFCB13";
  const greyColor = "#8B8B8B";

  const icons = {
    Home: (props) => (
      <MaterialIcons name="home" size={26} color={greyColor} {...props} />
    ),
    Services: (props) => (
      <Ionicons name="grid-sharp" size={20} color={greyColor} {...props} />
    ),
    Activity: (props) => (
      <Entypo
        name="text-document-inverted"
        size={22}
        color={greyColor}
        {...props}
      />
    ),
    Profile: (props) => (
      <Ionicons name="person-sharp" size={20} color={greyColor} {...props} />
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
              {icons[route.name]({
                color: isFocused ? primaryColor : greyColor,
              })}
            </View>
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 13,
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
    height: 65,
    width: "100%",
    bottom: 0,
    backgroundColor: "#FFF",
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
