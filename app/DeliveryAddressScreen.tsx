import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GlassBackButton from "@/components/GlassBackButton";
const DeliveryAddressScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Delivery address</Text>
        <View style={{ width: 40 }} /> {/* Spacer to balance title */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section Title & Clear Button */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose delivery address</Text>
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="close" size={18} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#fff"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new address"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        {/* Current Location Option */}
        <TouchableOpacity style={styles.optionRow}>
          <Ionicons
            name="navigate"
            size={18}
            color="#4ade80"
            style={styles.iconSpacing}
          />
          <Text style={styles.optionText}>Use your current location</Text>
        </TouchableOpacity>

        {/* Saved Address Item */}
        <TouchableOpacity style={styles.addressItem}>
          <Ionicons
            name="location-sharp"
            size={18}
            color="#4ade80"
            style={styles.iconSpacing}
          />
          <View style={styles.addressDetails}>
            <Text style={styles.addressText}>
              2 akanade close, Yemetu St, Ibadan, 200286, Oyo, Nigeria
            </Text>
            <Text style={styles.cityText}>Ibadan Oyo</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // Very dark background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  clearButton: {
    backgroundColor: "#333",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a2e1a", // Dark green tint
    borderRadius: 30, // Fully rounded pill shape
    borderWidth: 1,
    borderColor: "#4ade80", // Bright green border
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  iconSpacing: {
    marginRight: 12,
  },
  optionText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressDetails: {
    flex: 1,
  },
  addressText: {
    color: "#e0e0e0",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 5,
  },
  cityText: {
    color: "#666666", // Dimmed text for secondary info
    fontSize: 13,
  },
});

export default DeliveryAddressScreen;
