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

const home_categories = [
  { key: "1", icon: Gardening, name: "Jardineria" },
  { key: "2", icon: Locksmith, name: "Cerrajeria" },
  { key: "3", icon: Painting, name: "Pintura" },
  { key: "4", icon: Construction, name: "Construccion" },
  { key: "5", icon: Pool, name: "Pileta" },
  { key: "6", icon: Carpentry, name: "Carpinteria" },
  { key: "7", icon: Glass, name: "Vidrios" },
  { key: "8", icon: Pets, name: "Mascotas" },
  { key: "9", icon: Security, name: "Seguridad" },
  { key: "10", icon: Ironwork, name: "Herreria" },
];

const Home_categoryButton = ({ item }) => (
  <View style={styles.home_buttonView}>
    <Pressable
      android_ripple={{ color: "#E2E2E2", borderless: true }}
      style={styles.home_categoryButton}
    >
      <item.icon style={styles.home_categoryIcon} />
      <Text style={styles.home_categoryName}>{item.name}</Text>
    </Pressable>
  </View>
);

const Home = () => {
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
        <View>
          <Tiveo style={styles.appLogo} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: 29,
            marginTop: 25,
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 17, alignSelf: "center" }}
          >
            Avenida Marcelo T de Alvear 360
          </Text>
          <Icon name="keyboard-arrow-down" size={29} color="#000" />
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/images/baner-carpinteria.jpg")}
            style={styles.bannerImage}
          />
        </View>

        <View style={{ marginTop: 50 }}>
          <Text style={{ marginLeft: 20, fontWeight: "bold", fontSize: 20 }}>
            Destacados
          </Text>
          <View style={styles.featured_categoriesContainer}>
            <View style={styles.featured_buttonView}>
              <Pressable
                style={styles.featured_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Electricity style={styles.featured_categoryIcon} />
                <Text style={styles.featured_categoryName}>Electricidad</Text>
              </Pressable>
            </View>
            <View style={styles.featured_buttonView}>
              <Pressable
                style={styles.featured_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Plumbing style={styles.featured_categoryIcon} />
                <Text style={styles.featured_categoryName}>Plomeria</Text>
              </Pressable>
            </View>
            <View style={styles.featured_buttonView}>
              <Pressable
                style={styles.featured_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Gas style={styles.featured_categoryIcon} />
                <Text style={styles.featured_categoryName}>Gas</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.main_homeContainer}>
          <ImageBackground
            source={require("../../assets/images/hogar.png")}
            style={styles.backgroundImage}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                width: "65%",
                height: 55,
                borderBottomEndRadius: 6,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 20,
                  bottom: 5,
                }}
              >
                Todo para tu hogar
              </Text>
            </View>
            <FlatList
              data={home_categories}
              renderItem={({ item }) => <Home_categoryButton item={item} />}
              horizontal
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.home_categoriesContainer}
              showsHorizontalScrollIndicator={false}
            />
          </ImageBackground>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
                bottom: 5,
              }}
            >
              Otros servicios utiles
            </Text>
          </View>
          <View style={styles.other_categoriesContainer}>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Tecnología</Text>
                <Technology style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Belleza</Text>
                <Beauty style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView2}>
              <Pressable
                style={styles.other_categoryButton2}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Vehiculos</Text>
                <Vehicles style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Fletes</Text>
                <Freight style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Eventos</Text>
                <Events style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Fotografia</Text>
                <Photography style={styles.other_categoryIcon} />
              </Pressable>
            </View>
            <View style={styles.other_buttonView}>
              <Pressable
                style={styles.other_categoryButton}
                android_ripple={{ color: "#E2E2E2", borderless: true }}
              >
                <Text style={styles.other_categoryName}>Musica</Text>
                <Music style={styles.other_categoryIcon} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  appLogo: {
    marginTop: 35,
    marginLeft: 20,
  },
  bannerContainer: {
    marginTop: 50,
  },
  bannerImage: {
    width: "100%",
    height: 166,
    resizeMode: "cover",
  },
  featured_categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  featured_buttonView: {
    borderRadius: 7,
    width: "31%",
    height: 123,
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  featured_categoryButton: {
    width: "100%",
    height: 123,
    borderRadius: 7,
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
  },
  featured_categoryIcon: {},
  featured_categoryName: {
    fontWeight: "light",
    fontSize: 14,
    bottom: 18,
    position: "absolute",
  },
  main_homeContainer: {
    marginTop: 40,
  },
  backgroundImage: {
    height: 210,
    width: "100%",
  },
  home_categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  home_buttonView: {
    borderRadius: 7,
    marginHorizontal: 5,
    width: 92,
    height: 92,
    backgroundColor: "#FFFFFF",
  },
  home_categoryButton: {
    width: 92,
    height: 92,
    alignItems: "center",
    position: "relative",
    paddingTop: 16,
  },
  home_categoryIcon: {},
  home_categoryName: {
    fontWeight: "light",
    fontSize: 14,
    bottom: 14,
    position: "absolute",
  },
  other_categoriesContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 120,
    paddingHorizontal: 20,
  },
  other_buttonView: {
    borderRadius: 7,
    marginBottom: 15,
    width: "48%",
    height: 61,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  other_categoryButton: {
    height: 61,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 12,
  },
  other_buttonView2: {
    borderRadius: 7,
    marginBottom: 15,
    width: "100%",
    height: 61,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  other_categoryButton2: {
    height: 61,
    borderRadius: 7,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 12,
  },
  other_categoryName: {
    fontSize: 14,
    fontWeight: "light",
  },
  other_categoryIcon: {},
});

export default Home;
