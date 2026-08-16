import foods from '@/data/food';
import { useCartStore } from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
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

const FOOD_ITEM = {
  id: 'f1',
  name: 'Smokey Jollof Rice Combo',
  restaurant: 'Taste of Lagos',
  rating: 4.8,
  reviewsCount: 342,
  prepTime: '20-30 min',
  calories: '650 kcal',
  basePrice: 3500,
  description:
    'Authentic firewood-cooked Jollof rice served with signature spicy grilled chicken, fried sweet plantains (Dodo), and fresh coleslaw.',
  image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
};

const PORTION_SIZES = [
  { id: 'regular', name: 'Regular', priceOffset: 0 },
  { id: 'medium', name: 'Medium (+25%)', priceOffset: 900 },
  { id: 'large', name: 'Family Pack', priceOffset: 200 },
];

const ADD_ONS = [
  { id: 'a1', name: 'Extra Fried Plantain', price: 500 },
  { id: 'a2', name: 'Extra Grilled Chicken Piece', price: 1500 },
  { id: 'a3', name: 'Spicy Pepper Sauce', price: 300 },
  { id: 'a4', name: 'Chilled Hibiscus Drink (Zobo)', price: 800 },
];

export default function FoodDetail() {
  const [selectedSize, setSelectedSize] = useState('regular');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['a1']);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { id } = useLocalSearchParams();
  const food = foods.find((f) => f.id === Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  //Price Calculation

  const sizeCalculation =
    PORTION_SIZES.find((s) => s.id === selectedSize)?.priceOffset || 0;
  if (!food) {
    return (
      <View style={styles.notFoundContainer}>
        <View style={styles.iconBox}>
          <Ionicons name="fast-food-outline" size={48} color="#FF8A3D" />
        </View>

        <Text style={styles.title}>Item Not Found</Text>
        <Text style={styles.subtitle}>
          The dish or restaurant you are looking for is unavailable or has been
          removed.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const addon = ADD_ONS.find((a) => a.id === id)?.price;
    return sum + (addon || 0);
  }, 0);
  const unitPrice = food.price + sizeCalculation + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) => {
      if (current.includes(id)) {
        return current.filter((addonId) => addonId !== id);
      }
      return [...current, id];
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Hero Image & Top Action Buttons */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: food.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          <View style={styles.topBar}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </Pressable>

            <Pressable
              onPress={() => setIsFavorite(!isFavorite)}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? '#FF4D4F' : '#FFFFFF'}
              />
            </Pressable>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="star" size={13} color="#FFC107" />
              <Text style={styles.badgeText}>{food.rating}</Text>
              <Text style={styles.badgeSubText}>
                ({FOOD_ITEM.reviewsCount})
              </Text>
            </View>

            <View style={styles.badge}>
              <Ionicons name="time-outline" size={13} color="#FF8A3D" />
              <Text style={styles.badgeText}>{food.deliveryTime}</Text>
            </View>

            <View style={styles.badge}>
              <Ionicons name="flame-outline" size={13} color="#FF4D4F" />
              <Text style={styles.badgeText}>{FOOD_ITEM.calories}</Text>
            </View>
          </View>
        </View>

        {/* Item Header Details */}
        <View style={styles.contentSection}>
          <Text style={styles.restaurantName}>{food.restaurant}</Text>
          <Text style={styles.foodTitle}>{FOOD_ITEM.name}</Text>
          <Text style={styles.description}>{FOOD_ITEM.description}</Text>

          {/* Portion Size Selection */}
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionTitle}>Select Portion Size</Text>
            <View style={styles.optionsGap}>
              {PORTION_SIZES.map((size) => {
                const isSelected = selectedSize === size.id;
                return (
                  <Pressable
                    key={size.id}
                    onPress={() => setSelectedSize(size.id)}
                    style={({ pressed }) => [
                      styles.cardOption,
                      isSelected && styles.cardOptionSelected,
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}>
                      {size.name}
                    </Text>

                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Optional Add-Ons */}
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionTitle}>Add Extra Sides</Text>
            <View style={styles.optionsGap}>
              {ADD_ONS.map((addon) => {
                const isChecked = selectedAddOns.includes(addon.id);
                return (
                  <Pressable
                    key={addon.id}
                    onPress={() => toggleAddOn(addon.id)}
                    style={({ pressed }) => [
                      styles.cardOption,
                      isChecked && styles.cardOptionSelected,
                      pressed && styles.pressed,
                    ]}>
                    <View style={styles.addonTextGroup}>
                      <Text
                        style={[
                          styles.optionLabel,
                          isChecked && styles.optionLabelSelected,
                        ]}>
                        {addon.name}
                      </Text>
                      <Text style={styles.addonPrice}>
                        +₦{addon.price.toLocaleString()}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.checkbox,
                        isChecked && styles.checkboxSelected,
                      ]}>
                      {isChecked && (
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Special Instructions */}
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <View style={styles.inputCard}>
              <TextInput
                placeholder="e.g. Less spicy, keep plantain separate..."
                placeholderTextColor="#777B84"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
                multiline
                numberOfLines={3}
                style={styles.textArea}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar: Quantity & Add to Cart */}
      <View style={styles.footerContainer}>
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <Pressable
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={({ pressed }) => [
              styles.qtyButton,
              pressed && styles.pressed,
            ]}>
            <Ionicons name="remove" size={16} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.qtyText}>{quantity}</Text>

          <Pressable
            onPress={() => setQuantity(quantity + 1)}
            style={({ pressed }) => [
              styles.qtyButton,
              pressed && styles.pressed,
            ]}>
            <Ionicons name="add" size={16} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Add to Cart CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.addToCartButton,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            addToCart({
              id: food.id,
              name: food.name,
              image: food.image,
              price: totalPrice,
              quantity,
            });
            router.push('/cart');
          }}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
          <Text style={styles.addToCartPrice}>
            ₦{totalPrice.toLocaleString()}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090B',
  },
  scrollContent: {
    paddingBottom: 120, // spacing for fixed bottom bar
  },
  heroContainer: {
    height: 320,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(8, 9, 11, 0.35)',
  },
  topBar: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(18, 20, 24, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(18, 20, 24, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badgeSubText: {
    fontSize: 10,
    color: '#777B84',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FF8A3D',
  },
  foodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#777B84',
    lineHeight: 22,
    marginTop: 10,
  },
  sectionMargin: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  optionsGap: {
    gap: 10,
  },
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121418',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
  },
  cardOptionSelected: {
    borderColor: '#FF8A3D',
    backgroundColor: '#171513',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777B84',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addonTextGroup: {
    gap: 2,
  },
  addonPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF8A3D',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3A3D44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FF8A3D',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FF8A3D',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3A3D44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: '#FF8A3D',
    backgroundColor: '#FF8A3D',
  },
  inputCard: {
    backgroundColor: '#121418',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 14,
  },
  textArea: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlignVertical: 'top',
    minHeight: 60,
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
    gap: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D22',
    borderRadius: 18,
    padding: 6,
    gap: 12,
  },
  qtyButton: {
    height: 38,
    width: 38,
    borderRadius: 12,
    backgroundColor: '#23262D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 4,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF8A3D',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addToCartPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: '#08090B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconBox: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 138, 61, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 138, 61, 0.2)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#777B84',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF8A3D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
