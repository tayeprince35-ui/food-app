import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import PopularNearAAUCard from "@/components/NearYouCard";
import OrderAgainCard from "@/components/OrderAgain";
import PromoSliderr from "@/components/PromoSliderr";
import { typography } from "@/constants/typography";

import POPULAR_ITEMS, {
  Foods,
  RestaurantAndMeal,
  RESTAURANTS_AND_MEALS,
} from "@/data/food";
import { useAuth } from "@/lib/AuthContext";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import grocery from "../../assets/icons/basket.png";
import chicken from "../../assets/icons/chicken.png";
import pizza from "../../assets/icons/pizza.png";
import plate from "../../assets/icons/plate.png";
import rice from "../../assets/icons/rice.png";
import shawarma from "../../assets/icons/shawarma.png";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Category = {
  id: string;
  name: string;
  icon: any;
};

type ListMode = "restaurant" | "food";

/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                 */
/* -------------------------------------------------------------------------- */

const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "All",
    icon: plate,
  },
  {
    id: "Rice",
    name: "Rice",
    icon: rice,
  },
  {
    id: "Chicken",
    name: "Chicken",
    icon: chicken,
  },
  {
    id: "Pizza",
    name: "Pizza",
    icon: pizza,
  },
  {
    id: "Shawarma",
    name: "Shawarma",
    icon: shawarma,
  },
  {
    id: "Grocery",
    name: "Grocery",
    icon: grocery,
  },
];

const Logo = require("../../assets/icons/logo.png");

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */
const hour = new Date().getHours();
const greeting =
  hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
