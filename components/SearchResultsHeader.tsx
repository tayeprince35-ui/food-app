import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SearchResultsHeaderProps {
  resultCount: number;
}

export default function SearchResultsHeader({
  resultCount,
}: SearchResultsHeaderProps) {
  return (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsText}>{resultCount} results found</Text>

      <TouchableOpacity style={styles.sortButton}>
        <Text style={styles.sortText}>⇅ Sort</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  resultsText: {
    color: "#888",
    fontSize: 14,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  sortText: {
    color: "#00BC4F",
    fontSize: 14,
  },
});