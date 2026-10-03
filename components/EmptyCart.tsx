import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");

/**
 * EmptyCartComponent - A stylish dark-green empty cart screen/component for React Native.
 *
 * Dependencies:
 *   npm install react-native-svg
 */
export default function EmptyCart({ onPressShopNow }) {
  return (
    <View style={styles.container}>
      {/* Visual Illustration Header */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.glowBackground} />

        {/* Custom SVG Empty Cart Illustration */}
        <Svg width={180} height={180} viewBox="0 0 200 200" fill="none">
          {/* Subtle background circles */}
          <Circle cx="100" cy="100" r="75" fill="#143224" opacity="0.6" />
          <Circle cx="100" cy="100" r="55" fill="#1A4330" opacity="0.8" />

          {/* Decorative floating dots/sparks */}
          <Circle cx="45" cy="65" r="4" fill="#34D399" opacity="0.7" />
          <Circle cx="155" cy="55" r="3" fill="#A7F3D0" opacity="0.8" />
          <Circle cx="160" cy="130" r="5" fill="#059669" opacity="0.6" />
          <Circle cx="40" cy="125" r="2.5" fill="#34D399" opacity="0.5" />

          {/* Cart Icon Body */}
          <G transform="translate(40, 45)">
            {/* Cart Handle & Base Lines */}
            <Path
              d="M10 15H28L38 65H105L118 28H35"
              stroke="#A7F3D0"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front Support Line */}
            <Path
              d="M38 65L32 80H100"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Wheels */}
            <Circle cx="45" cy="92" r="8" fill="#10B981" />
            <Circle cx="45" cy="92" r="3" fill="#064E3B" />
            <Circle cx="90" cy="92" r="8" fill="#10B981" />
            <Circle cx="90" cy="92" r="3" fill="#064E3B" />

            {/* Empty Tag / Dotted Outline inside cart */}
            <Rect
              x="42"
              y="34"
              width="60"
              height="24"
              rx="6"
              stroke="#34D399"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.6"
            />
          </G>
        </Svg>
      </View>

      {/* Text Info */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Your Cart is Empty</Text>
        <Text style={styles.subtitle}>
          Looks like you haven't added anything to your cart yet. Explore our
          fresh collection and find what you love!
        </Text>
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
}const styles = StyleSheet.create({
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
  },
  glowBackground: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#10B981",
    opacity: 0.15,
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
    color: "#022C22",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 0.5,
  },
});