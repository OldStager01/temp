import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BookSession from "../components/BookSession";
import SportDetails from "../components/SportDetails";

export default function Swimming() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: "Swimming",
    description:
      "Dive into excellence with our comprehensive swimming programs. From beginners learning water safety to advanced swimmers perfecting their strokes, our heated pool and expert instructors ensure a safe and effective learning environment for all ages.",
    coaches: [
      {
        name: "David Wilson",
        experience: "16 years experience",
        specialization: "Competitive Swimming",
        image: require("../assets/images/c3.jpg"),
      },
      {
        name: "Priya Sharma",
        experience: "12 years experience",
        specialization: "Kids Swimming",
        image: require("../assets/images/c4.jpg"),
      },
    ],
    facilities: [
      {
        name: "Olympic Pool",
        description: "Temperature-controlled 50m pool with 8 lanes",
        icon: "water" as const,
      },
      {
        name: "Training Pool",
        description: "Dedicated pool for beginners and training",
        icon: "body" as const,
      },
      {
        name: "Analysis System",
        description: "Underwater cameras for stroke analysis",
        icon: "videocam" as const,
      },
    ],
    pricePerSession: 1400,
    image: require("../assets/images/Swim.jpg"),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Swimming" />
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
