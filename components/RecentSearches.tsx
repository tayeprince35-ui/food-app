import { useRecentSearchStore } from "@/store/recentSearchStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SectionTitle } from "./SectionTitle";

export default function RecentSearches({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  const searches = useRecentSearchStore((s) => s.searches);
  const removeSearch = useRecentSearchStore((s) => s.removeSearch);
  const clearSearches = useRecentSearchStore((s) => s.clearSearches);

  if (searches.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <SectionTitle icon="◷">RECENT</SectionTitle>
        <TouchableOpacity onPress={clearSearches} hitSlop={10}>
          <Text style={styles.clear}>Clear all</Text>
        </TouchableOpacity>
      </View>

      {searches.map((s) => (
        <TouchableOpacity
          key={s}
          style={styles.row}
          onPress={() => onSelect(s)}
          activeOpacity={0.7}
        >
          <Ionicons name="time-outline" size={18} color="#777B84" />
          <Text style={styles.text} numberOfLines={1}>
            {s}
          </Text>
          <TouchableOpacity onPress={() => removeSearch(s)} hitSlop={10}>
            <Ionicons name="close" size={16} color="#777B84" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: { color: "#FFF", fontSize: 15, fontFamily: "PlusJakarta-SemiBold" },
  clear: { color: "#00BC4F", fontSize: 12, fontFamily: "PlusJakarta-Medium" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  text: {
    flex: 1,
    color: "#D1D1D1",
    fontSize: 14,
    fontFamily: "PlusJakarta-Regular",
  },
});
