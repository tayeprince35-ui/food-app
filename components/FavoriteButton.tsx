import { useFavoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type FavoriteButtonProps = {
  id: string;
};

export default function FavoriteButton({
  id,
}: FavoriteButtonProps) {
  const isFavorite = useFavoriteStore((state) =>
    state.favorites.includes(id)
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  return (
    <Pressable
      style={styles.button}
      onPress={() => toggleFavorite(id)}
    >
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#181D19",
    alignItems: "center",
    justifyContent: "center",
  },
});