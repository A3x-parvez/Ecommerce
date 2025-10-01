import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, Search, ShoppingCart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { products, Product } from '@/api/dummyData';

// Filter for products available for wholesale
const wholesaleProducts = products.filter(p => p.vendorType === 'Wholesale' || p.vendorType === 'Both');
const electronics = wholesaleProducts.filter(p => p.category === 'Electronics');
const fashion = wholesaleProducts.filter(p => p.category === 'Fashion');

export default function WholesaleScreen() {
  const renderProductCard = (item: Product) => (
    <TouchableOpacity key={item.id} style={styles.productCard} onPress={() => router.push(`/product/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.vendorName}>{item.seller}</Text>
        <View style={styles.tierContainer}>
          <Text style={styles.tierTitle}>Bulk Pricing:</Text>
          {item.tiers?.slice(0, 2).map((tier, index) => (
            <Text key={index} style={styles.tierText}>
              {tier.minQty}+ @ ₹{tier.price.toLocaleString()}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Building2 size={24} color="#1F2937" />
        <Text style={styles.headerTitle}>Wholesale Store</Text>
        <TouchableOpacity><ShoppingCart size={24} color="#1F2937" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchInput}>
            <Search size={20} color="#6B7280" />
            <Text style={styles.searchText}>Search Wholesale Products</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerContainer}>
          <LinearGradient colors={['#8B5CF6', '#14B8A6']} style={styles.banner}>
            <Text style={styles.bannerText}>Business Buying Program</Text>
            <Text style={styles.bannerSubText}>Get bulk discounts, GST invoices & more</Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wholesale Electronics</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
            {electronics.map(renderProductCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bulk Fashion Deals</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
            {fashion.map(renderProductCard)}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  searchInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 15 },
  searchText: { marginLeft: 10, fontSize: 16, color: '#6B7280' },
  bannerContainer: { paddingHorizontal: 20, marginBottom: 10 },
  banner: { borderRadius: 15, padding: 20 },
  bannerText: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  bannerSubText: { fontSize: 14, color: '#FFFFFF' },
  section: { marginVertical: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAllText: { fontSize: 14, color: '#8B5CF6', fontWeight: '500' },
  productList: { paddingLeft: 20 },
  productCard: {
    width: 180,
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  productImage: { width: '100%', height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  productInfo: { padding: 10 },
  productName: { fontSize: 14, fontWeight: '600', height: 40 },
  vendorName: { fontSize: 12, color: '#6B7280', marginVertical: 5 },
  tierContainer: { marginTop: 5, backgroundColor: '#F3F4F6', borderRadius: 8, padding: 8 },
  tierTitle: { fontSize: 12, fontWeight: 'bold', color: '#374151', marginBottom: 4 },
  tierText: { fontSize: 11, color: '#6B7280' },
});
