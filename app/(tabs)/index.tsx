import { typography } from "@/constants/typography";
import POPULAR_ITEMS from "@/data/food";
import { useAuth } from "@/lib/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Container = require("./../../assets/icons/bowl.png");

type Category = {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const CATEGORIES: Category[] = [
  { id: "all", name: "All", icon: "silverware-fork-knife" },
  { id: "Rice", name: "Rice", icon: "rice" },
  { id: "Chicken", name: "Chicken", icon: "food-drumstick" },
  { id: "Pizza", name: "Pizza", icon: "pizza" },
  { id: "Shawarma", name: "Shawarma", icon: "taco" },
  { id: "Grocery", name: "Grocery", icon: "cart-outline" },
];

const FLASH_DEALS = [
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
      "https://images.unsplash.com/photo-1529006557810-274f4191000b?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Home() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const randomizedFoods = useMemo(() => {
    return [...POPULAR_ITEMS].sort(() => Math.random() - 0.5);
  }, []);

  const filteredFoods = useMemo(() => {
    return randomizedFoods.filter((item) => {
      const matchCategory =
        activeCategory === "all" || activeCategory === item.category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(debounced.toLowerCase().trim());

      return matchCategory && matchSearch;
    });
  }, [randomizedFoods, activeCategory, debounced]);

  return (
    <View className="flex-1 bg-[#0F1115]">
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* Top Header */}
            <View className="px-5 pt-[60px] pb-2 flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full bg-[#34C759] items-center justify-center">
                  <Ionicons name="fast-food" size={16} color="#FFF" />
                </View>

                <Text
                  style={typography.bold}
                  className="text-lg text-white"
                >
                  HeyBite
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Pressable>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#FFF"
                  />
                </Pressable>

                <Text
                  style={typography.bold}
                  className="w-9 h-9 rounded-full bg-[#2C2C2E] text-base text-[#34C759] flex items-center justify-center"
                >
                  {user?.user_metadata?.firstName?.charAt(0).toUpperCase() ||
                    "?"}
                </Text>
              </View>
            </View>

            {/* Greeting */}
            <View className="px-5 mt-4">
              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-sm"
              >
                Good afternoon 👋
              </Text>

              <Text
                style={typography.bold}
                className="text-2xl text-white mt-1"
              >
                What are you{" "}
                <Text className="text-[#34C759]">craving</Text>
                {"\n"}today, {user?.user_metadata?.firstName || "there"}?
              </Text>
            </View>

            {/* Search */}
            <View className="px-5 mt-5 flex-row gap-3">
              <View className="h-[50px] flex-1 flex-row items-center gap-2 rounded-xl bg-[#1C1C1E] px-4">
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#777B84"
                />

                <TextInput
                  placeholder="Search restaurants, dishes..."
                  placeholderTextColor="#777B84"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={typography.regular}
                  className="flex-1 h-12 text-white text-sm"
                />
              </View>

              <Pressable className="h-[50px] w-[50px] bg-[#34C759] rounded-xl items-center justify-center">
                <Ionicons name="filter" size={20} color="#FFF" />
              </Pressable>
            </View>

            {/* Promo Banner */}
            <View className="mx-5 mt-5 bg-[#E54D2E] rounded-2xl p-5 overflow-hidden relative">
              <View
                className="absolute rounded-full bg-white/10"
                style={{
                  width: 140,
                  height: 140,
                  top: -40,
                  right: -30,
                }}
              />

              <View
                className="absolute rounded-full bg-white/10"
                style={{
                  width: 100,
                  height: 100,
                  bottom: -30,
                  right: 30,
                }}
              />

              <View className="z-10 w-2/3">
                <View className="bg-white/20 px-2 py-1 rounded-md self-start mb-2 flex-row items-center gap-1">
                  <Ionicons name="flame" size={12} color="#FFF" />

                  <Text
                    style={typography.bold}
                    className="text-white text-[10px]"
                  >
                    LIMITED TIME
                  </Text>
                </View>

                <Text
                  style={typography.bold}
                  className="text-xl text-white leading-tight"
                >
                  Free delivery{"\n"}on first order!
                </Text>

                <Text
                  style={typography.regular}
                  className="text-white/80 text-xs mt-1"
                >
                  Use code:{" "}
                  <Text style={typography.bold} className="text-white">
                    HEYBITE1
                  </Text>
                </Text>

                <Pressable
                  className="mt-3 bg-white py-2 px-4 rounded-lg self-start flex-row items-center gap-2"
                >
                  <Text
                    style={typography.bold}
                    className="text-[#E54D2E] text-xs"
                  >
                    Order now
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color="#E54D2E"
                  />
                </Pressable>
              </View>

              <View className="absolute right-10 bottom-4 opacity-90 z-20">
                <Image
                  source={Container}
                  style={{ width: 125, height: 125 }}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
              </View>
            </View>

            {/* Browse / Categories */}
            <View className="mt-8">
              <View className="px-5 flex-row justify-between items-end mb-4">
                <Text
                  style={typography.bold}
                  className="text-lg text-white"
                >
                  Browse
                </Text>

                <Pressable className="flex-row items-center gap-1">
                  <Text
                    style={typography.semiBold}
                    className="text-[#34C759] text-xs"
                  >
                    All categories
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={12}
                    color="#34C759"
                  />
                </Pressable>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  gap: 16,
                }}
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category.id;

                  return (
                    <Pressable
                      key={category.id}
                      onPress={() => setActiveCategory(category.id)}
                      className="items-center gap-2"
                    >
                      <View
                        className={`w-14 h-14 rounded-full items-center justify-center ${
                          isActive
                            ? "bg-[#34C759]"
                            : "bg-[#1C1C1E]"
                        }`}
                      >
                        <MaterialCommunityIcons
                          name={category.icon}
                          size={24}
                          color={isActive ? "#FFF" : "#777B84"}
                        />
                      </View>

                      <Text
                        style={typography.medium}
                        className={`text-xs ${
                          isActive
                            ? "text-[#34C759]"
                            : "text-[#777B84]"
                        }`}
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Flash Deals Header + Timer */}
            <View className="mt-8 px-5 flex-row justify-between items-center">
              <Text
                style={typography.bold}
                className="text-lg text-white"
              >
                Flash Deals
              </Text>

              <View className="flex-row items-center gap-1">
                <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
                  <Text
                    style={typography.bold}
                    className="text-white text-xs"
                  >
                    02
                  </Text>
                </View>

                <Text
                  style={typography.regular}
                  className="text-white text-xs"
                >
                  :
                </Text>

                <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
                  <Text
                    style={typography.bold}
                    className="text-white text-xs"
                  >
                    13
                  </Text>
                </View>

                <Text
                  style={typography.regular}
                  className="text-white text-xs"
                >
                  :
                </Text>

                <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
                  <Text
                    style={typography.bold}
                    className="text-white text-xs"
                  >
                    11
                  </Text>
                </View>
              </View>
            </View>

            {/* Flash Deals */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 12,
                gap: 12,
              }}
              className="mb-4"
            >
              {FLASH_DEALS.map((deal) => (
                <View key={deal.id} className="w-36">
                  <Image
                    source={{ uri: deal.image }}
                    style={{
                      width: 144,
                      height: 96,
                      borderRadius: 12,
                    }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    transition={200}
                  />

                  <Text
                    style={typography.semiBold}
                    className="text-white text-sm mt-2"
                    numberOfLines={1}
                  >
                    {deal.name}
                  </Text>

                  <Text
                    style={typography.bold}
                    className="text-[#34C759] text-xs mt-1"
                  >
                    ₦{deal.price.toLocaleString()}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <View className="px-5 mt-4">
            <Pressable
              className="bg-[#121418] rounded-3xl border border-white/5 overflow-hidden"
              onPress={() =>
                router.push({
                  pathname: "/food/[id]",
                  params: {
                    id: item.id.toString(),
                  },
                })
              }
            >
              {/* Image Container */}
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  height: 176,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={200}
                />

                {/* Distance */}
                <View className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded-full flex-row items-center gap-1">
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color="#FFF"
                  />

                  <Text
                    style={typography.medium}
                    className="text-white text-[10px]"
                  >
                    0.8 km away
                  </Text>
                </View>

                {/* Heart */}
                <View className="absolute top-3 right-3 bg-black/40 p-1.5 rounded-full">
                  <Ionicons
                    name="heart"
                    size={18}
                    color="#FFF"
                  />
                </View>

                {/* Free Delivery */}
                <View className="absolute bottom-3 left-3 bg-[#FF4D4D] px-2 py-1 rounded-md">
                  <Text
                    style={typography.bold}
                    className="text-white text-[10px]"
                  >
                    FREE DELIVERY
                  </Text>
                </View>
              </View>

              {/* Card Content */}
              <View className="p-4">
                {/* Name + Rating */}
                <View className="flex-row justify-between items-center mb-2">
                  <Text
                    style={typography.bold}
                    className="text-lg text-white flex-1 mr-2"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name="star"
                      size={14}
                      color="#F5A623"
                    />

                    <Text
                      style={typography.bold}
                      className="text-white text-sm"
                    >
                      {item.rating}
                    </Text>
                  </View>
                </View>

                {/* Meta Row */}
                <View className="flex-row items-center gap-3 mb-3">
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color="#777B84"
                    />

                    <Text
                      style={typography.regular}
                      className="text-[#777B84] text-xs"
                    >
                      {item.deliveryTime}
                    </Text>
                  </View>

                  <Text className="text-[#777B84] text-xs">
                    •
                  </Text>

                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name="bicycle-outline"
                      size={14}
                      color="#777B84"
                    />

                    <Text
                      style={typography.regular}
                      className="text-[#777B84] text-xs"
                    >
                      Free delivery
                    </Text>
                  </View>

                  <Text className="text-[#777B84] text-xs">
                    •
                  </Text>

                  <Text
                    style={typography.regular}
                    className="text-[#777B84] text-xs"
                  >
                    289 Orders
                  </Text>
                </View>

                {/* Tags */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                  <View className="bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-white/5">
                    <Text
                      style={typography.medium}
                      className="text-[#A0A0A0] text-[10px]"
                    >
                      {item.category}
                    </Text>
                  </View>

                  <View className="bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-white/5">
                    <Text
                      style={typography.medium}
                      className="text-[#A0A0A0] text-[10px]"
                    >
                      Fried Chicken
                    </Text>
                  </View>
                </View>

                {/* Price + Add */}
                <View className="flex-row justify-between items-center">
                  <Text
                    style={typography.bold}
                    className="text-xl text-[#34C759]"
                  >
                    ₦{item.price.toLocaleString()}
                  </Text>

                  <TouchableOpacity
                    className="h-10 w-10 rounded-xl bg-[#34C759] items-center justify-center"
                    onPress={() => {
                      addToCart({
                        ...item,
                        quantity: 1,
                      });

                      Toast.show({
                        type: "success",
                        text1: "Successfully added to cart.",
                        visibilityTime: 1000,
                      });
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="add"
                      size={20}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </View>
        )}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View className="items-center justify-center pt-[60px] px-5">
            <Ionicons
              name="search-outline"
              size={45}
              color="#777B84"
            />

            <Text
              style={typography.bold}
              className="text-white text-lg mt-3"
            >
              No food found
            </Text>

            <Text
              style={typography.regular}
              className="text-[#777B84] text-sm mt-1.5"
            >
              Try another search or category.
            </Text>
          </View>
        }
      />
    </View>
  );
}

