import { FavoriteType, useFavoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type FavoriteButtonProps = {
  id: string;
  type: FavoriteType;
};

export default function FavoriteButton({ id, type }: FavoriteButtonProps) {
  const isFavorite = useFavoriteStore((state) =>
    state.favorites.some((f) => f.item_type === type && f.item_id === id),
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <Pressable style={styles.button} onPress={() => toggleFavorite(type, id)}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={22}
        color={isFavorite ? "#FF4D67" : "#FFFFFF"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
