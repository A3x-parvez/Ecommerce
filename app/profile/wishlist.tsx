import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistScreen() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {wishlistItems.map(item => (
          <View key={item.id} style={styles.wishlistItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <Text style={styles.productPrice}>₹{item.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromWishlist(item.id)}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
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
        backgroundColor: '#F9FAFB',
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
      wishlistItem: {
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
        justifyContent: 'center',
      },
      productName: {
        fontSize: 16,
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
      productPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8B5CF6',
      },
      removeButton: {
        padding: 10,
        justifyContent: 'center',
      },
});