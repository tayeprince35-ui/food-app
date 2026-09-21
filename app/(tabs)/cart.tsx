import CustomAlert from "@/components/CustomAlert";
import GlassBackButton from "@/components/GlassBackButton";
import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
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

const CartScreen = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQuantity);
  const decreaseQty = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
const [showClearAlert, setShowClearAlert] = useState(false);
  const subtotal = cart.reduce((acc, item) => {
    const price =
      item.price;

    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = 0;
  const serviceCharge = 100;
  const total = subtotal + deliveryFee + serviceCharge;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;
const clearFromCart = () => {
  setShowClearAlert(true);
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />


        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>{cart.length} items</Text>
        </View>

        <TouchableOpacity onPress={clearFromCart}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
<CustomAlert
  visible={showClearAlert}
  type="warning"
  title="Clear Cart?"
  message="Are you sure you want to remove all items from your cart?"
  buttonText="Clear Cart"
  onPress={() => {
    clearCart();
    setShowClearAlert(false);
  }}
  onClose={() => setShowClearAlert(false)}
/>
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
                className="overflow-hidden
                "
                  style={[
                    styles.itemImage,
                    {
                      backgroundColor:  "#2E8B57",
                    },
                  ]}
                >
                  <Image
                  source={item.image}
                  style={{
                  width: '100%',
                  height: '100%'         
                                
                    }}
                   contentFit="cover"
                   cachePolicy="memory-disk"
                   transition={100}
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
        {/* Floating Checkout Button */}
    
      
        <TouchableOpacity style={styles.checkoutButton} onPress={()=>router.push({
  pathname: "/checkout",
  params: {
    total: total.toString(),
  },
})}>
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
     
      </ScrollView>

       
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
    fontFamily: "PlusJakarta-SemiBold",
  },

  headerSubtitle: {
    color: "#34C759",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },

  clearText: {
    color: "#FF3B30",
    fontSize: 15,
    fontFamily: "PlusJakarta-Medium",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  sectionHeader: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "PlusJakarta-SemiBold",
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
    flex: 1,
    marginRight: 8,
    fontFamily: "PlusJakarta-SemiBold",
  },

  itemDescription: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Bold",
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
    paddingHorizontal: 12,
    fontFamily: "PlusJakarta-SemiBold",
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
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Regular",
  },

  billValue: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-Medium",
  },

  billDivider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginVertical: 8,
  },

  totalLabel: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },

  totalValue: {
    color: "#34C759",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
  },

  footerText: {
    color: "#666",
    fontSize: 12,
    marginBottom: 20,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Bold",
  },

  checkoutSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },
});
export default CartScreen;