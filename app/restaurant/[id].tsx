import FavoriteButton from "@/components/FavoriteButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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

import AddToCartButton from "@/components/AddToCartButton";
import GlassBackButton from "@/components/GlassBackButton";
import POPULAR_ITEMS, { RESTAURANTS_AND_MEALS } from "@/data/food";
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

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const Dish = RESTAURANTS_AND_MEALS.find((item) => item.id === Number(id));

  const restaurantDishes = POPULAR_ITEMS.filter(
    (item) => item.restaurant === Dish?.restaurant,
  );

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  if (!Dish) {
    return (
      <SafeAreaView style={styles.notFound}>
        <StatusBar barStyle="light-content" />

        <Ionicons name="fast-food-outline" size={60} color="#34C759" />

        <Text style={styles.notFoundTitle}>Food not found</Text>

        <Text style={styles.notFoundText}>
          We couldn't find this food item.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity ?? 1),
    0,
  );

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
        <ImageBackground
          source={{ uri: Dish.image }}
          style={styles.headerImage}
          contentFit="cover"
        >
          <SafeAreaView style={styles.headerOverlay}>
            <View style={styles.headerTopRow}>
              <GlassBackButton />

              <View style={styles.headerRightIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <FavoriteButton id={id} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconButton, { marginLeft: 10 }]}
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
            <Text style={styles.restaurantName}>{Dish.restaurant}</Text>

            <View style={styles.openBadge}>
              <View style={styles.dot} />

              <Text style={styles.openText}>Open</Text>
            </View>
          </View>

          <Text style={styles.cuisineText}>
            Nigerian cuisine • Home cooking • Soups • Rice dishes
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <MaterialCommunityIcons name="star" size={14} color="#FFC107" />

              <Text style={styles.statText}>
                <Text style={styles.boldText}>{Dish.rating}</Text> (289 Orders)
              </Text>
            </View>

            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color="#AAA"
              />

              <Text style={styles.statText}>{Dish.deliveryTime}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <MaterialCommunityIcons name="bike" size={16} color="#AAA" />

              <Text style={styles.statText}>Free delivery</Text>
            </View>

            <View style={styles.statBadge}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={14}
                color="#AAA"
              />

              <Text style={styles.statText}>0.8km away</Text>
            </View>
          </View>

          {/* Promo */}
          <View style={styles.promoBanner}>
            <Text style={styles.promoEmoji}>🎉</Text>

            <Text style={styles.promoText}>
              Use code <Text style={styles.promoCode}>HEYBITE1</Text> for
              delivery on your first order!
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
              const isActive = activeCategory === cat.id;

              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                >
                  <Text style={styles.categoryEmoji}>{cat.icon}</Text>

                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.categoryTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Restaurant Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>
            🍚 More from {Dish.restaurant}
          </Text>

          {restaurantDishes.map((dish) => {
            return (
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
                    transition={100}
                  />
                </View>

                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{dish.name}</Text>

                  <Text style={styles.dishDescription} numberOfLines={2}>
                    Delicious {dish.name.toLowerCase()} from {dish.restaurant}.
                  </Text>

                  <Text style={styles.dishPrice}>
                    {formatNaira(Number(dish.price))}
                  </Text>
                </View>

                <View style={styles.actionContainer}>
                  <AddToCartButton food={dish} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.floatingCartWrapper}>
          <TouchableOpacity
            style={styles.floatingCartButton}
            onPress={() => router.push("/cart")}
            activeOpacity={0.85}
          >
            <View style={styles.cartLeft}>
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cart.length}</Text>
              </View>

              <Text style={styles.cartButtonText}>View cart</Text>
            </View>

            <View style={styles.cartRight}>
              <Text style={styles.cartTotalText}>{formatNaira(cartTotal)}</Text>

              <Ionicons name="arrow-forward" size={18} color="#FFF" />
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
    fontFamily: "PlusJakarta-Bold",
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
    fontFamily: "PlusJakarta-SemiBold",
  },

  cuisineText: {
    color: "#888",
    fontSize: 13,
    marginBottom: 16,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Regular",
  },

  boldText: {
    fontFamily: "PlusJakarta-Bold",
  },

  actionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 10,
  },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 166, 81, 0.15)",
    borderWidth: 1,
    borderColor: "#00A651",
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "PlusJakarta-Regular",
  },

  promoCode: {
    color: "#FF5722",
    fontFamily: "PlusJakarta-Bold",
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
    fontFamily: "PlusJakarta-Medium",
  },

  categoryTextActive: {
    color: "#FFF",
    fontFamily: "PlusJakarta-Bold",
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
    marginBottom: 16,
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
    justifyContent: "space-between",
  },

  dishName: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "PlusJakarta-SemiBold",
    marginBottom: 4,
  },

  dishDescription: {
    color: "#888",
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
    fontFamily: "PlusJakarta-Regular",
  },

  dishPrice: {
    color: "#34C759",
    fontSize: 14,
    fontFamily: "PlusJakarta-Bold",
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
    fontFamily: "PlusJakarta-Bold",
  },

  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },

  cartRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  cartTotalText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
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
    fontFamily: "PlusJakarta-Bold",
    marginTop: 16,
  },

  notFoundText: {
    color: "#888",
    fontSize: 14,
    marginTop: 8,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Bold",
  },
});

export default RestaurantScreen;
