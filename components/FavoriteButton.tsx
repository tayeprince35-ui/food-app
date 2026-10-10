import { FavoriteType, useFavoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type FavoriteButtonProps = {
  id: string;
  type: FavoriteType;
  size?: number;
};

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function FavoriteButton({
  id,
  type,
  size = 22,
}: FavoriteButtonProps) {
  const isFavorite = useFavoriteStore((state) =>
    state.favorites.some((f) => f.item_type === type && f.item_id === id),
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const popSound = useAudioPlayer(require("@/assets/sounds/favorite.mp3"));

  // Heart animation values
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // Ring burst
  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);

  // Floating hearts (up to 3 in flight at once)
  const [floaters, setFloaters] = useState<number[]>([]);
  const floaterIdRef = useRef(0);

  const spawnFloater = useCallback(() => {
    const fid = floaterIdRef.current++;
    setFloaters((prev) => [...prev, fid]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f !== fid));
    }, 900);
  }, []);

  const handlePress = useCallback(() => {
    popSound.seekTo(0);
    popSound.play();

    const wasFavorite = isFavorite;
    toggleFavorite(type, id);

    // Heart pop: squash → overshoot → settle
    scale.value = withSequence(
      withTiming(0.75, { duration: 90, easing: Easing.out(Easing.quad) }),
      withTiming(1.35, { duration: 140, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 180, easing: Easing.out(Easing.quad) }),
    );

    // Tilt wiggle
    rotate.value = withSequence(
      withTiming(-12, { duration: 90 }),
      withTiming(12, { duration: 120 }),
      withTiming(0, { duration: 140, easing: Easing.out(Easing.quad) }),
    );

    if (!wasFavorite) {
      // Ring burst only when liking
      ringScale.value = 0;
      ringOpacity.value = 1;
      ringScale.value = withTiming(1, {
        duration: 450,
        easing: Easing.out(Easing.cubic),
      });
      ringOpacity.value = withTiming(0, { duration: 450 });

      // Floating hearts
      runOnJS(spawnFloater)();
    }
  }, [isFavorite, popSound, ringOpacity, ringScale, rotate, scale, spawnFloater, toggleFavorite, type, id]);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ scale: ringScale.value }],
  }));

  return (
    <Pressable style={styles.button} onPress={handlePress} hitSlop={8}>
      {/* Ring burst */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          { width: size * 2, height: size * 2, borderRadius: size },
          ringStyle,
        ]}
      />

      {/* Floating hearts */}
      {floaters.map((fid) => (
        <Floater key={fid} size={size} />
      ))}

      {/* Heart */}
      <AnimatedIcon
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={isFavorite ? "#FF4D67" : "#FFFFFF"}
        style={heartStyle}
      />
    </Pressable>
  );
}

/* ---------------------------------------------------------------- */

function Floater({ size }: { size: number }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.6);

  // Kick off on mount
  const drift = (Math.random() - 0.5) * 30;
  translateY.value = withTiming(-40, { duration: 800, easing: Easing.out(Easing.quad) });
  translateX.value = withTiming(drift, { duration: 800, easing: Easing.out(Easing.quad) });
  opacity.value = withDelay(250, withTiming(0, { duration: 550 }));
  scale.value = withSequence(
    withTiming(1, { duration: 150, easing: Easing.out(Easing.back(2)) }),
    withTiming(0.9, { duration: 650 }),
  );

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.floater, style]}>
      <Ionicons name="heart" size={size * 0.6} color="#FF4D67" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#FF4D67",
  },
  floater: {
    position: "absolute",
  },
});