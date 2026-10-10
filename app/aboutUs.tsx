import GlassBackButton from "@/components/GlassBackButton";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Color Palette Definition: Deep Emerald Dark Theme
const COLORS = {
  bgDark: "#030E0A",
  cardBg: "rgba(9, 29, 22, 0.6)",
  borderEmerald: "rgba(46, 204, 113, 0.25)",
  emeraldPrimary: "#2ECC71",
  emeraldBright: "#00FF87",
  goldAccent: "#F1C40F",
  textLight: "#F5F9F6",
  textMuted: "#8BA196",
};

export default function AboutUsScreen() {
  const [activeTab, setActiveTab] = useState("mission");

  const team = [
    {
      name: "Chef Maya Lin",
      role: "Culinary Innovations Director",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Tariq Al-Mansoor",
      role: "Head of Green Logistics",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Sophia Chen",
      role: "Sourcing & Quality Lead",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const coreValues = [
    {
      icon: "sprout-outline",
      title: "Farm-to-Fork Freshness",
      description:
        "Ingredients sourced directly from sustainable local farms within hours of harvest.",
    },
    {
      icon: "leaf-maple",
      title: "Zero-Carbon Fleet",
      description:
        "100% electric bikes and scooters power every HeyBite delivery, keeping urban air clean.",
    },
    {
      icon: "package-variant-closed",
      title: "Bio-Smart Packaging",
      description:
        "Plant-based, fully compostable containers designed to preserve natural flavors and heat.",
    },
  ];

  const TABS = [
    { key: "mission", label: "Our Mission" },
    { key: "sustainability", label: "Eco Commitment" },
    { key: "craft", label: "The Culinary Craft" },
  ] as const;

  const CONTENT: Record<string, string> = {
    mission:
      "At HeyBite, we believe eating well shouldn't mean compromising the planet. We connect local urban farms and premier culinary spaces to deliver wholesome, vibrant meals straight to your doorstep.",
    sustainability:
      "Every HeyBite delivery uses 100% electric transport and zero single-use plastics. Our custom eco-insulated thermal bags guarantee peak temperature without ecological impact.",
    craft:
      "Our chefs curate seasonal menus using organic harvests. Every recipe is meticulously prepared to give you a bite that feels as good as it tastes.",
  };

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
              uri: "https://i.pinimg.com/1200x/3f/86/1b/3f861bd529a0a88d61bc9b43af6ede0d.jpg",
            }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(3, 14, 10, 0.65)", COLORS.bgDark]}
            style={styles.heroGradient}
          />
          <View style={styles.backButton}>
            <GlassBackButton />
          </View>

          <View style={styles.heroTextContainer}>
            <View style={styles.badge}>
              <Ionicons name="leaf" size={14} color={COLORS.emeraldBright} />
              <Text style={styles.badgeText}>FRESH. FAST. SUSTAINABLE.</Text>
            </View>
            <Text style={styles.heroTitle}>Welcome to HeyBite</Text>
            <Text style={styles.heroSubtitle}>
              Revolutionizing food delivery with ultra-fresh ingredients,
              artisanal recipes, and a commitment to our planet.
            </Text>
          </View>
        </View>

        {/* PHILOSOPHY & STORY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>OUR ESSENCE</Text>
          <Text style={styles.sectionTitle}>Nourishing You & Nature</Text>

          {/* Tab Selector — light pill row with underline indicator */}
          <View style={styles.tabRow}>
            {TABS.map((t) => {
              const active = activeTab === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  activeOpacity={0.7}
                  style={styles.tabButton}
                  onPress={() => setActiveTab(t.key)}
                >
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                  >
                    {t.label}
                  </Text>
                  <View
                    style={[
                      styles.tabIndicator,
                      active && styles.tabIndicatorActive,
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Content card */}
          <View style={styles.glassCard}>
            <View style={styles.glassCardAccent} />
            <Text style={styles.cardParagraph}>{CONTENT[activeTab]}</Text>
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
                  <MaterialCommunityIcons
                    name={value.icon as any}
                    size={24}
                    color="#030E0A"
                  />
                </LinearGradient>
                <View style={styles.valueTextContainer}>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                  <Text style={styles.valueDescription}>
                    {value.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* TEAM CAROUSEL */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTag}>PEOPLE BEHIND HEYBITE</Text>
          <Text style={styles.sectionTitle}>Mastermind Curators</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.teamScrollView}
          >
            {team.map((member, index) => (
              <View key={index} style={styles.teamCard}>
                <Image
                  source={{ uri: member.image }}
                  style={styles.teamImage}
                />
                <LinearGradient
                  colors={["transparent", "rgba(3, 14, 10, 0.95)"]}
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
            colors={["#0B2B1E", "#04160E"]}
            style={styles.ctaGradient}
          >
            <FontAwesome5
              name="seedling"
              size={32}
              color={COLORS.emeraldBright}
              style={styles.ctaIcon}
            />
            <Text style={styles.ctaTitle}>Ready for your next fresh bite?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands enjoying wholesome, eco-conscious dining delivered
              in minutes.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.ctaButtonWrapper}
            >
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
          <Text style={styles.footerText}>
            © 2026 HeyBite Technologies. Fresh & Sustainable.
          </Text>
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
    width: "100%",
    position: "relative",
    justifyContent: "flex-end",
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
  },
  heroTextContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(46, 204, 113, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 135, 0.4)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    color: COLORS.emeraldBright,
    fontSize: 11,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: "PlusJakarta-Bold",
    color: COLORS.textLight,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    fontFamily: "PlusJakarta-Regular",
  },
  backButton: {
    position: "absolute",
    top: 35,
    left: 20,
    zIndex: 20,
  },

  /* SECTIONS GENERAL */
  sectionContainer: {
    marginTop: 48,
    paddingHorizontal: 24,
  },
  sectionTag: {
    color: COLORS.emeraldPrimary,
    fontSize: 12,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: "PlusJakarta-Bold",
    color: COLORS.textLight,
    marginBottom: 24,
  },

  /* ---- OUR ESSENCE: tabs + card (redesigned) ---- */
  tabRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  tabButton: {
    alignItems: "flex-start",
    paddingBottom: 10,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
    marginBottom: 8,
  },
  tabTextActive: {
    color: COLORS.textLight,
    fontFamily: "PlusJakarta-Bold",
  },
  tabIndicator: {
    height: 2,
    width: "100%",
    borderRadius: 2,
    backgroundColor: "transparent",
  },
  tabIndicatorActive: {
    backgroundColor: COLORS.emeraldBright,
    shadowColor: COLORS.emeraldBright,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  glassCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
    overflow: "hidden",
  },
  glassCardAccent: {
    position: "absolute",
    top: 0,
    left: 22,
    right: 22,
    height: 1,
    backgroundColor: "rgba(0, 255, 135, 0.35)",
  },
  cardParagraph: {
    color: "#C1D3C8",
    fontSize: 15,
    lineHeight: 26,
    fontFamily: "PlusJakarta-Regular",
    letterSpacing: 0.1,
  },
  /* ------------------------------------------------ */

  /* VALUES */
  valuesList: {
    gap: 16,
  },
  valueCard: {
    flexDirection: "row",
    backgroundColor: "rgba(9, 29, 22, 0.5)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  valueTextContainer: {
    flex: 1,
  },
  valueTitle: {
    color: COLORS.textLight,
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
    marginBottom: 4,
  },
  valueDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "PlusJakarta-Regular",
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
    overflow: "hidden",
    marginRight: 16,
    position: "relative",
    borderWidth: 1,
    borderColor: COLORS.borderEmerald,
  },
  teamImage: {
    width: "100%",
    height: "100%",
  },
  teamGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: "flex-end",
    padding: 16,
  },
  teamName: {
    color: COLORS.textLight,
    fontSize: 17,
    fontFamily: "PlusJakarta-Bold",
  },
  teamRole: {
    color: COLORS.emeraldBright,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-SemiBold",
  },

  /* CTA */
  ctaContainer: {
    marginTop: 56,
    paddingHorizontal: 24,
  },
  ctaGradient: {
    borderRadius: 26,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 135, 0.3)",
  },
  ctaIcon: {
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontFamily: "PlusJakarta-Bold",
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: "PlusJakarta-Regular",
  },
  ctaButtonWrapper: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  ctaButton: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  ctaButtonText: {
    color: "#030E0A",
    fontFamily: "PlusJakarta-Bold",
    fontSize: 15,
  },

  /* FOOTER */
  footer: {
    marginTop: 48,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    paddingTop: 24,
  },
  footerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  footerBrand: {
    color: COLORS.emeraldBright,
    fontSize: 16,
    fontFamily: "PlusJakarta-ExtraBold",
    letterSpacing: 3,
  },
  footerText: {
    color: "#4B6356",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
  },
});
