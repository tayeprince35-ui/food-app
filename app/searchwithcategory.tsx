import DishDetailModal from "@/components/DishDetailModal";
import RecentSearches from "@/components/RecentSearches";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";
import SearchEmptyState from "@/components/SearchEmptyState";
import { FoodGridItem } from "@/components/SearchFoodGrid";
import SearchNoResults from "@/components/SearchNoResults";
import { RestaurantListItem } from "@/components/SearchRestaurantList";
import SearchResultsHeader from "@/components/SearchResultsHeader";
import SearchSort, { SortOption } from "@/components/SearchSort";
import SearchTabs from "@/components/SearchTabs";
import { typography } from "@/constants/typography";
import POPULAR_ITEMS, {
  Foods,
  RESTAURANTS_AND_MEALS,
  RestaurantAndMeal,
} from "@/data/food";
import { useRecentSearchStore } from "@/store/recentSearchStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getMinutes = (time: string) => parseInt(time, 10);

const CATEGORY_MAP: Record<string, string[]> = {
  "Nigerian Food": ["Jollof", "Special", "Swallow", "Pepper Soup", "Rice"],
  Burgers: ["Burger"],
  Pizza: ["Pizza"],
  Snacks: ["Chicken", "Shawarma"],
};

type ResultItem =
  | ({ kind: "food" } & Foods)
  | ({ kind: "restaurant" } & RestaurantAndMeal);

export default function Search(): React.JSX.Element {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">("dishes");
  const addSearch = useRecentSearchStore((s) => s.addSearch);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantAndMeal | null>(null);
  const [selectedDish, setSelectedDish] = useState<Foods | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredFoods = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const result = POPULAR_ITEMS.filter(
      (food) =>
        (!activeCategory ||
          (CATEGORY_MAP[activeCategory] ?? []).includes(food.category)) &&
        (!q || food.name.toLowerCase().includes(q)),
    );
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "fastest")
      result.sort(
        (a, b) => getMinutes(a.deliveryTime) - getMinutes(b.deliveryTime),
      );
    if (sortBy === "price") result.sort((a, b) => a.price - b.price);
    if (sortBy === "az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") result.sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [debouncedQuery, activeCategory, sortBy]);

  const filteredRestaurants = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const result = RESTAURANTS_AND_MEALS.filter(
      (r) =>
        (!activeCategory || r.categories.includes(activeCategory)) &&
        (!q || r.restaurant.toLowerCase().includes(q)),
    );
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "fastest")
      result.sort(
        (a, b) => getMinutes(a.deliveryTime) - getMinutes(b.deliveryTime),
      );
    if (sortBy === "az")
      result.sort((a, b) => a.restaurant.localeCompare(b.restaurant));
    if (sortBy === "za")
      result.sort((a, b) => b.restaurant.localeCompare(a.restaurant));
    return result;
  }, [debouncedQuery, activeCategory, sortBy]);

  const showResults = debouncedQuery.trim() !== "" || activeCategory !== null;
  const isDishesTab = activeTab === "dishes";
  const resultCount = isDishesTab
    ? filteredFoods.length
    : filteredRestaurants.length;

  const handleFoodPress = useCallback(
    (food: Foods) => {
      setSelectedDish(food);
      addSearch(debouncedQuery);
    },
    [addSearch, debouncedQuery],
  );

  const handleRestaurantPress = useCallback(
    (restaurant: RestaurantAndMeal) => {
      setSelectedRestaurant(restaurant);
      addSearch(debouncedQuery);
    },
    [addSearch, debouncedQuery],
  );

  // Data source for the single FlatList
  const listData: ResultItem[] = !showResults
    ? []
    : isDishesTab
      ? filteredFoods.map((f) => ({ kind: "food", ...f }))
      : filteredRestaurants.map((r) => ({ kind: "restaurant", ...r }));

  const renderItem = useCallback(
    ({ item }: { item: ResultItem }) => {
      if (item.kind === "food") {
        return <FoodGridItem food={item} onFoodPress={handleFoodPress} />;
      }
      return (
        <RestaurantListItem
          restaurant={item}
          onRestaurantPress={handleRestaurantPress}
        />
      );
    },
    [handleFoodPress, handleRestaurantPress],
  );

  const keyExtractor = useCallback((item: ResultItem) => String(item.id), []);

  // The header is now a sibling of the list items rather than a parent ScrollView
  const ListHeader = (
    <View>
      <View style={styles.searchRow}>
        <View style={[styles.searchContainer, focused && styles.inputFocused]}>
          <Ionicons
            name="search"
            size={18}
            color="#f8f6f6"
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            returnKeyType="search"
            onSubmitEditing={() => addSearch(query)}
            onChangeText={setQuery}
            placeholder="Search Heybite..."
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
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {!showResults ? (
        <>
          <RecentSearches
            onSelect={(text) => {
              setQuery(text);
              setDebouncedQuery(text);
            }}
          />
          <SearchEmptyState
            onTrendingPress={(text) => setQuery(text)}
            onCategoryPress={(category) => setActiveCategory(category)}
          />
        </>
      ) : (
        <>
          {activeCategory && (
            <TouchableOpacity
              onPress={() => setActiveCategory(null)}
              style={styles.categoryChip}
            >
              <Text style={styles.categoryChipText}>{activeCategory} ✕</Text>
            </TouchableOpacity>
          )}

          <SearchResultsHeader resultCount={resultCount} />

          <SearchTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === "restaurants" && sortBy === "price")
                setSortBy("default");
            }}
          />

          <SearchSort
            sortBy={sortBy}
            onSortChange={setSortBy}
            showPrice={isDishesTab}
          />

          {resultCount === 0 && (
            <SearchNoResults query={debouncedQuery || activeCategory || ""} />
          )}
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <FlatList
          // Remount when column count switches so numColumns actually applies
          key={showResults && isDishesTab ? "dishes-2col" : "single-col"}
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={showResults && isDishesTab ? 2 : 1}
          columnWrapperStyle={
            showResults && isDishesTab ? styles.columnWrapper : undefined
          }
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
        />
      </View>

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
  safeArea: { flex: 1, backgroundColor: "#111111" },
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
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: "#00BC4F",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  categoryChipText: { color: "#fff", fontSize: 14 },
  content: { paddingHorizontal: 15, paddingTop: 12, paddingBottom: 100 },
  columnWrapper: { justifyContent: "space-between" },
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
    lineHeight: 30,
    transform: [{ rotate: "80deg" }],
    marginRight: 8,
    marginTop: -2,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    height: "100%",
    outlineStyle: "none" as any,
  },
  clearIcon: { color: "#888", fontSize: 18, marginLeft: 8 },
  cancelText: {
    color: "#00BC4F",
    fontSize: 16,
    marginLeft: 15,
    fontFamily: typography.medium.fontFamily,
  },
  inputFocused: { borderColor: "#00BC4F" },
});