export const categories: Category[] = [
  {
    title: "Nigerian Food",
    subtitle: "42 restaurants",
    emoji: "🍛",
    color: "#ae3509",
  },
  {
    title: "Vegetable",
    subtitle: "18 restaurants",
    emoji: "🥗",
    color: "#286932",
  },
  {
    title: "Burgers",
    subtitle: "24 restaurants",
    emoji: "🍔",
    color: "#864a28",
  },
  {
    title: "Pizza",
    subtitle: "11 restaurants",
    emoji: "🍕",
    color: "#303691",
  },
  {
    title: "Desserts",
    subtitle: "15 restaurants",
    emoji: "🍰",
    color: "#5d159c",
  },
  {
    title: "Drinks & Wines",
    subtitle: "30 spots",
    emoji: "🥤",
    color: "#1b5fbb",
  },
  {
    title: "Groceries",
    subtitle: "8 stores",
    emoji: "🛒",
    color: "#ff3e2f",
  },
  {
    title: "Snacks",
    subtitle: "27 spots",
    emoji: "🍿",
    color: "#9124ad",
  },
];

interface Category {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

export const trendingItems: [string, string][] = [
  ["🍛", "Jollof rice"],
  ["🍢", "Suya"],
  ["🍲", "Pepper soup"],
  ["🍗", "Fried chicken"],
  ["🍕", "Pizza"],
  ["🍜", "Noodles"],
  ["🌯", "Shawarma"],
  ["🥤", "Smoothie"],
];
interface RecentSearch {
  emoji: string;
  title: string;
  subtitle: string;
}

export const recentSearches: RecentSearch[] = [
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