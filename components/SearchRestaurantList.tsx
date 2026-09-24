import { typography } from "@/constants/typography";
import { RestaurantAndMeal } from "@/data/food";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FavoriteButton from "./FavoriteButton";

// Mock data type based on your screenshot

interface SearchRestaurantListProps {
  restaurants: RestaurantAndMeal[];
  onRestaurantPress: (restaurant: RestaurantAndMeal) => void;
}

// Placeholder images to match the vibe of the screenshot

const SearchRestaurantList: React.FC<SearchRestaurantListProps> = ({
  restaurants,
  onRestaurantPress,
}) => {
  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id.toString()}
       contentContainerStyle={styles.listContent}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onRestaurantPress(item)}
          activeOpacity={0.7}
        >
          {/* Left: Image */}
          <Image
            source={{ uri: item.image }} // Fallback to mock images
            style={styles.image}
          />

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

          {/* Right: Price/Favorite */}
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.heartIcon}>
              <FavoriteButton id={item.id.toString()} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
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
    color: "#FFD700", // Gold color for star
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
    height: 90, // Match image height
    paddingVertical: 4,
  },
  heartIcon: {
    padding: 4,
  },
  heartText: {
    color: "#666",
    fontSize: 22,
  },
  heartActive: {
    color: "#FF3B30", // Red
  },
  priceText: {
    color: "#00BC4F", // Green
    fontSize: 12,
    fontWeight: "600",
  },
  priceFree: {
    color: "#00BC4F",
  },
});

export default SearchRestaurantList;
