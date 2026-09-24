import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderAgainCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Section Header */}
      <Text style={styles.sectionHeader}>Order Again</Text>

      {/* The Card Component */}
      <View style={styles.card}>
        
        {/* Left Side: Image/Icon */}
        <View style={styles.imageContainer}>
          {/* Using a placeholder image here. In production, use the actual bowl icon */}
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} 
            style={styles.foodIcon}
            resizeMode="contain"
          />
        </View>

        {/* Middle Side: Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.lastOrderText}>
            LAST ORDER • 2 DAYS AGO
          </Text>
          
          <Text style={styles.orderTitle} numberOfLines={1}>
            Jollof + Fried Chicken
          </Text>
          
          <View style={styles.restaurantRow}>
            <Text style={styles.restaurantName}>Deco Kitchen</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.price}>₦2,800</Text>
          </View>
        </View>

        {/* Right Side: Reorder Button */}
        <TouchableOpacity style={styles.reorderButton} activeOpacity={0.8}>
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background like the screenshot
    padding: 16,
    justifyContent: 'center', // Center for demo purposes
    
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
     fontFamily: "PlusJakarta-SemiBold",
  },
  card: {
    backgroundColor: '#0F2E1D', // Dark Green Background
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F4D33', // Slight border for depth
  },
  imageContainer: {
    backgroundColor: '#0A1F14', // Even darker green for the icon background
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  foodIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF', // Ensures the icon is white
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lastOrderText: {
    color: '#4ADE80', // Bright Green
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
     fontFamily: "PlusJakarta-SemiBold",
  },
  orderTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
     fontFamily: "PlusJakarta-Bold",
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantName: {
    color: '#E0E0E0',
    fontSize: 13,
     fontFamily: "PlusJakarta-SemiBold",
  },
  dot: {
    color: '#4ADE80',
    marginHorizontal: 4,
    fontSize: 13,
    fontWeight: 'bold',
  },
  price: {
    color: '#4ADE80', // Bright Green
    fontSize: 13,
    fontWeight: '700',
  },
  reorderButton: {
    backgroundColor: '#4ADE80', // Bright Green Button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  reorderText: {
    color: '#003318', // Dark Green Text for contrast
    fontWeight: 'bold',
    fontSize: 14,
     fontFamily: "PlusJakarta-Bold",
  },
});

export default OrderAgainCard;