import { ArrowLeft, ArrowRight, Banknote, CreditCard } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MOCK_DATA = {
  orderId: 'HB-20243',
  totalAmount: '₦4,300',
  itemCount: 3,
  paymentMethods: [
    {
      id: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay with cash when your order arrives',
      icon: Banknote,
    },
    {
      id: 'transfer',
      title: 'Bank Transfer',
      description: 'Virtual account-Auto confirm',
      icon: CreditCard,
    },
    {
      id: 'opay',
      title: 'Opay',
      description: 'Pay via your Opay wallet',
      icon: CreditCard,
    },
    {
      id: 'ussd',
      title: 'USSD',
      description: 'Works without internet-Dial to pay',
      icon: CreditCard,
    },
  ],
};

export default function PayOnlineScreen() {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('transfer');

  const selectedMethod = MOCK_DATA.paymentMethods.find((m) => m.id === selectedMethodId);

  return (
    <SafeAreaView className="flex-1 bg-[#121413]">
      <View className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#1C201D] items-center justify-center border border-white/5 mr-3">
            <ArrowLeft size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Pay Online</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Total Amount Card */}
          <View className="bg-[#181D1A] p-4 rounded-2xl border border-emerald-500/40 mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-emerald-500 text-xs font-semibold tracking-wider mb-1">
                TOTAL AMOUNT
              </Text>
              <Text className="text-white text-2xl font-bold">{MOCK_DATA.totalAmount}</Text>
            </View>

            <View className="items-end">
              <Text className="text-neutral-400 text-xs mb-1">Order #{MOCK_DATA.orderId}</Text>
              <View className="bg-[#10291D] px-3 py-1 rounded-full border border-emerald-500/30">
                <Text className="text-emerald-400 text-xs font-semibold">
                  {MOCK_DATA.itemCount} items
                </Text>
              </View>
            </View>
          </View>

          {/* Section Title */}
          <Text className="text-neutral-400 text-xs font-semibold tracking-wider mb-4">
            HOW WOULD YOU LIKE TO PAY?
          </Text>

          {/* Payment Methods Options */}
          <View className="space-y-3">
            {MOCK_DATA.paymentMethods.map((method) => {
              const isSelected = selectedMethodId === method.id;
              const IconComponent = method.icon;

              return (
                <TouchableOpacity
                  key={method.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMethodId(method.id)}
                  className={`p-4 rounded-2xl border flex-row items-center justify-between mb-3 ${
                    isSelected
                      ? 'bg-[#181D1A] border-emerald-500'
                      : 'bg-[#181D1A] border-neutral-800'
                  }`}
                >
                  <View className="flex-row items-center flex-1 mr-3">
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                        isSelected
                          ? 'bg-emerald-950/80 border border-emerald-500/30'
                          : 'bg-neutral-800/80 border border-neutral-700/50'
                      }`}
                    >
                      <IconComponent size={20} color={isSelected ? '#10B981' : '#6B7280'} />
                    </View>

                    <View className="flex-1">
                      <Text className="text-white font-bold text-sm">{method.title}</Text>
                      <Text className="text-neutral-400 text-xs mt-0.5">
                        {method.description}
                      </Text>
                    </View>
                  </View>

                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      isSelected ? 'border-emerald-500' : 'border-neutral-600'
                    }`}
                  >
                    {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer Payment Action */}
        <View className="py-4 bg-[#121413]">
          <View className="flex-row items-center mb-2 px-1">
            <Text className="text-neutral-400 text-xs">Paying with: </Text>
            <View className="w-2 h-2 rounded-full bg-emerald-500 mx-1.5" />
            <Text className="text-white text-xs font-semibold">
              {selectedMethod?.title || ''}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-emerald-500 h-14 rounded-full flex-row items-center justify-between px-6"
          >
            <View>
              <Text className="text-[#051D14] font-bold text-base">Make Payment</Text>
              <Text className="text-[#051D14]/80 text-xs font-medium">
                Pay {MOCK_DATA.totalAmount} • {selectedMethod?.title}
              </Text>
            </View>

            <ArrowRight size={20} color="#051D14" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}