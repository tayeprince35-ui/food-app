import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

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
  { icon: "cup", x: 0.24, y: 0.12, size: 42 },
  { icon: "bottle-soda-outline", x: 0.57, y: 0.3, size: 40 },
  { icon: "silverware", x: 0.42, y: 0.83, size: 42 },
  { icon: "cookie", x: 0.12, y: 0.88, size: 42 },
];

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.replace("/(auth)/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        <MaterialCommunityIcons
          key={index}
          name={item.icon as any}
          size={item.size}
          color="rgba(255,255,255,0.32)"
          style={[
            styles.foodIcon,
            {
              left: width * item.x,
              top: height * item.y,
            },
          ]}
        />
      ))}

      {/* Center logo */}
      <View style={styles.logoContainer}>
        <View style={styles.cookie}>
          <MaterialCommunityIcons name="cookie" size={52} color="#fff" />
        </View>

        <Text style={styles.logoText}>HeyBite</Text>
      </View>

      {/* Bottom text */}
      <Text style={styles.bottomText}>Food & Grocery Delivery</Text>
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
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: -1.5,
  },

  bottomText: {
    position: "absolute",
    bottom: 30,
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
  },
});
