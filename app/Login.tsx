import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import type { LoginScreenNavigationProp } from "./types/navigation";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "450933998064-eaca3a9d2c199a0e715d35.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate("MainTabs", { screen: "Home" });
        })
        .catch((error) => {
          Alert.alert("Google Sign-in Error", error.message);
        });
    }
  }, [response, navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("MainTabs", { screen: "Home" });
    } catch (error: any) {
      let errorMessage = "An error occurred during login";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later";
          break;
      }
      Alert.alert("Login Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error: any) {
      Alert.alert("Error", "Failed to initiate Google Sign-In");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SPORTified</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>- OR -</Text>

      <TouchableOpacity
        style={[styles.googleButton, isLoading && styles.disabledButton]}
        onPress={handleGoogleSignIn}
        disabled={!request || isLoading}
      >
        <Image
          source={require("../assets/images/google_icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#1e90ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    marginVertical: 10,
    textAlign: "center",
    color: "#1e90ff",
    fontSize: 16,
  },
});
