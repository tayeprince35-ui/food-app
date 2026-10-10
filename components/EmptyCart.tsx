// components/EmptyCart.tsx
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

/**
 * EmptyCart - A stylish dark-green empty cart screen/component for React Native.
 *
 * Dependencies:
 *   npx expo install lottie-react-native
 */

interface Props {
  onPressShopNow: () => void;
}

export default function EmptyCart({ onPressShopNow }: Props) {
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      {/* Visual Illustration Header */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.glowBackground} />

        {/* Lottie Animated Empty Cart */}
        <LottieView
          ref={lottieRef}
          source={require("@/assets/lottie/empty-cart.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      {/* Text Info */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Your Cart is Empty</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onPressShopNow}
      >
        <Text style={styles.buttonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  illustrationWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    position: "relative",
    width: 200,
    height: 200,
  },
  glowBackground: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#10B981",
    opacity: 0.15,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  textSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 24,
    fontFamily: "PlusJakarta-Bold",
    color: "#ECFDF5",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "PlusJakarta-Regular",
    color: "#A7F3D0",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
    opacity: 0.85,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: width * 0.75,
    maxWidth: 300,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#fbfcfc",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 0.5,
  },
});
