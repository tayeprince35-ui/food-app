import GlassBackButton from "@/components/GlassBackButton";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard"; // Import Clipboard
import { router } from "expo-router";
import { LucideCheck, LucideLock } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PayOnlineScreen = () => {
  const [timeLeft, setTimeLeft] = useState(47);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // --- COPY FUNCTION ---
  const copyToClipboard = async (text: string, fieldName: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedField(fieldName);

    // Optional: Show an alert or toast
    // Alert.alert("Copied!", `${fieldName} copied to clipboard.`);

    // Reset the icon back to "copy" after 2 seconds
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle} className="ml-3">
          Pay Online
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Merchant Info Row */}
        <View style={styles.merchantRow}>
          <View style={styles.merchantInfo}>
            <View style={styles.merchantIconBg}>
              <Ionicons name="leaf" size={16} color="#fff" />
            </View>
            <Text style={styles.merchantName}>HeyBite</Text>
          </View>
          <View style={styles.merchantDetails}>
            <Text style={styles.emailText}>godfreyajayi25@gmail.com</Text>
            <Text style={styles.amountDueSmall}>Pay NGN 4,300</Text>
          </View>
        </View>

        {/* Title Section */}
        <Text style={styles.mainTitle}>
          Transfer <Text style={styles.highlightText}>NGN 4,300</Text> to
          HeyBite Checkout
        </Text>
        <Text style={styles.subtitle}>
          Use the account details below to complete your payment
        </Text>

        {/* Payment Details Card */}
        <View style={styles.card}>
          {/* Bank Name (No Copy Button) */}
          <View style={styles.cardRow}>
            <View style={styles.cardCol}>
              <Text style={styles.label}>BANK NAME</Text>
              <Text style={styles.valueText}>Paystack-Titan</Text>
            </View>
            <TouchableOpacity style={styles.changeBankButton}>
              <Text style={styles.changeBankText}>CHANGE BANK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Account Number (With Copy Button) */}
          <View style={styles.cardRow}>
            <View style={styles.cardCol}>
              <Text style={styles.label}>ACCOUNT NUMBER</Text>
              <Text style={styles.valueText}>9997 7389 53</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard("9997738953", "Account Number")}
            >
              <Ionicons
                name={copiedField === "Account Number" ? "checkmark" : "copy"}
                size={18}
                color={copiedField === "Account Number" ? "#4ADE80" : "#A0A0A0"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Amount (With Copy Button) */}
          <View style={styles.cardRow}>
            <View style={styles.cardCol}>
              <Text style={styles.label}>AMOUNT</Text>
              <Text style={styles.amountValueText}>NGN 4,300</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard("4300", "Amount")}
            >
              <Ionicons
                name={copiedField === "Amount" ? "checkmark" : "copy"}
                size={18}
                color={copiedField === "Amount" ? "#4ADE80" : "#A0A0A0"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions & Timer */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Search for Paystack-Titan or Titan-Paystack in your bank apps. This
            account is for transaction only and expires in
          </Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(timeLeft / 60) * 100}%` },
            ]}
          />
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/confirmation")}
        >
          <LucideCheck size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>I've sent the money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons
            name="close"
            size={20}
            color="#A0A0A0"
            style={styles.btnIcon}
          />
          <Text style={styles.secondaryButtonText}>Cancel Payment</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <LucideLock size={20} color="#A0A0A0" />
          <Text style={styles.footerText}>
            Secured by <Text style={styles.footerBrand}>Paystack</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PlusJakarta-SemiBold",
  },
  merchantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 10,
  },
  merchantInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  merchantIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  merchantName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  merchantDetails: {
    alignItems: "flex-end",
  },
  emailText: {
    color: "#888",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    marginBottom: 4,
  },
  amountDueSmall: {
    color: "#4ADE80",
    fontSize: 12,
    fontFamily: "PlusJakarta-SemiBold",
  },
  mainTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Medium",
    marginBottom: 8,
    lineHeight: 22,
  },
  highlightText: {
    fontFamily: "PlusJakarta-Bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  cardCol: {
    flex: 1,
  },
  label: {
    color: "#888",
    fontSize: 10,
    fontFamily: "PlusJakarta-SemiBold",
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  valueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-SemiBold",
  },
  amountValueText: {
    color: "#4ADE80",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
  },
  changeBankButton: {
    borderWidth: 1,
    borderColor: "#4ADE80",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeBankText: {
    color: "#4ADE80",
    fontSize: 10,
    fontFamily: "PlusJakarta-Bold",
  },
  copyButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  instructionsContainer: {
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  instructionsText: {
    color: "#ccc",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 8,
  },
  timerText: {
    color: "#EF4444",
    fontSize: 14,
    fontFamily: "PlusJakarta-Bold",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    marginBottom: 32,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FACC15",
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#22C55E",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  secondaryButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: "#A0A0A0",
    fontSize: 16,
    fontFamily: "PlusJakarta-Medium",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    marginLeft: 4,
  },
  footerBrand: {
    color: "#888",
    fontFamily: "PlusJakarta-Bold",
  },
});

export default PayOnlineScreen;
