import GlassBackButton from "@/components/GlassBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Type definitions
type NumpadItem = string | "backspace";

interface AddCashScreenProps {
  initialAmount?: number;
  quickAmounts?: number[];
  currency?: string;
  onConfirm?: (amount: number) => void;
  onBack?: () => void;
}

const AddCashScreen: React.FC<AddCashScreenProps> = ({
  initialAmount = 1000,
  quickAmounts = [500, 1000, 2000, 5000, 10000],
  currency = "₦",
  onConfirm,
  }) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  const formattedAmount = amount.toLocaleString("en-NG");

  const handleKeyPress = (value: NumpadItem): void => {
    if (value === "backspace") {
      const newAmount = amount.toString().slice(0, -1);
      setAmount(newAmount === "" ? 0 : parseInt(newAmount, 10));
    } else {
      if (amount.toString().length < 7) {
        const newAmount = amount === 0 ? value : `${amount}${value}`;
        setAmount(parseInt(newAmount, 10));
      }
    }
  };

  const handleQuickAmount = (value: number): void => {
    setAmount(value);
  };

  const handleConfirm = (): void => {
    router.push({
      pathname: '/payment', 
      params: { amount: amount.toString() }
    });

  };

  const numpadData: NumpadItem[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "000",
    "0",
    "backspace",
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* --- Header --- */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Add Cash</Text>
        <View style={{ width: 34 }} />
      </View>

      <View style={styles.content}>
        {/* --- Amount Display --- */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>ENTER AMOUNT</Text>
          <View style={styles.amountDisplayRow}>
            <Text style={styles.currencySymbol}>{currency}</Text>
            <Text style={styles.amountText}>{formattedAmount}</Text>
          </View>
          <View style={styles.amountUnderline} />
        </View>

        {/* --- Quick Amount Pills --- */}
        <View style={styles.quickAmountsContainer}>
          {quickAmounts.map((val) => (
            <TouchableOpacity
              key={val}
              style={[
                styles.quickAmountPill,
                amount === val && styles.quickAmountPillActive,
              ]}
              onPress={() => handleQuickAmount(val)}
            >
              <Text style={styles.quickAmountText}>
                {currency}
                {val.toLocaleString("en-NG")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Number Pad --- */}
        <View style={styles.numpadContainer}>
          {numpadData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numpadButton}
              onPress={() => handleKeyPress(item)}
            >
              {item === "backspace" ? (
                <Ionicons name="backspace-outline" size={22} color="#e0e0e0" />
              ) : (
                <Text style={styles.numpadText}>{item}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Bottom Action Area --- */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <View style={styles.confirmButtonTextContainer}>
              <Text style={styles.confirmButtonTitle}>Confirm Amount</Text>
              <Text style={styles.confirmButtonSubtitle}>
                Powered by HeyBite • Instant
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.securedByContainer}>
            <Ionicons name="shield-checkmark" size={12} color="#666" />
            <Text style={styles.securedByText}>
              Secured by <Text style={styles.paystackText}>Paystack</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  // --- Amount Section ---
  amountSection: {
    alignItems: "center",
    marginTop: 15,
  },
  amountLabel: {
    color: "#888",
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontFamily: "PlusJakarta-SemiBold",
  },
  amountDisplayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  currencySymbol: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "PlusJakarta-SemiBold",
    marginRight: 4,
  },
  amountText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "PlusJakarta-Bold",
  },
  amountUnderline: {
    width: 120,
    height: 2,
    backgroundColor: "#22c55e",
    marginTop: 4,
    borderRadius: 1,
  },
  // --- Quick Amounts ---
  quickAmountsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  quickAmountPill: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  quickAmountPillActive: {
    borderColor: "#22c55e",
    backgroundColor: "#1a3a2a",
  },
  quickAmountText: {
    color: "#e0e0e0",
    fontSize: 12,
    fontFamily: "PlusJakarta-Medium",
  },
  // --- Numpad ---
  numpadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  numpadButton: {
    width: "30%",
    aspectRatio: 1.8,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  numpadText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "PlusJakarta-Medium",
  },
  // --- Bottom Section ---
  bottomSection: {
    marginTop: 6,
  },
  confirmButton: {
    backgroundColor: "#22c55e",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  confirmButtonTextContainer: {
    flex: 1,
  },
  confirmButtonTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "PlusJakarta-Bold",
  },
  confirmButtonSubtitle: {
    color: "#e0f2e9",
    fontSize: 10,
    marginTop: 1,
    fontFamily: "PlusJakarta-Regular",
  },
  securedByContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  securedByText: {
    color: "#666",
    fontSize: 11,
    fontFamily: "PlusJakarta-Regular",
  },
  paystackText: {
    color: "#888",
    fontFamily: "PlusJakarta-Bold",
  },
});

export default AddCashScreen;
