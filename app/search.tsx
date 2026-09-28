import DishDetailModal from "@/components/DishDetailModal";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";
import SearchEmptyState from "@/components/SearchEmptyState";
import SearchFilters from "@/components/SearchFilters";
import SearchFoodGrid from "@/components/SearchFoodGrid";
import SearchNoResults from "@/components/SearchNoResults";
import SearchRestaurantList from "@/components/SearchRestaurantList";
import SearchResultsHeader from "@/components/SearchResultsHeader";
import SearchTabs from "@/components/SearchTabs";
import { typography } from "@/constants/typography";
import POPULAR_ITEMS, {
  Foods,
  RESTAURANTS_AND_MEALS,
  RestaurantAndMeal,
} from "@/data/food";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search(): React.JSX.Element {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">(
    "dishes",
  );
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantAndMeal | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Filter using the debounced value
  const filteredFoods = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return POPULAR_ITEMS; // show all when empty
    return POPULAR_ITEMS.filter((food) => food.name.toLowerCase().includes(q));
  }, [debouncedQuery]);

  const [selectedDish, setSelectedDish] = useState<Foods | null>(null);
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
            <TouchableOpacity onPress={() => router.push("/(tabs)")}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {debouncedQuery.trim() === "" ? (
            <SearchEmptyState
              onTrendingPress={(text) => {
                setQuery(text);
              }}
            />
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
              {filteredFoods.length === 0 && (
                <SearchNoResults query={debouncedQuery} />
              )}
              {activeTab === "dishes" && (
                <SearchFoodGrid
                  foods={filteredFoods}
                  onFoodPress={(food) => {
                    setSelectedDish(food);
                  }}
                />
              )}
              {activeTab === "restaurants" && (
                <SearchRestaurantList
                  restaurants={RESTAURANTS_AND_MEALS}
                  onRestaurantPress={(restaurant) => {
                    setSelectedRestaurant(restaurant);
                  }}
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Food Detail Modal */}
      <RestaurantDetailModal
        visible={!!selectedRestaurant}
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

      <DishDetailModal
        visible={!!selectedDish}
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />
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
});
