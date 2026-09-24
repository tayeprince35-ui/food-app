import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
interface AddToCartButtonProps {
  food: any; // Replace 'any' with your Food/Dish type if you have one exported
  quantity?: number;
  style?: any;
  label?: String;
}

export default function AddToCartButton({
  food,
  quantity = 1,
  style,
  label,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleAddToCart = () => {
    // 1. Add to Zustand Store
    addToCart({ ...food, quantity });

    // 2. Show Success Toast
    Toast.show({
      type: "success",
      text1: "Added to Cart 🛒",
      text2: `${quantity}x ${food.name} has been added.`,
      position: "top",
      visibilityTime: 2000,
    });
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleAddToCart}
      >
        <View style={styles.addButton}>
          <Text>{label}</Text>
          <Ionicons name="add" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 32,
    height: 32,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#34C759",
    justifyContent: "center",
    alignItems: "center",
  },
});
