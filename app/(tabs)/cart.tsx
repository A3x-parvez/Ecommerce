import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/api/dummyData';
import { useCheckout } from '@/context/CheckoutContext'; // Import the new hook


export default function CartScreen() {
  const { setCheckout } = useCheckout(); // Get the setCheckout function from the context
  const { cartItems, updateQuantity, removeItem, getCartTotal, getCartSavings } = useCart();

  const groupItemsBySeller = () => {
    const grouped: { [key: string]: { seller: string; items: CartItem[] } } = {};

    cartItems.forEach(item => {
      if (item.sellerId) {
        if (!grouped[item.sellerId]) {
          grouped[item.sellerId] = {
            seller: item.seller || 'Unknown Seller',
            items: []
          };
        }
        grouped[item.sellerId].items.push(item);
      }
    });

    return grouped;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to cart before checkout');
      return;
    }
    // --- THIS IS THE FIX ---
    // Set all cart items for checkout
    setCheckout(cartItems, 'cart');
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/search')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#14B8A6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shopButtonGradient}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const groupedItems = groupItemsBySeller();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedItems).map(([sellerId, { seller, items }]) => (
          <View key={sellerId} style={styles.sellerGroup}>
            <View style={styles.sellerHeader}>
              <Text style={styles.sellerName}>Sold by {seller}</Text>
              <TouchableOpacity onPress={() => router.push(`/seller/${sellerId}`)}>
                <Text style={styles.viewSellerText}>View Seller</Text>
              </TouchableOpacity>
            </View>
            
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
                    <Text style={styles.originalPrice}>₹{(item.originalPrice || item.price).toLocaleString()}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        
        {/* Price Summary */}
        <View style={styles.priceBreakdown}>
          <Text style={styles.breakdownTitle}>Price Details</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total Items</Text>
            <Text style={styles.breakdownValue}>
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total MRP</Text>
            <Text style={styles.breakdownValue}>
              ₹{cartItems.reduce((total, item) => 
                total + ((item.originalPrice || item.price) * item.quantity), 0).toLocaleString()}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Discount</Text>
            <Text style={[styles.breakdownValue, styles.savingsText]}>
              -₹{getCartSavings().toLocaleString()}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Delivery Charges</Text>
            <Text style={[styles.breakdownValue, styles.freeText]}>FREE</Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{getCartTotal().toLocaleString()}</Text>
          </View>
          <Text style={styles.savingsNote}>
            You will save ₹{getCartSavings().toLocaleString()} on this order
          </Text>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₹{getCartTotal().toLocaleString()}</Text>
          <Text style={styles.savingsText}>
            Save ₹{getCartSavings().toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <ArrowRight size={20} color="#FFFFFF" />
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
      backgroundColor: '#F9FAFB',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#1F2937',
    },
    itemCount: {
      fontSize: 14,
      color: '#6B7280',
    },
    content: {
      flex: 1,
    },
    sellerGroup: {
      marginBottom: 20,
    },
    sellerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: '#F3F4F6',
    },
    sellerName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#1F2937',
    },
    viewSellerText: {
      fontSize: 14,
      color: '#8B5CF6',
      fontWeight: '500',
    },
    cartItem: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
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
      fontSize: 16,
      fontWeight: '500',
      color: '#1F2937',
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    price: {
      fontSize: 18,
      fontWeight: '600',
      color: '#8B5CF6',
      marginRight: 10,
    },
    originalPrice: {
      fontSize: 14,
      color: '#9CA3AF',
      textDecorationLine: 'line-through',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 15,
      minWidth: 20,
      textAlign: 'center',
    },
    removeButton: {
      padding: 10,
      justifyContent: 'center',
    },
    priceBreakdown: {
      margin: 20,
      padding: 20,
      backgroundColor: '#F9FAFB',
      borderRadius: 15,
    },
    breakdownTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 15,
    },
    breakdownRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    breakdownLabel: {
      fontSize: 14,
      color: '#6B7280',
    },
    breakdownValue: {
      fontSize: 14,
      color: '#1F2937',
      fontWeight: '500',
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      marginTop: 10,
      paddingTop: 15,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1F2937',
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '600',
      color: '#8B5CF6',
    },
    savingsText: {
      color: '#10B981',
    },
    freeText: {
      color: '#10B981',
    },
    savingsNote: {
      fontSize: 12,
      color: '#10B981',
      fontWeight: '500',
      textAlign: 'center',
      marginTop: 10,
    },
    checkoutContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
    totalContainer: {
      flex: 1,
    },
    totalText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
    },
    checkoutButton: {
      marginLeft: 15,
    },
    checkoutGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
    },
    checkoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      marginRight: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#1F2937',
      marginTop: 20,
      marginBottom: 10,
    },
    emptySubtitle: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
      marginBottom: 30,
    },
    shopButton: {
      width: '100%',
    },
    shopButtonGradient: {
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    shopButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
    },
});