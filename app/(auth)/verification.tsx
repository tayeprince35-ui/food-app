import { supabase } from "@/lib/supabase";
import { useSignupDraftStore } from "@/store/signupDraftStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

// DEMO ONLY: no SMS is sent and the code is fixed. This offers NO security.
// Before launch: set DEMO_MODE to false and replace the DEMO_CODE check in
// handleVerify with a real check from an SMS provider.
const DEMO_MODE = true;
const DEMO_CODE = "1234";

const emptyOtp = () => Array(OTP_LENGTH).fill("") as string[];

const VerifyNumberScreen: React.FC = () => {
  const draft = useSignupDraftStore((s) => s.draft);
  const clearDraft = useSignupDraftStore((s) => s.clearDraft);

  const [otp, setOtp] = useState<string[]>(emptyOtp());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const finished = useRef(false);

  // opened directly (or the page was refreshed): there is no signup data, so go back
  useEffect(() => {
    if (!draft && !finished.current) router.replace("/(auth)/signup");
  }, [draft]);

  // resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const handleChangeText = (text: string, index: number): void => {
    const digits = text.replace(/\D/g, "");
    if (text !== "" && digits === "") return; // ignore letters
    setError("");

    // a whole code was pasted or autofilled
    if (digits.length > 1) {
      const next = emptyOtp();
      digits
        .slice(0, OTP_LENGTH)
        .split("")
        .forEach((d, i) => (next[i] = d));
      setOtp(next);
      inputRefs.current[Math.min(digits.length, OTP_LENGTH) - 1]?.focus();
      return;
    }

    const next = [...otp];
    next[index] = digits;
    setOtp(next);
    if (digits && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ): void => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (loading || !draft) return;

    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code`);
      return;
    }
    if (code !== DEMO_CODE) {
      setError("Incorrect code. Please try again.");
      setOtp(emptyOtp());
      inputRefs.current[0]?.focus();
      return;
    }

    try {
      setLoading(true);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: draft.email,
        password: draft.password,
        options: {
          data: {
            first_name: draft.firstName,
            last_name: draft.lastName,
            country: draft.country,
            phone_number: draft.phoneNumber,
            referral_code: draft.referralCode,
          },
        },
      });

      if (signUpError) {
        console.error("SIGNUP ERROR:", signUpError);
        Toast.show({
          type: "error",
          text1: "Sign up failed",
          text2: signUpError.message,
        });
        router.back(); // the form still has what the user typed
        return;
      }

      finished.current = true;
      clearDraft();

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
    } catch (e: unknown) {
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: e instanceof Error ? e.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setOtp(emptyOtp());
    setError("");
    setSecondsLeft(RESEND_SECONDS);
    Toast.show({
      type: "info",
      text1: "Demo mode",
      text2: `No SMS is sent. Use code ${DEMO_CODE}.`,
    });
  };

  const complete = otp.every((d) => d !== "");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        {/* Header / Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Verify your number</Text>

          <Text style={styles.subtitle}>
            Enter the {OTP_LENGTH}-digit code for{" "}
            <Text style={styles.boldText}>{draft?.phoneNumber ?? ""}</Text> to
            verify your account
          </Text>

          {DEMO_MODE && (
            <View style={styles.demoBanner}>
              <Text style={styles.demoText}>
                Demo mode: no SMS is sent. Use code {DEMO_CODE}.
              </Text>
            </View>
          )}
          <Text style={styles.inputLabel}>Enter OTP</Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[styles.otpBox, error ? styles.otpBoxError : null]}
                maxLength={index === 0 ? OTP_LENGTH : 1}
                editable={!loading}
                autoFocus={index === 0}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                selectionColor="#2C8A56"
                placeholderTextColor="#888888"
              />
            ))}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {/* Resend OTP Button */}
          <TouchableOpacity
            style={[
              styles.resendButton,
              secondsLeft > 0 && styles.resendDisabled,
            ]}
            onPress={handleResend}
            disabled={secondsLeft > 0 || loading}
          >
            <Text style={styles.resendText}>
              {secondsLeft > 0
                ? `Resend OTP in ${secondsLeft}s`
                : "Tap here to resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Verify Button */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!complete || loading) && styles.verifyDisabled,
          ]}
          onPress={handleVerify}
          disabled={!complete || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 60,
    justifyContent: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginLeft: -10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  subtitle: {
    color: "#888888",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  boldText: {
    color: "#26A65B",
    fontWeight: "600",
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 30,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  resendButton: {
    backgroundColor: "#143823",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2C8A56",
  },
  resendText: {
    color: "#2C8A56",
    fontSize: 13,
    fontWeight: "500",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 20 : 40,
  },
  verifyButton: {
    backgroundColor: "#238046",
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  demoBanner: {
    backgroundColor: "rgba(250,204,21,0.12)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.4)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  demoText: { color: "#FACC15", fontSize: 12, textAlign: "center" },
  otpBoxError: { borderColor: "#EF5350" },
  errorText: { color: "#EF5350", fontSize: 12, marginBottom: 16 },
  resendDisabled: { opacity: 0.5 },
  verifyDisabled: { opacity: 0.5 },
});

export default VerifyNumberScreen;
