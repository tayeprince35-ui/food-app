import GlassBackButton from "@/components/GlassBackButton";
import { formatDate } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#0B0D0C",
  card: "#141715",
  cardBorder: "#232823",
  green: "#22C55E",
  red: "#EF4444",
  amber: "#F5A623",
  text: "#FFFFFF",
  subtext: "#8E938F",
  chip: "#1B1F1C",
};

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};

type Order = {
  id: number;
  status: string;
  total: number;
  delivery_address: string | null;
  note: string | null;
  created_at: string;
  payment_status: string;
  payment_reference: string | null;
  paid_at: string | null;
  order_items: OrderItem[];
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  on_the_way: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const naira = (n: number) => `₦${Number(n).toLocaleString()}`;

const notify = (title: string, message: string) =>
  Platform.OS === "web"
    ? window.alert(`${title}\n${message}`)
    : Alert.alert(title, message);

function Dashed() {
  return (
    <View style={{ height: 1, overflow: "hidden", marginVertical: 14 }}>
      <View
        style={{
          height: 2,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: COLORS.cardBorder,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

function Row({
  label,
  value,
  color,
  bold,
}: {
  label: string;
  value: string;
  color?: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.rowLabelBold]}>
        {label}
      </Text>
      <Text
        style={[
          styles.rowValue,
          bold && styles.rowValueBold,
          color ? { color } : null,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export default function ReceiptScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, status, total, delivery_address, note, created_at, payment_status, payment_reference, paid_at, order_items(id, name, price, quantity, image)",
        )
        .eq("id", orderId)
        .single();

      if (error) console.error("RECEIPT ERROR:", error);
      else setOrder(data as Order);
      setLoading(false);
    };
    load();
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={{ color: COLORS.text }}>Receipt not found.</Text>
      </SafeAreaView>
    );
  }

  const paid = order.payment_status === "paid";
  const subtotal = order.order_items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
  // delivery fee, promo and service charge, combined (your orders table stores only the final total)
  const adjustment = order.total - subtotal;
  const itemCount = order.order_items.reduce((s, i) => s + i.quantity, 0);

  const shareReceipt = async () => {
    const lines = [
      "HeyBite receipt",
      `Order #${order.id}`,
      formatDate(order.created_at),
      "",
      ...order.order_items.map(
        (i) => `${i.quantity} x ${i.name}  ${naira(i.price * i.quantity)}`,
      ),
      "",
      `Subtotal: ${naira(subtotal)}`,
      ...(adjustment !== 0
        ? [
            `Delivery, promo & fees: ${adjustment < 0 ? "-" : ""}${naira(Math.abs(adjustment))}`,
          ]
        : []),
      `Total: ${naira(order.total)}`,
      `Payment: ${paid ? "Paid" : "Not paid yet"}`,
    ];
    const text = lines.join("\n");
    try {
      await Share.share({ message: text });
    } catch {
      await Clipboard.setStringAsync(text);
      notify("Receipt copied", "Paste it anywhere to share.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paper}>
          {/* Brand + status */}
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Ionicons name="restaurant" size={16} color={COLORS.text} />
            </View>
            <Text style={styles.brand}>HeyBite</Text>
          </View>

          <View
            style={[
              styles.paidBadge,
              {
                backgroundColor: paid
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(245,166,35,0.15)",
              },
            ]}
          >
            <Ionicons
              name={paid ? "checkmark-circle" : "time-outline"}
              size={14}
              color={paid ? COLORS.green : COLORS.amber}
            />
            <Text
              style={[
                styles.paidBadgeText,
                { color: paid ? COLORS.green : COLORS.amber },
              ]}
            >
              {paid ? "PAID" : "NOT PAID YET"}
            </Text>
          </View>

          <Text style={styles.totalBig}>{naira(order.total)}</Text>
          <Text style={styles.sub}>
            Order #{order.id} · {formatDate(order.created_at)}
          </Text>

          <Dashed />

          {/* Items */}
          <Text style={styles.sectionLabel}>ITEMS ({itemCount})</Text>
          {order.order_items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.thumb}
                  contentFit="cover"
                />
              ) : (
                <View style={[styles.thumb, styles.thumbEmpty]}>
                  <Ionicons
                    name="fast-food-outline"
                    size={16}
                    color={COLORS.subtext}
                  />
                </View>
              )}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemMeta}>
                  {item.quantity} x {naira(item.price)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                {naira(item.price * item.quantity)}
              </Text>
            </View>
          ))}

          <Dashed />

          {/* Totals */}
          <Row label="Subtotal" value={naira(subtotal)} />
          {adjustment !== 0 && (
            <Row
              label="Delivery, promo & fees"
              value={`${adjustment < 0 ? "-" : ""}${naira(Math.abs(adjustment))}`}
              color={adjustment < 0 ? COLORS.red : undefined}
            />
          )}
          <View style={{ height: 6 }} />
          <Row
            label="Total"
            value={naira(order.total)}
            bold
            color={COLORS.green}
          />

          <Dashed />

          {/* Details */}
          <Row
            label="Order status"
            value={STATUS_LABEL[order.status] ?? order.status}
          />
          <Row
            label="Payment"
            value={paid ? "Paystack (card / bank / USSD)" : "Not paid yet"}
          />
          {paid && order.paid_at && (
            <Row label="Paid on" value={formatDate(order.paid_at)} />
          )}
          {paid && order.payment_reference && (
            <Row label="Reference" value={order.payment_reference} />
          )}

          {order.delivery_address ? (
            <>
              <Dashed />
              <Text style={styles.sectionLabel}>DELIVERED TO</Text>
              <Text style={styles.address}>{order.delivery_address}</Text>
            </>
          ) : null}

          {order.note ? (
            <>
              <Text style={[styles.sectionLabel, { marginTop: 14 }]}>NOTE</Text>
              <Text style={styles.address}>{order.note}</Text>
            </>
          ) : null}

          <Dashed />
          <Text style={styles.thanks}>
            Thank you for ordering with HeyBite 💚
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={shareReceipt}>
          <Ionicons name="share-outline" size={18} color={COLORS.text} />
          <Text style={styles.primaryBtnText}>Share receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push("/(tabs)/order-detail")}
        >
          <Text style={styles.secondaryBtnText}>Back to orders</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  centered: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: "PlusJakarta-SemiBold",
  },
  scroll: { padding: 16, paddingBottom: 40 },

  paper: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { color: COLORS.text, fontSize: 17, fontFamily: "PlusJakarta-Bold" },
  paidBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 16,
  },
  paidBadgeText: {
    fontSize: 11,
    fontFamily: "PlusJakarta-Bold",
    letterSpacing: 0.5,
  },
  totalBig: {
    color: COLORS.text,
    fontSize: 32,
    textAlign: "center",
    marginTop: 12,
    fontFamily: "PlusJakarta-Bold",
  },
  sub: {
    color: COLORS.subtext,
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    fontFamily: "PlusJakarta-Regular",
  },

  sectionLabel: {
    color: COLORS.subtext,
    fontSize: 11,
    letterSpacing: 0.6,
    marginBottom: 10,
    fontFamily: "PlusJakarta-SemiBold",
  },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  thumb: { width: 40, height: 40, borderRadius: 8 },
  thumbEmpty: {
    backgroundColor: COLORS.chip,
    alignItems: "center",
    justifyContent: "center",
  },
  itemName: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  itemMeta: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },
  itemTotal: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    gap: 12,
  },
  rowLabel: {
    color: COLORS.subtext,
    fontSize: 13,
    fontFamily: "PlusJakarta-Regular",
  },
  rowLabelBold: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  rowValue: {
    color: COLORS.text,
    fontSize: 13,
    flexShrink: 1,
    textAlign: "right",
    fontFamily: "PlusJakarta-Regular",
  },
  rowValueBold: { fontSize: 18, fontFamily: "PlusJakarta-Bold" },

  address: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "PlusJakarta-Regular",
  },
  thanks: {
    color: COLORS.subtext,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "PlusJakarta-Regular",
  },

  primaryBtn: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: COLORS.green,
    borderRadius: 30,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "PlusJakarta-Bold",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 30,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  secondaryBtnText: {
    color: COLORS.subtext,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
});
