import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Tag, Truck } from 'lucide-react-native';
import { router } from 'expo-router';

const notifications = [
  { id: 1, type: 'order', title: 'Order Shipped!', message: 'Your order #ORD123457 has been shipped.', time: '2 hours ago', icon: Truck, color: '#3B82F6' },
  { id: 2, type: 'offer', title: 'Flash Sale!', message: 'Get 50% off on all electronics today.', time: '1 day ago', icon: Tag, color: '#EC4899' },
  // ... more notifications
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <View key={item.id} style={styles.notificationCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Icon size={24} color={item.color} />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: { width: 40 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  content: { padding: 20 },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationText: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  notificationMessage: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  notificationTime: { fontSize: 12, color: '#9CA3AF' },
});