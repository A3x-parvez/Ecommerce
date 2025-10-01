import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '@/api/dummyData';

type CheckoutSource = 'cart' | 'buyNow';

interface CheckoutContextType {
  checkoutItems: CartItem[];
  source: CheckoutSource | null;
  setCheckout: (items: CartItem[], source: CheckoutSource) => void;
  clearCheckout: () => void;
  getCheckoutTotal: () => number;
  getCheckoutSavings: () => number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [source, setSource] = useState<CheckoutSource | null>(null);

  const setCheckout = (items: CartItem[], source: CheckoutSource) => {
    setCheckoutItems(items);
    setSource(source);
  };

  const clearCheckout = () => {
    setCheckoutItems([]);
    setSource(null);
  };

  const getCheckoutTotal = () => {
    return checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCheckoutSavings = () => {
    return checkoutItems.reduce((total, item) => 
      total + (((item.originalPrice || item.price) - item.price) * item.quantity), 0);
  };

  return (
    <CheckoutContext.Provider value={{ checkoutItems, source, setCheckout, clearCheckout, getCheckoutTotal, getCheckoutSavings }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

