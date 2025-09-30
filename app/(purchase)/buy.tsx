import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Star, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { products } from '@/api/dummyData';

const sellers = [
    {
      id: 1,
      name: 'TechStore Pro',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 4999,
      originalPrice: 7999,
      rating: 4.8,
      deliveryTime: '2-3 days',
    },
    {
      id: 2,
      name: 'Gadget World',
      logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 5199,
      originalPrice: 7999,
      rating: 4.6,
      deliveryTime: '3-4 days',
    },
    {
      id: 3,
      name: 'ElectroHub',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 5399,
      originalPrice: 7999,
      rating: 4.4,
      deliveryTime: '4-5 days',
    }
  ];

export default function BuyScreen() {
  const { productId, sellerId } = useLocalSearchParams();
  const product = products.find(p => p.id === Number(productId));
  const seller = sellers.find(s => s.id === Number(sellerId));

  if (!product || !seller) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product or Seller not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Purchase</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.productSection}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>₹{seller.price.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Selected Seller</Text>
          <View style={styles.sellerCard}>
            <Image source={{ uri: seller.logo }} style={styles.sellerLogo} />
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{seller.name}</Text>
              <View style={styles.sellerRating}>
                <Star size={14} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{seller.rating}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Truck size={16} color="#6B7280" />
                <Text style={styles.deliveryText}>Est. Delivery: {seller.deliveryTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <MapPin size={20} color="#8B5CF6" />
            <View style={styles.addressDetails}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123 Main St, Apt 4B, New York, NY 10001</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeAddressText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/checkout')}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
  },
  productSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  sellerSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  sellerDetails: {
    flex: 1,
    marginLeft: 15,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
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
  addressSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
  },
  addressDetails: {
    flex: 1,
    marginLeft: 15,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  changeAddressText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkoutButton: {
    width: '100%',
  },
  checkoutGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutText: {
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