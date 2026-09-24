import { typography } from "@/constants/typography";
import { Pressable, StyleSheet, Text } from "react-native";

export default function TrendingChip({
  emoji,
  title,
  onPress,
}: {
  emoji: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.trendingChip} onPress={onPress}>
      <Text style={styles.chipEmoji}>{emoji}</Text>

      <Text style={[typography.medium, styles.chipText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipEmoji: {
    fontSize: 17,
    marginRight: 6,
  },

  chipText: {
    color: "#eeeeee",
    fontSize: 13,
  },

  trendingChip: {
    height: 38,
    borderWidth: 1,
    borderColor: "#373c3d",
    borderRadius: 19,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
  },
});
