import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Share, Star, Plus, Minus, ShoppingCart, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const productData = {
  1: {
    id: 1,
    name: 'Wireless Headphones Pro Max',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649774/pexels-photo-1649774.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    price: 4999,
    originalPrice: 7999,
    rating: 4.5,
    reviewCount: 1234,
    description: 'Premium wireless headphones with active noise cancellation, crystal clear sound quality, and up to 30 hours of battery life. Perfect for music lovers and professionals.',
    features: [
      'Active Noise Cancellation',
      '30 Hours Battery Life',
      'Quick Charge (5 min = 2 hours)',
      'Premium Build Quality',
      'Wireless & Wired Modes',
      'Touch Controls'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32Ω',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    },
    inStock: true,
    seller: 'TechStore Pro',
    sellerId: 1,
    offers: [
      'Flat 37% off',
      'Bank Offer: 10% off on HDFC cards',
      'Exchange: Up to ₹2000 off'
    ]
  }
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const productId = parseInt(id as string);
  const product = productData[productId as keyof typeof productData];

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  const handleBuyNow = () => {
    // Check if user is logged in (mock check)
    const isLoggedIn = true; // This would come from your auth context
    
    if (!isLoggedIn) {
      Alert.alert(
        'Login Required',
        'Please login to continue with your purchase.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth/login') }
        ]
      );
      return;
    }
    
    // Navigate to seller selection
    router.push(`/seller-selection?productId=${product.id}`);
  };

  const handleSellerPress = () => {
    router.push(`/seller/${product.sellerId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={24} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              size={24}
              color={isWishlisted ? "#EC4899" : "#1F2937"}
              fill={isWishlisted ? "#EC4899" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImage(slideIndex);
            }}
          >
            {product.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === selectedImage ? '#8B5CF6' : '#E5E7EB' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
            <Text style={styles.discount}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
            </Text>
          </View>

          {/* Offers */}
          <View style={styles.offersContainer}>
            <Text style={styles.offersTitle}>Available Offers</Text>
            {product.offers.map((offer, index) => (
              <View key={index} style={styles.offerItem}>
                <Text style={styles.offerText}>• {offer}</Text>
              </View>
            ))}
          </View>

          {/* Seller Info */}
          <TouchableOpacity style={styles.sellerContainer} onPress={handleSellerPress}>
            <Text style={styles.sellerText}>Sold by: <Text style={styles.sellerName}>{product.seller}</Text></Text>
            <Text style={styles.viewSellerText}>View Seller</Text>
          </TouchableOpacity>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} color="#6B7280" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {product.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>• {feature}</Text>
            ))}
          </View>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}:</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#8B5CF6" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyNowGradient}
          >
            <Zap size={20} color="#FFFFFF" />
            <Text style={styles.buyNowText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discount: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
  offersContainer: {
    backgroundColor: '#F0FDF4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 10,
  },
  offerItem: {
    marginBottom: 5,
  },
  offerText: {
    fontSize: 14,
    color: '#047857',
  },
  sellerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    marginBottom: 20,
  },
  sellerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  sellerName: {
    color: '#1F2937',
    fontWeight: '500',
  },
  viewSellerText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 15,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  feature: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    paddingLeft: 10,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  specKey: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F3E8FF',
    borderRadius: 25,
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B5CF6',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 0.6,
  },
  buyNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
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