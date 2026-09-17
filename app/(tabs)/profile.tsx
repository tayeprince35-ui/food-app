import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type MenuItemProps = {
  icon: IconName;
  iconColor: string;
  title: string;
  subtitle: string;
  rightText?: string;
  rightBadge?: string;
};

type SwitchItemProps = {
  icon: IconName;
  iconColor: string;
  title: string;
  subtitle: string;
  value: boolean;
};

const ProfileScreen = () => {
  // Hardcoded values for UI only
  const user = {
    name: "Godfrey Ajayi",
    email: "godfreyajayi25@gmail.com",
    balance: "4,300.00",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>

            <Text style={styles.userEmail}>{user.email}</Text>

            <View style={styles.badgeRow}>
              <View style={[styles.badge, styles.badgeGold]}>
                <Ionicons name="star" size={12} color="#FFD700" />

                <Text style={styles.badgeTextGold}>
                  Gold Member
                </Text>
              </View>

              <View style={[styles.badge, styles.badgeGreen]}>
                <Text style={styles.badgeTextGreen}>
                  Ekpoma
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletIconContainer}>
              <MaterialCommunityIcons
                name="wallet"
                size={20}
                color="#1E4D2B"
              />
            </View>

            <Text style={styles.walletTitle}>
              HEYBITE WALLET
            </Text>
          </View>

          <Text style={styles.walletBalance}>
            ₦{user.balance}
          </Text>

          <Text style={styles.walletSubtext}>
            Available balance • Tap to manage
          </Text>

          <TouchableOpacity style={styles.addCashButton}>
            <Ionicons name="add" size={18} color="#FFF" />

            <Text style={styles.addCashText}>
              Add Cash
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionHeader}>ACCOUNT</Text>

        <View style={styles.sectionContainer}>
          <MenuItem
            icon="person"
            iconColor="#8A2BE2"
            title="Personal info"
            subtitle="Name, phone"
          />

          <View style={styles.divider} />

          <MenuItem
            icon="location"
            iconColor="#20B2AA"
            title="Saved address"
            subtitle="Home"
          />

          <View style={styles.divider} />

          <MenuItem
            icon="card"
            iconColor="#DAA520"
            title="Payment methods"
            subtitle="Cash on delivery, wallet, bank"
          />
        </View>

        {/* Preference Section */}
        <Text style={styles.sectionHeader}>
          PREFERENCE
        </Text>

        <View style={styles.sectionContainer}>
          <SwitchItem
            icon="notifications"
            iconColor="#FF4500"
            title="Push notification"
            subtitle="Order, updates, promos"
            value={true}
          />

          <View style={styles.divider} />

          <SwitchItem
            icon="moon"
            iconColor="#A9A9A9"
            title="Dark mode"
            subtitle="Always on for HeyBite"
            value={true}
          />

          <View style={styles.divider} />

          <SwitchItem
            icon="chatbox-ellipses"
            iconColor="#4169E1"
            title="SMS alerts"
            subtitle="Order & delivery text"
            value={false}
          />

          <View style={styles.divider} />

          <MenuItem
            icon="language"
            iconColor="#2E8B57"
            title="Language"
            subtitle="App display language"
            rightText="English"
          />
        </View>

        {/* Support Section */}
        <Text style={styles.sectionHeader}>SUPPORT</Text>

        <View style={styles.sectionContainer}>
          <MenuItem
            icon="help-circle"
            iconColor="#DC143C"
            title="Help & Support"
            subtitle="Chat, FAQs, Raise a complaint"
            rightBadge="New"
          />

          <View style={styles.divider} />

          <MenuItem
            icon="information-circle"
            iconColor="#1E90FF"
            title="About HeyBite"
            subtitle="Version, terms, privacy policy"
            rightText="v1.0.0"
          />
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#FF3B30"
          />

          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Menu Item Component
const MenuItem = ({
  icon,
  iconColor,
  title,
  subtitle,
  rightText,
  rightBadge,
}: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <View
      style={[
        styles.menuIconContainer,
        {
          backgroundColor: "rgba(255,255,255,0.05)",
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={iconColor}
      />
    </View>

    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>

      <Text style={styles.menuSubtitle}>
        {subtitle}
      </Text>
    </View>

    <View style={styles.menuRight}>
      {rightBadge && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>
            {rightBadge}
          </Text>
        </View>
      )}

      {rightText && (
        <Text style={styles.rightText}>
          {rightText}
        </Text>
      )}

      <Ionicons
        name="chevron-forward"
        size={16}
        color="#666"
      />
    </View>
  </TouchableOpacity>
);

// Reusable Switch Item Component
const SwitchItem = ({
  icon,
  iconColor,
  title,
  subtitle,
  value,
}: SwitchItemProps) => (
  <View style={styles.menuItem}>
    <View
      style={[
        styles.menuIconContainer,
        {
          backgroundColor: "rgba(255,255,255,0.05)",
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={iconColor}
      />
    </View>

    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>

      <Text style={styles.menuSubtitle}>
        {subtitle}
      </Text>
    </View>

    <Switch
      trackColor={{
        false: "#3E3E3E",
        true: "#34C759",
      }}
      thumbColor="#FFF"
      ios_backgroundColor="#3E3E3E"
      onValueChange={() => {}}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  backButton: {
    padding: 5,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#2E8B57",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  userDetails: {
    flex: 1,
  },

  userName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  userEmail: {
    color: "#A0A0A0",
    fontSize: 14,
    marginTop: 2,
  },

  badgeRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },

  badgeGold: {
    backgroundColor: "rgba(218, 165, 32, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(218, 165, 32, 0.5)",
  },

  badgeTextGold: {
    color: "#FFD700",
    fontSize: 10,
    fontWeight: "600",
  },

  badgeGreen: {
    backgroundColor: "rgba(46, 139, 87, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(46, 139, 87, 0.5)",
  },

  badgeTextGreen: {
    color: "#2E8B57",
    fontSize: 10,
    fontWeight: "600",
  },

  walletCard: {
    backgroundColor: "#1E4D2B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },

  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  walletIconContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 4,
    marginRight: 8,
  },

  walletTitle: {
    color: "#A0D8B0",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },

  walletBalance: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  walletSubtext: {
    color: "#A0D8B0",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 15,
  },

  addCashButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34C759",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },

  addCashText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },

  sectionHeader: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  sectionContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    marginBottom: 25,
    overflow: "hidden",
  },

  divider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginLeft: 60,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
  },

  menuSubtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },

  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rightText: {
    color: "#888",
    fontSize: 13,
  },

  newBadge: {
    backgroundColor: "rgba(220, 20, 60, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  newBadgeText: {
    color: "#FF3B30",
    fontSize: 10,
    fontWeight: "600",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1C1E",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    gap: 8,
  },

  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;