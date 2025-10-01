import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, ShoppingCart, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { products, Product, Review } from '@/api/dummyData'; // Import central data and types

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const productId = parseInt(id as string);
  // --- UPDATED: Load product from the central dummyData file ---
  const product = products.find(p => p.id === productId);

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
    const isLoggedIn = true; 
    if (!isLoggedIn) {
      Alert.alert('Login Required','Please login to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth/login') }
        ]
      );
      return;
    }
    router.push(`/seller-selection?productId=${product.id}`);
  };

  const handleSellerPress = () => {
    if (product.sellerId) {
        router.push(`/seller/${product.sellerId}`);
    }
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
            <Share2 size={24} color="#1F2937" />
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
            {product.images?.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicators}>
            {product.images?.map((_, index) => (
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
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount?.toLocaleString()} reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            {product.originalPrice && <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>}
            {product.originalPrice && <Text style={styles.discount}>{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</Text>}
          </View>

          {product.offers && (
            <View style={styles.offersContainer}>
              <Text style={styles.offersTitle}>Available Offers</Text>
              {product.offers.map((offer, index) => (
                <View key={index} style={styles.offerItem}><Text style={styles.offerText}>• {offer}</Text></View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.sellerContainer} onPress={handleSellerPress}>
            <Text style={styles.sellerText}>Sold by: <Text style={styles.sellerName}>{product.seller}</Text></Text>
            <Text style={styles.viewSellerText}>View Seller</Text>
          </TouchableOpacity>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} color="#6B7280" /></TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}><Plus size={16} color="#6B7280" /></TouchableOpacity>
            </View>
          </View>

          {product.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {product.features && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              {product.features.map((feature, index) => <Text key={index} style={styles.feature}>• {feature}</Text>)}
            </View>
          )}

          {product.specifications && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              {Object.entries(product.specifications).map(([key, value]) => (
                <View key={key} style={styles.specRow}><Text style={styles.specKey}>{key}:</Text><Text style={styles.specValue}>{value}</Text></View>
              ))}
            </View>
          )}
        </View>

        {/* --- NEW: RATINGS & REVIEWS SECTION --- */}
        {product.reviews && product.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
            {product.reviews.map((review: Review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                  <View>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.reviewRating}>
                      <Star size={14} color="#FBBF24" fill="#FBBF24" />
                      <Text style={styles.reviewRatingText}>{review.rating}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#8B5CF6" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <LinearGradient colors={['#8B5CF6', '#14B8A6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buyNowGradient}>
            <Zap size={20} color="#FFFFFF" />
            <Text style={styles.buyNowText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerButton: { padding: 8 },
  headerActions: { flexDirection: 'row' },
  imageContainer: { position: 'relative' },
  productImage: { width: width, height: 300, resizeMode: 'cover' },
  imageIndicators: { flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 15, width: '100%' },
  indicator: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  productInfo: { padding: 20 },
  productName: { fontSize: 24, fontWeight: '600', color: '#1F2937', marginBottom: 10 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 10 },
  ratingText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500', marginLeft: 4 },
  reviewCount: { fontSize: 14, color: '#6B7280' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  price: { fontSize: 28, fontWeight: '600', color: '#8B5CF6', marginRight: 10 },
  originalPrice: { fontSize: 18, color: '#9CA3AF', textDecorationLine: 'line-through', marginRight: 10 },
  discount: { fontSize: 16, color: '#10B981', fontWeight: '500' },
  offersContainer: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20 },
  offersTitle: { fontSize: 16, fontWeight: '600', color: '#065F46', marginBottom: 10 },
  offerItem: { marginBottom: 5 },
  offerText: { fontSize: 14, color: '#047857' },
  sellerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#F9FAFB', borderRadius: 10, marginBottom: 20 },
  sellerText: { fontSize: 14, color: '#6B7280' },
  sellerName: { color: '#1F2937', fontWeight: '500' },
  viewSellerText: { fontSize: 14, color: '#8B5CF6', fontWeight: '500' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  quantityLabel: { fontSize: 16, fontWeight: '500', color: '#1F2937', marginRight: 15 },
  quantitySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 20, padding: 5 },
  quantityButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  quantityText: { fontSize: 16, fontWeight: '500', paddingHorizontal: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 15 },
  description: { fontSize: 16, color: '#6B7280', lineHeight: 24 },
  feature: { fontSize: 14, color: '#6B7280', marginBottom: 8, paddingLeft: 10 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  specKey: { fontSize: 14, color: '#1F2937', fontWeight: '500' },
  specValue: { fontSize: 14, color: '#6B7280' },
  bottomActions: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  addToCartButton: { flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, backgroundColor: '#F3E8FF', borderRadius: 25, marginRight: 10 },
  addToCartText: { fontSize: 16, fontWeight: '500', color: '#8B5CF6', marginLeft: 8 },
  buyNowButton: { flex: 0.6 },
  buyNowGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 25 },
  buyNowText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginLeft: 8 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: '#6B7280' },
  // --- NEW STYLES FOR REVIEWS SECTION ---
  reviewsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 8,
    borderTopColor: '#F3F4F6',
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  reviewRatingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#6B7280',
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

