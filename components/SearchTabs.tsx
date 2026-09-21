import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SearchTab = "restaurants" | "dishes";

interface SearchTabsProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
}

export default function SearchTabs({
  activeTab,
  onTabChange,
}: SearchTabsProps) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        onPress={() => onTabChange("restaurants")}
        style={styles.tabContainer}
      >
        <Text
          style={[
            styles.tab,
            activeTab === "restaurants" && styles.activeTab,
          ]}
        >
          Restaurants
        </Text>

        {activeTab === "restaurants" && (
          <View style={styles.activeTabIndicator} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabChange("dishes")}
        style={styles.tabContainer}
      >
        <Text
          style={[
            styles.tab,
            activeTab === "dishes" && styles.activeTab,
          ]}
        >
          Dishes
        </Text>

        {activeTab === "dishes" && (
          <View style={styles.activeTabIndicator} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tabContainer: {
    marginRight: 25,
    alignItems: "center",
  },

  tab: {
    color: "#888",
    fontSize: 16,
    marginBottom: 6,
  },

  activeTab: {
    color: "#00BC4F",
  },

  activeTabIndicator: {
    width: "100%",
    height: 2,
    backgroundColor: "#00BC4F",
    borderRadius: 1,
  },
});