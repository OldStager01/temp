import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import type { ForgotPasswordScreenNavigationProp } from "./types/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error: any) {
      let errorMessage = "An error occurred";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later";
          break;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you instructions to reset your
        password.
      </Text>

      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("Login")}
        disabled={isLoading}
      >
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>

      {isLoading && <View style={styles.overlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#1e90ff",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e90ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    marginBottom: 20,
  },
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#b0d4ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#1e90ff",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
