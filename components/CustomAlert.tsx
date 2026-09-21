import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AlertType = "success" | "error" | "warning" | "info";

type CustomAlertProps = {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
  onClose?: () => void;
};

// Premium Dark Emerald & Slate Theme
const THEME = {
  overlay: "rgba(3, 7, 5, 0.82)",
  cardBg: "#111813",          // Deep obsidian emerald
  border: "#1E2A22",          // Subtle glass edge
  textPrimary: "#F2F7F4",     // Crisp off-white
  textSecondary: "#8E9E95",   // Muted sage gray
  
  types: {
    success: { icon: "checkmark-circle", color: "#10B981", bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.25)" },
    error:   { icon: "alert-circle",    color: "#EF4444", bg: "rgba(239, 68, 68, 0.12)",  border: "rgba(239, 68, 68, 0.25)" },
    warning: { icon: "warning",         color: "#F59E0B", bg: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.25)" },
    info:    { icon: "information-circle", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.12)", border: "rgba(59, 130, 246, 0.25)" },
  },
};

export default function CustomAlert({
  visible,
  type = "success",
  title,
  message,
  buttonText = "Continue",
  onPress,
  onClose,
}: CustomAlertProps) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 9,
          tension: 90,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scale.setValue(0.9);
      opacity.setValue(0);
    }
  }, [visible, opacity, scale]);

  const activeTheme = THEME.types[type] || THEME.types.success;

  const handlePrimaryPress = () => {
    onPress?.();
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {/* TOP CLOSE ICON */}
          {onClose && (
            <Pressable
              hitSlop={12}
              style={({ pressed }) => [
                styles.dismissButton,
                pressed && { opacity: 0.5 },
              ]}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color={THEME.textSecondary} />
            </Pressable>
          )}

          {/* ICON BADGE */}
          <View
            style={[
              styles.iconWrapper,
              { borderColor: activeTheme.border },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: activeTheme.bg },
              ]}
            >
              <Ionicons
                name={activeTheme.icon as keyof typeof Ionicons.glyphMap}
                size={34}
                color={activeTheme.color}
              />
            </View>
          </View>

          {/* CONTENT */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* ACTIONS */}
          <View style={styles.actionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: activeTheme.color },
                pressed && styles.buttonPressed,
              ]}
              onPress={handlePrimaryPress}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>

            {onClose && (
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && { opacity: 0.6 },
                ]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: THEME.overlay,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  alertContainer: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: THEME.cardBg,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },

  dismissButton: {
    position: "absolute",
    top: 18,
    right: 18,
    padding: 4,
    borderRadius: 12,
  },

  iconWrapper: {
    padding: 6,
    borderRadius: 40,
    borderWidth: 1.5,
    marginBottom: 18,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "PlusJakarta-Bold",
    fontWeight: "700",
    fontSize: 19,
    color: THEME.textPrimary,
    textAlign: "center",
    letterSpacing: -0.3,
  },

  message: {
    fontFamily: "PlusJakarta-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    color: THEME.textSecondary,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },

  actionContainer: {
    width: "100%",
    marginTop: 24,
    gap: 10,
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.9,
  },

  buttonText: {
    fontFamily: "PlusJakarta-SemiBold",
    fontWeight: "600",
    fontSize: 15,
    color: "#050906",
  },

  cancelButton: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontFamily: "PlusJakarta-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: THEME.textSecondary,
  },
});