import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
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
  cancelText?: string;
  onPress?: () => void;
  onClose?: () => void;
};

const THEME = {
  overlay: "rgba(3, 7, 6, 0.82)",
  cardBg: "#0F1612",
  textPrimary: "#F5F8F6",
  textSecondary: "#8A9B92",
  
  types: {
    success: {
      icon: "checkmark",
      accent: "#10B981",
      glow: "rgba(16, 185, 129, 0.15)",
      border: "rgba(16, 185, 129, 0.3)",
      buttonText: "#03140C",
    },
    error: {
      icon: "close",
      accent: "#EF4444",
      glow: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.3)",
      buttonText: "#FFFFFF",
    },
    warning: {
      icon: "warning-outline",
      accent: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.15)",
      border: "rgba(245, 158, 11, 0.3)",
      buttonText: "#0F1612",
    },
    info: {
      icon: "information",
      accent: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.3)",
      buttonText: "#FFFFFF",
    },
  },
};

export default function CustomAlert({
  visible,
  type = "success",
  title,
  message,
  buttonText = "Continue",
  cancelText = "Cancel",
  onPress,
  onClose,
}: CustomAlertProps) {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scale.setValue(0.85);
      opacity.setValue(0);
      iconScale.setValue(0.5);
    }
  }, [visible, opacity, scale, iconScale]);

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
              borderColor: activeTheme.border,
            },
          ]}
        >
          {/* Subtle Ambient Glow Effect */}
          <View
            style={[
              styles.ambientGlow,
              { backgroundColor: activeTheme.glow },
            ]}
          />

          {/* Top Close Button */}
          {onClose && (
            <Pressable
              hitSlop={12}
              style={({ pressed }) => [
                styles.dismissButton,
                pressed && { opacity: 0.5 },
              ]}
              onPress={onClose}
            >
              <Ionicons name="close" size={18} color={THEME.textSecondary} />
            </Pressable>
          )}

          {/* Animated Icon Badge */}
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                borderColor: activeTheme.border,
                backgroundColor: activeTheme.glow,
                transform: [{ scale: iconScale }],
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: activeTheme.accent },
              ]}
            >
              <Ionicons
                name={activeTheme.icon as keyof typeof Ionicons.glyphMap}
                size={28}
                color={activeTheme.buttonText}
              />
            </View>
          </Animated.View>

          {/* Text Content */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: activeTheme.accent },
                pressed && styles.buttonPressed,
              ]}
              onPress={handlePrimaryPress}
            >
              <Text style={[styles.buttonText, { color: activeTheme.buttonText }]}>
                {buttonText}
              </Text>
            </Pressable>

            {onClose && (
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && { opacity: 0.6 },
                ]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
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
    maxWidth: 340,
    backgroundColor: THEME.cardBg,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 20,
    overflow: "hidden",
  },
  ambientGlow: {
    position: "absolute",
    top: -60,
    width: 200,
    height: 120,
    borderRadius: 100,
    opacity: 0.8,
  },
  dismissButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 16,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: THEME.textPrimary,
    textAlign: "center",
    letterSpacing: -0.4,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME.textSecondary,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  actionContainer: {
    width: "100%",
    marginTop: 24,
    gap: 8,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: -0.2,
  },
  cancelButton: {
    width: "100%",
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontWeight: "500",
    fontSize: 14,
    color: THEME.textSecondary,
  },
});