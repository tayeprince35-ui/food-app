import AddToCartButton from "@/components/AddToCartButton";
import { typography } from "@/constants/typography";
import { Foods } from "@/data/food";
import { useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchFoodGridProps {
  foods: Foods[];
  onFoodPress: (food: Foods) => void;
}

const NUM_COLUMNS = 2;

export default function SearchFoodGrid({
  foods,
  onFoodPress,
}: SearchFoodGridProps) {
  const renderItem = useCallback(
    ({ item: food }: { item: Foods }) => (
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
    ),
    [onFoodPress],
  );

  const keyExtractor = useCallback((item: Foods) => String(item.id), []);

  return (
    <FlatList
      data={foods}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={NUM_COLUMNS}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // Performance props
      initialNumToRender={6}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
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
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    marginTop: -2,
  },
});
