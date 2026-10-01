import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const foodIcons = [
  { icon: "hamburger", x: 0.72, y: 0.12, size: 52 },
  { icon: "fish", x: 0.84, y: 0.2, size: 42 },
  { icon: "silverware-fork-knife", x: 0.86, y: 0.39, size: 42 },
  { icon: "carrot", x: 0.75, y: 0.52, size: 42 },
  { icon: "pizza", x: 0.48, y: 0.61, size: 42 },
  { icon: "cart", x: 0.22, y: 0.72, size: 42 },
  { icon: "leaf", x: 0.73, y: 0.69, size: 38 },
  { icon: "cheese", x: 0.88, y: 0.77, size: 40 },
  { icon: "food-drumstick-outline", x: 0.12, y: 0.39, size: 38 },
  { icon: "noodles", x: 0.16, y: 0.53, size: 40 },
  { icon: "food", x: 0.16, y: 0.17, size: 35 },
  { icon: "cup", x: 0.39, y: 0.21, size: 42 },
  { icon: "bottle-soda-outline", x: 0.57, y: 0.3, size: 40 },
  { icon: "silverware", x: 0.42, y: 0.83, size: 42 },
  { icon: "cookie", x: 0.12, y: 0.88, size: 42 },
];

type FoodIcon = (typeof foodIcons)[number];

function FloatingIcon({ item, index }: { item: FoodIcon; index: number }) {
  const float = useRef(new Animated.Value(0)).current;
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade + scale in, staggered by index
    Animated.timing(appear, {
      toValue: 1,
      duration: 500,
      delay: index * 80,
      useNativeDriver: true,
    }).start();

    // Endless float loop, with a different speed per icon
    const duration = 2200 + (index % 5) * 400;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();

    return () => loop.stop();
  }, [appear, float, index]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, index % 2 === 0 ? -14 : 14],
  });
  const rotate = float.interpolate({
    inputRange: [0, 1],
    outputRange: ["-8deg", "8deg"],
  });
  const scale = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <Animated.View
      style={[
        styles.foodIcon,
        {
          left: width * item.x,
          top: height * item.y,
          opacity: appear,
          transform: [{ translateY }, { rotate }, { scale }],
        },
      ]}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={item.size}
        color="rgba(255,255,255,0.32)"
      />
    </Animated.View>
  );
}

export default function Index() {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const wiggle = useRef(new Animated.Value(0)).current;
  const bottomOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo spring-in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Cookie wiggle
    const wiggleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: -1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    wiggleLoop.start();

    // Bottom text fades in last
    Animated.timing(bottomOpacity, {
      toValue: 1,
      duration: 600,
      delay: 900,
      useNativeDriver: true,
    }).start();

    return () => wiggleLoop.stop();
  }, [logoScale, logoOpacity, wiggle, bottomOpacity]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cookieRotate = wiggle.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-15deg", "15deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#00C853", "#08752F"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating food icons */}
      {foodIcons.map((item, index) => (
        <FloatingIcon key={index} item={item} index={index} />
      ))}

      {/* Center logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Animated.View
          style={[styles.cookie, { transform: [{ rotate: cookieRotate }] }]}
        >
          <Image
            source={require("./../assets/icons/logo.png")}
            style={{
              width: 40,
              height: 40,
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={100}
          />
        </Animated.View>

        <Text style={styles.logoText}>HeyBite</Text>
      </Animated.View>

      {/* Bottom text */}
      <Animated.Text style={[styles.bottomText, { opacity: bottomOpacity }]}>
        Food & Grocery Delivery
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08752F",
  },
  foodIcon: {
    position: "absolute",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cookie: {
    marginRight: 3,
  },
  logoText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -1.5,
    fontFamily: "PlusJakarta-bold",
  },
  bottomText: {
    position: "absolute",
    bottom: 30,
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "PlusJakarta-Regular",
  },
});
