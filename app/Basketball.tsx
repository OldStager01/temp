import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BookSession from "../components/BookSession";
import SportDetails from "../components/SportDetails";

export default function Basketball() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: "Basketball",
    description:
      "Join our dynamic basketball program led by former professional players. Whether you're a beginner learning the fundamentals or an advanced player honing your skills, our comprehensive training covers dribbling, shooting, defense, and game strategy.",
    coaches: [
      {
        name: "Michael Singh",
        experience: "18 years experience",
        specialization: "Offensive Strategy",
        image: require("../assets/images/c3.jpg"),
      },
      {
        name: "Sarah Johnson",
        experience: "10 years experience",
        specialization: "Defense Expert",
        image: require("../assets/images/c4.jpg"),
      },
    ],
    facilities: [
      {
        name: "Indoor Court",
        description: "Full-size indoor court with professional flooring",
        icon: "basketball-outline" as const,
      },
      {
        name: "Training Equipment",
        description: "Professional training equipment and balls",
        icon: "fitness" as const,
      },
      {
        name: "Performance Analysis",
        description: "Advanced statistics and performance tracking",
        icon: "trophy" as const,
      },
    ],
    pricePerSession: 1500,
    image: require("../assets/images/Basketball.jpg"),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Basketball" />
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
