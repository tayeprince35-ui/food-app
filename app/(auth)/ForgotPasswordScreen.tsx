// app/(auth)/ForgotPasswordScreen.tsx
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
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

const ForgotImage = require("./../../assets/icons/forgot.png");

const SCREEN_BG = "#151515";
const CARD_BG = "#151515";
const BORDER = "#383838";
const MUTED = "#969696";
const WHITE = "#F8F8F8";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSendCode = async () => {
    if (loading) return;

    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Email required",
        text2: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: wire up to your reset password flow
      // const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
      // if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Code sent",
        text2: "Check your inbox for the confirmation code.",
        visibilityTime: 1000,
      });

      router.push("/(auth)/emailCode");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Please try again later.";

      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: message,
        visibilityTime: 1000,
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
          </View>

          {/* HEADING */}
          <View style={styles.headingArea}>
            <Image
              source={ForgotImage}
              style={styles.image}
              contentFit="contain"
              transition={100}
            />

            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.subtitle}>
              Enter your email and we'll send you a{"\n"}
              confirmation code to reset your password.
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email address</Text>

              <View style={[styles.inputShell, focused && styles.inputFocused]}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="godfreyajayi25@gmail.com"
                  placeholderTextColor="#777777"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  style={styles.input}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </View>
            </View>

            {/* SEND CODE BUTTON — same style as login */}
            <Pressable
              onPress={handleSendCode}
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
                  <Text style={styles.continueText}>Send Code</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.homeIndicator} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

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

  headingArea: {
    alignItems: "center",
    paddingTop: 30,
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  title: {
    color: WHITE,
    fontSize: 23,
    lineHeight: 29,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: -0.3,
  },

  subtitle: {
    marginTop: 8,
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    fontFamily: "PlusJakarta-Regular",
  },

  form: {
    marginTop: 45,
  },

  fieldWrap: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 6,
    color: "#D1D1D1",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "PlusJakarta-Regular",
  },

  inputShell: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 23,
    backgroundColor: "#171717",
  },

  inputFocused: {
    borderColor: "#00BC4F",
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

  /* -------------------- Send Code button (matches login) -------------------- */
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
  /* -------------------------------------------------------------------------- */

  homeIndicator: {
    width: 112,
    height: 4,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 4,
    borderRadius: 3,
    backgroundColor: "#F5F5F5",
  },
});