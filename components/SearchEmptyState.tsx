import { categories, trendingItems } from "@/assets/data";
import CategoryCard from "@/components/BrowseCategories";
import { SectionTitle } from "@/components/SectionTitle";
import TrendingChip from "@/components/TrendingSearches";
import { RESTAURANTS_AND_MEALS } from "@/data/food";
import { StyleSheet, View } from "react-native";
type SearchEmptyStateProps = {
  onTrendingPress: (text: string) => void;
  onCategoryPress: (category: string) => void;
};

export default function SearchEmptyState({
  onTrendingPress,
  onCategoryPress,
}: SearchEmptyStateProps) {
  return (
    <>
      {/* Trending */}
      <SectionTitle icon="↗">TRENDING NOW</SectionTitle>

      <View style={styles.trendingList}>
        {trendingItems.map(([emoji, title]) => (
          <TrendingChip
            key={title}
            emoji={emoji}
            title={title}
            onPress={() => onTrendingPress(title)}
          />
        ))}
      </View>

      {/* Categories */}
      <SectionTitle icon="▦">BROWSE CATEGORIES</SectionTitle>

      <View style={styles.categoryGrid}>
        {categories.map((item) => {
          const count = RESTAURANTS_AND_MEALS.filter((r) =>
            r.categories.includes(item.title),
          ).length;

          return (
            <CategoryCard
              key={item.title}
              item={{
                ...item,
                subtitle: `${count} ${count === 1 ? "restaurant" : "restaurants"}`,
              }}
              onPress={() => onCategoryPress(item.title)}
            />
          );
        })}
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
