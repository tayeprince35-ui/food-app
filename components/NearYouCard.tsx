import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PopularNearAAUCard = ({
  image,
  title,
  rating,
  deliveryTime,
  startingPrice,
  onPress,
}: {
  image: string;
  title: string;
  rating: number;
  deliveryTime: string;
  startingPrice: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Top Image */}
      <Image
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Restaurant/Food Title */}
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>

        {/* Rating & Delivery Time Row */}
        <View style={styles.metaRow}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.timeText}>{deliveryTime}</Text>
        </View>

        {/* Starting Price Tag */}
        <Text style={styles.priceText}>
          From ₦{startingPrice.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 170,
    backgroundColor: "#16191C", // Dark card background matching the image
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#262A2E",
    marginRight: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  contentContainer: {
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starIcon: {
    color: "#FBBF24",
    fontSize: 13,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D1D5DB",
  },
  bulletDot: {
    color: "#6B7280",
    fontSize: 12,
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22C55E", // Green text for price
  },
});

export default PopularNearAAUCard;
