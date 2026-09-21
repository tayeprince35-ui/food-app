import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CreditCard,
} from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MOCK_DATA = {
  orderId: "HB-20243",
  totalAmount: "₦4,300",
  itemCount: 3,
  paymentMethods: [
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay with cash when your order arrives",
      icon: Banknote,
    },
    {
      id: "transfer",
      title: "Bank Transfer",
      description: "Virtual account-Auto confirm",
      icon: CreditCard,
    },
    {
      id: "opay",
      title: "Opay",
      description: "Pay via your Opay wallet",
      icon: CreditCard,
    },
    {
      id: "ussd",
      title: "USSD",
      description: "Works without internet-Dial to pay",
      icon: CreditCard,
    },
  ],
};

export default function PayOnlineScreen() {
  const [selectedMethodId, setSelectedMethodId] = useState<string>("transfer");

  const selectedMethod = MOCK_DATA.paymentMethods.find(
    (m) => m.id === selectedMethodId,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pay Online</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {/* Total Amount Card */}
          <View style={styles.amountCard}>
            <View>
              <Text style={styles.amountCardLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.amountCardValue}>
                {MOCK_DATA.totalAmount}
              </Text>
            </View>

            <View style={styles.orderInfoContainer}>
              <Text style={styles.orderIdText}>Order #{MOCK_DATA.orderId}</Text>
              <View style={styles.itemBadge}>
                <Text style={styles.itemBadgeText}>
                  {MOCK_DATA.itemCount} items
                </Text>
              </View>
            </View>
          </View>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>HOW WOULD YOU LIKE TO PAY?</Text>

          {/* Payment Methods Options */}
          <View style={styles.methodsContainer}>
            {MOCK_DATA.paymentMethods.map((method) => {
              const isSelected = selectedMethodId === method.id;
              const IconComponent = method.icon;

              return (
                <TouchableOpacity
                  key={method.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMethodId(method.id)}
                  style={[
                    styles.methodCard,
                    isSelected
                      ? styles.methodCardSelected
                      : styles.methodCardUnselected,
                  ]}
                >
                  <View style={styles.methodInfoRow}>
                    <View
                      style={[
                        styles.iconWrapper,
                        isSelected
                          ? styles.iconWrapperSelected
                          : styles.iconWrapperUnselected,
                      ]}
                    >
                      <IconComponent
                        size={20}
                        color={isSelected ? "#10B981" : "#6B7280"}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.methodTitle}>{method.title}</Text>
                      <Text style={styles.methodDescription}>
                        {method.description}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.radioOuter,
                      isSelected
                        ? styles.radioOuterSelected
                        : styles.radioOuterUnselected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer Payment Action */}
        <View style={styles.footer}>
          <View style={styles.payingWithRow}>
            <Text style={styles.payingWithLabel}>Paying with: </Text>
            <View style={styles.payingWithDot} />
            <Text style={styles.payingWithValue}>
              {selectedMethod?.title || ""}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.payButton}>
            <View>
              <Text style={styles.payButtonText}>Make Payment</Text>
              <Text style={styles.payButtonSubtext}>
                Pay {MOCK_DATA.totalAmount} • {selectedMethod?.title}
              </Text>
            </View>

            <ArrowRight size={20} color="#051D14" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    marginRight: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  amountCard: {
    backgroundColor: "#181D1A",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.4)",
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountCardLabel: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  amountCardValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  orderInfoContainer: {
    alignItems: "flex-end",
  },
  orderIdText: {
    color: "#A3A3A3",
    fontSize: 12,
    marginBottom: 4,
  },
  itemBadge: {
    backgroundColor: "#10291D",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  itemBadgeText: {
    color: "#34D399",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#A3A3A3",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  methodsContainer: {
    gap: 0,
  },
  methodCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "#181D1A",
  },
  methodCardSelected: {
    borderColor: "#10B981",
  },
  methodCardUnselected: {
    borderColor: "#262626",
  },
  methodInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
  },
  iconWrapperSelected: {
    backgroundColor: "rgba(6, 78, 59, 0.8)",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  iconWrapperUnselected: {
    backgroundColor: "rgba(38, 38, 38, 0.8)",
    borderColor: "rgba(64, 64, 64, 0.5)",
  },
  textContainer: {
    flex: 1,
  },
  methodTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  methodDescription: {
    color: "#A3A3A3",
    fontSize: 12,
    marginTop: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#10B981",
  },
  radioOuterUnselected: {
    borderColor: "#525252",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
  },
  footer: {
    paddingVertical: 16,
    backgroundColor: "#121413",
  },
  payingWithRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  payingWithLabel: {
    color: "#A3A3A3",
    fontSize: 12,
  },
  payingWithDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginHorizontal: 6,
  },
  payingWithValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  payButton: {
    backgroundColor: "#10B981",
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  payButtonText: {
    color: "#051D14",
    fontWeight: "700",
    fontSize: 16,
  },
  payButtonSubtext: {
    color: "rgba(5, 29, 20, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
});
