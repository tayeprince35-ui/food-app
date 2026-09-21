import { categories, trendingItems, recentSearches } from "@/assets/data";
import CategoryCard from "@/components/BrowseCategories";
import RecentItem, { SectionTitle } from "@/components/RecentItem";
import TrendingChip from "@/components/TrendingSearches";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SearchEmptyState() {
  return (
    <>
      {/* Recent */}
      <SectionTitle icon="◷">
        RECENT
      </SectionTitle>

      <View style={styles.recentList}>
        {recentSearches.map((item) => (
          <RecentItem
            key={item.title}
            item={item}
          />
        ))}
      </View>

      {/* Trending */}
      <SectionTitle icon="↗">
        TRENDING NOW
      </SectionTitle>

      <View style={styles.trendingList}>
        {trendingItems.map(([emoji, title]) => (
          <TrendingChip
            key={title}
            emoji={emoji}
            title={title}
          />
        ))}
      </View>

      {/* Categories */}
      <SectionTitle icon="▦">
        BROWSE CATEGORIES
      </SectionTitle>

      <View style={styles.categoryGrid}>
        {categories.map((item) => (
          <CategoryCard
            key={item.title}
            item={item}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  recentList: {
    marginBottom: 30,
  },

  trendingList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 38,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
});