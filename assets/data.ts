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

export const FLASH_DEALS = [
  {
    id: "f1",
    name: "Jollof Rice",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f2",
    name: "Burger",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f3",
    name: "Shawarma",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f4",
    name: "Peppered Chicken",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f5",
    name: "Fried Rice",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f6",
    name: "Pepperoni Pizza",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f7",
    name: "Suya Platter",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f8",
    name: "Crispy Fries",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f9",
    name: "Asun (Spicy Goat Meat)",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f10",
    name: "Grilled Fish",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop",
  },
];

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
