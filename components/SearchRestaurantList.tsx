import { typography } from "@/constants/typography";
import { RestaurantAndMeal } from "@/data/food";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavoriteButton from "./FavoriteButton";

interface RestaurantListItemProps {
  restaurant: RestaurantAndMeal;
  onRestaurantPress: (restaurant: RestaurantAndMeal) => void;
}

export const RestaurantListItem = React.memo(function RestaurantListItem({
  restaurant: item,
  onRestaurantPress,
}: RestaurantListItemProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onRestaurantPress(item)}
      activeOpacity={0.7}
    >
      {/* Left: Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Middle: Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.restaurant}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>★ {item.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.reviewText}>{item.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.timeText}>{item.deliveryTime}</Text>
        </View>

        <View style={styles.tagsRow}>
          {item.categories.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Right: Favorite */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.heartIcon}>
          <FavoriteButton id={item.id.toString()} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#333",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
    paddingTop: 4,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontFamily: typography.medium.fontFamily,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "600",
  },
  dot: {
    color: "#666",
    fontSize: 12,
    marginHorizontal: 4,
  },
  reviewText: {
    color: "#888",
    fontSize: 12,
  },
  timeText: {
    color: "#888",
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    color: "#ccc",
    fontSize: 10,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 90,
    paddingVertical: 4,
  },
  heartIcon: {
    padding: 4,
  },
});