import { typography } from "@/constants/typography";
import { BlurView } from "expo-blur"; // If you don't have expo-blur, I added a fallback below
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RestaurantAndMeal } from "@/data/food";
import FavoriteButton from "./FavoriteButton";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.4;

interface RestaurantDetailModalProps {
  restaurant: RestaurantAndMeal | null;
  visible: boolean;
  onClose: () => void;
}

// Fallback for BlurView if you don't have expo-blur installed
const GlassView = ({ children, style }: any) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView intensity={40} tint="dark" style={style}>
        {children}
      </BlurView>
    );
  }
  return (
    <View style={[style, { backgroundColor: "rgba(30,30,30,0.85)" }]}>
      {children}
    </View>
  );
};

export default function RestaurantDetailModal({
  restaurant,
  visible,
  onClose,
}: RestaurantDetailModalProps) {
  if (!restaurant) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Main Content Area */}
        <View style={styles.contentContainer}>
          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
          >
            {/* Header Image Section */}
            <View style={styles.imageHeader}>
              <Image
                source={{
                  uri:
                    restaurant.image ||
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
                }}
                style={styles.headerImage}
                resizeMode="cover"
              />
              {/* Gradient Overlay (Simulated with a dark view at the bottom of the image) */}
              <View style={styles.imageGradient} />
            </View>

            {/* Info Section overlapping the image */}
            <View style={styles.infoSection}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{restaurant.restaurant}</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                </View>
              </View>

              <Text style={styles.subtitle}>
                {restaurant.rating} reviews • {restaurant.deliveryTime}
              </Text>

              <View style={styles.tagRow}>
               
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Free delivery</Text>
                  </View>
                
                {restaurant.categories.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Menu Section (Mocked) */}
              <Text style={styles.sectionTitle}>Popular Items</Text>

              {/* Mock Menu Item 1 */}
              <View style={styles.menuItem}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop",
                  }}
                  style={styles.menuImage}
                />
                <View style={styles.menuInfo}>
                  <Text style={styles.menuName}>Classic Cheeseburger</Text>
                  <Text style={styles.menuPrice}>₦4,500</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Mock Menu Item 2 */}
              <View style={styles.menuItem}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop",
                  }}
                  style={styles.menuImage}
                />
                <View style={styles.menuInfo}>
                  <Text style={styles.menuName}>Caesar Salad</Text>
                  <Text style={styles.menuPrice}>₦3,200</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Spacer for bottom bar */}
              <View style={{ height: 100 }} />
            </View>
          </ScrollView>

          {/* Floating Action Buttons (Overlay) */}
          <View style={styles.floatingHeader}>
            <TouchableOpacity onPress={onClose} style={styles.glassButton}>
              <GlassView style={styles.glassInner}>
                <Text style={styles.glassIcon}>✕</Text>
              </GlassView>
            </TouchableOpacity>

            <TouchableOpacity style={styles.glassButton}>
              <GlassView style={styles.glassInner}>
                <Text
                  style={
                    styles.glassIcon}
                >
                 <FavoriteButton id={restaurant.id.toString()}/>
                </Text>
              </GlassView>
            </TouchableOpacity>
          </View>

          {/* Sticky Bottom Bar */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>View Cart • 2 items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
     justifyContent: "flex-end",
  },
  contentContainer: {
    height: height * 0.74, // Leaves a little gap at the top
    backgroundColor: "#111111",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    position: "relative",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageHeader: {
    height: HEADER_HEIGHT,
    width: "100%",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(17,17,17,0.8)", // Fades into the #111 background
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    marginTop: -30, // Pull up to overlap the image slightly
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontFamily: typography.bold?.fontFamily || "System",
    fontWeight: "bold",
    flex: 1,
    marginRight: 16,
  },
  ratingBadge: {
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: "#ccc",
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 16,
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#333",
  },
  menuInfo: {
    flex: 1,
    marginLeft: 16,
  },
  menuName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  menuPrice: {
    color: "#00BC4F",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#00BC4F",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#00BC4F",
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "300",
  },

  // Floating Header
  floatingHeader: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  glassButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  glassInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  glassIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Bottom Bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111111",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  checkoutButton: {
    backgroundColor: "#00BC4F",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
