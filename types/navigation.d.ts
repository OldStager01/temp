// types/navigation.d.ts
import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the parameter types for each screen in your tab navigator
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Chatbot: undefined;
  Profile: undefined;
};

// Define your root stack parameters
export type RootStackParamList = {
  Splashscreen: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Homescreen: undefined;
  Chatbot: undefined;
  MainTabs: { screen?: string };
  // Sport screens
  Badminton: undefined;
  Basketball: undefined;
  Tennis: undefined;
  Swimming: undefined;
  Football: undefined;
  Yoga: undefined;
  // Booking screens
  BookingConfirmation: {
    sport: string;
    date: string;
    time: string;
    facility: string;
  };
};

// Navigation prop types for each screen
export type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splashscreen"
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;
export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
export type HomescreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Homescreen"
>;
export type ChatbotScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Chatbot"
>;
export type MainTabsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;
export type SportScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Badminton" | "Basketball" | "Tennis" | "Swimming" | "Football" | "Yoga"
>;
export type BookingConfirmationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BookingConfirmation"
>;
