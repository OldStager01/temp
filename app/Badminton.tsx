import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BookSession from '../components/BookSession';
import SportDetails from '../components/SportDetails';

export default function Badminton() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: 'Badminton',
    description: "Experience badminton at its finest in our state-of-the-art courts. Our professional coaches offer personalized training for all skill levels, from beginners to advanced players. With video analysis and modern equipment, we help you perfect your game.",
    coaches: [
      {
        name: 'John Smith',
        experience: '15 years experience',
        specialization: 'Singles Specialist',
        image: require('../assets/images/c3.jpg'),
      },
      {
        name: 'Sarah Chen',
        experience: '12 years experience',
        specialization: 'Doubles Expert',
        image: require('../assets/images/c4.jpg'),
      },
    ],
    facilities: [
      {
        name: 'Professional Courts',
        description: 'International standard courts with proper lighting',
        icon: 'fitness' as const,
      },
      {
        name: 'Video Analysis',
        description: 'Advanced video analysis system for technique improvement',
        icon: 'videocam' as const,
      },
      {
        name: 'Training Equipment',
        description: 'Professional training equipment and shuttlecocks',
        icon: 'tennisball-outline' as const,
      },
    ],
    pricePerSession: 800,
    image: require('../assets/images/badminton.jpg'),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Badminton" />
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
    backgroundColor: '#fff',
  },
});
