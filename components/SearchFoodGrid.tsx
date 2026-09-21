import { typography } from "@/constants/typography";
import { Foods } from "@/data/food";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400&auto=format&fit=crop",
];

interface SearchFoodGridProps {
  foods: Foods[];
  onFoodPress: (food: Foods) => void;
}

export default function SearchFoodGrid({
  foods,
  onFoodPress,
}: SearchFoodGridProps) {
  return (
    <View style={styles.grid}>
      {foods.map((food, index) => (
        <TouchableOpacity
          key={food.id}
          style={styles.card}
          onPress={() => onFoodPress(food)}
        >
          <Image
            source={{
              uri: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
            }}
            style={styles.cardImage}
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

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onFoodPress(food)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

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

  addButtonText: {
    color: "#111",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    marginTop: -2,
  },
});
