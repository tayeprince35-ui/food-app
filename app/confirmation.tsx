import { Ionicons } from "@expo/vector-icons";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/store/cartStore";
import { router, useLocalSearchParams } from "expo-router"; // replace your router import
import { useEffect } from "react";
const COLORS = {
  bg: "#0B0D0C",
  card: "#141715",
  cardBorder: "#232823",
  green: "#22C55E",
  greenDark: "#166534", // Darker green for the icon gradient effect
  text: "#FFFFFF",
  subtext: "#8E938F",
};

export default function OrderPlacedScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
const clearCart = useCartStore((s) => s.clearCart);

useEffect(() => {
  clearCart();
}, [clearCart]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.contentContainer}>
        {/* Success Icon */}
        <View style={styles.iconContainer} className="animate-bounce">
          <View style={styles.iconInnerCircle}>
            <Ionicons name="checkmark" size={48} color={COLORS.text} />
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.title}>Order Placed!</Text>

        <Text style={styles.subtitle}>
  Your order has been placed{"\n"}and HeyBite will confirm it shortly.
</Text>

        {/* Order Number Badge */}
        <View style={styles.orderBadge}>
         <Text style={styles.orderBadgeText}>Order #{orderId}</Text></View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
          onPress={() => {
  router.push({ pathname: "/TrackOrder", params: { orderId } });
}}
          >
            <Text style={styles.primaryButtonText}>Track my order</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={COLORS.text}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => {
              router.replace("/(tabs)");
            }}
          >
            <Text style={styles.secondaryButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60, // Offset to visually center the content
  },

  // Success Icon Styles
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.greenDark, // Outer darker circle
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    // Adding a slight shadow for depth (optional, based on design)
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  iconInnerCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.green, // Inner bright circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)", // Subtle highlight border
  },

  // Typography
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontFamily: "PlusJakarta-Bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.subtext,
    fontSize: 14,
    fontFamily: "PlusJakarta-Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  highlightText: {
    color: COLORS.green,
    fontFamily: "PlusJakarta-SemiBold",
  },

  // Order Badge
  orderBadge: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 48, // Large gap before action buttons
  },
  orderBadgeText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-Medium",
  },

  // Action Buttons
  actionsContainer: {
    width: "100%",
    gap: 12, // Space between buttons
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: COLORS.green,
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  buttonIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.subtext,
    fontSize: 15,
    fontFamily: "PlusJakarta-SemiBold",
  },
});
