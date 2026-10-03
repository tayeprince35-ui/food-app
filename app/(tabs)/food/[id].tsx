import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import QuantitySelector from "@/components/quantitySelector";
import { typography } from "@/constants/typography";
import POPULAR_ITEMS, { Foods } from "@/data/food";
import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodDetails() {
  const { id } = useLocalSearchParams();

  const foodId = Array.isArray(id) ? id[0] : id;

  const food: Foods | undefined = POPULAR_ITEMS.find(
    (item) => String(item.id) === String(foodId),
  );

  // ✅ Cart state and actions
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // ✅ Check if this item is already in cart
  const cartItem = cart.find((item) => String(item.id) === String(foodId));
  const itemQuantity = cartItem?.quantity ?? 0;

  /* -------------------------------------------------------------- */
  /* FOOD NOT FOUND                                                  */
  /* -------------------------------------------------------------- */

  if (!food) {
    return (
      <SafeAreaView className="flex-1 bg-[#0F1115] items-center justify-center px-6 ">
        <Ionicons name="fast-food-outline" size={60} color="#777B84" />

        <Text style={typography.bold} className="text-white text-xl mt-5">
          Food not found
        </Text>

        <Text
          style={typography.regular}
          className="text-[#777B84] text-sm text-center mt-2"
        >
          We couldn't find this food item.
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="bg-[#34C759] px-6 py-3 rounded-xl mt-6"
        >
          <Text style={typography.semiBold} className="text-white">
            Go Back
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#0F1115] ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* -------------------------------------------------------- */}
        {/* IMAGE                                                     */}
        {/* -------------------------------------------------------- */}

        <View className="relative">
          <Image
            source={{ uri: food.image }}
            style={{
              width: "100%",
              height: 330,
            }}
            contentFit="cover"
            cachePolicy="memory-disk"
                    />

          {/* Dark gradient-ish overlay */}
          <View className="absolute inset-0 bg-black/10" />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-4 left-5 w-11 h-11 rounded-full bg-black/50 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </Pressable>

          {/* Favorite */}
          <View className="absolute top-4 right-5 w-11 h-11 rounded-full bg-black/50 items-center justify-center">
            <FavoriteButton id={String(food.id)} />
          </View>

          {/* Free delivery */}
          <View className="absolute bottom-4 left-5 bg-[#FF4D4D] px-3 py-2 rounded-lg">
            <Text style={typography.bold} className="text-white text-xs">
              FREE DELIVERY
            </Text>
          </View>
        </View>

        {/* -------------------------------------------------------- */}
        {/* CONTENT                                                    */}
        {/* -------------------------------------------------------- */}

        <View className="px-5 pt-6">
          {/* Name + rating */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
              <Text style={typography.bold} className="text-white text-2xl">
                {food.name}
              </Text>

              {food.restaurant && (
                <Pressable
                  onPress={() => {
                    if (food.id) {
                      router.push({
                        pathname: "/restaurant/[id]",
                        params: {
                          id: String(food.id),
                        },
                      });
                    }
                  }}
                  className="flex-row items-center mt-2"
                >
                  <Ionicons
                    name="storefront-outline"
                    size={15}
                    color="#34C759"
                  />

                  <Text
                    style={typography.medium}
                    className="text-[#34C759] text-sm ml-1"
                  >
                    {food.restaurant}
                  </Text>

                  {food.id && (
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color="#34C759"
                      style={{ marginLeft: 2 }}
                    />
                  )}
                </Pressable>
              )}
            </View>

            <View className="bg-[#1C1C1E] rounded-xl px-3 py-2 items-center">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={15} color="#F5A623" />

                <Text style={typography.bold} className="text-white text-sm">
                  {food.rating || "4.5"}
                </Text>
              </View>

              <Text
                style={typography.regular}
                className="text-[#777B84] text-[10px] mt-1"
              >
                Rating
              </Text>
            </View>
          </View>

          {/* ------------------------------------------------------ */}
          {/* INFO ROW                                                */}
          {/* ------------------------------------------------------ */}

          <View className="flex-row items-center mt-6 gap-5">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={18} color="#777B84" />

              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-xs ml-1.5"
              >
                {food.deliveryTime || "20-30 min"}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="bicycle-outline" size={18} color="#777B84" />

              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-xs ml-1.5"
              >
                Free delivery
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="receipt-outline" size={18} color="#777B84" />

              <Text
                style={typography.regular}
                className="text-[#A0A0A0] text-xs ml-1.5"
              >
                289 orders
              </Text>
            </View>
          </View>

          {/* ------------------------------------------------------ */}
          {/* DESCRIPTION                                             */}
          {/* ------------------------------------------------------ */}

          <View className="mt-7">
            <Text style={typography.bold} className="text-white text-lg">
              About this dish
            </Text>

            <Text
              style={typography.regular}
              className="text-[#A0A0A0] text-sm leading-6 mt-3"
            >
              Enjoy this delicious {food.name}
              {food.restaurant ? ` from ${food.restaurant}` : ""}. Freshly
              prepared and packed with great taste.
            </Text>
          </View>

          {/* ------------------------------------------------------ */}
          {/* CATEGORY                                                */}
          {/* ------------------------------------------------------ */}

          {food.category && (
            <View className="mt-7">
              <Text style={typography.bold} className="text-white text-lg">
                Category
              </Text>

              <View className="self-start bg-[#1C1C1E] border border-white/5 px-4 py-2 rounded-xl mt-3">
                <Text
                  style={typography.medium}
                  className="text-[#34C759] text-xs"
                >
                  {food.category}
                </Text>
              </View>
            </View>
          )}

          {/* ------------------------------------------------------ */}
          {/* PRICE                                                    */}
          {/* ------------------------------------------------------ */}

          <View className="mt-8 border-t border-white/5 pt-6">
            <Text style={typography.regular} className="text-[#777B84] text-xs">
              Price
            </Text>

            <Text
              style={typography.bold}
              className="text-[#34C759] text-3xl mt-1"
            >
              ₦{Number(food.price).toLocaleString()}
            </Text>
          </View>

          {/* ------------------------------------------------------ */}
          {/* ADD TO CART / QUANTITY SELECTOR                          */}
          {/* ------------------------------------------------------ */}

          <View className="mt-6 mb-24">
            {itemQuantity > 0 ? (
              <QuantitySelector
                quantity={itemQuantity}
                onIncrease={() => increaseQuantity(food.id)}
                onDecrease={() => {
                  if (itemQuantity === 1) {
                    removeFromCart(food.id);
                  } else {
                    decreaseQuantity(food.id);
                  }
                }}
              />
            ) : (
              <>
                <AddToCartButton food={food} />
                <Text
                  style={typography.bold}
                  className="text-white text-base ml-2"
                >
                  Add to Cart
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
