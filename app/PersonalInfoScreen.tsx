import GlassBackButton from "@/components/GlassBackButton";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Form = { firstName: string; lastName: string; phone: string };
type Errors = Partial<Record<keyof Form, string>>;

const notify = (title: string, message: string) =>
  Platform.OS === "web"
    ? window.alert(`${title}\n${message}`)
    : Alert.alert(title, message);

const cleanPhone = (p: string) => p.replace(/[\s-]/g, "");

const validate = (f: Form): Errors => {
  const errors: Errors = {};
  if (!f.firstName.trim()) errors.firstName = "First name is required";
  if (!f.lastName.trim()) errors.lastName = "Last name is required";
  const phone = cleanPhone(f.phone);
  if (!phone) errors.phone = "Phone number is required";
  else if (!/^\+?\d{10,15}$/.test(phone))
    errors.phone = "Enter a valid phone number";
  return errors;
};

function Field({
  label,
  value,
  onChangeText,
  error,
  editable = true,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText?: (t: string) => void;
  error?: string;
  editable?: boolean;
  keyboardType?: "default" | "phone-pad";
  autoCapitalize?: "none" | "words";
}) {
  const inputRef = useRef<TextInput>(null);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        disabled={!editable}
        onPress={() => inputRef.current?.focus()}
        style={[styles.inputCard, error ? styles.inputCardError : null]}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            ref={inputRef}
            style={[styles.input, !editable && { color: "#888" }]}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            maxLength={60}
            placeholderTextColor="#555"
          />
        </View>
        <Ionicons
          name={editable ? "pencil" : "lock-closed-outline"}
          size={20}
          color={editable ? "#4ADE80" : "#555"}
          style={styles.inputIcon}
        />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const PersonalInfoScreen = () => {
  const { user: userData } = useAuth();

  const [form, setForm] = useState<Form | null>(null);
  const [baseline, setBaseline] = useState<Form | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  // fill the form once the user has loaded
  useEffect(() => {
    if (!userData || form) return;
    const meta = userData.user_metadata ?? {};
    const initial: Form = {
      firstName: meta.first_name ?? "",
      lastName: meta.last_name ?? "",
      phone: meta.phone_number ?? "",
    };
    setForm(initial);
    setBaseline(initial);
  }, [userData, form]);

  if (!userData || !form || !baseline) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#4ADE80" />
      </SafeAreaView>
    );
  }

  const dirty =
    form.firstName !== baseline.firstName ||
    form.lastName !== baseline.lastName ||
    form.phone !== baseline.phone;

  const setField = (key: keyof Form) => (value: string) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const handleSave = async () => {
    if (saving || !dirty) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      setSaving(true);
      const clean = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone_number: cleanPhone(form.phone),
      };

      // only these three keys change; the rest of user_metadata is kept
      const { error } = await supabase.auth.updateUser({ data: clean });
      if (error) throw error;

      const next: Form = {
        firstName: clean.first_name,
        lastName: clean.last_name,
        phone: clean.phone_number,
      };
      setForm(next);
      setBaseline(next);
      notify("Saved", "Your details have been updated.");
    } catch (e) {
      console.error("SAVE PROFILE ERROR:", e);
      notify("Could not save", (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl: string | undefined = userData.user_metadata?.avatar_url;
  const displayName = `${baseline.firstName} ${baseline.lastName}`.trim();
  const letter = baseline.firstName.charAt(0).toUpperCase() || "?";
  const email = userData.email ?? userData.user_metadata?.email ?? "";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={handleSave} disabled={!dirty || saving}>
          <Text
            style={[
              styles.saveButtonText,
              (!dirty || saving) && styles.saveDisabled,
            ]}
          >
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{letter}</Text>
              )}
            </View>
            <Text style={styles.profileName}>{displayName || "Your name"}</Text>
            <View style={styles.badgeContainer}>
              <Ionicons name="star" size={12} color="#FACC15" />
              <Text style={styles.badgeText}>GOLD MEMBER</Text>
            </View>
          </View>

          {/* Section: Basic Info */}
          <Text style={styles.sectionLabel}>BASIC INFO</Text>

          <Field
            label="First name"
            value={form.firstName}
            onChangeText={setField("firstName")}
            error={errors.firstName}
            autoCapitalize="words"
          />
          <Field
            label="Last name"
            value={form.lastName}
            onChangeText={setField("lastName")}
            error={errors.lastName}
            autoCapitalize="words"
          />
          <Field
            label="Phone number"
            value={form.phone}
            onChangeText={setField("phone")}
            error={errors.phone}
            keyboardType="phone-pad"
          />
          <Field label="Email address" value={email} editable={false} />

          {/* Section: Account */}
          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>ACCOUNT</Text>

          <TouchableOpacity
            style={styles.dangerCard}
            onPress={() =>
              notify("Not available yet", "Account deletion is coming soon.")
            }
          >
            <View style={styles.dangerIconContainer}>
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </View>
            <View style={styles.dangerTextContainer}>
              <Text style={styles.dangerTitle}>Delete my account</Text>
              <Text style={styles.dangerSubtitle}>
                Permanently remove your data from HeyBite
              </Text>
            </View>
          </TouchableOpacity>

          {/* Bottom Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!dirty || saving) && styles.saveDisabled,
            ]}
            onPress={handleSave}
            disabled={!dirty || saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#121212",
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#333",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PlusJakarta-SemiBold",
  },
  saveButtonText: {
    color: "#4ADE80",
    fontSize: 16,
    fontFamily: "PlusJakarta-SemiBold",
    borderWidth: 1,
    borderColor: "#4ADE80",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#22C55E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden", // add this
  },
  avatarImage: { width: "100%", height: "100%" },
  inputCardError: { borderColor: "#EF4444" },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -6,
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: "PlusJakarta-Regular",
  },
  saveDisabled: { opacity: 0.4 },
  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontFamily: "PlusJakarta-Bold",
  },
  profileName: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "PlusJakarta-Bold",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "PlusJakarta-Bold",
    marginLeft: 4,
  },
  sectionLabel: {
    color: "#888",
    fontSize: 12,
    fontFamily: "PlusJakarta-SemiBold",
    letterSpacing: 1,
    marginBottom: 12,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    color: "#666",
    fontSize: 10,
    fontFamily: "PlusJakarta-SemiBold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  input: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Medium", // Mapped from '500'
    padding: 0,
  },
  inputIcon: {
    marginLeft: 10,
  },
  dangerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
    marginBottom: 24,
  },
  dangerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#2A1212",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dangerTextContainer: {
    flex: 1,
  },
  dangerTitle: {
    color: "#EF4444",
    fontSize: 16,
    fontFamily: "PlusJakarta-SemiBold",
    marginBottom: 2,
  },
  dangerSubtitle: {
    color: "#888",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
    lineHeight: 16,
  },
  primaryButton: {
    backgroundColor: "#22C55E",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
});

export default PersonalInfoScreen;
