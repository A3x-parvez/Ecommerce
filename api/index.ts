import { CartItem } from './dummyData';

// Interface for the order payload, defining the structure for a real API call
export interface OrderPayload {
  userId: string;
  address: {
    name: string;
    address: string;
    city: string;
    type: string;
  };
  items: CartItem[];
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
}

// API service for placing an order
export const api = {
  /**
   * Simulates placing an order.
   * In a real app, this would be an async call to your backend service.
   * @param {OrderPayload} payload - The order details.
   * @returns {Promise<{success: boolean, orderId: string}>}
   */
  placeOrder: (payload: OrderPayload): Promise<{success: boolean, orderId: string}> => {
    console.log('Placing order with payload:', payload);
    
    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate a successful API response
        const orderId = 'ORD' + Math.floor(Math.random() * 900000) + 100000;
        resolve({ success: true, orderId });
      }, 1500); // 1.5 second delay
    });
  },
};