import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
export type Food = {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  deliveryTime: string;
  category: string;
};

type FoodCardProps = {
  food: Food;
};

export default function FoodCard({ food }: FoodCardProps) {
  const { name, image, rating, price, deliveryTime } = food;

  return (
    <Pressable
      onPress={() => router.push(`/food/${food.id}`)}
      className="bg-[#1E1E1E] rounded-3xl p-4 w-[170px] mb-4">
      <View className="absolute top-3 right-3 z-10 bg-black/40 rounded-full p-2">
        <Ionicons name="heart-outline" size={20} color="white" />
      </View>
      <Image source={{ uri: image }} className="w-full h-36 rounded-3xl" />

      <Text className="text-white text-lg font-bold mt-3">{name}</Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="star" size={14} color="#FACC15" />

        <Text className="text-gray-300 ml-1">{rating}</Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="time-outline" size={14} color="#9CA3AF" />

          <Text className="text-gray-400 ml-1">{deliveryTime}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-orange-500 font-bold">₦{price}</Text>

        <View className="bg-orange-500 w-8 h-8 rounded-full items-center justify-center">
          <Text className="text-white text-lg">+</Text>
        </View>
      </View>
    </Pressable>
  );
}
