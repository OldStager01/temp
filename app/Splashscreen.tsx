import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { SplashScreenNavigationProp } from './types/navigation';

export default function Splashscreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [slideAnim] = useState(new Animated.Value(30));
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation completes, wait for 1.5 seconds then navigate to Login
      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, slideAnim, navigation]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/Spl.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>SPORTified</Text>
        <Text style={styles.subtitle}>Your Personal Sports Companion</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});