import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const INITIAL_CART_ITEMS = [
  {
    id: '1',
    name: 'Smokey Jollof Combo',
    restaurant: 'Taste of Lagos',
    price: 4500,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    options: 'Extra Plantain, Spicy Chicken',
  },
  {
    id: '2',
    name: 'Suya Spiced Wings',
    restaurant: 'Suya Spot',
    price: 3500,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    options: 'Medium Spice',
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Dynamic calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 0 ? 1200 : 0;
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as typeof INITIAL_CART_ITEMS,
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'dinedash10') {
      setIsPromoApplied(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Your Basket</Text>
          <Text style={styles.headerTitle}>Cart ({cartItems.length})</Text>
        </View>

        {cartItems.length > 0 && (
          <Pressable
            onPress={() => setCartItems([])}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <Ionicons name="cart-outline" size={48} color="#FF8A3D" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.browseButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/(tabs)')}>
            <Text style={styles.browseButtonText}>Browse Food</Text>
          </Pressable>
        </View>
      ) : (
        /* Active Cart State */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Cart Items List */}
          <View style={styles.sectionContainer}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
                  <Text style={styles.itemOptions} numberOfLines={1}>
                    {item.options}
                  </Text>

                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </Text>

                    {/* Quantity Controls */}
                    <View style={styles.quantityControls}>
                      <Pressable
                        onPress={() => updateQuantity(item.id, -1)}
                        style={({ pressed }) => [
                          styles.qtyButton,
                          pressed && styles.pressed,
                        ]}>
                        <Ionicons
                          name={
                            item.quantity === 1 ? 'trash-outline' : 'remove'
                          }
                          size={14}
                          color={item.quantity === 1 ? '#FF4D4F' : '#FFFFFF'}
                        />
                      </Pressable>

                      <Text style={styles.qtyText}>{item.quantity}</Text>

                      <Pressable
                        onPress={() => updateQuantity(item.id, 1)}
                        style={({ pressed }) => [
                          styles.qtyButton,
                          pressed && styles.pressed,
                        ]}>
                        <Ionicons name="add" size={14} color="#FFFFFF" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Special Instructions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Delivery Notes</Text>
            <View style={styles.card}>
              <View style={styles.inputRow}>
                <Ionicons name="chatbox-outline" size={18} color="#777B84" />
                <TextInput
                  placeholder="e.g. Extra cutlery, leave at front door..."
                  placeholderTextColor="#777B84"
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>

          {/* Promo Code Input */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Promo Code</Text>
            <View style={styles.promoRow}>
              <View style={[styles.card, styles.promoInputCard]}>
                <Ionicons name="pricetag-outline" size={18} color="#777B84" />
                <TextInput
                  placeholder="Try 'DINEDASH10'"
                  placeholderTextColor="#777B84"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  style={styles.textInput}
                  autoCapitalize="characters"
                  editable={!isPromoApplied}
                />
              </View>

              <Pressable
                onPress={handleApplyPromo}
                disabled={isPromoApplied}
                style={({ pressed }) => [
                  styles.applyButton,
                  isPromoApplied && styles.applyButtonDisabled,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.applyButtonText}>
                  {isPromoApplied ? 'Applied' : 'Apply'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Bill Breakdown */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.card}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ₦{subtotal.toLocaleString()}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  ₦{deliveryFee.toLocaleString()}
                </Text>
              </View>

              {isPromoApplied && (
                <View style={styles.summaryRow}>
                  <Text style={styles.discountLabel}>Promo Discount (10%)</Text>
                  <Text style={styles.discountValue}>
                    -₦{discount.toLocaleString()}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₦{total.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Fixed Checkout Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>
              ₦{total.toLocaleString()}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.checkoutButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('./payment')}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090B',
  },
  scrollContent: {
    paddingBottom: 120, // space for fixed bottom bar
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#15171B',
  },
  headerTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#FF8A3D',
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF4D4F',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#121418',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 84,
    height: 84,
    borderRadius: 14,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemRestaurant: {
    fontSize: 11,
    color: '#777B84',
    marginTop: 2,
  },
  itemOptions: {
    fontSize: 11,
    color: '#FF8A3D',
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D22',
    borderRadius: 12,
    padding: 4,
    gap: 8,
  },
  qtyButton: {
    height: 26,
    width: 26,
    borderRadius: 8,
    backgroundColor: '#23262D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    backgroundColor: '#121418',
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  promoInputCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  applyButton: {
    backgroundColor: '#FF8A3D',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: '#32C48D',
  },
  applyButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#777B84',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  discountLabel: {
    fontSize: 13,
    color: '#32C48D',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#32C48D',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8A3D',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIconBox: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 138, 61, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#777B84',
    textAlign: 'center',
    lineHeight: 18,
  },
  browseButton: {
    marginTop: 24,
    backgroundColor: '#FF8A3D',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 18,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121418',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTextContainer: {
    justifyContent: 'center',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: '#777B84',
    textTransform: 'uppercase',
  },
  footerTotalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8A3D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 18,
    gap: 8,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
});
