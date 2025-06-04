import React from "react";
import { SafeAreaView, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splashscreen from "./Splashscreen";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Homescreen from "./Homescreen";
import ChatScreen from "./ChatScreen";
import Badminton from "./Badminton";
import Basketball from "./Basketball";
import Tennis from "./Tennis";
import Swimming from "./Swimming";
import Football from "./Football";
import Yoga from "./Yoga";
import BookingConfirmation from "../components/BookingConfirmation";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfleScreen";

// Define your stack param list for type checking
export type RootStackParamList = {
  Splashscreen: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  MainTabs: { screen?: string };
  Badminton: undefined;
  Basketball: undefined;
  Tennis: undefined;
  Swimming: undefined;
  Football: undefined;
  Yoga: undefined;
  BookingConfirmation: {
    sport: string;
    date: string;
    time: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Chatbot: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Preload tab icons
const tabIcons = {
  home: require("../assets/images/home.png"),
  search: require("../assets/images/search.jpg"),
  bot: require("../assets/images/bot.png"),
  profile: require("../assets/images/pro.jpg"),
};

function MainTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#1e90ff",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Homescreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#1e90ff" : "#999"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Chatbot"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "chatbubble" : "chatbubble-outline"}
                size={24}
                color={focused ? "#1e90ff" : "#999"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#1e90ff" : "#999"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default function AppNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Splashscreen"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Badminton" component={Badminton} />
        <Stack.Screen name="Basketball" component={Basketball} />
        <Stack.Screen name="Tennis" component={Tennis} />
        <Stack.Screen name="Swimming" component={Swimming} />
        <Stack.Screen name="Football" component={Football} />
        <Stack.Screen name="Yoga" component={Yoga} />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmation}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
