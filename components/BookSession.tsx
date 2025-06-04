import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type BookSessionScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface BookSessionProps {
  sport: string;
}

interface BookingData {
  sport: string;
  date: string;
  time: string;
  userId: string;
  bookedAt: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Time slot options
const TIME_SLOT_OPTIONS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

// Storage key pattern for bookings
const BOOKING_STORAGE_KEY = "sports_bookings";

export default function BookSession({ sport }: BookSessionProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const navigation = useNavigation<BookSessionScreenNavigationProp>();

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  // Get current user ID (in a real app, this would come from auth context)
  const userId = "OldStager01"; // Using the provided login

  // Load bookings from AsyncStorage
  const loadBookings = async (date: string): Promise<BookingData[]> => {
    try {
      const storageKey = `${BOOKING_STORAGE_KEY}_${sport.toLowerCase()}`;
      const storedBookings = await AsyncStorage.getItem(storageKey);

      if (storedBookings) {
        const bookings: BookingData[] = JSON.parse(storedBookings);
        return bookings.filter((booking) => booking.date === date);
      }

      return [];
    } catch (error) {
      console.error("Failed to load bookings:", error);
      return [];
    }
  };

  // Save booking to AsyncStorage
  const saveBooking = async (bookingData: BookingData): Promise<boolean> => {
    try {
      const storageKey = `${BOOKING_STORAGE_KEY}_${sport.toLowerCase()}`;
      const existingBookingsStr = await AsyncStorage.getItem(storageKey);
      let existingBookings: BookingData[] = existingBookingsStr
        ? JSON.parse(existingBookingsStr)
        : [];

      // Add new booking
      existingBookings.push(bookingData);

      // Save updated bookings
      await AsyncStorage.setItem(storageKey, JSON.stringify(existingBookings));
      return true;
    } catch (error) {
      console.error("Failed to save booking:", error);
      return false;
    }
  };

  // Check if a time slot is already booked
  const isTimeSlotBooked = (bookings: BookingData[], time: string): boolean => {
    return bookings.some((booking) => booking.time === time);
  };

  // Load available time slots for the selected date
  const loadTimeSlots = async (date: string) => {
    setLoading(true);

    try {
      // Get existing bookings for this date and sport
      const existingBookings = await loadBookings(date);

      // Generate time slots with availability based on existing bookings
      const slots = TIME_SLOT_OPTIONS.map((time) => ({
        time,
        available: !isTimeSlotBooked(existingBookings, time),
      }));

      setTimeSlots(slots);
    } catch (error) {
      console.error("Error loading time slots:", error);
      Alert.alert("Error", "Failed to load available time slots");
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: any) => {
    const dateString = date.dateString;
    setSelectedDate(dateString);
    setSelectedTime(""); // Reset time selection when date changes
    loadTimeSlots(dateString);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Check if a date is in the past
  const isPastDate = (date: string): boolean => {
    return new Date(date) < new Date(currentDate);
  };

  // Validate booking data
  const validateBooking = (): boolean => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date for your session");
      return false;
    }

    if (!selectedTime) {
      Alert.alert("Error", "Please select a time slot for your session");
      return false;
    }

    // Check if the selected date is not in the past
    if (isPastDate(selectedDate)) {
      Alert.alert("Error", "Cannot book sessions for past dates");
      return false;
    }

    return true;
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!validateBooking()) return;

    setBookingInProgress(true);

    try {
      // Create booking data
      const bookingData: BookingData = {
        sport,
        date: selectedDate,
        time: selectedTime,
        userId,
        bookedAt: new Date().toISOString(),
      };

      // Save booking to local storage
      const success = await saveBooking(bookingData);

      if (success) {
        // Navigate to confirmation screen
        navigation.navigate("BookingConfirmation", {
          sport,
          date: selectedDate,
          time: selectedTime,
        });
      } else {
        Alert.alert(
          "Booking Failed",
          "Unable to save your booking. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setBookingInProgress(false);
    }
  };

  // Initial load of time slots when component mounts
  useEffect(() => {
    if (selectedDate) {
      loadTimeSlots(selectedDate);
    }
  }, []);

  // Format the selected date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{sport} Session Booking</Text>

      {/* Calendar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#1e90ff" },
            }}
            minDate={currentDate}
            theme={{
              todayTextColor: "#1e90ff",
              arrowColor: "#1e90ff",
              selectedDayBackgroundColor: "#1e90ff",
            }}
          />
        </View>
      </View>

      {/* Selected Date Display */}
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected: {formatDate(selectedDate)}
          </Text>
        </View>
      )}

      {/* Time Slots Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e90ff" />
            <Text style={styles.loadingText}>
              Loading available time slots...
            </Text>
          </View>
        ) : selectedDate ? (
          <View style={styles.timeSlotContainer}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.time}
                style={[
                  styles.timeSlot,
                  selectedTime === slot.time && styles.selectedTimeSlot,
                  !slot.available && styles.unavailableTimeSlot,
                ]}
                onPress={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === slot.time && styles.selectedTimeSlotText,
                    !slot.available && styles.unavailableTimeSlotText,
                  ]}
                >
                  {slot.time}
                </Text>
                {!slot.available && (
                  <Text style={styles.unavailableText}>Booked</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noDateText}>
            Select a date to see available time slots
          </Text>
        )}
      </View>

      {/* Booking Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || bookingInProgress) &&
            styles.disabledButton,
        ]}
        onPress={handleBooking}
        disabled={!selectedDate || !selectedTime || bookingInProgress}
      >
        {bookingInProgress ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.bookButtonText}>Book Session</Text>
        )}
      </TouchableOpacity>

      {/* Booking Policy */}
      <View style={styles.policyContainer}>
        <Text style={styles.policyTitle}>Booking Policy</Text>
        <Text style={styles.policyText}>
          • Free cancellation up to 24 hours before the session.
        </Text>
        <Text style={styles.policyText}>
          • Sessions can be rescheduled once without charge.
        </Text>
        <Text style={styles.policyText}>
          • Please arrive 10 minutes before your session.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e90ff",
  },
  section: {
    marginBottom: 25,
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  selectedDateContainer: {
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedDateText: {
    color: "#1e90ff",
    fontWeight: "500",
    fontSize: 16,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    width: "30%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectedTimeSlot: {
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
  },
  unavailableTimeSlot: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  timeSlotText: {
    color: "#333",
    fontWeight: "500",
  },
  selectedTimeSlotText: {
    color: "#fff",
  },
  unavailableTimeSlotText: {
    color: "#aaa",
  },
  unavailableText: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 4,
  },
  noDateText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 20,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#1e90ff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
    height: 50,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  policyContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  policyTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  policyText: {
    color: "#777",
    fontSize: 12,
    marginBottom: 5,
  },
});
