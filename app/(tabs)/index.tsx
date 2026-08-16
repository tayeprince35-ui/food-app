import POPULAR_ITEMS from '@/data/food';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import { useCartStore } from '@/store/cartStore';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'restaurant-outline' },
  { id: 'Jollof', name: 'Jollof', icon: 'flame-outline' },
  { id: 'Burger', name: 'Burgers', icon: 'fast-food-outline' },
  { id: 'Pizza', name: 'Pizza', icon: 'pizza-outline' },
  { id: 'Swallow', name: 'Swallow', icon: 'restaurant-outline' },
  { id: 'Chicken', name: 'Chicken', icon: 'flame-outline' },
  { id: 'Rice', name: 'Rice', icon: 'restaurant-outline' },
  { id: 'Special', name: 'Special', icon: 'star-outline' },
];

export default function Home() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFoods = POPULAR_ITEMS.filter((item) => {
    const matchCategory =
      activeCategory === 'all' || activeCategory === item.category;
    const matchSearch = item.name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase().trim());
    return matchCategory && matchSearch;
  });
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header (Location & Profile Avatar) */}
        <View style={styles.header}>
          <View>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#FF8A3D" />
              <Text style={styles.locationLabel}>Deliver to</Text>
              <Ionicons name="chevron-down" size={14} color="#777B84" />
            </View>
            <Text style={styles.locationAddress}>Admiralty Way, Lekki</Text>
          </View>

          <Pressable
            onPress={() => router.push('./profile')}
            style={({ pressed }) => [
              styles.avatarButton,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.avatarText}>S</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#777B84" />
            <TextInput
              placeholder="Search dishes, restaurants..."
              placeholderTextColor="#777B84"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.filterButton,
              pressed && styles.pressed,
            ]}>
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <View style={styles.promocatergory}>
              <Text style={styles.promocatergoryText}>OFFER</Text>
            </View>
            <Text style={styles.promoTitle}>30% OFF</Text>
            <Text style={styles.promoSubtitle}>On your first order today!</Text>

            <Pressable
              style={({ pressed }) => [
                styles.claimButton,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.claimButtonText}>Claim Now</Text>
            </Pressable>
          </View>

          <Ionicons
            name="fast-food"
            size={100}
            color="rgba(255, 138, 61, 0.25)"
            style={styles.promoBgIcon}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <Pressable
                  key={category.id}
                  onPress={() => setActiveCategory(category.id)}
                  style={({ pressed }) => [
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons
                    name={category.icon as any}
                    size={18}
                    color={isActive ? '#FFFFFF' : '#777B84'}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.categoryTextActive,
                    ]}>
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Popular Near You */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Near You</Text>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>

          <View style={styles.foodList}>
            {filteredFoods.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.foodCard,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: '/food/[id]',
                    params: { id: item.id.toString() },
                  })
                }>
                <Image source={{ uri: item.image }} style={styles.foodImage} />

                <View style={styles.categoryContainer}>
                  <Text style={styles.foodCategoryText}>{item.category}</Text>
                </View>
                <View style={styles.foodDetails}>
                  <View style={styles.foodHeaderRow}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>
                      ₦{item.price.toLocaleString()}
                    </Text>
                  </View>

                  <Text style={styles.restaurantName}>{item.restaurant}</Text>

                  <View style={styles.foodMetaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={14} color="#F5A623" />
                      <Text style={styles.metaTextBold}>{item.rating}</Text>
                    </View>

                    <Text style={styles.metaDot}>•</Text>

                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={14} color="#777B84" />
                      <Text style={styles.metaText}>{item.deliveryTime}</Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                        })
                      }
                      style={({ pressed }) => [
                        styles.addButton,
                        pressed && styles.pressed,
                      ]}>
                      <Ionicons name="add" size={18} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable style={styles.navItem}>
          <Ionicons name="home" size={22} color="#FF8A3D" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Ionicons name="search" size={22} color="#62666F" />
          <Text style={styles.navLabel}>Explore</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => router.push('/cart')}>
          <Ionicons name="cart-outline" size={22} color="#62666F" />
          <Text style={styles.navLabel}>Cart</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('./profile')}>
          <Ionicons name="person-outline" size={22} color="#62666F" />
          <Text style={styles.navLabel}>Profile</Text>
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
    paddingBottom: 100, // room for bottom nav
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationLabel: {
    fontSize: 11,
    color: '#777B84',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  locationAddress: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 138, 61, 0.15)',
    borderWidth: 1.5,
    borderColor: '#FF8A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8A3D',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 50,
    backgroundColor: '#121418',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterButton: {
    height: 50,
    width: 50,
    backgroundColor: '#FF8A3D',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#15171B',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  promoTextContainer: {
    zIndex: 1,
  },
  promocatergory: {
    backgroundColor: 'rgba(255, 138, 61, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promocatergoryText: {
    color: '#FF8A3D',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  promoTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promoSubtitle: {
    fontSize: 13,
    color: '#777B84',
    marginTop: 2,
  },
  claimButton: {
    marginTop: 14,
    backgroundColor: '#FF8A3D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promoBgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF8A3D',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121418',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#FF8A3D',
    borderColor: '#FF8A3D',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777B84',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  foodList: {
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 16,
  },
  foodCard: {
    backgroundColor: '#121418',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 160,
  },
  categoryContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(8, 9, 11, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  foodCategoryText: {
    color: '#FF8A3D',
    fontSize: 11,
    fontWeight: 'bold',
  },
  foodDetails: {
    padding: 16,
  },
  foodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8A3D',
  },
  restaurantName: {
    fontSize: 12,
    color: '#777B84',
    marginTop: 2,
  },
  foodMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaTextBold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metaText: {
    fontSize: 12,
    color: '#777B84',
  },
  metaDot: {
    color: '#777B84',
    marginHorizontal: 8,
  },
  addButton: {
    marginLeft: 'auto',
    height: 32,
    width: 32,
    borderRadius: 10,
    backgroundColor: '#FF8A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#121418',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    gap: 2,
  },
  navLabel: {
    fontSize: 10,
    color: '#62666F',
  },
  navLabelActive: {
    color: '#FF8A3D',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});
