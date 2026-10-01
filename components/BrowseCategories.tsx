import { typography } from "@/constants/typography";
import { Pressable, StyleSheet, Text, View } from "react-native";
interface Category {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}
type Props = {
  item: Category;
  onPress: () => void; // new
};
export default function CategoryCard({ item, onPress }: Props) {
  return (
    <Pressable
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={onPress}
    >
      <View>
        <Text style={[typography.semiBold, styles.categoryTitle]}>
          {item.title}
        </Text>

        <Text style={[typography.regular, styles.categorySubtitle]}>
          {item.subtitle}
        </Text>
      </View>

      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  categoryEmoji: {
    fontSize: 34,
    marginRight: 1,
  },
  categoryCard: {
    width: "48.7%",
    height: 82,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  categoryTitle: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 7,
  },

  categorySubtitle: {
    color: "#eeeeee",
    fontSize: 11,
  },
});
