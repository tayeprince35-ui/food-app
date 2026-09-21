import { typography } from "@/constants/typography";
import { Pressable, StyleSheet, Text, View } from "react-native";
const recentSearches: RecentSearch[] = [
  {
    emoji: "🍛",
    title: "Jollof rice near me",
    subtitle: "Restaurant • 2 hours ago",
  },
  {
    emoji: "🌯",
    title: "Shawarma",
    subtitle: "Dish • Yesterday",
  },
  {
    emoji: "🍔",
    title: "Burger spot",
    subtitle: "Restaurant • 3 days ago",
  },
];
interface RecentSearch {
  emoji: string;
  title: string;
  subtitle: string;
}

export default function RecentItem({ item }: { item: RecentSearch }) {
  return (
    <Pressable style={styles.recentItem}>
      <View style={styles.recentEmojiBox}>
        <Text style={styles.recentEmoji}>{item.emoji}</Text>
      </View>

      <View style={styles.recentText}>
        <Text style={[typography.semiBold, styles.recentTitle]}>
          {item.title}
        </Text>

        <Text style={[typography.regular, styles.recentSubtitle]}>
          {item.subtitle}
        </Text>
      </View>

      <Text style={styles.closeIcon}>×</Text>
    </Pressable>
  );
}
export function SectionTitle({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionIcon}>{icon}</Text>

      <Text style={[typography.semiBold, styles.sectionTitleText]}>
        {children}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  recentList: {
    marginBottom: 30,
  },
  closeIcon: {
    color: "#cfcfcf",
    fontSize: 25,
    fontWeight: "300",
    paddingHorizontal: 5,
  },

  recentItem: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionIcon: {
    color: "#c8c8c8",
    fontSize: 18,
    marginRight: 6,
  },

  sectionTitleText: {
    color: "#bdbdbd",
    fontSize: 13,
    letterSpacing: 0.2,
  },

  recentEmojiBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  recentEmoji: {
    fontSize: 20,
  },

  recentText: {
    flex: 1,
  },

  recentTitle: {
    color: "#f5f5f5",
    fontSize: 15,
    marginBottom: 4,
  },

  recentSubtitle: {
    color: "#818181",
    fontSize: 11,
  },
});
