import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Fake data for now
const FAKE_USER = {
  name: 'Samuel Adeyemi',
  email: 'samuel@example.com',
  phone: '+234 801 234 5678',
  total_orders: 12,
  total_spent: 45600,
};

const MENU_ITEMS = [
  { icon: 'receipt-outline', label: 'My Orders', color: '#FF8A3D' },
  { icon: 'location-outline', label: 'Saved Addresses', color: '#32C48D' },
  { icon: 'card-outline', label: 'Payment Methods', color: '#F5A623' },
  { icon: 'settings-outline', label: 'Settings', color: '#A5A7AD' },
  { icon: 'help-circle-outline', label: 'Help & Support', color: '#5B9BD5' },
  { icon: 'log-out-outline', label: 'Logout', color: '#FF4D4F' },
];

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerSubtitle}>My account</Text>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
        </View>

        {/* User card */}
        <View style={styles.userCard}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{FAKE_USER.name.charAt(0)}</Text>
          </View>

          <Text style={styles.userName}>{FAKE_USER.name}</Text>

          <Text style={styles.userInfoText}>{FAKE_USER.email}</Text>

          <Text style={styles.userInfoText}>{FAKE_USER.phone}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, styles.statBoxLeft]}>
              <Text style={styles.statValue}>{FAKE_USER.total_orders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>

            <View style={[styles.statBox, styles.statBoxRight]}>
              <Text style={[styles.statValue, styles.statValueAccent]}>
                ₦{(FAKE_USER.total_spent / 1000).toFixed(1)}k
              </Text>
              <Text style={styles.statLabel}>Total spent</Text>
            </View>
          </View>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Account</Text>

          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={item.label}
                onPress={() => console.log('Tapped:', item.label)}
                style={({ pressed }) => [
                  styles.menuItem,
                  index !== MENU_ITEMS.length - 1 && styles.menuItemBorder,
                  pressed && styles.pressed,
                ]}>
                <View
                  style={[
                    styles.menuIconContainer,
                    { backgroundColor: item.color + '20' },
                  ]}>
                  <Ionicons
                    name={item.icon as any}
                    size={21}
                    color={item.color}
                  />
                </View>

                <Text style={styles.menuItemLabel}>{item.label}</Text>

                <Ionicons name="chevron-forward" size={20} color="#62666F" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>DineDash v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090B',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#15171B',
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#FF8A3D',
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userCard: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    backgroundColor: '#121418',
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: 'rgba(255, 122, 48, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 122, 48, 0.3)',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF8A3D',
  },
  userName: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfoText: {
    marginTop: 4,
    fontSize: 13,
    color: '#777B84',
  },
  statsContainer: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#1A1D22',
    paddingVertical: 16,
  },
  statBoxLeft: {
    marginRight: 8,
  },
  statBoxRight: {
    marginLeft: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statValueAccent: {
    color: '#FF8A3D',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#777B84',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  menuCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    backgroundColor: '#121418',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  menuIconContainer: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  menuItemLabel: {
    marginLeft: 16,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  versionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 11,
    color: '#474B52',
  },
  pressed: {
    opacity: 0.7,
  },
});
