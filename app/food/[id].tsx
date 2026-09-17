import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ImageBackground } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import POPULAR_ITEMS from "@/data/food";
import { useCartStore } from "@/store/cartStore";

const CATEGORIES = [
  { id: "1", name: "Rice", icon: "🍚" },
  { id: "2", name: "Protein", icon: "🍗" },
  { id: "3", name: "Soups", icon: "🥣" },
  { id: "4", name: "Sides", icon: "🍟" },
  { id: "5", name: "Drinks", icon: "🥤" },
];

const RestaurantScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [activeCategory, setActiveCategory] = useState("1");
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const Dish = POPULAR_ITEMS.find(
    (item) => item.id === Number(id)
  );

  const restaurantDishes = POPULAR_ITEMS.filter(
    (item) => item.restaurant === Dish?.restaurant
  );

  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString()}`;

  if (!Dish) {
    return (
      <SafeAreaView style={styles.notFound}>
        <StatusBar barStyle="light-content" />

        <Ionicons
          name="fast-food-outline"
          size={60}
          color="#34C759"
        />

        <Text style={styles.notFoundTitle}>
          Food not found
        </Text>

        <Text style={styles.notFoundText}>
          We couldn't find this food item.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Go back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const itemPrice = Number(Dish.price);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity ?? 1),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity ?? 1),
    0
  );

  const handleAddToCart = () => {
    addToCart({
      ...Dish,
      quantity,
    });

    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Image */}
        <ImageBackground
          source={{ uri: Dish.image }}
          style={styles.headerImage}
          contentFit="cover"
        >
          <SafeAreaView style={styles.headerOverlay}>
            <View style={styles.headerTopRow}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="#FFF"
                />
              </TouchableOpacity>

              <View style={styles.headerRightIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons
                    name="heart-outline"
                    size={24}
                    color="#FFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.iconButton,
                    { marginLeft: 10 },
                  ]}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color="#FFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Restaurant Information */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.restaurantName}>
              {Dish.restaurant}
            </Text>

            <View style={styles.openBadge}>
              <View style={styles.dot} />

              <Text style={styles.openText}>
                Open
              </Text>
            </View>
          </View>

          <Text style={styles.cuisineText}>
            Nigerian cuisine • Home cooking • Soups • Rice dishes
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="star"
                size={14}
                color="#FFC107"
              />

              <Text style={styles.statText}>
                <Text style={styles.boldText}>
                  {Dish.rating}
                </Text>{" "}
                (289 Orders)
              </Text>
            </View>

            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color="#AAA"
              />

              <Text style={styles.statText}>
                {Dish.deliveryTime}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="bike"
                size={16}
                color="#AAA"
              />

              <Text style={styles.statText}>
                Free delivery
              </Text>
            </View>

            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={14}
                color="#AAA"
              />

              <Text style={styles.statText}>
                0.8km away
              </Text>
            </View>
          </View>

          {/* Promo */}
          <View style={styles.promoBanner}>
            <Text style={styles.promoEmoji}>
              🎉
            </Text>

            <Text style={styles.promoText}>
              Use code{" "}
              <Text style={styles.promoCode}>
                HEYBITE1
              </Text>{" "}
              for delivery on your first order!
            </Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat) => {
              const isActive =
                activeCategory === cat.id;

              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() =>
                    setActiveCategory(cat.id)
                  }
                  style={[
                    styles.categoryChip,
                    isActive &&
                      styles.categoryChipActive,
                  ]}
                >
                  <Text style={styles.categoryEmoji}>
                    {cat.icon}
                  </Text>

                  <Text
                    style={[
                      styles.categoryText,
                      isActive &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Selected Food */}
        <View style={styles.selectedFoodSection}>
          <Text style={styles.sectionTitle}>
            {Dish.name}
          </Text>

          <View style={styles.selectedFoodCard}>
            <Image
              source={{ uri: Dish.image }}
              style={styles.selectedFoodImage}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
            />

            <View style={styles.selectedFoodInfo}>
              <Text style={styles.selectedFoodName}>
                {Dish.name}
              </Text>

              <Text style={styles.selectedFoodDescription}>
                Delicious {Dish.name.toLowerCase()} from{" "}
                {Dish.restaurant}.
              </Text>

              <Text style={styles.selectedFoodPrice}>
                {formatNaira(itemPrice)}
              </Text>
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>
              Quantity
            </Text>

            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color="#FFF"
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {quantity}
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setQuantity((prev) => prev + 1)
                }
              >
                <Ionicons
                  name="add"
                  size={20}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add To Cart */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons
              name="cart-outline"
              size={21}
              color="#FFF"
            />

            <Text style={styles.addToCartText}>
              Add {quantity} to cart
            </Text>

            <Text style={styles.addToCartPrice}>
              {formatNaira(itemPrice * quantity)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>
            🍚 More from {Dish.restaurant}
          </Text>

          {restaurantDishes.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={styles.dishCard}
              onPress={() =>
                router.push({
                  pathname: "/food/[id]",
                  params: {
                    id: dish.id.toString(),
                  },
                })
              }
            >
              <View style={styles.dishImageWrapper}>
                <Image
                  source={{ uri: dish.image }}
                  style={styles.dishImage}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={200}
                />
              </View>

              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>
                  {dish.name}
                </Text>

                <Text
                  style={styles.dishDescription}
                  numberOfLines={2}
                >
                  Delicious {dish.name.toLowerCase()} from{" "}
                  {dish.restaurant}.
                </Text>

                <Text style={styles.dishPrice}>
                  {formatNaira(Number(dish.price))}
                </Text>
              </View>

              <View style={styles.addButtonWrapper}>
                <View style={styles.addButton}>
                  <Ionicons
                    name="add"
                    size={20}
                    color="#FFF"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <View style={styles.floatingCartWrapper}>
          <TouchableOpacity
            style={styles.floatingCartButton}
            onPress={() => router.push("/cart")}
            activeOpacity={0.85}
          >
            <View style={styles.cartLeft}>
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>
                  {cartCount}
                </Text>
              </View>

              <Text style={styles.cartButtonText}>
                View cart
              </Text>
            </View>

            <View style={styles.cartRight}>
              <Text style={styles.cartTotalText}>
                {formatNaira(cartTotal)}
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  scrollContent: {
    paddingBottom: 120,
  },

  headerImage: {
    width: "100%",
    height: 280,
  },

  headerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRightIcons: {
    flexDirection: "row",
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  infoSection: {
    padding: 20,
    backgroundColor: "#121212",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  restaurantName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },

  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(52, 199, 89, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34C759",
    marginRight: 6,
  },

  openText: {
    color: "#34C759",
    fontSize: 12,
    fontWeight: "600",
  },

  cuisineText: {
    color: "#888",
    fontSize: 13,
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },

  statText: {
    color: "#CCC",
    fontSize: 12,
    marginLeft: 6,
  },

  boldText: {
    fontWeight: "bold",
  },

  promoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C1A14",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#4A2A1A",
  },

  promoEmoji: {
    fontSize: 20,
    marginRight: 10,
  },

  promoText: {
    color: "#FFF",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },

  promoCode: {
    color: "#FF5722",
    fontWeight: "bold",
  },

  categoriesWrapper: {
    backgroundColor: "#121212",
    paddingVertical: 10,
  },

  categoriesScroll: {
    paddingHorizontal: 20,
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryChipActive: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#555",
  },

  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },

  categoryText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },

  categoryTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },

  selectedFoodSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  selectedFoodCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    overflow: "hidden",
  },

  selectedFoodImage: {
    width: "100%",
    height: 220,
  },

  selectedFoodInfo: {
    padding: 16,
  },

  selectedFoodName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  selectedFoodDescription: {
    color: "#999",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },

  selectedFoodPrice: {
    color: "#34C759",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 14,
  },

  quantityLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    padding: 4,
  },

  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#34C759",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "center",
  },

  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#00A651",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 14,
  },

  addToCartText: {
    flex: 1,
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },

  addToCartPrice: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  menuSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },

  dishCard: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "flex-start",
  },

  dishImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },

  dishImage: {
    width: "100%",
    height: "100%",
  },

  dishInfo: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: "center",
  },

  dishName: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  dishDescription: {
    color: "#888",
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },

  dishPrice: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "bold",
  },

  addButtonWrapper: {
    justifyContent: "flex-end",
    height: 80,
  },

  addButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#34C759",
    justifyContent: "center",
    alignItems: "center",
  },

  floatingCartWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  floatingCartButton: {
    backgroundColor: "#00A651",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  cartLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cartCountBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cartCountText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  cartRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  cartTotalText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },

  notFound: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  notFoundTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
  },

  notFoundText: {
    color: "#888",
    fontSize: 14,
    marginTop: 8,
  },

  backButton: {
    backgroundColor: "#00A651",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 24,
  },

  backButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default RestaurantScreen;