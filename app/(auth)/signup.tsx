import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
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

import signupSchema from "../../lib/schemas/signupSchema";
import { supabase } from "../../lib/supabase";

type SignupFormData = z.infer<typeof signupSchema>;

const SCREEN_BG = "#151515";
const CARD_BG = "#151515";
const BORDER = "#383838";
const MUTED = "#969696";
const WHITE = "#F8F8F8";

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
  style,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
}: {
  label?: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  style?: object;
  error?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
}) {
  return (
    <View style={[styles.fieldWrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputShell, error && styles.inputShellError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={styles.input}
        />

        {rightIcon ? (
          <Pressable
            onPress={onRightIconPress}
            hitSlop={12}
            style={styles.inputIcon}
          >
            {rightIcon}
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "Nigeria", // default so schema passes without a real picker
      phoneNumber: "",
      password: "",
      referralCode: "",
    },
  });

  const handleContinue = async (formData: SignupFormData) => {
    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            country: formData.country,
            phone_number: formData.phoneNumber.trim(),
            referral_code: formData.referralCode?.trim() || null,
          },
        },
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Sign up failed",
          text2: error.message,
        });
        return;
      }

      // If email confirmation is ON in Supabase, session will be null here
      if (!data.session) {
        Toast.show({
          type: "success",
          text1: "Check your inbox",
          text2: "We sent you a confirmation link to verify your email.",
        });
        router.replace("/(auth)/login");
        return;
      }

      Toast.show({
        type: "success",
        text1: "Welcome to HeyBite!",
        text2: "Your account has been created.",
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
            <View style={styles.logoMark}>
              <View style={styles.logoDotOne} />
              <View style={styles.logoDotTwo} />
              <View style={styles.logoDotThree} />
              <View style={styles.logoDotFour} />
              <View style={styles.logoDotFive} />
            </View>

            <Text style={styles.title}>Create an account</Text>

            <Text style={styles.subtitle}>
              Sign up in minutes. Enter your details below to{"\n"}
              get started.
            </Text>
          </View>

          <View style={styles.form}>
            {/* First / Last name */}
            <View style={styles.nameRow}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Field
                    label="First name"
                    placeholder="e.g Ajayi"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    error={errors.firstName?.message}
                    style={styles.halfField}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Field
                    label="Last name"
                    placeholder="e.g Ajayi"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    error={errors.lastName?.message}
                    style={styles.halfField}
                  />
                )}
              />
            </View>

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="Email address"
                  placeholder="godfreyajayi25@gmail.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  error={errors.email?.message}
                />
              )}
            />

            {/* Country + Phone */}
            <View style={styles.phoneLabels}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.label}>Phone number</Text>
            </View>

            <View style={styles.phoneRow}>
              <Controller
                control={control}
                name="country"
                render={({ field: { value } }) => (
                  <Pressable
                    style={[
                      styles.countryPicker,
                      errors.country && styles.inputShellError,
                    ]}
                    onPress={() =>
                      Toast.show({
                        type: "info",
                        text1: "Country picker",
                        text2: "A full picker will be added soon.",
                      })
                    }
                  >
                    <Text style={styles.flag}>
                      {value === "Nigeria" ? "🇳🇬" : "🌍"}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#8A8A8A" />
                  </Pressable>
                )}
              />

              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.phoneInputShell,
                      errors.phoneNumber && styles.inputShellError,
                    ]}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="+234 08000000000"
                      placeholderTextColor="#777777"
                      keyboardType="phone-pad"
                      style={styles.input}
                    />
                  </View>
                )}
              />
            </View>

            {errors.country?.message ? (
              <Text style={[styles.errorText, { marginTop: -6 }]}>
                {errors.country.message}
              </Text>
            ) : null}

            {errors.phoneNumber?.message ? (
              <Text style={[styles.errorText, { marginTop: -6 }]}>
                {errors.phoneNumber.message}
              </Text>
            ) : null}

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="Password"
                  placeholder="••••••••••••••••"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  error={errors.password?.message}
                  rightIcon={
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={18}
                      color="#8B8B8B"
                    />
                  }
                  onRightIconPress={() => setShowPassword((v) => !v)}
                />
              )}
            />

            {/* Referral code */}
            <Controller
              control={control}
              name="referralCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="Referral code (optional)"
                  placeholder="Enter a referral code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.referralCode?.message}
                />
              )}
            />

            <Pressable
              onPress={handleSubmit(handleContinue)}
              disabled={loading}
              style={styles.continueWrap}
            >
              <LinearGradient
                colors={["#2A9051", "#1C733C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.continueButton,
                  loading && styles.continueButtonDisabled,
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.continueText}>Continue</Text>
                )}
              </LinearGradient>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or Sign up with</Text>
              <View style={styles.divider} />
            </View>

            <Pressable
              disabled={loading}
              style={styles.socialButton}
              onPress={() =>
                Toast.show({
                  type: "info",
                  text1: "Google sign up",
                  text2: "Social login will be available soon.",
                })
              }
            >
              <FontAwesome6 name="google" size={17} color="#4285F4" />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              style={styles.socialButton}
              onPress={() =>
                Toast.show({
                  type: "info",
                  text1: "Apple sign up",
                  text2: "Social login will be available soon.",
                })
              }
            >
              <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>

          <Text style={styles.terms}>
            By signing up, You agree to HeyBite’s{" "}
            <Text style={styles.link}>Terms and Conditions</Text> including{" "}
            <Text style={styles.link}>Privacy policy</Text>
          </Text>

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
    paddingHorizontal: 14,
    borderRadius: 18,
    justifyContent: "center",
    backgroundColor: "#005F22",
  },

  guestText: {
    fontSize: 11,
    color: "#D3D3D3",
    fontWeight: "500",
  },

  headingArea: {
    alignItems: "center",
    paddingTop: 21,
  },

  logoMark: {
    width: 30,
    height: 29,
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    transform: [{ rotate: "-18deg" }],
    marginBottom: 10,
  },

  logoDotOne: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: CARD_BG,
    top: 5,
    left: 9,
  },

  logoDotTwo: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: CARD_BG,
    top: 12,
    right: 5,
  },

  logoDotThree: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: CARD_BG,
    bottom: 5,
    left: 12,
  },

  logoDotFour: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: CARD_BG,
    top: 4,
    right: 7,
  },

  logoDotFive: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: CARD_BG,
    bottom: 7,
    right: 6,
  },

  title: {
    color: WHITE,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  subtitle: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 5,
  },

  form: {
    marginTop: 26,
  },

  nameRow: {
    flexDirection: "row",
    gap: 8,
  },

  halfField: {
    flex: 1,
  },

  fieldWrap: {
    marginBottom: 12,
  },

  label: {
    color: "#D1D1D1",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    marginBottom: 6,
  },

  inputShell: {
    height: 44,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
  },

  inputShellError: {
    borderColor: "#EF5350",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#EDEDED",
    fontSize: 13,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 0 : 1,
  },

  inputIcon: {
    height: "100%",
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    marginTop: 5,
    marginLeft: 12,
    color: "#EF5350",
    fontSize: 11,
  },

  phoneLabels: {
    flexDirection: "row",
    gap: 26,
    marginBottom: 6,
  },

  phoneRow: {
    height: 44,
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  countryPicker: {
    width: 62,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#171717",
  },

  flag: {
    fontSize: 18,
  },

  phoneInputShell: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#171717",
  },

  continueWrap: {
    marginTop: 4,
  },

  continueButton: {
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  continueButtonDisabled: {
    opacity: 0.6,
  },

  continueText: {
    color: "#F5F5F5",
    fontSize: 14,
    fontWeight: "600",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 33,
    marginBottom: 28,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#3B3B3B",
  },

  orText: {
    color: "#C5C5C5",
    fontSize: 11,
  },

  socialButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: "#A7A7A9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },

  socialText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  terms: {
    color: "#E2E2E2",
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 26,
    paddingHorizontal: 22,
  },

  link: {
    color: "#27A456",
  },

  homeIndicator: {
    width: 112,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    marginTop: 22,
    marginBottom: 4,
  },
});