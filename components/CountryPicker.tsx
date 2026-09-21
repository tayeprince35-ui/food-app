import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export type Country = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
};

const COUNTRIES: Country[] = [
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", flag: "🇪🇹" },
];

type CountryPickerProps = {
  value?: Country;
  onSelect: (country: Country) => void;
  placeholder?: string;
};

export default function CountryPicker({
  value = COUNTRIES[0],
  onSelect,
  placeholder = "Select country",
}: CountryPickerProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const filteredCountries = COUNTRIES.filter((country) => {
    const query = search.toLowerCase();

    return (
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  });

  const openPicker = () => {
    setVisible(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closePicker = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      setSearch("");
    });
  };

  const selectCountry = (country: Country) => {
    onSelect(country);
    closePicker();
  };

  useEffect(() => {
    if (!visible) {
      slideAnim.setValue(500);
      fadeAnim.setValue(0);
    }
  }, [visible, slideAnim, fadeAnim]);

  return (
    <>
      {/* Picker Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.pickerButton}
        onPress={openPicker}
      >
        <View style={styles.selectedLeft}>
          <Text style={styles.selectedFlag}>{value?.flag}</Text>

    
        </View>

        <Ionicons
          name="chevron-down"
          size={19}
          color="#777"
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closePicker}
      >
        <View style={styles.modalRoot}>
          {/* Dark background */}
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={closePicker}
            />
          </Animated.View>

          {/* Bottom sheet */}
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Handle */}
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Choose your country</Text>

                <Text style={styles.subtitle}>
                  Select your country code
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={closePicker}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color="#777"
                />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={19}
                color="#777"
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search country..."
                placeholderTextColor="#666"
                style={styles.searchInput}
                autoCorrect={false}
                autoCapitalize="none"
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                >
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color="#666"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* List */}
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => {
                const selected = item.code === value?.code;

                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.countryRow,
                      selected && styles.selectedRow,
                    ]}
                    onPress={() => selectCountry(item)}
                  >
                    <Text style={styles.flag}>{item.flag}</Text>

                    <View style={styles.countryInfo}>
                      <Text
                        style={[
                          styles.countryName,
                          selected && styles.selectedCountryName,
                        ]}
                      >
                        {item.name}
                      </Text>

                      <Text style={styles.countryCode}>
                        {item.code}
                      </Text>
                    </View>

                    <Text style={styles.dialCode}>
                      {item.dialCode}
                    </Text>

                    {selected && (
                      <View style={styles.check}>
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color="#FFF"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <View style={styles.emptyIcon}>
                    <Ionicons
                      name="search-outline"
                      size={25}
                      color="#666"
                    />
                  </View>

                  <Text style={styles.emptyTitle}>
                    No country found
                  </Text>

                  <Text style={styles.emptyText}>
                    Try searching with another name or code.
                  </Text>
                </View>
              }
            />
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    height: 50,
    borderRadius: 17,
    backgroundColor: "#181D19",
    borderWidth: 1,
    borderColor: "#292F2B",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  selectedFlag: {
    fontSize: 30,
  },

  selectedLabel: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },

  selectedCode: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },

  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  sheet: {
    height: "82%",
    backgroundColor: "#111312",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    overflow: "hidden",
  },

  handle: {
    width: 42,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#3A3F3B",
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginBottom: 18,
  },

  title: {
    color: "#FFF",
    fontSize: 19,
    fontFamily: "PlusJakarta-Bold",
  },

  subtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "PlusJakarta-Regular",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1B201D",
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    height: 52,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#181D19",
    borderWidth: 1,
    borderColor: "#292F2B",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 13,
    fontFamily: "PlusJakarta-Regular",
  },

  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },

  countryRow: {
    minHeight: 67,
    borderRadius: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  selectedRow: {
    backgroundColor: "rgba(0,188,79,0.10)",
  },

  flag: {
    fontSize: 29,
    width: 48,
  },

  countryInfo: {
    flex: 1,
  },

  countryName: {
    color: "#E7E7E7",
    fontSize: 14,
    fontFamily: "PlusJakarta-Medium",
  },

  selectedCountryName: {
    color: "#00BC4F",
    fontFamily: "PlusJakarta-SemiBold",
  },

  countryCode: {
    color: "#666",
    fontSize: 10,
    marginTop: 3,
    fontFamily: "PlusJakarta-Regular",
  },

  dialCode: {
    color: "#999",
    fontSize: 13,
    marginRight: 10,
    fontFamily: "PlusJakarta-Medium",
  },

  check: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: "#00BC4F",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#1B201D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "PlusJakarta-SemiBold",
  },

  emptyText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 5,
    fontFamily: "PlusJakarta-Regular",
  },
});