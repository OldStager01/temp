import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

type SportScreen =
  | "Badminton"
  | "Basketball"
  | "Tennis"
  | "Swimming"
  | "Football"
  | "Yoga";

interface SportItem {
  title: string;
  color: string;
  image: any;
  navigateTo: SportScreen;
}

const sportsData: SportItem[] = [
  {
    title: "BADMINTON",
    color: "#ffc928",
    image: require("../../assets/images/badminton.jpg"),
    navigateTo: "Badminton",
  },
  {
    title: "BASKETBALL",
    color: "#b26a2d",
    image: require("../../assets/images/Basketball.jpg"),
    navigateTo: "Basketball",
  },
  {
    title: "TENNIS",
    color: "#4CAF50",
    image: require("../../assets/images/athl.jpg"),
    navigateTo: "Tennis",
  },
  {
    title: "SWIMMING",
    color: "#264b5d",
    image: require("../../assets/images/Swim.jpg"),
    navigateTo: "Swimming",
  },
  {
    title: "FOOTBALL",
    color: "#235d27",
    image: require("../../assets/images/foot.jpg"),
    navigateTo: "Football",
  },
  {
    title: "YOGA",
    color: "#f88eb8",
    image: require("../../assets/images/yoga.jpg"),
    navigateTo: "Yoga",
  },
];

export default function Homescreen() {
  const handleNavigation = (screen: SportScreen) => {
    // Use Expo Router's navigation instead of React Navigation
    router.push(`/${screen}`);
  };

  const renderItem = ({ item }: { item: SportItem }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => handleNavigation(item.navigateTo)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Choose Your Sport</Text>
      <FlatList
        data={sportsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  grid: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 120,
    width: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
  },
});
