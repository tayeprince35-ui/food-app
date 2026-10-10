// components/SearchNoResults.tsx
import { typography } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
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
  const lottieRef = useRef<LottieView>(null);

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

    // replay lottie when the query changes
    lottieRef.current?.reset();
    lottieRef.current?.play();
  }, [query]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fade, transform: [{ translateY }] }]}
    >
      <View style={styles.lottieWrap}>
        <LottieView
          ref={lottieRef}
          source={require("@/assets/lottie/empty-search.json")}
          autoPlay
          loop
          style={styles.lottie}
          colorFilters={[
            {
              keypath: "**",
              color: "#00BC4F",
            },
          ]}
        />
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
  lottieWrap: {
    width: 160,
    height: 160,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
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
