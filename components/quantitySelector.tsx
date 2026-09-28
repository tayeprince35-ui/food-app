import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.container}>
      {/* Minus Button (Separate Box) */}
      <TouchableOpacity style={styles.box} onPress={onDecrease} activeOpacity={0.7}>
        <Ionicons name="remove" size={20} color="#00A651" />
      </TouchableOpacity>

      {/* Quantity */}
      <View style={styles.quantityWrapper}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>

      {/* Plus Button (Separate Box) */}
      <TouchableOpacity style={styles.box} onPress={onIncrease} activeOpacity={0.7}>
        <Ionicons name="add" size={20} color="#00A651" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  box: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: "#1C1C1E", // Dark box
    borderWidth: 1,
    borderColor: "rgba(0, 166, 81, 0.4)", // Green border
    justifyContent: "center",
    alignItems: "center",
  },
  quantityWrapper: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(0, 166, 81, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
  },
});