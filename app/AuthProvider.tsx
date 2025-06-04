import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from 'C:/Users/Sejal/OneDrive/Desktop/Sportified/app/services/firebaseConfig';
import React from "react";
import { auth } from "../services/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