function TopHeader({ user }: { user: any }) {
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url;
  const initial =
    user?.user_metadata?.first_name?.charAt(0).toUpperCase() || "?";

  return (
    <View className="px-5 pt-14 pb-2 flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <View className="w-10 h-10 rounded-full bg-[#34C759] items-center justify-center">
          <Image
            source={Logo}
            style={{ width: 23, height: 23 }}
            contentFit="contain"
          />
        </View>

        <Text style={typography.bold} className="text-lg text-white">
          HeyBite
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Pressable>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </Pressable>

        <View className="w-9 h-9  rounded-full bg-[#2C2C2E] items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 36, height: 36 }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          ) : (
            <Text style={typography.bold} className="text-base text-[#34C759]">
              {initial}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
/* -------------------------------------------------------------------------- */
/* GREETING                                                                   */
/* -------------------------------------------------------------------------- */

function Greeting({ user }: { user: any }) {
  return (
    <View className="px-5 mt-4">
      <Text style={typography.regular} className="text-[#A0A0A0] text-sm">
        {greeting} 👋
      </Text>

      <Text style={typography.bold} className="text-2xl text-white mt-1">
        What are <Text className="text-[#34C759]">craving</Text>
        {"\n"}
        today, {user?.user_metadata?.first_name || "there"}?
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* SEARCH BAR                                                                 */
/* -------------------------------------------------------------------------- */

function SearchBar() {
  return (
    <View className="px-5 mt-5 flex-row gap-3">
      <Pressable
        onPress={() => router.push("/search")}
        className="h-[50px] flex-1 flex-row items-center gap-2 rounded-xl bg-[#1C1C1E] px-4"
      >
        <Ionicons name="search-outline" size={20} color="#777B84" />

        <Text style={typography.regular} className="text-[#777B84] text-sm">
          Search restaurants, dishes...
        </Text>
      </Pressable>

      <Pressable className="h-[50px] w-[50px] bg-[#34C759] rounded-xl items-center justify-center">
        <Ionicons name="filter" size={20} color="#FFF" />
      </Pressable>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                 */
/* -------------------------------------------------------------------------- */

function CategoryTabs({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}) {
  return (
    <View className="mt-8">
      <View className="px-5 flex-row justify-between items-end mb-4">
        <Text style={typography.bold} className="text-lg text-white">
          Browse
        </Text>

        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => router.push("/searchwithcategory")}
        >
          <Text style={typography.semiBold} className="text-[#34C759] text-xs">
            All categories
            <Ionicons name="arrow-forward-outline" />
          </Text>
        </TouchableOpacity>
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
                className={`w-20 h-20 rounded-full items-center justify-center ${
                  isActive ? "bg-[#34C759]" : "bg-[#1C1C1E]"
                }`}
              >
                <Image
                  source={category.icon}
                  style={{
                    width: 68,
                    height: 68,
                  }}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
              </View>

              <Text
                style={typography.medium}
                className={`text-xs ${
                  isActive ? "text-[#34C759]" : "text-[#777B84]"
                }`}
              >
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* FLASH DEALS                                                                */
/* -------------------------------------------------------------------------- */

function FlashDealsHeader() {
  return (
    <View className="mt-8 px-5 flex-row justify-between items-center">
      <Text style={typography.bold} className="text-lg text-white">
        Flash Deals
      </Text>
    </View>
  );
}
function FlashDealsList() {
  const randomizedFoods = useMemo(() => {
    return [...POPULAR_ITEMS].sort(() => Math.random() - 0.5);
  }, []);

  return (
    // Fixed-height wrapper so the FlatList header measures it correctly
    <View style={{ height: 165, marginBottom: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          gap: 12,
        }}
      >
        {randomizedFoods.slice(0, 10).map((deal) => (
          <TouchableOpacity
            key={deal.id}
            style={{ width: 144 }}
            onPress={() =>
              router.push({
                pathname: "/food/[id]",
                params: { id: String(deal.id) },
              })
            }
          >
            <Image
              source={{ uri: deal.image }}
              style={{ width: 144, height: 96, borderRadius: 12 }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={100}
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
/* -------------------------------------------------------------------------- */
/* POPULAR NEAR AAU                                                           */
/* -------------------------------------------------------------------------- */

function PopularNearAAUSection() {
  const randomizedFoods = useMemo(() => {
    return [...POPULAR_ITEMS].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <View className="bg-[#0D0F11] py-4">
      <View className="px-4 mb-3 flex-row justify-between items-center">
        <Text style={typography.bold} className="text-xl text-white">
          Popular Near AAU
        </Text>

        <Pressable className="flex-row items-center">
          <Text style={typography.semiBold} className="text-sm text-[#22C55E]">
            See all
          </Text>

          <Text className="text-sm text-[#22C55E] ml-1">→</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
      >
        {randomizedFoods.slice(0, 10).map((item) => (
          <PopularNearAAUCard
            key={item.id}
            {...item}
            onPress={() =>
              router.push({
                pathname: "/food/[id]",
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* DYNAMIC HOME CARD                                                          */
/* -------------------------------------------------------------------------- */
const HomeCard = memo(function HomeCard({
  item,
  mode,
}: {
  item: any;
  mode: ListMode;
}) {
  const isRestaurant = mode === "restaurant";

  const handlePress = () => {
    if (isRestaurant) {
      router.push({
        pathname: "/restaurant/[id]",
        params: {
          id: String(item.id),
        },
      });

      return;
    }

    router.push({
      pathname: "/food/[id]",
      params: {
        id: String(item.id),
      },
    });
  };

  const title = isRestaurant ? item.restaurant : item.name;

  return (
    <View className="px-5 mt-4">
      <Pressable
        onPress={handlePress}
        className="bg-[#121418] rounded-3xl border border-white/5 overflow-hidden"
      >
        <View className="relative w-full h-44">
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={100}
          />

          <View className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded-full flex-row items-center gap-1">
            <Ionicons name="location-outline" size={12} color="#FFF" />

            <Text style={typography.medium} className="text-white text-[10px]">
              0.8 km away
            </Text>
          </View>

          <View className="absolute top-3 right-3 bg-black/40 p-1.5 rounded-full">
            <FavoriteButton
              id={String(item.id)}
              type={isRestaurant ? "restaurant" : "food"}
            />
          </View>

          <View className="absolute bottom-3 left-3 bg-[#FF4D4D] px-2 py-1 rounded-md">
            <Text style={typography.bold} className="text-white text-[10px]">
              FREE DELIVERY
            </Text>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text
              style={typography.bold}
              className="text-lg text-white flex-1 mr-2"
              numberOfLines={1}
            >
              {title}
            </Text>

            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={14} color="#F5A623" />

              <Text style={typography.bold} className="text-white text-sm">
                {item.rating || "4.5"}
              </Text>
            </View>
          </View>

          {isRestaurant ? (
            <>
              <View className="flex-row items-center gap-3 mb-3">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={14} color="#777B84" />

                  <Text
                    style={typography.regular}
                    className="text-[#777B84] text-xs"
                  >
                    {item.deliveryTime}
                  </Text>
                </View>

                <Text className="text-[#777B84] text-xs">•</Text>

                <View className="flex-row items-center gap-1">
                  <Ionicons name="bicycle-outline" size={14} color="#777B84" />

                  <Text
                    style={typography.regular}
                    className="text-[#777B84] text-xs"
                  >
                    Free delivery
                  </Text>
                </View>

                <Text className="text-[#777B84] text-xs">•</Text>

                <Text
                  style={typography.regular}
                  className="text-[#777B84] text-xs"
                >
                  289 Orders
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2">
                {item.categories?.map((category: string, index: number) => (
                  <View
                    key={`${category}-${index}`}
                    className="bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <Text
                      style={typography.medium}
                      className="text-[#A0A0A0] text-[10px]"
                    >
                      {category}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-xs mb-3"
                numberOfLines={2}
              >
                {item.description ||
                  `Delicious ${item.name} from ${item.restaurant}`}
              </Text>

              <View className="flex-row justify-between items-center">
                <Text
                  style={typography.bold}
                  className="text-[#34C759] text-base"
                >
                  ₦{Number(item.price).toLocaleString()}
                </Text>

                <AddToCartButton food={item} />
              </View>
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
});

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                */
/* -------------------------------------------------------------------------- */

function EmptyList({ mode, category }: { mode: ListMode; category: string }) {
  const isRestaurant = mode === "restaurant";

  return (
    <View className="items-center justify-center pt-[60px] px-5">
      <Ionicons name="search-outline" size={45} color="#777B84" />

      <Text
        style={typography.bold}
        className="text-white text-lg mt-3 text-center"
      >
        {isRestaurant ? "No restaurants found" : `No ${category} found`}
      </Text>

      <Text
        style={typography.regular}
        className="text-[#777B84] text-sm mt-1.5 text-center"
      >
        {isRestaurant
          ? "Try another category."
          : "No items in this category yet."}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState("all");

  const setCategory = (category: string) => {
    setActiveCategory(category);
  };

  const randomizedFoods = useMemo(() => {
    return [...POPULAR_ITEMS].sort(() => Math.random() - 0.5);
  }, []);

  const filteredFoods = useMemo(() => {
    return randomizedFoods.filter((item) => {
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [randomizedFoods, activeCategory]);

  type HomeListItem =
    | Foods
    | RestaurantAndMeal
    | (typeof RESTAURANTS_AND_MEALS)[number];

  const isAll = activeCategory === "all";

  const listMode: ListMode = isAll ? "restaurant" : "food";

  const listData: HomeListItem[] = isAll
    ? RESTAURANTS_AND_MEALS
    : filteredFoods;

  const sectionTitle = isAll ? null : `${activeCategory} Dishes`;

  return (
    <View className="flex-1 bg-[#0F1115]">
      <FlatList
        data={listData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <HomeCard item={item} mode={listMode} />}
        ListHeaderComponent={
          <>
            <TopHeader user={user} />

            <Greeting user={user} />

            <SearchBar />

            <View
              style={{
                display: isAll ? "flex" : "none",
              }}
            >
              <PromoSliderr />
            </View>

            <CategoryTabs
              activeCategory={activeCategory}
              setActiveCategory={setCategory}
            />

            {isAll && (
              <>
                <FlashDealsHeader />
                <FlashDealsList />
              </>
            )}

            <Text
              style={typography.semiBold}
              className="text-white text-lg ml-7"
              numberOfLines={1}
            >
              Restaurants Near you
            </Text>

            {!isAll && (
              <View className="mt-6 px-5 flex-row justify-between items-center">
                <Text style={typography.bold} className="text-lg text-white">
                  {sectionTitle}
                </Text>

                <Text
                  style={typography.regular}
                  className="text-[#777B84] text-xs"
                >
                  {listData.length} items
                </Text>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          <>
            <View
              style={{
                display: isAll ? "flex" : "none",
              }}
            >
              <PopularNearAAUSection />
            </View>

            <OrderAgainCard />
          </>
        }
        ListEmptyComponent={
          <EmptyList mode={listMode} category={activeCategory} />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}
