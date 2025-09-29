import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ListFilter as Filter, Grid2x2 as Grid, List, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones Pro Max',
    price: 4999,
    originalPrice: 7999,
    rating: 4.5,
    reviewCount: 1234,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    brand: 'TechBrand',
    discount: 38,
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 12999,
    originalPrice: 15999,
    rating: 4.3,
    reviewCount: 856,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    brand: 'FitTech',
    discount: 19,
  },
  {
    id: 3,
    name: 'Premium Running Shoes',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 2341,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fashion',
    brand: 'SportMax',
    discount: 30,
  },
  {
    id: 4,
    name: 'Automatic Coffee Maker',
    price: 8999,
    originalPrice: 11999,
    rating: 4.2,
    reviewCount: 543,
    image: 'https://images.pexels.com/photos/6347903/pexels-photo-6347903.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home',
    brand: 'BrewMaster',
    discount: 25,
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books'];
const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const renderProductCard = ({ item }: { item: typeof products[0] }) => {
    if (viewMode === 'list') {
      return (
        <TouchableOpacity
          style={styles.productCardList}
          onPress={() => handleProductPress(item.id)}
        >
          <Image source={{ uri: item.image }} style={styles.productImageList} />
          <View style={styles.productInfoList}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.brandText}>{item.brand}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FCD34D" fill="#FCD34D" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
              <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
              <Text style={styles.discount}>{item.discount}% off</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.productCardGrid}
        onPress={() => handleProductPress(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.productImageGrid} />
        <View style={styles.productInfoGrid}>
          <Text style={styles.productNameGrid} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.ratingTextGrid}>{item.rating}</Text>
          </View>
          <Text style={styles.priceGrid}>₹{item.price.toLocaleString()}</Text>
          {item.discount > 0 && (
            <Text style={styles.discountGrid}>{item.discount}% off</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort and View Options */}
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort: {selectedSort}</Text>
        </TouchableOpacity>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid size={20} color={viewMode === 'grid' ? '#8B5CF6' : '#6B7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? '#8B5CF6' : '#6B7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{products.length} results found</Text>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProductCard}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#1F2937',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F3E8FF',
    borderRadius: 10,
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sortButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  sortText: {
    fontSize: 14,
    color: '#374151',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  productsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productCardGrid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageGrid: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  productInfoGrid: {
    padding: 10,
  },
  productNameGrid: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingTextGrid: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceGrid: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  discountGrid: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 2,
  },
  productCardList: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageList: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    resizeMode: 'cover',
  },
  productInfoList: {
    flex: 1,
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 5,
  },
  brandText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
});