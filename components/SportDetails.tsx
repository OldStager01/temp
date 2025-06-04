import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = 'body' | 'medal' | 'trophy' | 'water' | 'basketball-outline' | 'fitness' | 'tennisball-outline' | 'videocam';

interface Coach {
  name: string;
  experience: string;
  specialization: string;
  image: any;
}

interface Facility {
  name: string;
  description: string;
  icon: IconName;
}

interface SportDetailsProps {
  sport: string;
  description: string;
  coaches: Coach[];
  facilities: Facility[];
  pricePerSession: number;
  image: any;
  onBookPress: () => void;
}

export default function SportDetails({
  sport,
  description,
  coaches,
  facilities,
  pricePerSession,
  image,
  onBookPress,
}: SportDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{sport}</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.sectionTitle}>Our Coaches</Text>
        {coaches.map((coach, index) => (
          <View key={index} style={styles.coachCard}>
            <Image source={coach.image} style={styles.coachImage} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachExp}>{coach.experience}</Text>
              <Text style={styles.coachSpec}>{coach.specialization}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Facilities</Text>
        {facilities.map((facility, index) => (
          <View key={index} style={styles.facilityItem}>
            <Ionicons name={facility.icon} size={24} color="#1e90ff" />
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityName}>{facility.name}</Text>
              <Text style={styles.facilityDesc}>{facility.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price per session:</Text>
          <Text style={styles.price}>₹{pricePerSession}</Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e90ff',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  coachCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  coachInfo: {
    marginLeft: 15,
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  coachExp: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  coachSpec: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 4,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  facilityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  facilityDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  bookButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
