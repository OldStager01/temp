import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BookSession from '../components/BookSession';
import SportDetails from '../components/SportDetails';

export default function Yoga() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: 'Yoga',
    description: "Transform your mind and body with our holistic yoga programs. Our experienced instructors offer classes for all levels, from gentle beginners' sessions to advanced Ashtanga practice. Focus on flexibility, strength, and mental wellness in our peaceful studio environment.",
    coaches: [
      {
        name: 'Anjali Desai',
        experience: '22 years experience',
        specialization: 'Hatha & Ashtanga Yoga',
        image: require('../assets/images/c3.jpg'),
      },
      {
        name: 'Tom Anderson',
        experience: '14 years experience',
        specialization: 'Power Yoga',
        image: require('../assets/images/c4.jpg'),
      },
    ],
    facilities: [
      {
        name: 'Zen Studio',
        description: 'Peaceful studio with natural lighting',
        icon: 'body' as const,
      },
      {
        name: 'Equipment',
        description: 'Premium yoga mats and props provided',
        icon: 'fitness' as const,
      },
      {
        name: 'Meditation Room',
        description: 'Dedicated space for meditation practice',
        icon: 'medal' as const,
      },
    ],
    pricePerSession: 1000,
    image: require('../assets/images/yoga.jpg'),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Yoga" />
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
