import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1e90ff',
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="home" 
              size={24} 
              color={color}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="search" 
              size={24} 
              color={color}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Bot',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="chatbubble-ellipses" 
              size={24} 
              color={color}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="person" 
              size={24} 
              color={color}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
