import { typography } from "@/constants/typography";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type SortOption = "default" | "rating" | "fastest" | "price" | "az" | "za";

const OPTIONS: { key: SortOption; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "rating", label: "Top rated" },
  { key: "fastest", label: "Fastest" },
  { key: "price", label: "Price" },
  { key: "az", label: "A-Z" },
  { key: "za", label: "Z-A" },
];

type Props = {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  showPrice: boolean;
};

export default function SearchSort({ sortBy, onSortChange, showPrice }: Props) {
  const options = showPrice ? OPTIONS : OPTIONS.filter((o) => o.key !== "price");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {options.map((o) => {
        const active = sortBy === o.key;
        return (
          <TouchableOpacity
            key={o.key}
            onPress={() => onSortChange(o.key)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text
              style={[typography.regular, styles.pillText, active && styles.pillTextActive]}
            >
              {o.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginBottom: 12 },
  row: { gap: 8 },
  pill: {
    borderWidth: 1,
    borderColor: "#333333",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillActive: { backgroundColor: "#00BC4F", borderColor: "#00BC4F" },
  pillText: { color: "#aaa", fontSize: 13 },
  pillTextActive: { color: "#fff" },
});