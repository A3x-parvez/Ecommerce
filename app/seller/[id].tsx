import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, ShoppingCart, Plus, Package } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const sellerData = {
  1: {
    id: 1,
    name: 'TechStore Pro',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'Electronic City, Bangalore, Karnataka',
    rating: 4.8,
    ordersCompleted: 15420,
    joinedDate: 'January 2020',
    description: 'Your trusted partner for premium electronics and gadgets. We provide authentic products with warranty and excellent customer service.',
    badges: ['Verified Seller', 'Fast Delivery', 'Top Rated'],
    stats: {
      positiveRating: 96,
      onTimeDelivery: 98,
      customerSatisfaction: 95
    }
  }
};

const sellerProducts = [
  {
    id: 1,
    name: 'Wireless Headphones Pro Max',
    price: 4999,
    originalPrice: 7999,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 2499,
    originalPrice: 3499,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1841149/pexels-photo-1841149.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: false
  },
  {
    id: 7,
    name: 'USB-C Hub',
    price: 1999,
    originalPrice: 2799,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/163140/computer-laptop-work-place-163140.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true
  }
];

export default function SellerScreen() {
  const { id, productId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<'products' | 'about'>('products');
  
  const sellerId = parseInt(id as string);
  const seller = sellerData[sellerId as keyof typeof sellerData];

  if (!seller) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Seller not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    // Mock add to cart functionality
    console.log('Added to cart:', product.name);
  };

  const renderProductCard = ({ item }: { item: typeof sellerProducts[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#FCD34D" fill="#FCD34D" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        </View>
        <View style={styles.productActions}>
          <Text style={[styles.stockStatus, { color: item.inStock ? '#10B981' : '#EF4444' }]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
          {item.inStock && (
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => handleAddToCart(item)}
            >
              <Plus size={16} color="#8B5CF6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Profile</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/cart')}>
          <ShoppingCart size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Seller Info */}
        <LinearGradient
          colors={['#8B5CF6', '#14B8A6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sellerHeader}
        >
          <View style={styles.sellerInfo}>
            <Image source={{ uri: seller.logo }} style={styles.sellerLogo} />
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{seller.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.sellerLocation}>{seller.address}</Text>
              </View>
              <Text style={styles.joinedDate}>Seller since {seller.joinedDate}</Text>
            </View>
          </View>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{seller.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{seller.ordersCompleted.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{seller.stats.positiveRating}%</Text>
              <Text style={styles.statLabel}>Positive</Text>
            </View>
          </View>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {seller.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'products' && styles.activeTab]}
            onPress={() => setSelectedTab('products')}
          >
            <Package size={20} color={selectedTab === 'products' ? '#8B5CF6' : '#6B7280'} />
            <Text style={[
              styles.tabText,
              selectedTab === 'products' && styles.activeTabText
            ]}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'about' && styles.activeTab]}
            onPress={() => setSelectedTab('about')}
          >
            <Star size={20} color={selectedTab === 'about' ? '#8B5CF6' : '#6B7280'} />
            <Text style={[
              styles.tabText,
              selectedTab === 'about' && styles.activeTabText
            ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedTab === 'products' ? (
          <View style={styles.productsContainer}>
            <Text style={styles.sectionTitle}>Products by {seller.name}</Text>
            <FlatList
              data={sellerProducts}
              renderItem={renderProductCard}
              numColumns={2}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
            />
          </View>
        ) : (
          <View style={styles.aboutContainer}>
            <Text style={styles.sectionTitle}>About {seller.name}</Text>
            <Text style={styles.description}>{seller.description}</Text>
            
            <Text style={styles.subSectionTitle}>Performance Metrics</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{seller.stats.onTimeDelivery}%</Text>
                <Text style={styles.metricLabel}>On-time Delivery</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{seller.stats.customerSatisfaction}%</Text>
                <Text style={styles.metricLabel}>Customer Satisfaction</Text>
              </View>
            </View>
          </View>
        )}

        {/* If coming from product page, show buy action */}
        {productId && (
          <View style={styles.buyActionContainer}>
            <TouchableOpacity style={styles.buyNowButton}>
              <LinearGradient
                colors={['#8B5CF6', '#14B8A6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyNowGradient}
              >
                <Text style={styles.buyNowText}>Buy from this Seller</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sellerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  sellerLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sellerDetails: {
    flex: 1,
    marginLeft: 20,
  },
  sellerName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sellerLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
  },
  joinedDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#F3E8FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  productsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 0.48,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  addToCartBtn: {
    backgroundColor: '#F3E8FF',
    padding: 6,
    borderRadius: 15,
  },
  aboutContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 30,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 15,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  buyActionContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  buyNowButton: {
    width: '100%',
  },
  buyNowGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
});