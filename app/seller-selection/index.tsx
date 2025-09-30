import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Truck, Shield, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const sellers = [
  {
    id: 1,
    name: 'TechStore Pro',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    deliveryTime: '2-3 days',
    ordersCompleted: 15420,
    isBestValue: true,
    offers: ['Bank Offer: 10% off', 'Free Installation'],
    badges: ['Verified Seller', 'Fast Delivery']
  },
  {
    id: 2,
    name: 'Gadget World',
    logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 5199,
    originalPrice: 7999,
    rating: 4.6,
    deliveryTime: '3-4 days',
    ordersCompleted: 8750,
    isBestValue: false,
    offers: ['1 Year Extended Warranty'],
    badges: ['Verified Seller']
  },
  {
    id: 3,
    name: 'ElectroHub',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 5399,
    originalPrice: 7999,
    rating: 4.4,
    deliveryTime: '4-5 days',
    ordersCompleted: 6230,
    isBestValue: false,
    offers: ['Free Shipping'],
    badges: ['New Seller']
  }
];

export default function SellerSelectionScreen() {
  const { productId } = useLocalSearchParams();

  const handleSellerSelect = (sellerId: number) => {
    const pId = Array.isArray(productId) ? productId[0] : productId;
    router.push({
      pathname: '/buy',
      params: { productId: pId, sellerId: sellerId.toString() },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Seller</Text>
        <View style={styles.headerButton} />
      </View>

      {/* Product Info */}
      <View style={styles.productHeader}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Wireless Headphones Pro Max</Text>
          <Text style={styles.productDescription}>Premium wireless headphones with ANC</Text>
        </View>
      </View>

      <ScrollView style={styles.sellersContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sellersTitle}>Available Sellers ({sellers.length})</Text>
        
        {sellers.map((seller) => (
          <TouchableOpacity
            key={seller.id}
            style={[
              styles.sellerCard,
              seller.isBestValue && styles.bestValueCard
            ]}
            onPress={() => handleSellerSelect(seller.id)}
          >
            {seller.isBestValue && (
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bestValueBadge}
              >
                <Award size={16} color="#FFFFFF" />
                <Text style={styles.bestValueText}>Best Value</Text>
              </LinearGradient>
            )}
            
            <View style={styles.sellerHeader}>
              <Image source={{ uri: seller.logo }} style={styles.sellerLogo} />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{seller.name}</Text>
                <View style={styles.sellerRating}>
                  <Star size={14} color="#FCD34D" fill="#FCD34D" />
                  <Text style={styles.ratingText}>{seller.rating}</Text>
                  <Text style={styles.ordersText}>({seller.ordersCompleted.toLocaleString()} orders)</Text>
                </View>
                <View style={styles.badgesContainer}>
                  {seller.badges.map((badge, index) => (
                    <View key={index} style={styles.badge}>
                      <Shield size={12} color="#10B981" />
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.priceSection}>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{seller.price.toLocaleString()}</Text>
                <Text style={styles.originalPrice}>₹{seller.originalPrice.toLocaleString()}</Text>
              </View>
              <Text style={styles.discount}>
                {Math.round(((seller.originalPrice - seller.price) / seller.originalPrice) * 100)}% off
              </Text>
            </View>

            <View style={styles.deliverySection}>
              <View style={styles.deliveryInfo}>
                <Truck size={16} color="#6B7280" />
                <Text style={styles.deliveryText}>Delivery in {seller.deliveryTime}</Text>
              </View>
            </View>

            {seller.offers.length > 0 && (
              <View style={styles.offersSection}>
                {seller.offers.map((offer, index) => (
                  <Text key={index} style={styles.offerText}>• {offer}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleSellerSelect(seller.id)}
            >
              <LinearGradient
                colors={['#8B5CF6', '#14B8A6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.selectButtonGradient}
              >
                <Text style={styles.selectButtonText}>Select Seller</Text>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  sellersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sellersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  sellerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bestValueCard: {
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -1,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bestValueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sellerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  sellerDetails: {
    flex: 1,
    marginLeft: 15,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    marginRight: 8,
  },
  ordersText: {
    fontSize: 12,
    color: '#6B7280',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '500',
    marginLeft: 4,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  deliverySection: {
    marginBottom: 15,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  offersSection: {
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  offerText: {
    fontSize: 12,
    color: '#065F46',
    marginBottom: 2,
  },
  selectButton: {
    marginTop: 10,
  },
  selectButtonGradient: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});