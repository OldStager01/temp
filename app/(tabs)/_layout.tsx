import { Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { user, loading } = useContext(AuthContext);

  // If the user is not logged in, redirect to the auth group
  if (!loading && !user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#1e90ff" : "#999"}
            />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={focused ? "#1e90ff" : "#999"}
            />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#1e90ff" : "#999"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
