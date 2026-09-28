// components/SearchNoResults.tsx
import { typography } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  query: string;
  suggestions?: string[];
  onSuggestionPress?: (term: string) => void;
};

export default function SearchNoResults({
  query,
  suggestions = [],
  onSuggestionPress,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    fade.setValue(0);
    translateY.setValue(12);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [query]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fade, transform: [{ translateY }] }]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="search-outline" size={28} color="#555" />
        <View style={styles.iconBadge}>
          <Ionicons name="close" size={12} color="#111" />
        </View>
      </View>

      <Text style={[typography.semiBold, styles.title]}>
        Nothing matches "{query}"
      </Text>
      <Text style={[typography.regular, styles.subtitle]}>
        Check the spelling, or try one of these instead
      </Text>

      {suggestions.length > 0 && (
        <View style={styles.chipRow}>
          {suggestions.map((term) => (
            <TouchableOpacity
              key={term}
              style={styles.chip}
              onPress={() => onSuggestionPress?.(term)}
            >
              <Text style={[typography.medium, styles.chipText]}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#00BC4F",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#111111",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  chipText: {
    color: "#00BC4F",
    fontSize: 13,
  },
});
