import GlassBackButton from "@/components/GlassBackButton";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackOrderScreen = () => {
  const timelineData = [
    {
      id: 1,
      title: "Order confirmed",
      subtitle: "HeyBite received your order",
      time: "9:41 AM",
      status: "completed",
      icon: "checkmark",
    },
    {
      id: 2,
      title: "Restaurant Preparing",
      subtitle: "In Progress...",
      status: "active",
      icon: "silverware-fork-knife",
      iconType: "material",
    },
    {
      id: 3,
      title: "Rider on the way",
      subtitle: "Your rider will pick up the order",
      status: "waiting",
      icon: "bike",
      iconType: "material",
    },
    {
      id: 4,
      title: "Almost there",
      subtitle: "Rider is nearby your location",
      status: "waiting",
      icon: "location-outline",
    },
    {
      id: 5,
      title: "Delivered!",
      subtitle: "Enjoy your meal!",
      status: "waiting",
      icon: "checkmark",
    },
  ];

  const orderItems = [
    {
      id: "1",
      title: "Jollof + Chicken",
      desc: "Regular • Extra spicy",
      qty: "x1",
      price: "₦2,200",
      bgColor: "#FF4500",
      icon: "fast-food",
    },
    {
      id: "2",
      title: "Beef Suya",
      desc: "Regular • Extra spicy",
      qty: "x2",
      price: "₦2,100",
      bgColor: "#D2691E",
      icon: "food-drumstick",
      iconType: "material",
    },
    {
      id: "3",
      title: "Chilled Zobo Drinks",
      desc: "Regular • Extra spicy",
      qty: "x1",
      price: "₦400",
      bgColor: "#1E90FF",
      icon: "local-drink",
      iconType: "material",
    },
  ];

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
              <Text style={styles.badgeText}>ORDER CONFIRMED</Text>
            </View>
            <Text style={styles.orderId}>#HB-20283</Text>
          </View>

          <Text style={styles.statusTitle}>Your order is confirmed! 🎉</Text>
          <Text style={styles.statusSubtitle}>
            Deco's Kitchen has received your order and will start preparing it
            shortly.
          </Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Order placed</Text>
              <Text style={styles.progressLabel}>15 min remaining</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
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

        {/* Rider Card */}
        <View style={styles.riderCard}>
          <View style={styles.riderInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={24} color="#FFB800" />
            </View>
            <View>
              <Text style={styles.riderLabel}>Rider</Text>
              <Text style={styles.riderName}>Emeka</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call" size={18} color="#00E676" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.chatButton]}>
              <Ionicons name="chatbubble" size={18} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Details Card */}
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderSectionTitle}>Your Order</Text>
            <Text style={styles.itemCount}>3 item</Text>
          </View>

          {orderItems.map((item) => (
            <View key={item.id} style={styles.orderItemRow}>
              <View
                style={[
                  styles.itemImageContainer,
                  { backgroundColor: item.bgColor },
                ]}
              >
                {item.iconType === "material" ? (
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color="#FFFFFF"
                  />
                ) : (
                  <Ionicons name={item.icon as any} size={22} color="#FFFFFF" />
                )}
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>

              <View style={styles.itemPricing}>
                <Text style={styles.itemQty}>{item.qty}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₦4,300</Text>
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

        {/* Cancel Payment Button */}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>✕ Cancel Payment</Text>
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
    fontWeight: "600",
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
    fontWeight: "500",
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
    fontWeight: "bold",
  },
  orderId: {
    color: "#8E8E93",
    fontSize: 12,
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  statusSubtitle: {
    color: "#A1A1A1",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
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
    fontWeight: "600",
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
    fontWeight: "600",
  },
  timelineSubtitle: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
  },
  timelineTime: {
    color: "#00E676",
    fontSize: 11,
    marginTop: 2,
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
    fontWeight: "600",
  },
  riderName: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
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
    fontWeight: "600",
  },
  itemCount: {
    color: "#00E676",
    fontSize: 12,
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
    fontWeight: "600",
  },
  itemDesc: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
  },
  itemPricing: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQty: {
    color: "#00E676",
    fontSize: 12,
    marginRight: 8,
  },
  itemPrice: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
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
    fontWeight: "bold",
  },
  totalValue: {
    color: "#00E676",
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "600",
  },
  supportSubtitle: {
    color: "#8E8E93",
    fontSize: 11,
    marginTop: 2,
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
    fontWeight: "500",
  },
});
