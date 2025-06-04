import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./index"; // Adjust path as needed
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
