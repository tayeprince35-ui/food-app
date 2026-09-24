import GlassBackButton from "@/components/GlassBackButton";
import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>G</Text>
          </View>
          <Text style={styles.profileName}>Godfrey Ajayi</Text>
          <View style={styles.badgeContainer}>
            <Ionicons name="star" size={12} color="#FACC15" />
            <Text style={styles.badgeText}>BTC MEMBER</Text>
          </View>
        </View>

        {/* Section: Basic Info */}
        <Text style={styles.sectionLabel}>BASIC INFO</Text>

        <View style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>ACCOUNT NAME</Text>
            <TextInput
              style={styles.input}
              value="Godfrey Ajayi"
              editable={false}
            />
          </View>
          <Ionicons
            name="pencil"
            size={20}
            color="#4ADE80"
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <TextInput
              style={styles.input}
              value="09025828588"
              editable={false}
            />
          </View>
          <Ionicons
            name="pencil"
            size={20}
            color="#4ADE80"
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.input}
              value="godfreyajayi25@gmail.com"
              editable={false}
            />
          </View>
          <Ionicons
            name="pencil"
            size={20}
            color="#4ADE80"
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
            <TextInput
              style={styles.input}
              value="20 May 1996"
              editable={false}
            />
          </View>
          <Ionicons
            name="calendar"
            size={20}
            color="#4ADE80"
            style={styles.inputIcon}
          />
        </View>

        {/* Section: Account */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>ACCOUNT</Text>

        <View style={styles.dangerCard}>
          <View style={styles.dangerIconContainer}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </View>
          <View style={styles.dangerTextContainer}>
            <Text style={styles.dangerTitle}>Delete my account</Text>
            <Text style={styles.dangerSubtitle}>
              Permanently remove your data from HeyBite
            </Text>
          </View>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
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
