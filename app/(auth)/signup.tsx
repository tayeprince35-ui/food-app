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

import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { z } from "zod";

import CountryPicker, {
  Country,
} from "@/components/CountryPicker";

import signupSchema from "../../lib/schemas/signupSchema";
import { supabase } from "../../lib/supabase";

const Logo = require("../../assets/icons/logo.png");

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
  focused,
  setFocus,
}: {
  label?: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  setFocus: (focused: boolean) => void;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  focused?: boolean;
  onRightIconPress?: () => void;
  style?: object;
  error?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
}) {
  return (
    <View style={[styles.fieldWrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputShell,
          error && styles.inputShellError,
          focused && styles.inputFocused,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={styles.input}
          onFocus={() => setFocus?.(true)}
          onBlur={() => {
            setFocus?.(false);
            onBlur?.();
          }}
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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "🇳🇬",
  });

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
      country: "Nigeria",
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
          {/* TOP BAR */}

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

          {/* HEADING */}

          <View style={styles.headingArea}>
            <Image
              source={Logo}
              style={styles.logo}
              contentFit="contain"
              transition={150}
            />

            <Text style={styles.title}>Create an account</Text>

            <Text style={styles.subtitle}>
              Sign up in minutes. Enter your details below to{"\n"}
              get started.
            </Text>
          </View>

          <View style={styles.form}>
            {/* FIRST / LAST NAME */}

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
                    focused={focusedInput === "firstName"}
                    setFocus={(focused) =>
                      setFocusedInput(focused ? "firstName" : null)
                    }
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
                    focused={focusedInput === "lastName"}
                    setFocus={(focused) =>
                      setFocusedInput(focused ? "lastName" : null)
                    }
                  />
                )}
              />
            </View>

            {/* EMAIL */}

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
                  focused={focusedInput === "email"}
                  setFocus={(focused) =>
                    setFocusedInput(focused ? "email" : null)
                  }
                />
              )}
            />

            {/* COUNTRY + PHONE */}

            <View style={styles.phoneLabels}>
              <Text style={styles.label}>Country</Text>

              <Text style={styles.label}>Phone number</Text>
            </View>

            <View style={styles.phoneRow}>
              {/* COUNTRY PICKER */}

              <View style={styles.countryPickerWrapper}>
                <CountryPicker
                  value={selectedCountry}
                  onSelect={(country) => {
                    setSelectedCountry(country);
                  }}
                />
              </View>

              {/* PHONE */}

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
                    <Text style={styles.dialCode}>
                      {selectedCountry.dialCode}
                    </Text>

                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="08000000000"
                      placeholderTextColor="#777777"
                      keyboardType="phone-pad"
                      style={styles.phoneInput}
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

            {/* PASSWORD */}

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
                  focused={focusedInput === "password"}
                  setFocus={(focused) =>
                    setFocusedInput(focused ? "password" : null)
                  }
                  rightIcon={
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={18}
                      color="#8B8B8B"
                    />
                  }
                  onRightIconPress={() => setShowPassword((value) => !value)}
                />
              )}
            />

            {/* REFERRAL CODE */}

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
                  focused={focusedInput === "referralCode"}
                  setFocus={(focused) =>
                    setFocusedInput(focused ? "referralCode" : null)
                  }
                />
              )}
            />

            {/* CONTINUE */}

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

            {/* DIVIDER */}

            <View style={styles.dividerRow}>
              <View style={styles.divider} />

              <Text style={styles.orText}>Or Sign up with</Text>

              <View style={styles.divider} />
            </View>

            {/* GOOGLE */}

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

            {/* APPLE */}

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

          {/* TERMS */}

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
  inputFocused: {
    borderColor: "#00BC4F",
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
    fontFamily: "PlusJakarta-Medium",
  },

  headingArea: {
    alignItems: "center",
    paddingTop: 21,
  },

  logo: {
    width: 34,
    height: 34,
    marginBottom: 12,
  },

  title: {
    color: WHITE,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: -0.3,
  },

  subtitle: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Regular",
    outlineStyle: "none" as any,
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
    fontFamily: "PlusJakarta-Regular",
  },

  phoneLabels: {
    flexDirection: "row",
    gap: 26,
    marginBottom: 6,
  },

  phoneRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    alignItems: "flex-start",
  },

  countryPickerWrapper: {
    width: 67,
    height: 50,
    overflow: "hidden",
    borderRadius: 17,
  },

  phoneInputShell: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 17,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  dialCode: {
    color: "#D9D9D9",
    fontSize: 13,
    paddingLeft: 14,
    fontFamily: "PlusJakarta-Medium",
  },

  phoneInput: {
    flex: 1,
    height: "100%",
    color: "#EDEDED",
    fontSize: 13,
    paddingHorizontal: 8,
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-SemiBold",
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
    fontFamily: "PlusJakarta-Regular",
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
    fontFamily: "PlusJakarta-Medium",
  },

  terms: {
    color: "#E2E2E2",
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 26,
    paddingHorizontal: 22,
    fontFamily: "PlusJakarta-Regular",
  },

  link: {
    color: "#27A456",
    fontFamily: "PlusJakarta-SemiBold",
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