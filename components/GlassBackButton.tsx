import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function GlassBackButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
      activeOpacity={0.7}
    >
      <Ionicons
        name="arrow-back"
        size={22}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "rgba(255, 255, 255, 0.12)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 4,
  },
});