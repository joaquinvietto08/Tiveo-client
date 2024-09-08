import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import Tiveo from "../../assets/svgs/tiveo";
import Electricity from "../../assets/svgs/home/electricity";
import Plumbing from "../../assets/svgs/home/plumbing";
import Gas from "../../assets/svgs/home/gas";
import Gardening from "../../assets/svgs/home/gardening";
import Locksmith from "../../assets/svgs/home/locksmith";
import Painting from "../../assets/svgs/home/painting";
import Construction from "../../assets/svgs/home/construction";
import Pool from "../../assets/svgs/home/pool";
import Carpentry from "../../assets/svgs/home/carpentry";
import Glass from "../../assets/svgs/home/glass";
import Pets from "../../assets/svgs/home/pets";
import Security from "../../assets/svgs/home/security";
import Ironwork from "../../assets/svgs/home/ironwork";
import Technology from "../../assets/svgs/home/technology";
import Beauty from "../../assets/svgs/home/beauty";
import Vehicles from "../../assets/svgs/home/vehicles";
import Freight from "../../assets/svgs/home/freight";
import Events from "../../assets/svgs/home/events";
import Photography from "../../assets/svgs/home/photography";
import Music from "../../assets/svgs/home/music";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
});

export default Home;
