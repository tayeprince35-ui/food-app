import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

const ADDRESSES = [
  {
    id: '1',
    label: 'Home',
    address: 'Block 4, Flat 12, Admiralty Way, Lekki',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    address: '15 Victoria Island, Commercial Avenue, Lagos',
    isDefault: false,
  },
];

const DELIVERY_TIMES = [
  {
    id: '1',
    label: 'Priority',
    time: '15-25 min',
    fee: '₦1,800',
    badge: 'Fastest',
  },
  {
    id: '2',
    label: 'Standard',
    time: '25-35 min',
    fee: '₦1,200',
    badge: 'Popular',
  },
];

const TIPS = [0, 200, 500, 1000];

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedSpeed, setSelectedSpeed] = useState('2');
  const [selectedTip, setSelectedTip] = useState(500);
  const [needCutlery, setNeedCutlery] = useState(true);

  // Pricing calculations
  const itemsSubtotal = 12500;
  const deliveryFee = selectedSpeed === '1' ? 1800 : 1200;
  const total = itemsSubtotal + deliveryFee + selectedTip;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Final Step</Text>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Delivery Address Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <Text style={styles.actionText}>+ Add New</Text>
            </Pressable>
          </View>

          <View style={styles.cardsGap}>
            {ADDRESSES.map((item) => {
              const isSelected = selectedAddress === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedAddress(item.id)}
                  style={({ pressed }) => [
                    styles.card,
                    isSelected && styles.cardSelected,
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.addressHeaderRow}>
                    <View style={styles.iconTagRow}>
                      <Ionicons
                        name={
                          item.label === 'Home'
                            ? 'home-outline'
                            : 'briefcase-outline'
                        }
                        size={18}
                        color={isSelected ? '#FF8A3D' : '#777B84'}
                      />
                      <Text style={styles.addressLabel}>{item.label}</Text>
                    </View>

                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>

                  <Text style={styles.addressText}>{item.address}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Delivery Speed Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Delivery Options</Text>
          <View style={styles.cardsGap}>
            {DELIVERY_TIMES.map((option) => {
              const isSelected = selectedSpeed === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedSpeed(option.id)}
                  style={({ pressed }) => [
                    styles.card,
                    isSelected && styles.cardSelected,
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.speedRow}>
                    <View style={styles.speedInfo}>
                      <View style={styles.badgeRow}>
                        <Text style={styles.speedTitle}>{option.label}</Text>
                        <View style={styles.speedBadge}>
                          <Text style={styles.speedBadgeText}>
                            {option.badge}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.speedTime}>{option.time}</Text>
                    </View>

                    <Text style={styles.speedFee}>{option.fee}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Tip Rider Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Tip your Courier</Text>
            <Text style={styles.tipSubText}>100% goes to your driver</Text>
          </View>

          <View style={styles.tipRow}>
            {TIPS.map((amount) => {
              const isSelected = selectedTip === amount;
              return (
                <Pressable
                  key={amount}
                  onPress={() => setSelectedTip(amount)}
                  style={({ pressed }) => [
                    styles.tipChip,
                    isSelected && styles.tipChipSelected,
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      styles.tipText,
                      isSelected && styles.tipTextSelected,
                    ]}>
                    {amount === 0 ? 'None' : `₦${amount}`}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Extra Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceTitle}>Cutlery & Napkins</Text>
                <Text style={styles.preferenceSub}>
                  Keep it eco-friendly if you don't need utensils.
                </Text>
              </View>
              <Switch
                value={needCutlery}
                onValueChange={setNeedCutlery}
                trackColor={{
                  false: '#23262D',
                  true: 'rgba(255, 138, 61, 0.4)',
                }}
                thumbColor={needCutlery ? '#FF8A3D' : '#777B84'}
              />
            </View>
          </View>
        </View>

        {/* Final Payment Method Preview */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Pressable
              onPress={() => router.push('/payment')}
              style={({ pressed }) => pressed && styles.pressed}>
              <Text style={styles.actionText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.paymentPreviewRow}>
              <View style={styles.paymentIconBox}>
                <Ionicons name="card" size={20} color="#FF8A3D" />
              </View>
              <View style={styles.paymentTextContainer}>
                <Text style={styles.paymentTitle}>Mastercard •••• 4288</Text>
                <Text style={styles.paymentSub}>Expires 08/28</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color="#32C48D" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Checkout Call to Action */}
      <View style={styles.footerContainer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerTotalLabel}>Total Amount</Text>
          <Text style={styles.footerTotalValue}>₦{total.toLocaleString()}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.placeOrderButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/confirmation')}>
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Ionicons name="checkmark-sharp" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090B',
  },
  scrollContent: {
    paddingBottom: 120, // space for fixed bottom bar
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#15171B',
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#FF8A3D',
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF8A3D',
  },
  cardsGap: {
    gap: 12,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    backgroundColor: '#121418',
    padding: 16,
  },
  cardSelected: {
    borderColor: '#FF8A3D',
    backgroundColor: '#171513',
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addressText: {
    fontSize: 13,
    color: '#777B84',
    marginTop: 8,
    lineHeight: 18,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3A3D44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FF8A3D',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FF8A3D',
  },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speedInfo: {
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  speedBadge: {
    backgroundColor: 'rgba(255, 138, 61, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  speedBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF8A3D',
  },
  speedTime: {
    fontSize: 13,
    color: '#777B84',
  },
  speedFee: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipSubText: {
    fontSize: 11,
    color: '#777B84',
  },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#121418',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipChipSelected: {
    backgroundColor: '#FF8A3D',
    borderColor: '#FF8A3D',
  },
  tipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777B84',
  },
  tipTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  preferenceSub: {
    fontSize: 12,
    color: '#777B84',
    marginTop: 2,
  },
  paymentPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconBox: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 138, 61, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymentSub: {
    fontSize: 11,
    color: '#777B84',
    marginTop: 2,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121418',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTextContainer: {
    justifyContent: 'center',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: '#777B84',
    textTransform: 'uppercase',
  },
  footerTotalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8A3D',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 18,
    gap: 8,
  },
  placeOrderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.7,
  },
});
