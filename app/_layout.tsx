import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CheckoutProvider } from '@/context/CheckoutContext'; // Import new provider

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CheckoutProvider> {/* Add new provider */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </CheckoutProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}