import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BookSession from "../components/BookSession";
import SportDetails from "../components/SportDetails";

export default function Football() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: "Football",
    description:
      "Join our dynamic football program designed for players of all levels. Our professional coaches focus on developing technical skills, tactical understanding, and physical fitness. Train on our world-class facilities and take your game to the next level.",
    coaches: [
      {
        name: "Carlos Rodriguez",
        experience: "25 years experience",
        specialization: "Technical Skills",
        image: require("../assets/images/c3.jpg"),
      },
      {
        name: "Alex Kumar",
        experience: "18 years experience",
        specialization: "Goalkeeper Training",
        image: require("../assets/images/c4.jpg"),
      },
    ],
    facilities: [
      {
        name: "Football Field",
        description: "FIFA standard artificial turf with floodlights",
        icon: "fitness" as const,
      },
      {
        name: "Training Area",
        description: "Dedicated space for drills and practice",
        icon: "body" as const,
      },
      {
        name: "Performance Center",
        description: "Modern equipment for strength and agility",
        icon: "medal" as const,
      },
    ],
    pricePerSession: 1600,
    image: require("../assets/images/foot.jpg"),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Football" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SportDetails
        {...sportDetails}
        onBookPress={() => setShowBooking(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
