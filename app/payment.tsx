import GlassBackButton from "@/components/GlassBackButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";
const COLORS = {
  bg: "#0B0D0C", // Dark background
  card: "#141715", // Slightly lighter card background
  cardBorder: "#232823", // Dark border
  green: "#22C55E", // Primary green
  greenDim: "rgba(34,197,94,0.08)",
  text: "#FFFFFF",
  subtext: "#8E938F",
  radioBorder: "#4A4F4B",
};

// Payment methods data
const PAYMENT_METHODS = [
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Pay with cash when your order arrives",
    icon: "cash",
    iconType: "MaterialCommunityIcons",
  },
  {
    id: "bank",
    title: "Bank Transfer",
    subtitle: "Virtual account-Auto confirm",
    icon: "bank",
    iconType: "MaterialCommunityIcons",
  },
  {
    id: "opay",
    title: "Opay",
    subtitle: "Pay via your Opay wallet",
    icon: "wallet",
    iconType: "MaterialCommunityIcons",
  },
  {
    id: "ussd",
    title: "USSD",
    subtitle: "Works without internet-Dial to pay",
    icon: "cellphone",
    iconType: "MaterialCommunityIcons",
  },
];

const PayOnlineScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState("bank"); // Default to Bank Transfer
  const { amount } = useLocalSearchParams<{ amount: string }>();

  // Find the currently selected method object to display its name at the bottom
  const activeMethodData = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <GlassBackButton />
          <Text style={styles.headerTitle}>Pay Online</Text>
        </View>

        {/* Total Amount Card */}

        {amount && (
          <View style={styles.totalCard}>
            <View style={styles.totalCardLeft}>
              <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.totalAmount}>₦{amount}</Text>
            </View>
            <View style={styles.totalCardRight}>
              <Text style={styles.orderNumber}>Order #HB-20243</Text>
              <View style={styles.itemBadge}>
                <Text style={styles.itemBadgeText}>items</Text>
              </View>
            </View>
          </View>
        )}
        {/* Section Title */}
        <Text style={styles.sectionTitle}>HOW WOULD YOU LIKE TO PAY?</Text>

        {/* Payment Methods List */}
        <View style={styles.methodsList}>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;

            return (
              <TouchableOpacity
                key={method.id}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod(method.id)}
                style={[
                  styles.methodCard,
                  isSelected && styles.methodCardSelected,
                ]}
              >
                <View style={styles.methodIconContainer}>
                  <MaterialCommunityIcons
                    name={method.icon as any}
                    size={22}
                    color={COLORS.green}
                  />
                </View>

                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                  <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                </View>

                {/* Radio Button */}
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && { borderColor: COLORS.green },
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.payingWithText}>Paying with: </Text>
          <View style={styles.payingWithDot} />
          <Text style={styles.payingWithMethod}>{activeMethodData?.title}</Text>
        </View>
      </ScrollView>

      {/* Make Payment Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.payButton}
          activeOpacity={0.9}
          onPress={() => {
            router.push("/PayOnlineScreen");
          }}
        >
          <View>
            <Text style={styles.payButtonTitle}>Make Payment</Text>
            <Text style={styles.payButtonSubtitle}>
              {activeMethodData?.title}
            </Text>
          </View>

          {amount && (
            <View style={styles.payButtonRight}>
              <Text style={styles.payButtonAmount}>(Pay ₦{amount})</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={COLORS.text}
                style={{ marginLeft: 8 }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for the bottom button
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
    marginLeft: 16,
  },
  totalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 32,
  },
  totalCardLeft: {
    flex: 1,
  },
  totalLabel: {
    color: COLORS.green,
    fontSize: 11,
    fontFamily: "PlusJakarta-SemiBold",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  totalAmount: {
    color: COLORS.text,
    fontSize: 26,
    fontFamily: "PlusJakarta-Bold",
  },
  totalCardRight: {
    alignItems: "flex-end",
  },
  orderNumber: {
    color: COLORS.subtext,
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    marginBottom: 8,
  },
  itemBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemBadgeText: {
    color: COLORS.green,
    fontSize: 12,
    fontFamily: "PlusJakarta-SemiBold",
  },
  sectionTitle: {
    color: COLORS.subtext,
    fontSize: 12,
    fontFamily: "PlusJakarta-SemiBold",
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  methodsList: {
    gap: 12,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  methodCardSelected: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenDim,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "PlusJakarta-SemiBold",
    marginBottom: 4,
  },
  methodSubtitle: {
    color: COLORS.subtext,
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    lineHeight: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.radioBorder,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.green,
  },
  footerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  payingWithText: {
    color: COLORS.subtext,
    fontSize: 14,
    fontFamily: "PlusJakarta-Regular",
  },
  payingWithDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green,
    marginHorizontal: 6,
  },
  payingWithMethod: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)", // Subtle divider
  },
  payButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  payButtonTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  payButtonSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "PlusJakarta-Medium",
    marginTop: 2,
  },
  payButtonRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  payButtonAmount: {
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "PlusJakarta-Bold",
  },
});

export default PayOnlineScreen;
