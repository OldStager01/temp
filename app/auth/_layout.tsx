import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { user, loading } = useContext(AuthContext);

  // If the user is logged in, redirect to the home screen
  if (!loading && user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}
