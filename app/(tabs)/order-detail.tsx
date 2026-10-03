import GlassBackButton from "@/components/GlassBackButton";
import { formatOrderDate } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
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
  food_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};

type Order = {
  id: number;
  status: string;
  total: number;
  created_at: string;
  order_items: OrderItem[];
};

type Tab = "all" | "delivered" | "cancelled";

const ACTIVE_STATUSES = ["pending", "confirmed", "preparing", "on_the_way"];

const STATUS: Record<
  string,
  { label: string; icon: string; color: string; bg: string }
> = {
  delivered: {
    label: "Delivered",
    icon: "checkmark",
    color: COLORS.green,
    bg: "rgba(34,197,94,0.15)",
  },
  cancelled: {
    label: "Cancelled",
    icon: "close",
    color: COLORS.red,
    bg: "rgba(239,68,68,0.12)",
  },
  pending: {
    label: "Pending",
    icon: "time-outline",
    color: COLORS.amber,
    bg: "rgba(245,166,35,0.15)",
  },
  confirmed: {
    label: "Confirmed",
    icon: "checkmark-circle-outline",
    color: COLORS.amber,
    bg: "rgba(245,166,35,0.15)",
  },
  preparing: {
    label: "Preparing",
    icon: "flame-outline",
    color: COLORS.amber,
    bg: "rgba(245,166,35,0.15)",
  },
  on_the_way: {
    label: "On the way",
    icon: "bicycle-outline",
    color: COLORS.amber,
    bg: "rgba(245,166,35,0.15)",
  },
};

const notify = (title: string, message: string) =>
  Platform.OS === "web"
    ? window.alert(`${title}\n${message}`)
    : Alert.alert(title, message);

type Action = {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
};

