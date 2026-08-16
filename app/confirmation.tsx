// app/confirmation.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Confirmation() {
  const { orderId, total } = useLocalSearchParams<{
    orderId?: string;
    total?: string;
  }>();

  return (
    <View className="flex-1 items-center justify-center bg-[#08090B] px-8">
      {/* Success icon */}
      <View className="h-24 w-24 items-center justify-center rounded-full bg-[#32C48D]/20">
        <Ionicons name="checkmark-circle" size={56} color="#32C48D" />
      </View>

      <Text className="mt-6 text-[28px] font-bold text-white">
        Order confirmed!
      </Text>

      <Text className="mt-2 text-center text-[14px] text-[#858991]">
        Your order has been placed and is being prepared.
      </Text>

      {/* Order info */}
      <View className="mt-8 w-full rounded-2xl bg-[#121418] p-5">
        <Text className="text-[12px] text-[#777B84]">Order number</Text>
        <Text className="mt-1 text-[18px] font-bold text-white">
          #{orderId?.slice(0, 8) ?? '---'}
        </Text>

        {total && (
          <>
            <Text className="mt-4 text-[12px] text-[#777B84]">Total paid</Text>
            <Text className="mt-1 text-[18px] font-bold text-[#FF8A3D]">
              ₦{Number(total).toLocaleString()}
            </Text>
          </>
        )}
      </View>

      {/* Buttons */}
      <Pressable
        onPress={() => router.push('/orders')}
        className="mt-8 w-full items-center rounded-2xl bg-[#FF7A30] py-4">
        <Text className="text-[16px] font-bold text-white">Track order</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/')}
        className="mt-3 w-full items-center rounded-2xl bg-[#15171B] py-4">
        <Text className="text-[16px] font-bold text-[#858991]">
          Back to home
        </Text>
      </Pressable>
    </View>
  );
}
