import { useCartStore } from "@/store/cartStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const CartScreen = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQuantity);
  const decreaseQty = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = cart.reduce((acc, item) => {
    const price =
      item.price;

    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = 0;
  const serviceCharge = 100;
  const total = subtotal + deliveryFee + serviceCharge;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>{cart.length} items</Text>
        </View>

        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Items Section */}
        <Text style={styles.sectionHeader}>YOUR ITEMS</Text>

        <View style={styles.itemsContainer}>
          {cart.map((item, index) => (
            <View key={item.id || index}>
              <View style={styles.cartItem}>
                {/* Item Image Placeholder */}
                <View
                  style={[
                    styles.itemImage,
                    {
                      backgroundColor:  "#2E8B57",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="food"
                    size={24}
                    color="#FFF"
                  />
                </View>

                {/* Item Details */}
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemTitle}>{item.name}</Text>

                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={styles.itemDescription}
                    numberOfLines={2}
                  >
                   
                      "Nigerian Party jollof with smoky tomato base, served with a juicy fried chicken piece
                  </Text>

                  {/* Price and Quantity Controls */}
                  <View style={styles.itemBottomRow}>
                    <Text style={styles.itemPrice}>
                      {formatNaira(
                       item.price
                      )}
                    </Text>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => decreaseQty(item.id)}
                      >
                        <Ionicons
                          name="remove"
                          size={16}
                          color="#FFF"
                        />
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => increaseQty(item.id)}
                      >
                        <Ionicons
                          name="add"
                          size={16}
                          color="#FFF"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {index < cart.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}

          {cart.length === 0 && (
            <Text style={styles.emptyText}>
              Your cart is empty.
            </Text>
          )}
        </View>

        {/* Bill Details Section */}
        <Text style={styles.sectionHeader}>Bill details</Text>

        <View style={styles.billContainer}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item subtotal</Text>
            <Text style={styles.billValue}>
              {formatNaira(subtotal)}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery fee</Text>

            <Text
              style={[
                styles.billValue,
                { color: "#34C759" },
              ]}
            >
              Free
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Service Charge</Text>
            <Text style={styles.billValue}>
              {formatNaira(serviceCharge)}
            </Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatNaira(total)}
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          {cart.length} items in cart
        </Text>
      </ScrollView>

      {/* Floating Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <View>
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>

            <Text style={styles.checkoutSubtext}>
              Estimated delivery • 10-20 minutes
            </Text>
          </View>

          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFF"
          />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitleContainer: {
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  headerSubtitle: {
    color: "#34C759",
    fontSize: 12,
    marginTop: 2,
  },

  clearText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "500",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  sectionHeader: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  itemsContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  cartItem: {
    flexDirection: "row",
    paddingVertical: 12,
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  itemDetails: {
    flex: 1,
  },

  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  itemTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },

  itemDescription: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },

  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  itemPrice: {
    color: "#34C759",
    fontSize: 16,
    fontWeight: "bold",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 8,
    padding: 2,
  },

  qtyButton: {
    padding: 6,
  },

  qtyText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginVertical: 4,
  },

  emptyText: {
    color: "#888",
    textAlign: "center",
    padding: 20,
  },

  billContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  billLabel: {
    color: "#888",
    fontSize: 14,
  },

  billValue: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },

  billDivider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginVertical: 8,
  },

  totalLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  totalValue: {
    color: "#34C759",
    fontSize: 18,
    fontWeight: "bold",
  },

  footerText: {
    color: "#666",
    fontSize: 12,
    marginBottom: 20,
  },

  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#121212",
  },

  checkoutButton: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
  },

  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  checkoutSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    marginTop: 2,
  },
});

export default CartScreen;