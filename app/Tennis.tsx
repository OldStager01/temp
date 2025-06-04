import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BookSession from '../components/BookSession';
import SportDetails from '../components/SportDetails';

export default function Tennis() {
  const [showBooking, setShowBooking] = useState(false);

  const sportDetails = {
    sport: 'Tennis',
    description: "Experience tennis excellence at our state-of-the-art facility. Our professional coaches provide personalized training for all skill levels, focusing on technique, footwork, and match strategy. Join us to improve your game and enjoy this dynamic sport.",
    coaches: [
      {
        name: 'Rajesh Verma',
        experience: '20 years experience',
        specialization: 'Serve & Volley Expert',
        image: require('../assets/images/c3.jpg'),
      },
      {
        name: 'Maria Chen',
        experience: '15 years experience',
        specialization: 'Junior Development',
        image: require('../assets/images/c4.jpg'),
      },
    ],
    facilities: [
      {
        name: 'Professional Courts',
        description: '4 synthetic and 2 clay courts with lighting',
        icon: 'tennisball-outline' as const,
      },
      {
        name: 'Training Center',
        description: 'Modern training equipment and ball machines',
        icon: 'fitness' as const,
      },
      {
        name: 'Performance Lab',
        description: 'Stroke analysis and fitness monitoring',
        icon: 'body' as const,
      },
    ],
    pricePerSession: 1800,
    image: require('../assets/images/athl.jpg'),
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <BookSession sport="Tennis" />
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
