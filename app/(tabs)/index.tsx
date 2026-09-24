import { FLASH_DEALS } from "@/assets/data";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import PopularNearAAUCard from "@/components/NearYouCard";
import OrderAgainCard from "@/components/OrderAgain";
import PromoSliderr from "@/components/PromoSliderr";
import { typography } from "@/constants/typography";
import POPULAR_ITEMS, {
  FOOD_ITEMS,
  Foods,
  RestaurantAndMeal,
  RESTAURANTS_AND_MEALS,
} from "@/data/food";
import { useAuth } from "@/lib/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

import grocery from "../../assets/icons/basket.png";
import chicken from "../../assets/icons/chicken.png";
import pizza from "../../assets/icons/pizza.png";
import plate from "../../assets/icons/plate.png";
import rice from "../../assets/icons/rice.png";
import shawarma from "../../assets/icons/shawarma.png";

type Category = {
  id: string;
  name: string;
  icon: any;
};

type ListMode = "restaurant" | "food";

const CATEGORIES: Category[] = [
  { id: "all", name: "All", icon: plate },
  { id: "Rice", name: "Rice", icon: rice },
  { id: "Chicken", name: "Chicken", icon: chicken },
  { id: "Pizza", name: "Pizza", icon: pizza },
  { id: "Shawarma", name: "Shawarma", icon: shawarma },
  { id: "Grocery", name: "Grocery", icon: grocery },
];

const Logo = require("../../assets/icons/logo.png");

/* ------------------------------------------------------------------ */
/* HEADER                                                             */
/* ------------------------------------------------------------------ */

function TopHeader({ user }: { user: any }) {
  return (
    <View className="px-5 pt-[60px] pb-2 flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-full bg-[#34C759] items-center justify-center">
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

        <Text
          style={typography.bold}
          className="w-9 h-9 rounded-full bg-[#2C2C2E] text-base text-[#34C759] flex items-center justify-center"
        >
          {user?.user_metadata?.first_name?.charAt(0).toUpperCase() || "?"}
        </Text>
      </View>
    </View>
  );
}

function Greeting({ user }: { user: any }) {
  return (
    <View className="px-5 mt-4">
      <Text style={typography.regular} className="text-[#A0A0A0] text-sm">
        Good afternoon 👋
      </Text>

      <Text style={typography.bold} className="text-2xl text-white mt-1">
        What are you <Text className="text-[#34C759]">craving</Text>
        {"\n"}today, {user?.user_metadata?.firstName || "there"}?
      </Text>
    </View>
  );
}

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

/* ------------------------------------------------------------------ */
/* CATEGORIES                                                         */
/* ------------------------------------------------------------------ */

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

        <Pressable className="flex-row items-center gap-1">
          <Text style={typography.semiBold} className="text-[#34C759] text-xs">
            All categories
          </Text>

          <Ionicons name="arrow-forward" size={12} color="#34C759" />
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
                className={`w-20 h-20 rounded-full items-center justify-center ${
                  isActive ? "bg-[#34C759]" : "bg-[#1C1C1E]"
                }`}
              >
                <Image
                  source={category.icon}
                  style={{ width: 68, height: 68 }}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                  transition={100}
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

/* ------------------------------------------------------------------ */
/* FLASH DEALS                                                        */
/* ------------------------------------------------------------------ */

function FlashDealsHeader() {
  return (
    <View className="mt-8 px-5 flex-row justify-between items-center">
      <Text style={typography.bold} className="text-lg text-white">
        Flash Deals
      </Text>

      <View className="flex-row items-center gap-1">
        <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
          <Text style={typography.bold} className="text-white text-xs">
            02
          </Text>
        </View>

        <Text style={typography.regular} className="text-white text-xs">
          :
        </Text>

        <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
          <Text style={typography.bold} className="text-white text-xs">
            13
          </Text>
        </View>

        <Text style={typography.regular} className="text-white text-xs">
          :
        </Text>

        <View className="bg-[#1C1C1E] px-1.5 py-0.5 rounded">
          <Text style={typography.bold} className="text-white text-xs">
            11
          </Text>
        </View>
      </View>
    </View>
  );
}

function FlashDealsList() {
  return (
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
            transition={100}
          />

          <Text
            style={typography.semiBold}
            className="text-white text-sm mt-2"
            numberOfLines={1}
          >
            {deal.name}
          </Text>

          <Text style={typography.bold} className="text-[#34C759] text-xs mt-1">
            ₦{deal.price.toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/* POPULAR NEAR AAU                                                   */
/* ------------------------------------------------------------------ */

function PopularNearAAUSection() {
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
        {FOOD_ITEMS.map((item) => (
          <PopularNearAAUCard
            key={item.id}
            {...item}
            onPress={() => console.log("Selected:", item.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* DYNAMIC HOME CARD                                                  */
/* ------------------------------------------------------------------ */

function HomeCard({ item, mode }: { item: any; mode: ListMode }) {
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
        {/* IMAGE */}
        <View className="relative w-full h-44">
          <Image
            source={{ uri: item.image }}
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
            <FavoriteButton id={String(item.id)} />
          </View>

          <View className="absolute bottom-3 left-3 bg-[#FF4D4D] px-2 py-1 rounded-md">
            <Text style={typography.bold} className="text-white text-[10px]">
              FREE DELIVERY
            </Text>
          </View>
        </View>

        {/* CONTENT */}
        <View className="p-4">
          {/* TITLE + RATING */}
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

          {/* RESTAURANT INFO */}
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

              {/* CATEGORIES */}
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
              {/* FOOD DESCRIPTION */}
              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-xs mb-3"
                numberOfLines={2}
              >
                {item.description ||
                  `Delicious ${item.name} from ${item.restaurant}`}
              </Text>

              {/* FOOD PRICE + CART */}
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
}

/* ------------------------------------------------------------------ */
/* EMPTY STATE                                                        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* HOME                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState("all");

  const randomizedFoods = useMemo(() => {
    return [...POPULAR_ITEMS].sort(() => Math.random() - 0.5);
  }, []);

  const filteredFoods = useMemo(() => {
    return randomizedFoods.filter((item) => {
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [randomizedFoods, activeCategory]);

  /*
   * Everything that changes between the two list modes
   * lives here.
   */
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

            {/* Only show promo on the "All" screen */}
            {isAll && <PromoSliderr />}

            <CategoryTabs
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* Only show flash deals on the "All" screen */}
            {isAll && (
              <>
                <FlashDealsHeader />
                <FlashDealsList />
              </>
            )}

            {/* Only show this title for category mode */}
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
            {/* Only show Popular Near AAU on "All" */}
            {isAll && <PopularNearAAUSection />}

            {/* Always show Order Again */}
            <OrderAgainCard />
          </>
        }
        ListEmptyComponent={
          <EmptyList mode={listMode} category={activeCategory} />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}
