import GlassBackButton from "@/components/GlassBackButton";
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
  const handleChat = () => {
    const phoneNumber = "+2349025828588";
    const url = `whatsapp://send?phone=${phoneNumber}&text=Hello, I need help with my order.`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device.");
    });
  };

  const handleEmail = () => {
    const email = "godfreyajayigo25t@gmail.com";
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
        <GlassBackButton />
        <Text style={styles.headerTitle}>Get Help</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
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
    backgroundColor: "#0f0f0f",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "PlusJakarta-Bold",
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
    fontFamily: "PlusJakarta-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginHorizontal: 20,
  },
});

export default GetHelpScreen;