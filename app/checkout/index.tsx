import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CreditCard, Landmark, Wallet, Banknote, CheckCircle, Circle, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { api, OrderPayload } from '@/api';

const dummyAddresses = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main St, Apt 4B',
    city: 'New York, NY 10001',
    type: 'Home',
  },
  {
    id: 2,
    name: 'John Doe',
    address: '456 Business Ave, Suite 500',
    city: 'New York, NY 10005',
    type: 'Office',
  },
];

const paymentMethods = [
    { name: 'Credit Card', icon: CreditCard },
    { name: 'Net Banking', icon: Landmark },
    { name: 'UPI', icon: Wallet },
    { name: 'Cash on Delivery', icon: Banknote },
];

export default function CheckoutScreen() {
    const { user } = useAuth();
    const { cartItems, getCartTotal, getCartSavings, clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState('Credit Card');
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0]);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const cartTotal = getCartTotal();
    const cartSavings = getCartSavings();

    const handlePlaceOrder = async () => {
        if (isPlacingOrder) return;

        setIsPlacingOrder(true);

        const orderPayload: OrderPayload = {
            userId: 'user-123', // Dummy user ID from auth context
            address: selectedAddress,
            items: cartItems,
            paymentMethod: selectedPayment,
            subtotal: cartTotal + cartSavings,
            discount: cartSavings,
            total: cartTotal,
        };

        try {
            const result = await api.placeOrder(orderPayload);
            if (result.success) {
                clearCart();
                router.replace({
                    pathname: '/order-success',
                    params: { orderId: result.orderId, total: cartTotal }
                });
            } else {
                Alert.alert('Order Failed', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            Alert.alert('Order Error', 'An unexpected error occurred.');
        } finally {
            setIsPlacingOrder(false);
        }
    };
    
    // UI components remain largely the same, but with state updates...
    const AddressSelectionModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={addressModalVisible}
            onRequestClose={() => setAddressModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Address</Text>
                        <TouchableOpacity onPress={() => setAddressModalVisible(false)}>
                            <X size={24} color="#1F2937" />
                        </TouchableOpacity>
                    </View>
                    {dummyAddresses.map((address) => (
                        <TouchableOpacity 
                            key={address.id} 
                            style={styles.addressOption}
                            onPress={() => {
                                setSelectedAddress(address);
                                setAddressModalVisible(false);
                            }}
                        >
                            {selectedAddress.id === address.id ? (
                                <CheckCircle size={24} color="#8B5CF6" />
                            ) : (
                                <Circle size={24} color="#9CA3AF" />
                            )}
                            <View style={styles.addressOptionDetails}>
                                <Text style={styles.addressOptionName}>{address.name} - {address.type}</Text>
                                <Text style={styles.addressOptionText}>{address.address}, {address.city}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.addNewAddressButton}>
                        <Text style={styles.addNewAddressText}>+ Add New Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <AddressSelectionModal />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.headerButton} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Shipping Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.addressCard}>
                        <MapPin size={24} color="#8B5CF6" style={styles.cardIcon} />
                        <View style={styles.addressDetails}>
                            <Text style={styles.addressName}>{selectedAddress.name} - {selectedAddress.type}</Text>
                            <Text style={styles.addressText}>{selectedAddress.address}, {selectedAddress.city}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
                            <Text style={styles.changeAddressText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryCard}>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.summaryItem}>
                                <Image source={{ uri: item.image }} style={styles.summaryImage} />
                                <View style={styles.summaryItemDetails}>
                                    <Text style={styles.summaryItemName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.summaryItemQty}>Qty: {item.quantity}</Text>
                                </View>
                                <Text style={styles.summaryItemPrice}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentContainer}>
                        {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            const isSelected = selectedPayment === method.name;
                            return (
                                <TouchableOpacity
                                    key={method.name}
                                    style={[
                                        styles.paymentMethod,
                                        isSelected && styles.selectedPaymentMethod
                                    ]}
                                    onPress={() => setSelectedPayment(method.name)}
                                >
                                    <Icon size={24} color={isSelected ? '#8B5CF6' : '#6B7280'} />
                                    <Text style={[styles.paymentMethodText, isSelected && styles.selectedPaymentMethodText]}>
                                        {method.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                
                {/* Price Breakdown */}
                <View style={styles.section}>
                    <View style={styles.priceBreakdown}>
                        <Text style={styles.breakdownTitle}>Price Details</Text>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Subtotal ({cartItems.length} items)</Text>
                            <Text style={styles.breakdownValue}>₹{cartTotal.toLocaleString()}</Text>
                        </View>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Discount</Text>
                            <Text style={[styles.breakdownValue, styles.savingsText]}>-₹{cartSavings.toLocaleString()}</Text>
                        </View>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Delivery Charges</Text>
                            <Text style={[styles.breakdownValue, styles.freeText]}>FREE</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹{cartTotal.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomContainer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>₹{cartTotal.toLocaleString()}</Text>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder} disabled={isPlacingOrder}>
                    <LinearGradient
                        colors={isPlacingOrder ? ['#D1D5DB', '#9CA3AF'] : ['#8B5CF6', '#14B8A6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.checkoutGradient}
                    >
                        {isPlacingOrder ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.checkoutText}>Place Order</Text>
                        )}
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
        padding: 20,
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
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardIcon: {
        marginRight: 15,
    },
    addressDetails: {
        flex: 1,
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
        fontWeight: 'bold',
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    summaryImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    summaryItemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    summaryItemName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    summaryItemQty: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    summaryItemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    paymentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    selectedPaymentMethod: {
        backgroundColor: '#F3E8FF',
    },
    paymentMethodText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },
    selectedPaymentMethodText: {
        fontWeight: 'bold',
        color: '#8B5CF6',
    },
    priceBreakdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
    },
    breakdownTitle: {
        fontSize: 16,
        fontWeight: 'bold',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B5CF6',
    },
    savingsText: {
        color: '#10B981',
        fontWeight: 'bold',
    },
    freeText: {
        color: '#10B981',
        fontWeight: '500',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    totalContainer: {
        flex: 1,
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    viewDetailsText: {
        fontSize: 14,
        color: '#8B5CF6',
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginLeft: 15,
    },
    checkoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        minWidth: 150,
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addressOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    addressOptionDetails: {
        marginLeft: 15,
    },
    addressOptionName: {
        fontSize: 16,
        fontWeight: '600',
    },
    addressOptionText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    addNewAddressButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#8B5CF6',
        alignItems: 'center',
    },
    addNewAddressText: {
        color: '#8B5CF6',
        fontWeight: 'bold',
        fontSize: 16,
    }
});