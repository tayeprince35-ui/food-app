import GlassBackButton from "@/components/GlassBackButton";
import { formatDate } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  delivery_address: string;
  created_at: string;
  order_items: OrderItem[];
};

const STATUS_ORDER = [
  "pending",
  "confirmed",
  "preparing",
  "on_the_way",
  "delivered",
];

const TIMELINE = [
  {
    title: "Order placed",
    subtitle: "Waiting for HeyBite to confirm",
    icon: "receipt-outline",
  },
  {
    title: "Order confirmed",
    subtitle: "HeyBite received your order",
    icon: "checkmark",
  },
  {
    title: "Restaurant preparing",
    subtitle: "In progress...",
    icon: "silverware-fork-knife",
    iconType: "material",
  },
  {
    title: "Rider on the way",
    subtitle: "Your order is on its way",
    icon: "bike",
    iconType: "material",
  },
  { title: "Delivered!", subtitle: "Enjoy your meal!", icon: "checkmark" },
];

const STATUS_INFO: Record<
  string,
  { badge: string; title: string; subtitle: string; progress: number }
> = {
  pending: {
    badge: "ORDER PLACED",
    title: "Order placed! 🎉",
    subtitle: "Waiting for HeyBite to confirm your order.",
    progress: 0.15,
  },
  confirmed: {
    badge: "ORDER CONFIRMED",
    title: "Your order is confirmed!",
    subtitle: "HeyBite will start preparing it shortly.",
    progress: 0.35,
  },
  preparing: {
    badge: "PREPARING",
    title: "Your food is being made",
    subtitle: "The restaurant is preparing your order.",
    progress: 0.55,
  },
  on_the_way: {
    badge: "ON THE WAY",
    title: "Your order is on the way!",
    subtitle: "Your rider is heading to you.",
    progress: 0.8,
  },
  delivered: {
    badge: "DELIVERED",
    title: "Delivered!",
    subtitle: "Enjoy your meal!",
    progress: 1,
  },
  cancelled: {
    badge: "CANCELLED",
    title: "Order cancelled",
    subtitle: "This order was cancelled.",
    progress: 0,
  },
};

