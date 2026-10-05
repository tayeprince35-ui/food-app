import GlassBackButton from "@/components/GlassBackButton";
import { useAuth } from "@/lib/AuthContext";
import { normalizePhone } from "@/lib/phone";
import { useAddressStore } from "@/store/addressStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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

const COLORS = {
  bg: "#0B0D0C",
  card: "#141715",
  cardBorder: "#232823",
  green: "#22C55E",
  greenDim: "rgba(34,197,94,0.12)",
  red: "#EF4444",
  text: "#FFFFFF",
  subtext: "#8E938F",
  chip: "#1B1F1C",
};

type Form = { label: string; address: string; landmark: string; phone: string };
type Errors = { address?: string; phone?: string };

const LABELS = ["Home", "Work", "Other"];
const LABEL_ICON: Record<string, string> = {
  Home: "home-outline",
  Work: "briefcase-outline",
  Other: "location-outline",
};

const notify = (title: string, message: string) =>
  Platform.OS === "web"
    ? window.alert(`${title}\n${message}`)
    : Alert.alert(title, message);

export default function SavedAddressesScreen() {
  const { user: userData, isGuest } = useAuth();

  // The single source of truth for whether we read from device or Supabase
  const isGuestMode = !userData || isGuest;

  const addresses = useAddressStore((s) => s.addresses);
  const loading = useAddressStore((s) => s.loading);
  const fetchAddresses = useAddressStore((s) => s.fetchAddresses);
  const addAddress = useAddressStore((s) => s.addAddress);
  const makeDefault = useAddressStore((s) => s.makeDefault);
  const removeAddress = useAddressStore((s) => s.removeAddress);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Form>({
    label: "Home",
    address: "",
    landmark: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  // Refetch whenever the screen is focused or identity changes
  useFocusEffect(
    useCallback(() => {
      fetchAddresses(isGuestMode);
    }, [fetchAddresses, isGuestMode]),
  );

  const openForm = () => {
    setForm({
      label: addresses.length === 0 ? "Home" : "Work",
      address: "",
      landmark: "",
      phone: userData?.user_metadata?.phone_number ?? "",
    });
    setErrors({});
    setShowForm(true);
  };

  const handleSave = async () => {
    if (saving) return;

    const found: Errors = {};
    const address = form.address.trim();

    if (address.length < 5) found.address = "Enter your full delivery address";

    let phone: string | null = null;
    if (form.phone.trim()) {
      phone = normalizePhone(form.phone, userData?.user_metadata?.country);
      if (!phone) found.phone = "Enter a valid phone number";
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      setSaving(true);

      const ok = await addAddress(
        {
          label: form.label,
          address,
          landmark: form.landmark.trim() || null,
          phone,
        },
        isGuestMode,
      );

      if (!ok) {
        notify("Could not save", "Please try again.");
        return;
      }

      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleMakeDefault = async (id: number) => {
    const ok = await makeDefault(id, isGuestMode);
    if (!ok) notify("Could not update", "Please try again.");
  };

  const handleRemove = async (id: number) => {
    const ok = await removeAddress(id, isGuestMode);
    if (!ok) notify("Could not delete", "Please try again.");
  };

  const confirmRemove = (a: (typeof addresses)[number]) => {
    if (Platform.OS === "web") {
      if (window.confirm(`Delete "${a.label}" address?`)) handleRemove(a.id);
      return;
    }
    Alert.alert("Delete address?", a.address, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleRemove(a.id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Saved addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.green}
              style={{ marginTop: 40 }}
            />
          ) : (
            <>
              {addresses.length === 0 && !showForm && (
                <View style={styles.empty}>
                  <Ionicons name="location-outline" size={48} color="#333740" />
                  <Text style={styles.emptyTitle}>No saved addresses</Text>
                  <Text style={styles.emptySub}>
                    Add one so checkout is quicker next time
                  </Text>
                </View>
              )}

              {addresses.map((a) => (
                <View
                  key={a.id}
                  style={[styles.card, a.is_default && styles.cardDefault]}
                >
                  <View style={styles.cardTop}>
                    <View style={styles.labelRow}>
                      <Ionicons
                        name={
                          (LABEL_ICON[a.label] ?? "location-outline") as any
                        }
                        size={16}
                        color={COLORS.green}
                      />
                      <Text style={styles.cardLabel}>{a.label}</Text>
                      {a.is_default && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => confirmRemove(a)}
                      hitSlop={10}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={COLORS.red}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardAddress}>{a.address}</Text>
                  {a.landmark ? (
                    <Text style={styles.cardMeta}>Landmark: {a.landmark}</Text>
                  ) : null}
                  {a.phone ? (
                    <Text style={styles.cardMeta}>Phone: {a.phone}</Text>
                  ) : null}
                  {!a.is_default && (
                    <TouchableOpacity
                      style={styles.defaultBtn}
                      onPress={() => handleMakeDefault(a.id)}
                    >
                      <Text style={styles.defaultBtnText}>Set as default</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {showForm ? (
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>New address</Text>
                  <View style={styles.chipRow}>
                    {LABELS.map((l) => {
                      const active = form.label === l;
                      return (
                        <TouchableOpacity
                          key={l}
                          style={[styles.chip, active && styles.chipActive]}
                          onPress={() => setForm({ ...form, label: l })}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              active && styles.chipTextActive,
                            ]}
                          >
                            {l}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={styles.inputLabel}>ADDRESS</Text>
                  <TextInput
                    style={[styles.input, errors.address && styles.inputError]}
                    value={form.address}
                    onChangeText={(t) => {
                      setForm({ ...form, address: t });
                      if (errors.address)
                        setErrors({ ...errors, address: undefined });
                    }}
                    placeholder="House number, street, area"
                    placeholderTextColor="#555"
                    multiline
                    maxLength={200}
                  />
                  {errors.address ? (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  ) : null}

                  <Text style={styles.inputLabel}>
                    NEARBY LANDMARK (OPTIONAL)
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={form.landmark}
                    onChangeText={(t) => setForm({ ...form, landmark: t })}
                    placeholder="e.g. Near AAU main gate"
                    placeholderTextColor="#555"
                    maxLength={100}
                  />

                  <Text style={styles.inputLabel}>
                    PHONE FOR THE RIDER (OPTIONAL)
                  </Text>
                  <TextInput
                    style={[styles.input, errors.phone && styles.inputError]}
                    value={form.phone}
                    onChangeText={(t) => {
                      setForm({ ...form, phone: t });
                      if (errors.phone)
                        setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="08012345678"
                    placeholderTextColor="#555"
                    keyboardType="phone-pad"
                  />
                  {errors.phone ? (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  ) : null}

                  <View style={styles.formButtons}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => setShowForm(false)}
                      disabled={saving}
                    >
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.saveBtn, saving && { opacity: 0.6 }]}
                      onPress={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <ActivityIndicator color={COLORS.text} />
                      ) : (
                        <Text style={styles.saveBtnText}>Save address</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={styles.addBtn} onPress={openForm}>
                  <Ionicons name="add" size={18} color={COLORS.text} />
                  <Text style={styles.addBtnText}>Add a new address</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: "PlusJakarta-SemiBold",
  },
  scroll: { padding: 16, paddingBottom: 40 },
  empty: { alignItems: "center", paddingVertical: 50 },
  emptyTitle: {
    color: "#62666F",
    fontSize: 16,
    marginTop: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  emptySub: {
    color: "#474B52",
    fontSize: 13,
    marginTop: 4,
    fontFamily: "PlusJakarta-Regular",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 14,
    marginBottom: 12,
  },
  cardDefault: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenDim,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  defaultBadge: {
    backgroundColor: "rgba(34,197,94,0.2)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  defaultBadgeText: {
    color: COLORS.green,
    fontSize: 9,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 0.5,
  },
  cardAddress: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "PlusJakarta-Regular",
  },
  cardMeta: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 4,
    fontFamily: "PlusJakarta-Regular",
  },
  defaultBtn: { alignSelf: "flex-start", marginTop: 10 },
  defaultBtnText: {
    color: COLORS.green,
    fontSize: 12,
    fontFamily: "PlusJakarta-SemiBold",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 4,
  },
  addBtnText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-Regular",
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
  },
  formTitle: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 12,
    fontFamily: "PlusJakarta-SemiBold",
  },
  chipRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  chip: {
    backgroundColor: COLORS.chip,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipActive: {
    backgroundColor: COLORS.greenDim,
    borderColor: COLORS.green,
  },
  chipText: {
    color: COLORS.subtext,
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
  },
  chipTextActive: {
    color: COLORS.green,
    fontFamily: "PlusJakarta-SemiBold",
  },
  inputLabel: {
    color: COLORS.subtext,
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 4,
    fontFamily: "PlusJakarta-SemiBold",
  },
  input: {
    backgroundColor: COLORS.chip,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    color: COLORS.text,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: "PlusJakarta-Regular",
  },
  inputError: { borderColor: COLORS.red },
  errorText: {
    color: COLORS.red,
    fontSize: 11,
    marginTop: -6,
    marginBottom: 10,
    marginLeft: 4,
    fontFamily: "PlusJakarta-Regular",
  },
  formButtons: { flexDirection: "row", gap: 10, marginTop: 6 },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: COLORS.subtext,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  saveBtn: {
    flex: 1.4,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-Bold",
  },
});
