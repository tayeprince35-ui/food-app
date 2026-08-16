import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
type OrderWithCount = {
  id: number;
  user_id: string;
  total: number;
  status: string;
  delivery_address: string;
  created_at: string;
  order_items: { count: number }[];
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

export default function Orders() {
  const [orders, setOrders] = useState<OrderWithCount[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(count)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);
  return (
    <View className="flex-1 bg-[#08090B]">
      {/* Header */}
      <View className="px-5 pt-16 pb-4 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#15171B]">
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>

        <View className="ml-4">
          <Text className="text-[11px] font-semibold uppercase tracking-[3px] text-[#FF8A3D]">
            History
          </Text>
          <Text className="mt-1 text-[24px] font-bold text-white">
            My Orders
          </Text>
        </View>
      </View>

      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const statusInfo = getStatusInfo(item.status);

          return (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: '/order-detail',
                  params: { orderId: item.id },
                });
              }}
              className="mb-3 rounded-2xl border border-white/[0.07] bg-[#121418] p-4 active:opacity-80">
              {/* Top row: status + time */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Ionicons
                    name={statusInfo.icon as any}
                    size={18}
                    color={statusInfo.color}
                  />
                  <Text
                    style={{ color: statusInfo.color }}
                    className="ml-2 text-[13px] font-semibold">
                    {statusInfo.label}
                  </Text>
                </View>

                <Text className="text-[12px] text-[#777B84]">
                  {item.created_at}
                </Text>
              </View>

              {/* Bottom row: order info + reorder button */}
              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="text-[15px] font-bold text-white">
                    Order #{item.id}
                  </Text>
                  <Text className="mt-1 text-[13px] text-[#858991]">
                    {item.order_items[0].count}{' '}
                    {item.order_items[0].count === 1 ? 'item' : 'items'} · ₦
                    {item.total.toLocaleString()}
                  </Text>
                </View>

                {item.status === 'delivered' && (
                  <Pressable
                    onPress={() => {
                      // We'll wire reorder later
                      console.log('Reorder:', item.id);
                    }}
                    className="rounded-xl bg-[#FF7A30]/10 px-4 py-2 active:opacity-70">
                    <Text className="text-[12px] font-bold text-[#FF8A3D]">
                      Reorder
                    </Text>
                  </Pressable>
                )}
              </View>
            </Pressable>
          );
        }}
        // Empty state — when there are no orders
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="receipt-outline" size={48} color="#333740" />
            <Text className="mt-4 text-[16px] font-semibold text-[#62666F]">
              No orders yet
            </Text>
            <Text className="mt-1 text-[13px] text-[#474B52]">
              Your order history will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}
