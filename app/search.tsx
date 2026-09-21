import SearchEmptyState from "@/components/SearchEmptyState";
import SearchFilters from "@/components/SearchFilters";
import SearchFoodGrid from "@/components/SearchFoodGrid";
import SearchResultsHeader from "@/components/SearchResultsHeader";
import SearchTabs from "@/components/SearchTabs";
import { typography } from "@/constants/typography";
import POPULAR_ITEMS, { Foods } from "@/data/food";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Placeholder images for the exact design look
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400&auto=format&fit=crop",
];

export default function Search(): React.JSX.Element {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState(""); // Pre-filled to match screenshot
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">(
    "restaurants",
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFoods = POPULAR_ITEMS.filter((food) =>
    food.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const [selectedFood, setSelectedFood] = useState<Foods | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Search Header */}
          <View style={styles.searchRow}>
            <View
              style={[styles.searchContainer, focused && styles.inputFocused]}
            >
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search restaurants, dishes..."
                placeholderTextColor="#aaa"
                autoFocus
                style={[typography.regular, styles.searchInput]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery("")}>
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {query.trim() === "" ? (
            <SearchEmptyState />
          ) : (
            <View>
              {/* Filter Pills */}
              <SearchFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />

              {/* Results Header */}
              <SearchResultsHeader resultCount={filteredFoods.length} />

              {/* Tabs */}
              <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
              {/* Grid of Foods */}
              <SearchFoodGrid
                foods={filteredFoods}
                onFoodPress={(food) => {
                  setSelectedFood(food);
                  setQuantity(1);
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "🛒", label: "Cart", active: false },
          { icon: "📋", label: "Orders", active: false },
          { icon: "👤", label: "Profile", active: false },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text
              style={[styles.navLabel, item.active && styles.navLabelActive]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Food Detail Modal */}
      <Modal
        visible={!!selectedFood}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedFood(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedFood(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Modal Image */}
            <Image
              source={{
                uri: PLACEHOLDER_IMAGES[
                  selectedFood
                    ? POPULAR_ITEMS.indexOf(selectedFood) %
                      PLACEHOLDER_IMAGES.length
                    : 0
                ],
              }}
              style={styles.modalImage}
            />

            {/* Modal Info */}
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{selectedFood?.name}</Text>
              <Text style={styles.modalSubtitle}>Spot right Kitchen</Text>

              <View style={styles.modalPriceRow}>
                <Text style={styles.modalPrice}>₦2,200</Text>
                <Text style={styles.modalRating}>⭐ 4.8 (14)</Text>
              </View>

              {/* Quantity and Checkout */}
              <View style={styles.modalActions}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.checkoutButton}>
                  <Text style={styles.checkoutText}>
                    Checkout for ₦{(2200 * quantity).toLocaleString()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111111", // Darker background outside the screen
  },
  screen: {
    flex: 1,
    backgroundColor: "#111111",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 100, // Space for bottom nav
  },
  // Search Row
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1A1A1A",
  },
  searchIcon: {
    color: "#d1d1d1",
    fontSize: 30,
    lineHeight: 30,
    transform: [{ rotate: "-20deg" }],
    marginRight: 8,
    marginTop: -4,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    height: "100%",
    outlineStyle: "none" as any,
  },
  clearIcon: {
    color: "#888",
    fontSize: 18,
    marginLeft: 8,
  },
  cancelText: {
    color: "#00BC4F",
    fontSize: 16,
    marginLeft: 15,
    fontFamily: typography.medium.fontFamily,
  },
  inputFocused: {
    borderColor: "#00BC4F",
  },
   // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.8,
  },
  navLabel: {
    color: "#666",
    fontSize: 12,
  },
  navLabelActive: {
    color: "#00BC4F",
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    paddingBottom: 30,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#333",
  },
  modalInfo: {
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalSubtitle: {
    color: "#888",
    fontSize: 14,
    marginBottom: 16,
  },
  modalPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  modalPrice: {
    color: "#00BC4F",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 16,
  },
  modalRating: {
    color: "#fff",
    fontSize: 14,
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  quantityText: {
    color: "#fff",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantityValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  checkoutButton: {
    backgroundColor: "#00BC4F",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flex: 1,
    marginLeft: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
