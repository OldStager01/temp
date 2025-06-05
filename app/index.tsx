import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/auth/login" />;
}
