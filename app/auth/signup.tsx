import React, { useState } from "react";
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
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import LoadingSpinner from "../../components/LoadingSpinner";

WebBrowser.maybeCompleteAuthSession();

export default function Signup() {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigation = useNavigation<any>();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "450933998064-eaca3a9d2c199a0e715d35.apps.googleusercontent.com",
    iosClientId:
      "450933998064-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    androidClientId:
      "450933998064-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
  });

  const handleGoogleSignup = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await promptAsync();
      if (result?.type === "success") {
        const credential = GoogleAuthProvider.credential(
          result.params.id_token
        );
        await signInWithCredential(auth, credential);
        navigation.replace("Login");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please log in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Google sign-up is not enabled";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
      }
      Alert.alert("Google Sign-up failed", errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  const handleEmailSignup = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Login");
    } catch (error: any) {
      let errorMessage = "An error occurred";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please log in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password sign-up is not enabled";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is too weak. Please use a stronger password.";
          break;
      }
      Alert.alert("Signup failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showSignupForm) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Welcome to SPORTified</Text>
        <Text style={styles.question}>Don't have an account?</Text>
        <Text style={styles.subtitle}>Choose how you'd like to sign up:</Text>

        <TouchableOpacity
          style={[
            styles.optionButton,
            isGoogleLoading && styles.buttonDisabled,
          ]}
          onPress={() => setShowSignupForm(true)}
          disabled={isGoogleLoading}
        >
          <Image
            source={require("../../assets/images/email.png")}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Sign up with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.googleButton,
            isGoogleLoading && styles.buttonDisabled,
          ]}
          onPress={handleGoogleSignup}
          disabled={!request || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <LoadingSpinner size="small" color="#1e90ff" />
          ) : (
            <>
              <Image
                source={require("../../assets/images/google_icon.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.replace("Login")}
          disabled={isGoogleLoading}
        >
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>

        {isGoogleLoading && <View style={styles.overlay} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setShowSignupForm(false)}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Enter your details to get started</Text>

      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        autoCorrect={false}
        editable={!isLoading}
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        autoCorrect={false}
        editable={!isLoading}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.signupButton, isLoading && styles.buttonDisabled]}
        onPress={handleEmailSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          disabled={isLoading}
        >
          <Text style={styles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <View style={styles.overlay} />}
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
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1e90ff",
  },
  question: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1e90ff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
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
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
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
    fontSize: 16,
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#b0d4ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#1e90ff",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#1e90ff",
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  footerLink: {
    fontSize: 16,
    color: "#1e90ff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
