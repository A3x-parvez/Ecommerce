import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

export default function OrderSuccessScreen() {
  // Dummy data for order details
  const orderDetails = {
    id: 'ORD' + Math.floor(Math.random() * 900000) + 100000,
    date: new Date().toLocaleDateString('en-GB'),
    total: '₹5,199.00', // Example total
  }

  const handleContinueShopping = () => {
    router.replace('/(tabs)')
  }

  const handleTrackOrder = () => {
    router.replace('/(tabs)/orders')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color="#10B981" />
        </View>
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase. Your order is being processed.
        </Text>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{orderDetails.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Date</Text>
            <Text style={styles.detailValue}>{orderDetails.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailValue}>{orderDetails.total}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.trackButtonGradient}
          >
            <Text style={styles.trackButtonText}>Track My Order</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={handleContinueShopping}
        >
          <ShoppingBag size={20} color="#6B7280" />
          <Text style={styles.shopButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  trackButton: {
    width: '100%',
    marginBottom: 20,
  },
  trackButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25,
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 10,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  shopButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 8,
  },
})