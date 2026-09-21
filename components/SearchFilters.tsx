import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface SearchFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ["All", "Nearby", "Fast delivery", "Free delivery"];

export default function SearchFilters({
  activeFilter,
  onFilterChange,
}: SearchFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersScroll}
      contentContainerStyle={styles.filtersContent}
    >
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterPill,
            activeFilter === filter && styles.activeFilterPill,
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText,
            ]}
          >
            {index === 0
              ? "☰ "
              : index === 1
                ? "📍 "
                : index === 2
                  ? "🛵 "
                  : "🛍️ "}
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filtersScroll: {
    marginBottom: 20,
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },

  filtersContent: {
    gap: 10,
  },

  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333333",
    backgroundColor: "#1A1A1A",
  },

  activeFilterPill: {
    backgroundColor: "#00BC4F",
    borderColor: "#00BC4F",
  },

  filterText: {
    color: "#888",
    fontSize: 14,
  },

  activeFilterText: {
    color: "#111",
    fontWeight: "600",
  },
});