import AddToCartButton from "@/components/AddToCartButton";
import { typography } from "@/constants/typography";
import { Foods } from "@/data/food";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FoodGridItemProps {
  food: Foods;
  onFoodPress: (food: Foods) => void;
}

export const FoodGridItem = React.memo(function FoodGridItem({
  food,
  onFoodPress,
}: FoodGridItemProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onFoodPress(food)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: food.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {food.name}
        </Text>

        <Text style={styles.cardSubtitle} numberOfLines={1}>
          Spot right Kitchen
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>₦{food.price || "2,200"}</Text>

          <View style={styles.addButton}>
            <AddToCartButton food={food} quantity={1} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#333",
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    color: "#fff",
    fontFamily: typography.semiBold.fontFamily,
    fontSize: 14,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    color: "#00BC4F",
    fontSize: 14,
    fontFamily: typography.bold.fontFamily,
  },
  addButton: {
    backgroundColor: "#00BC4F",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});