const TrackOrderScreen = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (error) console.error("TRACK ORDER ERROR:", error);
    else setOrder(data as Order);
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    const timer = setInterval(fetchOrder, 15000); // refresh every 15s
    return () => clearInterval(timer);
  }, [fetchOrder]);

  useEffect(() => {
    if (!orderId) return;

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder((prev) =>
            prev ? { ...prev, ...(payload.new as Partial<Order>) } : prev,
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);
  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#00E676" />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "#FFF" }}>Order not found.</Text>
      </SafeAreaView>
    );
  }

  const info = STATUS_INFO[order.status] ?? STATUS_INFO.pending;
  const currentIndex = STATUS_ORDER.indexOf(order.status);
  const itemCount = order.order_items.reduce((sum, i) => sum + i.quantity, 0);

  const timelineData = TIMELINE.map((step, i) => ({
    ...step,
    id: i,
    status:
      currentIndex === -1
        ? "waiting"
        : i < currentIndex ||
            (i === currentIndex && order.status === "delivered")
          ? "completed"
          : i === currentIndex
            ? "active"
            : "waiting",
    time: i === 0 ? formatDate(order.created_at) : undefined,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <GlassBackButton />
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{info.badge}</Text>
            </View>
            <Text style={styles.orderId}>#{order.id}</Text>
          </View>

          <Text style={styles.statusTitle}>{info.title}</Text>
          <Text style={styles.statusSubtitle}>{info.subtitle}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Order placed</Text>
              <Text style={styles.progressLabel}>
                {order.status === "delivered"
                  ? "Delivered"
                  : "Estimated 10-20 min"}
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${info.progress * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <Text style={styles.sectionTitle}>Order timeline</Text>
        <View style={styles.timelineContainer}>
          {timelineData.map((item, index) => {
            const isCompleted = item.status === "completed";
            const isActive = item.status === "active";
            const isLast = index === timelineData.length - 1;

            return (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      isCompleted && styles.circleCompleted,
                      isActive && styles.circleActive,
                    ]}
                  >
                    {item.iconType === "material" ? (
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={16}
                        color={isCompleted || isActive ? "#FFFFFF" : "#8E8E93"}
                      />
                    ) : (
                      <Ionicons
                        name={item.icon as any}
                        size={16}
                        color={isCompleted || isActive ? "#FFFFFF" : "#8E8E93"}
                      />
                    )}
                  </View>
                  {!isLast && <View style={styles.verticalLine} />}
                </View>

                <View style={styles.timelineRight}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text
                    style={[
                      styles.timelineSubtitle,
                      isActive && { color: "#FFB800" },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                  {item.time && (
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Order Details Card */}
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderSectionTitle}>Your Order</Text>
            <Text style={styles.itemCount}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Text>
          </View>

          {order.order_items.map((item) => (
            <View key={item.id} style={styles.orderItemRow}>
              <Image
                source={{ uri: item.image ?? undefined }}
                style={styles.itemImageContainer}
                contentFit="cover"
              />

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>

              <View style={styles.itemPricing}>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₦{order.total.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Help Button Card */}
        <TouchableOpacity style={styles.supportCard}>
          <View style={styles.supportLeft}>
            <Feather name="headphones" size={20} color="#FFFFFF" />
            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>
                Need help with your order?
              </Text>
              <Text style={styles.supportSubtitle}>
                Chat with HeyBite support
              </Text>
            </View>
          </View>
          <Feather name="arrow-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "PlusJakarta-SemiBold",
  },
  helpButton: {
    borderWidth: 1,
    borderColor: "#00E676",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  helpText: {
    color: "#00E676",
    fontSize: 14,
    fontFamily: "PlusJakarta-Medium",
  },

  /* Card Base */
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },

  /* Status Card */
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00E676",
    marginRight: 6,
  },
  badgeText: {
    color: "#00E676",
    fontSize: 10,
    fontFamily: "PlusJakarta-Bold",
  },
  orderId: {
    color: "#8E8E93",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
    marginBottom: 6,
  },
  statusSubtitle: {
    color: "#A1A1A1",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    fontFamily: "PlusJakarta-Regular",
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    color: "#8E8E93",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#2C2C2E",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "25%",
    height: "100%",
    backgroundColor: "#00E676",
  },

  /* Timeline */
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "PlusJakarta-SemiBold",
    marginTop: 12,
    marginBottom: 12,
  },
  timelineContainer: {
    paddingLeft: 4,
    marginBottom: 8,
  },
  timelineItem: {
    flexDirection: "row",
    minHeight: 56,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 14,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },
  circleCompleted: {
    backgroundColor: "#00E676",
    borderColor: "#00E676",
  },
  circleActive: {
    backgroundColor: "#1C1C1E",
    borderColor: "#00E676",
  },
  verticalLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#2C2C2E",
    marginVertical: 4,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  timelineSubtitle: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },
  timelineTime: {
    color: "#00E676",
    fontSize: 11,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },

  /* Rider Card */
  riderCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  riderLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  riderName: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  chatButton: {
    backgroundColor: "#2C2C2E",
  },

  /* Order Card */
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderSectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "PlusJakarta-SemiBold",
  },
  itemCount: {
    color: "#00E676",
    fontSize: 12,
    fontFamily: "PlusJakarta-Regular",
  },
  orderItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  itemDesc: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },
  itemPricing: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQty: {
    color: "#00E676",
    fontSize: 12,
    marginRight: 8,
    fontFamily: "PlusJakarta-Regular",
  },
  itemPrice: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PlusJakarta-SemiBold",
  },
  divider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "PlusJakarta-Bold",
  },
  totalValue: {
    color: "#00E676",
    fontSize: 18,
    fontFamily: "PlusJakarta-Bold",
  },

  /* Support Card */
  supportCard: {
    backgroundColor: "#3E0000",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  supportLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportTextContainer: {
    marginLeft: 12,
  },
  supportTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "PlusJakarta-SemiBold",
  },
  supportSubtitle: {
    color: "#8E8E93",
    fontSize: 11,
    marginTop: 2,
    fontFamily: "PlusJakarta-Regular",
  },

  /* Cancel Button */
  cancelButton: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3A1515",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: {
    color: "#FF3B30",
    fontSize: 14,
    fontFamily: "PlusJakarta-Medium",
  },
});
