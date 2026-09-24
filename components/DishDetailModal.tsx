import { typography } from "@/constants/typography";
import { Foods } from "@/data/food";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.45;

import Toast from "react-native-toast-message";
interface DishDetailModalProps {
  dish: Foods | null;
  visible: boolean;
  onClose: () => void;
}

export default function DishDetailModal({
  dish,
  visible,
  onClose,
}: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  // Reset quantity whenever a new dish is opened
  useEffect(() => {
    if (visible) {
      setQuantity(1);
    }
  }, [visible, dish]);

  if (!dish) return null;

  const totalPrice = dish.price * quantity;
  const handleAddToCart = () => {
    // 1. Add to Zustand Store
    addToCart({ ...dish, quantity });
    onClose();
    // 2. Show Success Toast
    Toast.show({
      type: "success",
      text1: "Added to Cart 🛒",
      text2: `${quantity}x ${dish.name} has been added.`,
      position: "top",
      visibilityTime: 2000,
    });
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
          >
            {/* Hero Image Section */}
            <View style={styles.imageHeader}>
              <Image
                source={{ uri: dish.image }}
                style={styles.headerImage}
                resizeMode="cover"
              />
              {/* Dark gradient at the bottom of the image for smooth transition */}
              <View style={styles.imageGradient} />
            </View>

            {/* Info Section overlapping the image */}
            <View style={styles.infoSection}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{dish.name}</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingStar}>★</Text>
                  <Text style={styles.ratingText}>{dish.rating}</Text>
                </View>
              </View>

              <Text style={styles.restaurantName}>{dish.restaurant}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⏱</Text>
                  <Text style={styles.metaText}>{dish.deliveryTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🏷</Text>
                  <Text style={styles.metaText}>{dish.category}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                A delicious {dish.category.toLowerCase()} prepared with the
                finest ingredients. Perfect for a satisfying meal. Enjoy the
                rich flavors delivered hot and fresh straight to your doorstep
                from {dish.restaurant}.
              </Text>

              <View style={styles.divider} />

              {/* Quantity Selector */}
              <View style={styles.quantityRow}>
                <Text style={styles.sectionTitle}>Quantity</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Spacer for bottom bar */}
              <View style={{ height: 120 }} />
            </View>
          </ScrollView>

          {/* Floating Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          {/* Sticky Bottom Bar */}
          <View style={styles.bottomBar}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.priceValue}>
                ₦{totalPrice.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: height * 0.74, // Leaves a small gap at the top
    backgroundColor: "#111111",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    position: "relative",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageHeader: {
    height: HEADER_HEIGHT,
    width: "100%",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "rgba(17,17,17,0.9)", // Fades into the #111 background
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    marginTop: -40, // Pull up to overlap the image
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontFamily: typography.bold?.fontFamily || "System",
    fontWeight: "bold",
    flex: 1,
    marginRight: 16,
    lineHeight: 32,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  ratingStar: {
    color: "#FFD700",
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  restaurantName: {
    color: "#00BC4F", // Green to highlight the restaurant
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  descriptionText: {
    color: "#888",
    fontSize: 14,
    lineHeight: 22,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#333",
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "300",
  },
  quantityValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },

  // Floating Close Button
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent dark
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  closeIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Sticky Bottom Bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  priceValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#00BC4F",
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    flex: 1.5,
    marginLeft: 16,
  },
  addToCartText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
