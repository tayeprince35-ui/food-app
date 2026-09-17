import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { z } from "zod";

import loginSchema from "../../lib/schemas/loginSchema";
import { supabase } from "../../lib/supabase";

const Logo = require("../../assets/icons/logo.png");

type LoginFormData = z.infer<typeof loginSchema>;

const SCREEN_BG = "#151515";
const CARD_BG = "#151515";
const BORDER = "#383838";
const GREEN = "#238046";
const MUTED = "#969696";
const WHITE = "#F8F8F8";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formData: LoginFormData) => {
    if (loading) return;

    setLoading(true);

    try {
      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: error.message,
        });
        return;
      }

      if (!authData.user || !authData.session) {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: "No active session was created. Please try again.",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Welcome back!",
        text2: "Successfully logged in.",
      });

      router.replace("/(tabs)");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Please try again later.";

      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const showComingSoon = (provider: "Google" | "Apple") => {
    Toast.show({
      type: "info",
      text1: `${provider} sign in`,
      text2: "Social login will be available soon.",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={SCREEN_BG} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable
              hitSlop={12}
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="chevron-left" size={27} color="#FFFFFF" />
            </Pressable>

            <Pressable
              style={styles.guestButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.guestText}>Sign in as guest</Text>
            </Pressable>
          </View>

          <View style={styles.headingArea}>
            <Image
              source={Logo}
              style={styles.logo}
              contentFit="contain"
              transition={150}
            />

            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>
              Sign in to continue enjoying your{"\n"}favorite meals.
            </Text>
          </View>

          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email address</Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.inputShell,
                      errors.email && styles.inputShellError,
                    ]}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="godfreyajayi25@gmail.com"
                      placeholderTextColor="#777777"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                      style={styles.input}
                    />
                  </View>
                )}
              />

              {errors.email?.message ? (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              ) : null}
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Password</Text>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.inputShell,
                      errors.password && styles.inputShellError,
                    ]}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="••••••••••••••••"
                      placeholderTextColor="#777777"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                      style={styles.input}
                    />

                    <Pressable
                      hitSlop={12}
                      disabled={loading}
                      style={styles.inputIcon}
                      onPress={() => setShowPassword((current) => !current)}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={18}
                        color="#8B8B8B"
                      />
                    </Pressable>
                  </View>
                )}
              />

              {errors.password?.message ? (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              ) : null}
            </View>

            <Pressable
              disabled={loading}
              style={styles.forgotPasswordButton}
              onPress={() => router.push("/(auth)/ForgotPasswordScreen")}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              onPress={handleSubmit(handleLogin)}
              style={({ pressed }) => [
                styles.signInButton,
                loading && styles.signInButtonDisabled,
                pressed && !loading && styles.pressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.signInText}>Sign in</Text>
              )}
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or Sign in with</Text>
              <View style={styles.divider} />
            </View>

            <Pressable
              disabled={loading}
              style={styles.socialButton}
              onPress={() => showComingSoon("Google")}
            >
              <FontAwesome6 name="google" size={17} color="#4285F4" />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              style={styles.socialButton}
              onPress={() => showComingSoon("Apple")}
            >
              <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>

            <Pressable
              disabled={loading}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={styles.signUpText}>Sign up</Text>
            </Pressable>
          </View>

          <View style={styles.homeIndicator} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: CARD_BG,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },

  topBar: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  guestButton: {
    height: 32,
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#005F22",
    paddingHorizontal: 14,
  },

  guestText: {
    color: "#D3D3D3",
    fontSize: 11,       // was 9
    fontWeight: "500",
  },

  headingArea: {
    alignItems: "center",
    paddingTop: 55,
  },

  logo: {
    width: 34,          // was 30
    height: 34,
    marginBottom: 12,
  },

  title: {
    color: WHITE,
    fontSize: 23,       // was 20
    lineHeight: 29,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  subtitle: {
    marginTop: 5,
    color: MUTED,
    fontSize: 12,       // was 10
    lineHeight: 17,
    textAlign: "center",
  },

  form: {
    marginTop: 45,
  },

  fieldWrap: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    color: "#D1D1D1",
    fontSize: 12,       // was 10
    lineHeight: 16,
  },

  inputShell: {
    height: 46,         // was 42
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 23,
    backgroundColor: "#171717",
  },

  inputShellError: {
    borderColor: "#EF5350",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#EDEDED",
    fontSize: 13,       // was 10
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 0 : 1,
  },

  inputIcon: {
    width: 46,          // was 42
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    marginTop: 5,
    marginLeft: 12,
    color: "#EF5350",
    fontSize: 11,       // was 9
  },

  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 26,
  },

  forgotPasswordText: {
    color: "#2A9B53",
    fontSize: 12,       // was 10
    fontWeight: "500",
  },

  signInButton: {
    height: 46,         // was 42
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: GREEN,
  },

  signInButtonDisabled: {
    opacity: 0.6,
  },

  signInText: {
    color: "#F5F5F5",
    fontSize: 14,       // was 11
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.82,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 35,
    marginBottom: 28,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#3B3B3B",
  },

  orText: {
    color: "#C5C5C5",
    fontSize: 11,       // was 9
  },

  socialButton: {
    height: 46,         // was 42
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
    borderRadius: 23,
    backgroundColor: "#A7A7A9",
  },

  socialText: {
    color: "#FFFFFF",
    fontSize: 13,       // was 11
    fontWeight: "500",
  },

  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  noAccountText: {
    color: "#B8B8B8",
    fontSize: 12,       // was 10
  },

  signUpText: {
    color: "#2A9B53",
    fontSize: 12,       // was 10
    fontWeight: "600",
  },

  homeIndicator: {
    width: 112,
    height: 4,
    alignSelf: "center",
    marginTop: 36,
    marginBottom: 4,
    borderRadius: 3,
    backgroundColor: "#F5F5F5",
  },
});