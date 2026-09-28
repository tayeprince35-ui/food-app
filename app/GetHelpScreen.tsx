import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GetHelpScreen = () => {
  // 2. Create helper functions
  const handleChat = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "+2348012345678";
    const url = `whatsapp://send?phone=${phoneNumber}&text=Hello, I need help with my order.`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device.");
    });
  };

  const handleEmail = () => {
    const email = "support@yourdeliveryapp.com";
    const subject = "Order Support Request";
    const url = `mailto:${email}?subject=${subject}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No email app found on your device.");
    });
  };

  const handleCall = () => {
    const phoneNumber = "tel:+2348012345678";
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert("Error", "Calling is not supported on this device.");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle} className="ml-3">
          Get Help
        </Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {/* Chat Option */}
        <TouchableOpacity style={styles.menuItem} onPress={handleChat}>
          <View style={styles.menuItemLeft}>
            <Ionicons
              name="chatbubbles"
              size={22}
              color="#4ade80"
              style={styles.iconSpacing}
            />
            <Text style={styles.menuItemText}>Chat with Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Email Option */}
        <TouchableOpacity style={styles.menuItem} onPress={handleEmail}>
          <View style={styles.menuItemLeft}>
            <Ionicons
              name="mail"
              size={22}
              color="#4ade80"
              style={styles.iconSpacing}
            />
            <Text style={styles.menuItemText}>Email Us</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Call Option (New) */}
        <TouchableOpacity style={styles.menuItem} onPress={handleCall}>
          <View style={styles.menuItemLeft}>
            <Ionicons
              name="call"
              size={22}
              color="#4ade80"
              style={styles.iconSpacing}
            />
            <Text style={styles.menuItemText}>Call Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
        </TouchableOpacity>

        <View style={styles.divider} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // Dark background matching the previous screens
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 15,
  },
  menuItemText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222", // Dark gray line
    marginHorizontal: 20,
  },
});

export default GetHelpScreen;
