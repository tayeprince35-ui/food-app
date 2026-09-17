import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MessageSquare,
  Package,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wallet,
  Zap
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MOCK_DATA = {
  address: {
    title: 'HOME',
    addressLine: 'No. 12 Uromi Road, Ekpoma',
    landmark: 'Near AAU main gate Edo State',
  },
  walletBalance: '₦4,200',
  items: [
    {
      id: '1',
      name: 'Jollof + Chicken',
      options: 'Regular • Extra spicy',
      qty: 1,
      price: '₦2,200',
      bgColor: 'bg-orange-600',
      icon: '🍛',
    },
    {
      id: '2',
      name: 'Beef Suya',
      options: 'Regular • Extra spicy',
      qty: 2,
      price: '₦2,100',
      bgColor: 'bg-orange-700',
      icon: '🍢',
    },
    {
      id: '3',
      name: 'Chilled Zobo Drinks',
      options: 'Regular • Extra spicy',
      qty: 1,
      price: '₦400',
      bgColor: 'bg-blue-600',
      icon: '🥤',
    },
  ],
  bill: {
    subtotal: '₦4,700',
    deliveryFee: 'Free',
    promo: '-₦500',
    promoCode: 'HEYBITE1',
    serviceCharge: '₦100',
    total: '₦4,300',
    savings: '₦500',
  },
  eta: '10–20 minutes',
};

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState<'online' | 'wallet'>('online');
  const [selectedNote, setSelectedNote] = useState<string | null>('Call on arrival');

  return (
    <View className="flex-1 bg-[#121413]">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-[#1E2220] items-center justify-center border border-white/5">
          <ArrowLeft size={20} color="#E5E7EB" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Checkout</Text>
        <View className="bg-[#1C2C22] px-3 py-1 rounded-full border border-emerald-500/20">
          <Text className="text-emerald-400 text-xs font-semibold">Step 2 of 2</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Progress Tracker */}
        <View className="flex-row items-center justify-between my-4 px-6">
          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-emerald-500 items-center justify-center">
              <Check size={16} color="#051D14" strokeWidth={3} />
            </View>
            <Text className="text-emerald-500 text-xs font-medium mt-1">CART</Text>
          </View>

          <View className="flex-1 h-[2px] bg-emerald-500 mx-2" />

          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-emerald-500" />
            </View>
            <Text className="text-emerald-500 text-xs font-semibold mt-1">CHECKOUT</Text>
          </View>

          <View className="flex-1 h-[2px] bg-neutral-800 mx-2" />

          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-neutral-800 items-center justify-center border border-neutral-700">
              <Text className="text-neutral-400 text-xs font-bold">3</Text>
            </View>
            <Text className="text-neutral-500 text-xs font-medium mt-1">TRACKING</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-base font-bold">Delivery address</Text>
            <TouchableOpacity>
              <Text className="text-emerald-500 text-sm font-semibold">Change</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#181D1A] p-4 rounded-2xl border border-emerald-500/30 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-10 h-10 rounded-xl bg-emerald-950 items-center justify-center border border-emerald-500/30 mr-3">
                <ShieldCheck size={20} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-500 text-xs font-semibold tracking-wider">
                  {MOCK_DATA.address.title}
                </Text>
                <Text className="text-white text-sm font-bold mt-0.5" numberOfLines={1}>
                  {MOCK_DATA.address.addressLine}
                </Text>
                <Text className="text-neutral-400 text-xs mt-0.5" numberOfLines={1}>
                  {MOCK_DATA.address.landmark}
                </Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center">
              <Check size={14} color="#051D14" strokeWidth={3} />
            </View>
          </View>

          <TouchableOpacity className="bg-[#181D1A] mt-3 p-4 rounded-2xl border border-dashed border-neutral-700 flex-row items-center justify-center">
            <Plus size={18} color="#9CA3AF" />
            <Text className="text-neutral-300 font-semibold text-sm ml-2">Add a new address</Text>
          </TouchableOpacity>
        </View>

        {/* Note for Rider */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-base font-bold">Note for rider</Text>
            <Text className="text-neutral-500 text-xs">0 / 120</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-3">
            {[
              { id: 'Call on arrival', label: 'Call on arrival', icon: Phone },
              { id: 'Drop at gate', label: 'Drop at gate', icon: Package },
              { id: 'Im hungry!', label: "I'm hungry!", icon: Zap },
              { id: 'Handle carefully', label: 'Handle carefully', icon: Sparkles },
            ].map((tag) => {
              const IconComp = tag.icon;
              const isSelected = selectedNote === tag.id;
              return (
                <TouchableOpacity
                  key={tag.id}
                  onPress={() => setSelectedNote(tag.id)}
                  className={`flex-row items-center px-3 py-2 rounded-full mr-2 border ${
                    isSelected
                      ? 'bg-[#1C2C22] border-emerald-500'
                      : 'bg-[#181D1A] border-neutral-800'
                  }`}
                >
                  <IconComp size={14} color={isSelected ? '#10B981' : '#9CA3AF'} />
                  <Text
                    className={`text-xs font-semibold ml-1.5 ${
                      isSelected ? 'text-emerald-400' : 'text-neutral-300'
                    }`}
                  >
                    {tag.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="bg-[#181D1A] p-3.5 rounded-2xl border border-neutral-800 flex-row items-start">
            <MessageSquare size={16} color="#6B7280" className="mt-1 mr-2" />
            <Text className="text-neutral-400 text-xs leading-5 flex-1">
              Any instructions for your rider? e.g. call when you arrive, drop at gate...
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View className="mt-6">
          <Text className="text-white text-base font-bold mb-3">Payment method</Text>

          {/* Pay Online */}
          <TouchableOpacity
            onPress={() => setSelectedPayment('online')}
            className={`p-4 rounded-2xl border mb-3 flex-row items-center justify-between ${
              selectedPayment === 'online'
                ? 'bg-[#181D1A] border-emerald-500'
                : 'bg-[#181D1A] border-neutral-800'
            }`}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-emerald-950/80 items-center justify-center border border-emerald-500/20 mr-3">
                <CreditCard size={20} color="#10B981" />
              </View>
              <View>
                <Text className="text-white font-bold text-sm">Pay Online</Text>
                <Text className="text-neutral-400 text-xs mt-0.5">
                  Card, Bank transfer, USSD, Opay
                </Text>
              </View>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                selectedPayment === 'online' ? 'border-emerald-500' : 'border-neutral-600'
              }`}
            >
              {selectedPayment === 'online' && (
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
            </View>
          </TouchableOpacity>

          {/* Wallet */}
          <TouchableOpacity
            onPress={() => setSelectedPayment('wallet')}
            className={`p-4 rounded-2xl border flex-row items-center justify-between ${
              selectedPayment === 'wallet'
                ? 'bg-[#181D1A] border-emerald-500'
                : 'bg-[#181D1A] border-neutral-800'
            }`}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-emerald-950/80 items-center justify-center border border-emerald-500/20 mr-3">
                <Wallet size={20} color="#10B981" />
              </View>
              <View>
                <Text className="text-white font-bold text-sm">HeyBite Wallet</Text>
                <Text className="text-neutral-400 text-xs mt-0.5">
                  Balance: <Text className="text-emerald-500 font-bold">{MOCK_DATA.walletBalance}</Text>
                </Text>
              </View>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                selectedPayment === 'wallet' ? 'border-emerald-500' : 'border-neutral-600'
              }`}
            >
              {selectedPayment === 'wallet' && (
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Your Order */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-base font-bold">Your Order</Text>
            <Text className="text-emerald-500 text-xs font-semibold">
              {MOCK_DATA.items.length} item
            </Text>
          </View>

          {MOCK_DATA.items.map((item) => (
            <View key={item.id} className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View
                  className={`w-12 h-12 rounded-2xl ${item.bgColor} items-center justify-center mr-3`}
                >
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-sm">{item.name}</Text>
                  <Text className="text-neutral-400 text-xs mt-0.5">{item.options}</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Text className="text-emerald-500 text-xs font-semibold mr-2">
                  ×{item.qty}
                </Text>
                <Text className="text-white font-bold text-sm mr-3">{item.price}</Text>
                <TouchableOpacity>
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Bill Details */}
        <View className="mt-4 bg-[#181D1A] p-4 rounded-3xl border border-neutral-800">
          <Text className="text-white text-base font-bold mb-4">Bill details</Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-neutral-400 text-sm">Item subtotal</Text>
              <Text className="text-white font-bold text-sm">{MOCK_DATA.bill.subtotal}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-neutral-400 text-sm">Delivery fee</Text>
              <Text className="text-emerald-500 font-bold text-sm">
                {MOCK_DATA.bill.deliveryFee}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-neutral-400 text-sm">
                Promo ({MOCK_DATA.bill.promoCode})
              </Text>
              <Text className="text-red-500 font-bold text-sm">{MOCK_DATA.bill.promo}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-neutral-400 text-sm">Service Charge</Text>
              <Text className="text-white font-bold text-sm">{MOCK_DATA.bill.serviceCharge}</Text>
            </View>
          </View>

          <View className="h-[1px] bg-neutral-800 my-4" />

          <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-lg">Total</Text>
            <Text className="text-emerald-500 font-bold text-xl">{MOCK_DATA.bill.total}</Text>
          </View>
        </View>

        {/* Savings Badge */}
        <View className="mt-4 bg-[#14261C] p-3.5 rounded-2xl border border-emerald-500/20 flex-row items-center">
          <Text className="text-lg mr-2">🎉</Text>
          <Text className="text-emerald-400 font-semibold text-xs flex-1">
            You're saving <Text className="font-bold text-white">{MOCK_DATA.bill.savings}</Text> on
            this order!
          </Text>
        </View>

        {/* Estimated Time */}
        <View className="mt-4 flex-row items-center justify-center pb-6">
          <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
          <Text className="text-neutral-400 text-xs">
            Estimated delivery • <Text className="text-neutral-200 font-medium">{MOCK_DATA.eta}</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Place Order CTA Footer */}
      <View className="p-4 bg-[#121413] border-t border-neutral-900">
        <TouchableOpacity className="bg-emerald-500 h-14 rounded-full flex-row items-center justify-between px-6">
          <View>
            <Text className="text-[#051D14] font-bold text-base">Place Order</Text>
            <Text className="text-[#051D14]/80 text-xs font-semibold">
              Pay {MOCK_DATA.bill.total} • Pay Online
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-black/10 items-center justify-center">
            <ArrowRight size={18} color="#051D14" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}