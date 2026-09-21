import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const COLORS = {
  bg: '#0B0D0C',
  card: '#141715',
  cardBorder: '#232823',
  green: '#22C55E',
  greenDim: 'rgba(34,197,94,0.12)',
  red: '#EF4444',
  text: '#FFFFFF',
  subtext: '#8E938F',
  chipBg: '#1B1F1C',
};

const NOTE_CHIPS = ['Call on arrival', 'Drop at gate', "I'm hungry!", 'Handle carefully'];

const ORDER_ITEMS = [
  { id: '1', name: 'Jollof + Chicken', variant: 'Regular · Extra spicy', qty: 1, price: 2200, emoji: '🍛' },
  { id: '2', name: 'Beef Suya', variant: 'Regular · Extra spicy', qty: 2, price: 2100, emoji: '🍢' },
  { id: '3', name: 'Chilled Zobo Drinks', variant: 'Regular · Extra spicy', qty: 1, price: 400, emoji: '🥤' },
];

const naira = (n: number) => `₦${n.toLocaleString()}`;

export default function CheckoutScreen() {
  const [note, setNote] = useState('');
  const [activeChip, setActiveChip] = useState('Call on arrival');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'wallet'>('online');
 const { subtotal } = useLocalSearchParams<{ subtotal: string }>();

  const deliveryFee = 0;
  const promo = -500;
  const serviceCharge = 100;
  const total = Number(subtotal) + deliveryFee + promo + serviceCharge;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerStep}>Step 2 of 2</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <StepDot label="CART" state="done" />
          <View style={[styles.progressLine, { backgroundColor: COLORS.green }]} />
          <StepDot label="CHECKOUT" state="active" number={2} />
          <View style={styles.progressLine} />
          <StepDot label="TRACKING" state="pending" number={3} />
        </View>

        {/* Delivery address */}
        <SectionHeader title="Delivery address" action="Change" />
        <View style={[styles.card, styles.cardSelected, styles.row]}>
          <Ionicons name="location" size={20} color={COLORS.green} style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>No. 12 Uromi Road, Ekpoma</Text>
            <Text style={styles.cardSubtitle}>Near AAU main gate Edo State</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
        </View>

        <TouchableOpacity style={styles.addAddressBtn}>
          <Ionicons name="add" size={18} color={COLORS.text} />
          <Text style={styles.addAddressText}>Add a new address</Text>
        </TouchableOpacity>

        {/* Note for rider */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Note for rider</Text>
          <Text style={styles.charCount}>{note.length}/120</Text>
        </View>

        <View style={styles.chipRow}>
          {NOTE_CHIPS.map((chip) => {
            const selected = chip === activeChip;
            return (
              <TouchableOpacity
                key={chip}
                onPress={() => setActiveChip(selected ? '' : chip)}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{chip}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.noteBox}>
          <TextInput
            value={note}
            onChangeText={(t) => t.length <= 120 && setNote(t)}
            placeholder="Any instructions for your rider? e.g. call when&#10;you arrive, drop at gate..."
            placeholderTextColor={COLORS.subtext}
            multiline
            style={styles.noteInput}
          />
        </View>

        {/* Payment method */}
        <SectionHeader title="Payment method" style={{ marginTop: 24 }} />

        <PaymentOption
          icon={<Feather name="credit-card" size={18} color={COLORS.green} />}
          title="Pay Online"
          subtitle="Card, Bank transfer, USSD, Opay"
          selected={paymentMethod === 'online'}
          onPress={() => setPaymentMethod('online')}
        />
        <PaymentOption
          icon={<Ionicons name="wallet" size={18} color={COLORS.text} />}
          title="HeyBite Wallet"
          subtitle="Balance: ₦4,200"
          selected={paymentMethod === 'wallet'}
          onPress={() => setPaymentMethod('wallet')}
        />

        {/* Order items */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Your Order</Text>
          <Text style={styles.itemCount}>{ORDER_ITEMS.length} item</Text>
        </View>

        {ORDER_ITEMS.map((item) => (
          <View key={item.id} style={styles.orderItemRow}>
            <View style={styles.orderIcon}>
              <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.variant}</Text>
            </View>
            <Text style={styles.orderPrice}>
              x{item.qty} {naira(item.price)}
            </Text>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <Feather name="trash-2" size={16} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Bill details */}
        <SectionHeader title="Bill details" style={{ marginTop: 24 }} />
        <View style={styles.card}>
          <BillRow label="Item subtotal" value={naira(Number(subtotal))} />
          <BillRow label="Delivery fee" value="Free" valueColor={COLORS.green} />
          <BillRow label="Promo (HEYBITE)" value={`-${naira(500)}`} valueColor={COLORS.red} />
          <BillRow label="Service charge" value={naira(serviceCharge)} />
          <View style={styles.divider} />
          <BillRow label="Total" value={naira(total)} bold valueColor={COLORS.green} />
        </View>

        <View style={styles.savingsBanner}>
          <Text style={styles.savingsText}>🎉 You're saving {naira(500)} on this order!</Text>
        </View>

        <View style={styles.etaRow}>
          <View style={styles.etaDot} />
          <Text style={styles.etaText}>Estimated delivery · 10-20 minutes</Text>
        </View>
      </ScrollView>

      {/* Place order */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={()=>router.push('/payment')}>
          <View>
            <Text style={styles.placeOrderTitle}>Place Order</Text>
            <Text style={styles.placeOrderSubtitle}>Pay Online</Text>
          </View>
          <View style={styles.placeOrderRight}>
            <Text style={styles.placeOrderTitle}>({naira(total)})</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.bg} style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StepDot({ label, state, number }: { label: string; state: 'done' | 'active' | 'pending'; number?: number }) {
  const isDone = state === 'done';
  const isActive = state === 'active';
  return (
    <View style={styles.stepDotWrap}>
      <View
        style={[
          styles.stepCircle,
          isDone && { backgroundColor: COLORS.green, borderColor: COLORS.green },
          isActive && { borderColor: COLORS.green },
          !isDone && !isActive && { borderColor: COLORS.cardBorder },
        ]}
      >
        {isDone ? (
          <Ionicons name="checkmark" size={14} color={COLORS.bg} />
        ) : (
          <Text style={{ color: isActive ? COLORS.green : COLORS.subtext, fontSize: 12, fontWeight: '600' }}>
            {number}
          </Text>
        )}
      </View>
      <Text style={[styles.stepLabel, isActive && { color: COLORS.text }]}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title, action, style }: { title: string; action?: string; style?: object }) {
  return (
    <View style={[styles.sectionHeaderRow, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <TouchableOpacity>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function PaymentOption({
  icon,
  title,
  subtitle,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, styles.row, selected && styles.cardSelected, { marginTop: 10 }]}
    >
      <View style={styles.paymentIconWrap}>{icon}</View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={[styles.radioOuter, selected && { borderColor: COLORS.green }]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

function BillRow({
  label,
  value,
  valueColor,
  bold,
}: {
  label: string;
  value: string;
  valueColor?: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.billRow}>
      <Text style={[styles.billLabel, bold && { color: COLORS.text, fontWeight: '700', fontSize: 16 }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.billValue,
          valueColor ? { color: valueColor } : null,
          bold && { fontWeight: '700', fontSize: 16 },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { color: COLORS.text, fontSize: 16, fontWeight: '600' },
  headerStep: { color: COLORS.subtext, fontSize: 12 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  progressLine: { flex: 1, height: 1, backgroundColor: COLORS.cardBorder, marginHorizontal: 4 },
  stepDotWrap: { alignItems: 'center' },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: { color: COLORS.subtext, fontSize: 10, marginTop: 4, letterSpacing: 0.5 },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  sectionAction: { color: COLORS.green, fontSize: 13 },
  charCount: { color: COLORS.subtext, fontSize: 12 },
  itemCount: { color: COLORS.green, fontSize: 13 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardSelected: { borderColor: COLORS.green, backgroundColor: COLORS.greenDim },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  cardSubtitle: { color: COLORS.subtext, fontSize: 12, marginTop: 2 },

  addAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 10,
  },
  addAddressText: { color: COLORS.text, fontSize: 14, marginLeft: 6 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  chip: {
    backgroundColor: COLORS.chipBg,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipSelected: { backgroundColor: COLORS.greenDim, borderColor: COLORS.green },
  chipText: { color: COLORS.subtext, fontSize: 12 },
  chipTextSelected: { color: COLORS.green, fontWeight: '600' },

  noteBox: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    minHeight: 70,
  },
  noteInput: { color: COLORS.text, fontSize: 13, textAlignVertical: 'top' },

  paymentIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.green },

  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  orderIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderPrice: { color: COLORS.text, fontSize: 13, fontWeight: '600' },

  billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  billLabel: { color: COLORS.subtext, fontSize: 13 },
  billValue: { color: COLORS.text, fontSize: 13 },
  divider: { height: 1, backgroundColor: COLORS.cardBorder, marginVertical: 6 },

  savingsBanner: {
    backgroundColor: COLORS.greenDim,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  savingsText: { color: COLORS.green, fontSize: 13, fontWeight: '600', textAlign: 'center' },

  etaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  etaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green, marginRight: 6 },
  etaText: { color: COLORS.subtext, fontSize: 12 },

  footer: { padding: 16, backgroundColor: COLORS.bg },
  placeOrderBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeOrderTitle: { color: COLORS.bg, fontSize: 15, fontWeight: '700' },
  placeOrderSubtitle: { color: 'rgba(11,13,12,0.7)', fontSize: 11, marginTop: 2 },
  placeOrderRight: { flexDirection: 'row', alignItems: 'center' },
});