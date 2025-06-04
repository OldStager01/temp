import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type BookingConfirmationScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
type BookingConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  "BookingConfirmation"
>;

export default function BookingConfirmation() {
  const navigation = useNavigation();
  const route = useRoute<BookingConfirmationScreenRouteProp>();
  const { sport, date, time } = route.params;

  const handleDone = () => {
    navigation.navigate("MainTabs" as any, { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Sport:</Text>
          <Text style={styles.value}>{sport}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
      </View>

      <Text style={styles.message}>
        Your session has been successfully booked. We'll send you a reminder
        before your session.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 30,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