function OrderCard({
  order,
  onReorder,
}: {
  order: Order;
  onReorder: (o: Order) => void;
}) {
  const status = STATUS[order.status] ?? STATUS.pending;
  const first = order.order_items[0];
  const summary = order.order_items.map((i) => i.name).join(", ");
  const openDetail = () =>
    router.push({ pathname: "/receipt", params: { orderId: order.id } });

  let actions: Action[] = [];
  if (order.status === "delivered") {
    actions = [
      {
        label: "Reorder",
        icon: "refresh",
        color: COLORS.green,
        onPress: () => onReorder(order),
      },
      {
        label: "Rate order",
        icon: "star",
        color: "#FACC15",
        onPress: () => notify("Coming soon", "Ratings are not available yet."),
      },
      {
        label: "Receipt",
        icon: "document-text-outline",
        color: COLORS.subtext,
        onPress: openDetail,
      },
    ];
  } else if (order.status === "cancelled") {
    actions = [
      {
        label: "Reorder",
        icon: "refresh",
        color: COLORS.green,
        onPress: () => onReorder(order),
      },
      {
        label: "Get refund",
        icon: "alert-circle",
        color: COLORS.red,
        onPress: () =>
          notify("Coming soon", "Refund requests are not available yet."),
      },
    ];
  } else {
    actions = [
      {
        label: "Track order",
        icon: "navigate-outline",
        color: COLORS.green,
        onPress: () =>
          router.push({
            pathname: "/TrackOrder",
            params: { orderId: order.id },
          }),
      },
      {
        label: "Details",
        icon: "document-text-outline",
        color: COLORS.subtext,
        onPress: openDetail,
      },
    ];
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardTop}
        activeOpacity={0.8}
        onPress={openDetail}
      >
        {first?.image ? (
          <Image
            source={{ uri: first.image }}
            style={styles.thumb}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.thumb, styles.thumbEmpty]}>
            <Ionicons
              name="fast-food-outline"
              size={22}
              color={COLORS.subtext}
            />
          </View>
        )}

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>Order #{order.id}</Text>
            <View style={[styles.badge, { backgroundColor: status.bg }]}>
              <Ionicons
                name={status.icon as any}
                size={11}
                color={status.color}
              />
              <Text style={[styles.badgeText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          </View>
          <Text style={styles.cardItems} numberOfLines={1}>
            {summary}
          </Text>
          <Text style={styles.cardMeta}>
            {formatOrderDate(order.created_at)} • ₦
            {order.total.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        {actions.map((a, i) => (
          <TouchableOpacity
            key={a.label}
            style={[styles.action, i > 0 && styles.actionDivider]}
            onPress={a.onPress}
          >
            <Ionicons name={a.icon as any} size={13} color={a.color} />
            <Text style={[styles.actionText, { color: a.color }]}>
              {a.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, status, total, created_at, order_items(id, food_id, name, price, quantity, image)",
      )
      .order("created_at", { ascending: false });

    if (error) console.error("ORDERS ERROR:", error);
    else setOrders(data as Order[]);
    setLoading(false);
  }, []);

  // refetch every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const counts = useMemo(
    () => ({
      all: orders.length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    }),
    [orders],
  );

  const visible = useMemo(
    () => (tab === "all" ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab],
  );

  const activeOrder = orders.find((o) => ACTIVE_STATUSES.includes(o.status));

  const reorder = (order: Order) => {
    order.order_items.forEach((i) =>
      addToCart({
        id: i.food_id,
        name: i.name,
        image: i.image ?? "",
        price: i.price,
        quantity: i.quantity,
      }),
    );
    router.push("/(tabs)/cart");
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <TouchableOpacity
              key={t.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setTab(t.key)}
            >
              <Text style={[styles.tabText, active && { color: COLORS.text }]}>
                {t.label}
              </Text>
              <View style={styles.countPill}>
                <Text style={styles.countText}>{counts[t.key]}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.green} />
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(o) => String(o.id)}
          renderItem={({ item }) => (
            <OrderCard order={item} onReorder={reorder} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.green}
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="receipt-outline" size={48} color="#333740" />
              <Text style={styles.emptyTitle}>No orders here</Text>
              <Text style={styles.emptySub}>Your orders will appear here</Text>
            </View>
          }
          ListFooterComponent={
            <View style={{ gap: 12, marginTop: 8 }}>
              {activeOrder && (
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/TrackOrder",
                      params: { orderId: activeOrder.id },
                    })
                  }
                >
                  <Text style={styles.primaryBtnText}>Track my order</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={COLORS.text}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.replace("/(tabs)")}
              >
                <Text style={styles.secondaryBtnText}>Back to home</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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

  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: { borderBottomColor: COLORS.green },
  tabText: {
    color: COLORS.subtext,
    fontSize: 13,
    fontFamily: "PlusJakarta-Medium",
  },
  countPill: {
    backgroundColor: COLORS.chip,
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignItems: "center",
  },
  countText: {
    color: COLORS.subtext,
    fontSize: 10,
    fontFamily: "PlusJakarta-SemiBold",
  },

  listContent: { padding: 16, paddingBottom: 130 }, // room for the tab bar

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardTop: { flexDirection: "row", alignItems: "center", padding: 12 },
  thumb: { width: 52, height: 52, borderRadius: 10 },
  thumbEmpty: {
    backgroundColor: COLORS.chip,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { fontSize: 10, fontFamily: "PlusJakarta-SemiBold" },
  cardItems: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 3,
    fontFamily: "PlusJakarta-Regular",
  },
  cardMeta: {
    color: COLORS.text,
    fontSize: 12,
    marginTop: 3,
    fontFamily: "PlusJakarta-Regular",
  },

  actionsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  action: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  actionDivider: { borderLeftWidth: 1, borderLeftColor: COLORS.cardBorder },
  actionText: { fontSize: 11, fontFamily: "PlusJakarta-Medium" },

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
  },
  secondaryBtnText: {
    color: COLORS.subtext,
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },

  empty: { alignItems: "center", paddingVertical: 60 },
  emptyTitle: {
    color: "#62666F",
    fontSize: 16,
    marginTop: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  emptySub: {
    color: "#474B52",
    fontSize: 13,
    marginTop: 4,
    fontFamily: "PlusJakarta-Regular",
  },
});
