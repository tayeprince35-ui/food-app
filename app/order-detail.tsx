import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type OrderItem = {
  id: number;
  order_id: number;
  food_id: number;
  name: string;
  quantity: number;
  price: number;
};
type Order = {
  id: string;
  status: string;
  total: number;
  delivery_address: string;
  created_at: string;
  items: OrderItem[];
};
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'delivered':
      return { icon: 'checkmark-circle', color: '#32C48D', label: 'Delivered' };
    case 'preparing':
      return { icon: 'flame', color: '#FF7A30', label: 'Preparing' };
    case 'pending':
      return { icon: 'time', color: '#F5A623', label: 'Pending' };
    default:
      return { icon: 'ellipse', color: '#777B84', label: status };
  }
};

export default function OrderDetail() {
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (!error && data) {
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderId);

        if (!itemsError && items) {
          setOrder({ ...data, items });
        }
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <View className="flex-1 bg-[#08090B] items-center justify-center">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <View className="flex-1 bg-[#08090B]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-16 pb-4 flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#15171B]">
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>

          <View className="ml-4">
            <Text className="text-[11px] font-semibold uppercase tracking-[3px] text-[#FF8A3D]">
              Order detail
            </Text>
            <Text className="mt-1 text-[24px] font-bold text-white">
              #{orderId}
            </Text>
          </View>
        </View>

        {/* Status banner */}
        <View
          style={{ backgroundColor: statusInfo.color + '15' }}
          className="mx-5 mt-2 rounded-2xl p-5 flex-row items-center">
          <Ionicons
            name={statusInfo.icon as any}
            size={32}
            color={statusInfo.color}
          />
          <View className="ml-4">
            <Text
              style={{ color: statusInfo.color }}
              className="text-[16px] font-bold">
              {statusInfo.label}
            </Text>
            <Text className="mt-1 text-[13px] text-[#858991]">
              {order.status === 'delivered'
                ? 'Enjoy your meal!'
                : order.status === 'preparing'
                  ? 'Your food is being made'
                  : 'Waiting for confirmation'}
            </Text>
          </View>
        </View>

        {/* Order items */}
        <View className="mx-5 mt-6">
          <Text className="text-[16px] font-bold text-white mb-4">
            Items ordered
          </Text>

          <View className="rounded-2xl border border-white/[0.07] bg-[#121418] p-4">
            {order.items.map((item, index) => (
              <View
                key={index}
                className={`flex-row justify-between py-3 ${
                  index !== order.items.length - 1
                    ? 'border-b border-white/[0.06]'
                    : ''
                }`}>
                <View className="flex-1">
                  <Text className="text-[14px] font-semibold text-white">
                    {item.name}
                  </Text>
                  <Text className="mt-1 text-[12px] text-[#777B84]">
                    × {item.quantity}
                  </Text>
                </View>

                <Text className="text-[14px] font-semibold text-white">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery address */}
        <View className="mx-5 mt-6">
          <Text className="text-[16px] font-bold text-white mb-4">
            Delivery address
          </Text>

          <View className="rounded-2xl border border-white/[0.07] bg-[#121418] p-4 flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#FF8A3D" />
            <Text className="ml-3 flex-1 text-[14px] text-[#858991] leading-5">
              {order.delivery_address}
            </Text>
          </View>
        </View>

        {/* Bill summary */}
        <View className="mx-5 mt-6">
          <Text className="text-[16px] font-bold text-white mb-4">
            Bill summary
          </Text>

          <View className="rounded-2xl border border-white/[0.07] bg-[#121418] p-4">
            <View className="flex-row justify-between py-2">
              <Text className="text-[14px] text-[#858991]">Subtotal</Text>
              <Text className="text-[14px] text-white">
                ₦{subtotal.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between py-2">
              <Text className="text-[14px] text-[#858991]">Delivery fee</Text>
              <Text className="text-[14px] text-white">₦150</Text>
            </View>

            <View className="my-2 h-[1px] bg-white/[0.08]" />

            <View className="flex-row justify-between py-2">
              <Text className="text-[16px] font-bold text-white">Total</Text>
              <Text className="text-[18px] font-bold text-[#FF8A3D]">
                ₦{order.total.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Time placed */}
        <View className="mx-5 mt-6 items-center">
          <Text className="text-[12px] text-[#62666F]">
            Order placed {order.created_at}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-white/[0.07] bg-[#08090B]/[0.96] px-5 pb-8 pt-4">
        <Pressable
          onPress={() => router.push('/')}
          className="flex-row items-center justify-center rounded-2xl bg-[#FF7A30] py-[18px] active:opacity-80">
          <Ionicons name="home-outline" size={19} color="#FFFFFF" />
          <Text className="ml-2 text-[16px] font-bold text-white">
            Back to home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
