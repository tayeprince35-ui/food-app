import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const Logo = require("./../../assets/icons/logo.png");
const BikeImage = require("./../../assets/icons/bike.png");

// ============================================================
// SMOKE SETTINGS
// ============================================================

const BIKE_W = 324;
const BIKE_H = 279;

// Exhaust location on the bike
const EXHAUST = {
  x: 0.01,
  y: 0.82,
};

// Smoke movement
const SMOKE_DIRECTION = -1;

// More puffs = more continuous smoke
const PUFF_COUNT = 10;

// How long each puff lives
const PUFF_DURATION = 2200;

// Base puff size
const PUFF_SIZE = 24;

// ============================================================
// CLOUD
// ============================================================

const SkyShape = () => (
  <Svg width="61" height="13" viewBox="0 0 61 13" fill="none">
    <Path
      d="M60.9683 11.6771C61.4349 8.96393 56.6542 6.73457 53.0667 6.50183C51.3533 6.39159 49.5711 6.59982 47.9495 6.1466C44.4385 5.16666 43.0311 1.52863 39.6042 0.371072C37.0418 -0.486376 34.0892 0.2792 31.6032 1.27752C29.1173 2.27583 26.6543 3.54363 23.8776 3.6845C21.4605 3.80699 18.8445 3.07203 16.7257 4.0336C15.15 4.73793 14.3238 6.1956 12.9011 7.04692C11.4784 7.89825 9.60433 8.08811 7.83737 8.14323C6.07042 8.19835 4.25758 8.2351 2.65126 8.82306C1.04494 9.41103 -0.278363 10.7707 0.0505499 12.1549L60.9683 11.6771Z"
      fill="#FFFFFF"
    />
  </Svg>
);

// ============================================================
// ONE SMOKE PUFF
// ============================================================

function SmokePuff({ index }: { index: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Each puff starts at a different point in the cycle.
    // This prevents all smoke particles from appearing/disappearing
    // at the same time.
    progress.setValue(index / PUFF_COUNT);

    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: PUFF_DURATION,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      {
        resetBeforeIteration: true,
      },
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [index, progress]);

  // Every puff has slightly different movement.
  const wobble = (index % 4) * 12;

  const translateX = progress.interpolate({
    inputRange: [0, 0.35, 0.7, 1],
    outputRange: [
      0,
      SMOKE_DIRECTION * (12 + wobble),
      SMOKE_DIRECTION * (30 + wobble),
      SMOKE_DIRECTION * (55 + wobble),
    ],
  });

  const translateY = progress.interpolate({
    inputRange: [0, 0.35, 0.7, 1],
    outputRange: [0, -18, -42, -70],
  });

  // Starts small, gets big as it rises.
  const scale = progress.interpolate({
    inputRange: [0, 0.2, 0.55, 1],
    outputRange: [0.45, 1, 1.7, 2.7],
  });

  // IMPORTANT:
  // The smoke NEVER reaches 0 opacity.
  // This keeps visible smoke constantly coming from the exhaust.
  const opacity = progress.interpolate({
    inputRange: [0, 0.12, 0.45, 0.75, 1],
    outputRange: [0.75, 0.9, 0.8, 0.55, 0.15],
  });

  return (
    <Animated.View
      style={[
        styles.puff,
        {
          left: BIKE_W * EXHAUST.x - PUFF_SIZE / 2,
          top: BIKE_H * EXHAUST.y - PUFF_SIZE / 2,

          opacity,

          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    />
  );
}

// ============================================================
// EXHAUST SMOKE
// ============================================================

function ExhaustSmoke() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: PUFF_COUNT }).map((_, index) => (
        <SmokePuff key={index} index={index} />
      ))}
    </View>
  );
}

// ============================================================
// SCREEN
// ============================================================

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#00A859", "#006644"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* TOP LOGO */}

      <View style={styles.topSection}>
        <View style={styles.logoRow}>
          <Image
            source={Logo}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />

          <Text style={styles.logoText}>HeyBite</Text>
        </View>

        <Text style={styles.tagline}>Crave it? Get it fast...</Text>
      </View>

      {/* BIKE */}

      <View style={styles.imageSection}>
        {/* Right Cloud */}
        <View style={styles.cloudRight}>
          <SkyShape />
        </View>

        {/* Left Cloud */}
        <View style={styles.cloudLeft}>
          <SkyShape />
        </View>

        <View style={styles.bikeWrapper}>
          {/* Smoke is behind the bike */}
          <ExhaustSmoke />

          <Image
            source={BikeImage}
            style={styles.bikeImage}
            contentFit="contain"
            cachePolicy="memory-disk"
                    />
        </View>
      </View>

      {/* BOTTOM CONTENT */}

      <View style={styles.bottomSection}>
        <Text style={styles.heading}>
          Get started Begin Your Journey with Ease!
        </Text>

        <Text style={styles.subtext}>
          Discover great food with just a few steps! Customize, explore, and
          enjoy your perfect meals
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signup")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },

  topSection: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 30,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
  },

  logoText: {
    fontSize: 20,
    fontFamily: "PlusJakarta-Bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  tagline: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.8,
    fontFamily: "PlusJakarta-Medium",
    marginTop: 2,
  },

  imageSection: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  cloudRight: {
    position: "absolute",
    top: -80,
    right: 20,
    zIndex: 2,
  },

  cloudLeft: {
    position: "absolute",
    top: -35,
    left: 130,
    zIndex: 2,
  },

  bikeWrapper: {
    width: BIKE_W,
    height: BIKE_H,
    position: "relative",
  },

  bikeImage: {
    width: BIKE_W,
    height: BIKE_H,
    zIndex: 2,
  },

  // ==========================================================
  // SMOKE
  // ==========================================================

  puff: {
    position: "absolute",

    width: PUFF_SIZE,
    height: PUFF_SIZE,

    borderRadius: PUFF_SIZE / 2,

    backgroundColor: "#F4F4F4",

    // Keep smoke above the bike wrapper background
    zIndex: 1,
  },

  bottomSection: {
    flex: 0.45,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },

  heading: {
    fontSize: 24,
    fontFamily: "PlusJakarta-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },

  subtext: {
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    color: "#FFFFFF",
    opacity: 0.85,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 5,
    letterSpacing: 0.5,
  },

  button: {
    backgroundColor: "#00A859",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PlusJakarta-Bold",
  },

  loginRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
    fontFamily: "PlusJakarta-Medium",
  },

  loginLink: {
    color: "#00A859",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "JakartaBold",
  },
});
