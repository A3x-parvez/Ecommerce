import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Package, Truck, CircleCheck as CheckCircle, Clock, Download, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Order {
  id: string;
  date: string;
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  deliveryDate: string;
}

const orders: Order[] = [
  {
    id: 'ORD123456',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        name: 'Wireless Headphones Pro Max',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        price: 4999,
      }
    ],
    total: 4999,
    deliveryDate: '2024-01-18',
  },
  {
    id: 'ORD123457',
    date: '2024-01-20',
    status: 'shipped',
    items: [
      {
        name: 'Smart Fitness Watch',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        price: 12999,
      },
      {
        name: 'Premium Running Shoes',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        price: 3499,
      }
    ],
    total: 16498,
    deliveryDate: '2024-01-25',
  },
  {
    id: 'ORD123458',
    date: '2024-01-22',
    status: 'packed',
    items: [
      {
        name: 'Automatic Coffee Maker',
        image: 'https://images.pexels.com/photos/6347903/pexels-photo-6347903.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        price: 8999,
      }
    ],
    total: 8999,
    deliveryDate: '2024-01-28',
  },
];

const statusConfig = {
  confirmed: {
    color: '#F59E0B',
    icon: Clock,
    text: 'Order Confirmed',
    bgColor: '#FEF3C7',
  },
  packed: {
    color: '#8B5CF6',
    icon: Package,
    text: 'Packed',
    bgColor: '#F3E8FF',
  },
  shipped: {
    color: '#3B82F6',
    icon: Truck,
    text: 'Shipped',
    bgColor: '#DBEAFE',
  },
  delivered: {
    color: '#10B981',
    icon: CheckCircle,
    text: 'Delivered',
    bgColor: '#D1FAE5',
  },
};

export default function OrdersScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'delivered' | 'active'>('all');

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'delivered') return order.status === 'delivered';
    if (selectedTab === 'active') return order.status !== 'delivered';
    return true;
  });

  const getStatusProgress = (status: Order['status']) => {
    const statuses = ['confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(status);
    return ((currentIndex + 1) / statuses.length) * 100;
  };

  const renderOrderCard = (order: Order) => {
    const StatusIcon = statusConfig[order.status].icon;
    
    return (
      <View key={order.id} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>Placed on {new Date(order.date).toLocaleDateString()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusConfig[order.status].bgColor }]}>
            <StatusIcon size={16} color={statusConfig[order.status].color} />
            <Text style={[styles.statusText, { color: statusConfig[order.status].color }]}>
              {statusConfig[order.status].text}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${getStatusProgress(order.status)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Items */}
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
            </View>
          </View>
        ))}

        {/* Order Total */}
        <View style={styles.orderFooter}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{order.total.toLocaleString()}</Text>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {order.status === 'delivered' ? (
              <>
                <TouchableOpacity style={styles.actionButton}>
                  <Download size={16} color="#8B5CF6" />
                  <Text style={styles.actionButtonText}>Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <RotateCcw size={16} color="#8B5CF6" />
                  <Text style={styles.actionButtonText}>Reorder</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.trackButton}>
                <LinearGradient
                  colors={['#8B5CF6', '#14B8A6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.trackButtonGradient}
                >
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'delivered', label: 'Delivered' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab.key as typeof selectedTab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(renderOrderCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Package size={80} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedTab === 'delivered'
                ? "You haven't received any orders yet"
                : selectedTab === 'active'
                ? "You don't have any active orders"
                : "You haven't placed any orders yet"}
            </Text>
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
    flex: 0.45,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginLeft: 6,
  },
  trackButton: {
    flex: 1,
  },
  trackButtonGradient: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});