import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Color Palette Definition: Deep Emerald Dark Theme
const COLORS = {
  bgDark: '#030E0A', // Ultra-dark rich emerald black
  cardBg: 'rgba(9, 29, 22, 0.6)',
  borderEmerald: 'rgba(46, 204, 113, 0.25)',
  emeraldPrimary: '#2ECC71',
  emeraldBright: '#00FF87',
  goldAccent: '#F1C40F',
  textLight: '#F5F9F6',
  textMuted: '#8BA196',
};

export default function AboutUsScreen() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { label: 'Farm Partners', value: '120+' },
    { label: 'Eco Deliveries', value: '500k+' },
    { label: 'Avg. Arrival', value: '18 min' },
    { label: 'Organic Rating', value: '99.8%' },
  ];

  const team = [
    {
      name: 'Chef Maya Lin',
      role: 'Culinary Innovations Director',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Head of Green Logistics',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Sophia Chen',
      role: 'Sourcing & Quality Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const coreValues = [
    {
      icon: 'sprout-outline',
      title: 'Farm-to-Fork Freshness',
      description: 'Ingredients sourced directly from sustainable local farms within hours of harvest.',
    },
    {
      icon: 'leaf-maple',
      title: 'Zero-Carbon Fleet',
      description: '100% electric bikes and scooters power every HeyBite delivery, keeping urban air clean.',
    },
    {
      icon: 'package-variant-closed',
      title: 'Bio-Smart Packaging',
      description: 'Plant-based, fully compostable containers designed to preserve natural flavors and heat.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop',
            }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(3, 14, 10, 0.65)', COLORS.bgDark]}
            style={styles.heroGradient}
          />

          <View style={styles.heroTextContainer}>
            <View style={styles.badge}>
              <Ionicons name="leaf" size={14} color={COLORS.emeraldBright} />
              <Text style={styles.badgeText}>FRESH. FAST. SUSTAINABLE.</Text>
            </View>
            <Text style={styles.heroTitle}>Welcome to HeyBite</Text>
            <Text style={styles.heroSubtitle}>
              Revolutionizing food delivery with ultra-fresh ingredients, artisanal recipes, and a commitment to our planet.
            </Text>
          </View>
        </View>

        {/* STATS OVERLAY SECTION */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <LinearGradient
              key={index}
              colors={['rgba(16, 44, 34, 0.8)', 'rgba(5, 20, 14, 0.6)']}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* PHILOSOPHY & STORY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>OUR ESSENCE</Text>
          <Text style={styles.sectionTitle}>Nourishing You & Nature</Text>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'mission' && styles.activeTabButton]}
              onPress={() => setActiveTab('mission')}
            >
              <Text style={[styles.tabText, activeTab === 'mission' && styles.activeTabText]}>
                Our Mission
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'sustainability' && styles.activeTabButton]}
              onPress={() => setActiveTab('sustainability')}
            >
              <Text style={[styles.tabText, activeTab === 'sustainability' && styles.activeTabText]}>
                Eco Commitment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'craft' && styles.activeTabButton]}
              onPress={() => setActiveTab('craft')}
            >
              <Text style={[styles.tabText, activeTab === 'craft' && styles.activeTabText]}>
                The Culinary Craft
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Tab Content Box */}
          <View style={styles.glassCard}>
            {activeTab === 'mission' && (
              <Text style={styles.cardParagraph}>
                At HeyBite, we believe eating well shouldn’t mean compromising the planet. We connect local urban farms and premier culinary spaces to deliver wholesome, vibrant meals straight to your doorstep.
              </Text>
            )}
            {activeTab === 'sustainability' && (
              <Text style={styles.cardParagraph}>
                Every HeyBite delivery uses 100% electric transport and zero single-use plastics. Our custom eco-insulated thermal bags guarantee peak temperature without ecological impact.
              </Text>
            )}
            {activeTab === 'craft' && (
              <Text style={styles.cardParagraph}>
                Our chefs curate seasonal menus using organic harvests. Every recipe is meticulously prepared to give you a bite that feels as good as it tastes.
              </Text>
            )}
          </View>
        </View>

        {/* CORE VALUES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>THE HEYBITE STANDARD</Text>
          <Text style={styles.sectionTitle}>Crafted With Intent</Text>

          <View style={styles.valuesList}>
            {coreValues.map((value, index) => (
              <View key={index} style={styles.valueCard}>
                <LinearGradient
                  colors={[COLORS.emeraldBright, COLORS.emeraldPrimary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconContainer}
                >
                  <MaterialCommunityIcons name={value.icon as any } size={24} color="#030E0A" />
                </LinearGradient>
                <View style={styles.valueTextContainer}>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                  <Text style={styles.valueDescription}>{value.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* TEAM CAROUSEL */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>PEOPLE BEHIND HEYBITE</Text>
          <Text style={styles.sectionTitle}>Mastermind Curators</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamScrollView}>
            {team.map((member, index) => (
              <View key={index} style={styles.teamCard}>
                <Image source={{ uri: member.image }} style={styles.teamImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(3, 14, 10, 0.95)']}
                  style={styles.teamGradient}
                >
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CALL TO ACTION */}
        <View style={styles.ctaContainer}>
          <LinearGradient
            colors={['#0B2B1E', '#04160E']}
            style={styles.ctaGradient}
          >
            <FontAwesome5 name="seedling" size={32} color={COLORS.emeraldBright} style={styles.ctaIcon} />
            <Text style={styles.ctaTitle}>Ready for your next fresh bite?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands enjoying wholesome, eco-conscious dining delivered in minutes.
            </Text>

            <TouchableOpacity activeOpacity={0.85} style={styles.ctaButtonWrapper}>
              <LinearGradient
                colors={[COLORS.emeraldBright, COLORS.emeraldPrimary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaButton} 
              >
                <Text style={styles.ctaButtonText}>Order Now on HeyBite</Text>
                <Ionicons name="arrow-forward" size={18} color="#030E0A" />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerBrandRow}>
            <Ionicons name="leaf" size={18} color={COLORS.emeraldBright} />
            <Text style={styles.footerBrand}>HEYBITE</Text>
          </View>
          <Text style={styles.footerText}>© 2026 HeyBite Technologies. Fresh & Sustainable.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* HERO */
  heroContainer: {
    height: 480,
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
  },
  heroTextContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 135, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    color: COLORS.emeraldBright,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.textLight,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    fontWeight: '400',
  },

  /* STATS */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: -20,
    zIndex: 10,
  },
  statCard: {
    width: (width - 44) / 2,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.emeraldBright,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },

  /* SECTIONS GENERAL */
  sectionContainer: {
    marginTop: 48,
    paddingHorizontal: 24,
  },
  sectionTag: {
    color: COLORS.emeraldPrimary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 20,
  },

  /* TABS & GLASS CARD */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(9, 35, 25, 0.6)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.15)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: 'rgba(0, 255, 135, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.emeraldBright,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.textLight,
    fontWeight: '700',
  },
  glassCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
  },
  cardParagraph: {
    color: '#B5C9BE',
    fontSize: 15,
    lineHeight: 24,
  },

  /* VALUES */
  valuesList: {
    gap: 16,
  },
  valueCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(9, 29, 22, 0.5)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  valueTextContainer: {
    flex: 1,
  },
  valueTitle: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  valueDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },

  /* TEAM CAROUSEL */
  teamScrollView: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  teamCard: {
    width: 220,
    height: 290,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
  },
  teamImage: {
    width: '100%',
    height: '100%',
  },
  teamGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    padding: 16,
  },
  teamName: {
    color: COLORS.textLight,
    fontSize: 17,
    fontWeight: '700',
  },
  teamRole: {
    color: COLORS.emeraldBright,
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },

  /* CTA */
  ctaContainer: {
    marginTop: 56,
    paddingHorizontal: 24,
  },
  ctaGradient: {
    borderRadius: 26,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 135, 0.3)',
  },
  ctaIcon: {
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  ctaButtonWrapper: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  ctaButton: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  ctaButtonText: {
    color: '#030E0A',
    fontWeight: '800',
    fontSize: 15,
  },

  /* FOOTER */
  footer: {
    marginTop: 48,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 24,
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  footerBrand: {
    color: COLORS.emeraldBright,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
  },
  footerText: {
    color: '#4B6356',
    fontSize: 12,
  },
});