import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChooseDeliveryAddress() {
  const [address, setAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchingAddress, setSearchingAddress] = useState(false);

  // Use phone's current location
  const useCurrentLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Enable location access to use your current location.",
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;

      const results = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let formattedAddress = "";

      if (results.length > 0) {
        const place = results[0];

        formattedAddress = [
          place.street,
          place.city,
          place.region,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(formattedAddress);
      }

      router.push({
        pathname: "/map",
        params: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          address: formattedAddress,
        },
      });
    } catch (error) {
      console.error("Location error:", error);

      Alert.alert(
        "Error",
        "Something went wrong while fetching your location.",
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  // Search for an address typed by the user
  const searchAddress = async () => {
    if (!address.trim()) {
      Alert.alert("Enter an address", "Please type an address first.");
      return;
    }

    try {
      setSearchingAddress(true);
      Keyboard.dismiss();

      const results = await Location.geocodeAsync(address.trim());

      if (results.length === 0) {
        Alert.alert(
          "Address not found",
          "We couldn't find that address. Try adding more details.",
        );
        return;
      }

      const { latitude, longitude } = results[0];

      router.push({
        pathname: "/map",
        params: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          address: address.trim(),
        },
      });
    } catch (error) {
      console.error("Address search error:", error);

      Alert.alert(
        "Search error",
        "Something went wrong while searching for the address.",
      );
    } finally {
      setSearchingAddress(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose delivery address</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#7B8588" />

        <TextInput
          placeholder="Enter new address"
          placeholderTextColor="#7B8588"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={searchAddress}
          returnKeyType="search"
        />

        {/* Search button */}
        {address.trim().length > 0 && (
          <TouchableOpacity onPress={searchAddress} disabled={searchingAddress}>
            {searchingAddress ? (
              <ActivityIndicator size="small" color="#00BC4F" />
            ) : (
              <Ionicons name="search" size={20} color="#00BC4F" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Current Location */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={useCurrentLocation}
        disabled={loadingLocation}
      >
        {loadingLocation ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="navigate" size={16} color="#fff" />
        )}

        <Text style={styles.locationText}>
          {loadingLocation ? "Locating..." : "Use your current location"}
        </Text>
      </TouchableOpacity>

      {/* Illustration */}
      <Image
        source={require("./../assets/icons/location.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={styles.description}>
        Share your location to explore nearby options.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111312",
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },

  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#343938",
    borderRadius: 28,
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    fontFamily: "PlusJakarta-Regular",
  },

  locationButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BC4F",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 16,
  },

  locationText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "PlusJakarta-SemiBold",
    marginLeft: 6,
  },

  image: {
    width: 270,
    height: 270,
    alignSelf: "center",
    marginTop: 65,
  },

  description: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "PlusJakarta-Regular",
  },
});
