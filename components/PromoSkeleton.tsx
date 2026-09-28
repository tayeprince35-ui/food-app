import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function PromoSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      {/* Text side */}
      <View style={styles.textContainer}>
        <View style={styles.badge} />
        <View style={styles.title} />
        <View style={styles.titleShort} />
        <View style={styles.code} />
        <View style={styles.button} />
      </View>

      {/* Image placeholder */}
      <View style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#131313",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  badge: {
    width: 105,
    height: 22,
    borderRadius: 20,
    backgroundColor: "#343934",
    marginBottom: 14,
  },

  title: {
    width: 150,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#343934",
    marginBottom: 8,
  },

  titleShort: {
    width: 110,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#343934",
    marginBottom: 12,
  },

  code: {
    width: 125,
    height: 13,
    borderRadius: 5,
    backgroundColor: "#343934",
    marginBottom: 16,
  },

  button: {
    width: 95,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#343934",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#343934",
    alignSelf: "center",
    marginRight: 5,
  },
});
