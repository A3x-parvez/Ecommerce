import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CreditCard, Truck, CircleCheck as CheckCircle, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const addresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    phone: '+1 234 567 8900',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Office',
    name: 'John Doe',
    address: '456 Business Ave, Suite 200, New York, NY 10002',
    phone: '+1 234 567 8900',
    isDefault: false,
  },
];

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', popular: true },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', popular: false },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', popular: false },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', popular: false },
];

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    time: '5-7 business days',
    price: 0,
    description: 'Free standard delivery',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    time: '2-3 business days',
    price: 99,
    description: 'Fast delivery with tracking',
  },
  {
    id: 'priority',
    name: 'Priority Delivery',
    time: 'Next business day',
    price: 199,
    description: 'Fastest delivery available',
  },
];

export default function CheckoutScreen() {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');

  // Mock cart data
  const cartTotal = 18497;
  const savings = 4501;
  const deliveryCharge = deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0;
  const finalTotal = cartTotal + deliveryCharge;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed Successfully! 🎉',
      'Thank you for your purchase. You will receive a confirmation email shortly.',
      [
        {
          text: 'View Orders',
          onPress: () => router.push('/(tabs)/orders')
        },
        {
          text: 'Continue Shopping',
          onPress: () => router.push('/(tabs)')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCompleted]}>
              <CheckCircle size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.stepText}>Cart</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepActive]}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={[styles.stepText, styles.stepActiveText]}>Checkout</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepText}>Payment</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MapPin size={20} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Delivery Address</Text>
            </View>
            <TouchableOpacity>
              <Plus size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressCard,
                selectedAddress === address.id && styles.selectedCard
              ]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>{address.type}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.addressName}>{address.name}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressPhone}>{address.phone}</Text>
              {selectedAddress === address.id && (
                <View style={styles.selectedIndicator}>
                  <CheckCircle size={16} color="#10B981" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Truck size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Delivery Options</Text>
          </View>
          
          {deliveryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.deliveryCard,
                selectedDelivery === option.id && styles.selectedCard
              ]}
              onPress={() => setSelectedDelivery(option.id)}
            >
              <View style={styles.deliveryHeader}>
                <View>
                  <Text style={styles.deliveryName}>{option.name}</Text>
                  <Text style={styles.deliveryTime}>{option.time}</Text>
                  <Text style={styles.deliveryDescription}>{option.description}</Text>
                </View>
                <View style={styles.deliveryPrice}>
                  <Text style={styles.priceText}>
                    {option.price === 0 ? 'FREE' : `₹${option.price}`}
                  </Text>
                </View>
              </View>
              {selectedDelivery === option.id && (
                <View style={styles.selectedIndicator}>
                  <CheckCircle size={16} color="#10B981" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <CreditCard size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedPayment === method.id && styles.selectedCard
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentContent}>
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={styles.paymentName}>{method.name}</Text>
                {method.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </View>
              {selectedPayment === method.id && (
                <CheckCircle size={16} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cart Total</Text>
              <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>You Save</Text>
              <Text style={[styles.summaryValue, styles.savingsText]}>-₹{savings.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charges</Text>
              <Text style={[styles.summaryValue, deliveryCharge === 0 && styles.freeText]}>
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{finalTotal.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.bottomTotalLabel}>Total: ₹{finalTotal.toLocaleString()}</Text>
          <Text style={styles.savingsNote}>You save ₹{savings.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.placeOrderGradient}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepCompleted: {
    backgroundColor: '#10B981',
  },
  stepActive: {
    backgroundColor: '#8B5CF6',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
  },
  stepActiveText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 10,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 10,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '500',
  },
  addressName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deliveryCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    position: 'relative',
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 4,
  },
  deliveryDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  deliveryPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  popularBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  popularText: {
    fontSize: 10,
    color: '#DC2626',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  savingsText: {
    color: '#10B981',
  },
  freeText: {
    color: '#10B981',
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
  bottomContainer: {
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
    marginRight: 15,
  },
  bottomTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  savingsNote: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  placeOrderButton: {
    flex: 1,
  },
  placeOrderGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});