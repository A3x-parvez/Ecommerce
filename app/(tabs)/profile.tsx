import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Heart, Settings, Circle as HelpCircle, LogOut, ChevronRight, Bell, CreditCard, Star, Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: '👤'
  });

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            setIsLoggedIn(false);
            // Handle logout logic here
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      id: 'addresses',
      title: 'My Addresses',
      icon: MapPin,
      color: '#8B5CF6',
      onPress: () => router.push('/profile/addresses'),
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: Heart,
      color: '#EC4899',
      onPress: () => router.push('/profile/wishlist'),
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      icon: CreditCard,
      color: '#10B981',
      onPress: () => router.push('/profile/payments'),
    },
    {
      id: 'reviews',
      title: 'Reviews & Ratings',
      icon: Star,
      color: '#F59E0B',
      onPress: () => router.push('/profile/reviews'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: '#3B82F6',
      onPress: () => router.push('/profile/notifications'),
    },
    {
      id: 'coupons',
      title: 'Coupons & Offers',
      icon: Gift,
      color: '#F97316',
      onPress: () => router.push('/profile/coupons'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      color: '#6B7280',
      onPress: () => router.push('/profile/settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      color: '#14B8A6',
      onPress: () => router.push('/profile/help'),
    },
  ];

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.guestContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.guestHeader}
          >
            <View style={styles.guestAvatar}>
              <User size={60} color="#FFFFFF" />
            </View>
            <Text style={styles.guestTitle}>Welcome to ShopApp!</Text>
            <Text style={styles.guestSubtitle}>
              Sign in to access your orders, wishlist, and personalized recommendations
            </Text>
          </LinearGradient>
          
          <View style={styles.guestActions}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#8B5CF6', '#14B8A6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signupButton} 
              onPress={() => router.push('/auth/signup')}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          
          {/* Guest Menu Items */}
          <View style={styles.guestMenu}>
            <Text style={styles.guestMenuTitle}>Explore</Text>
            {menuItems.slice(0, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                      <IconComponent size={20} color={item.color} />
                    </View>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#8B5CF6', '#14B8A6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInfo.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                    <IconComponent size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
          
          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                <LogOut size={20} color="#EF4444" />
              </View>
              <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>ShopApp v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 ShopApp. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    fontSize: 40,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appVersion: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  guestContainer: {
    flex: 1,
  },
  guestHeader: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  guestActions: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  loginButton: {
    marginBottom: 15,
  },
  loginButtonGradient: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signupButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  guestMenu: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingTop: 20,
  },
  guestMenuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});

export default ProfileScreen;