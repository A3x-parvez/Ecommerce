export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount?: number;
    image: string;
    images?: string[];
    description?: string;
    features?: string[];
    specifications?: { [key: string]: string };
    inStock?: boolean;
    seller?: string;
    sellerId?: number;
    offers?: string[];
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export const products: Product[] = [
      {
        id: 1,
        name: 'Wireless Headphones Pro Max',
        price: 4999,
        originalPrice: 7999,
        rating: 4.5,
        reviewCount: 1234,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        images: [
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1649774/pexels-photo-1649774.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        description: 'Premium wireless headphones with active noise cancellation, crystal clear sound quality, and up to 30 hours of battery life. Perfect for music lovers and professionals.',
        features: [
            'Active Noise Cancellation',
            '30 Hours Battery Life',
            'Quick Charge (5 min = 2 hours)',
            'Premium Build Quality',
            'Wireless & Wired Modes',
            'Touch Controls'
        ],
        specifications: {
            'Driver Size': '40mm',
            'Frequency Response': '20Hz - 20kHz',
            'Impedance': '32Ω',
            'Battery Life': '30 hours',
            'Charging Time': '2 hours',
            'Weight': '250g'
        },
        inStock: true,
        seller: 'TechStore Pro',
        sellerId: 1,
        offers: [
            'Flat 37% off',
            'Bank Offer: 10% off on HDFC cards',
            'Exchange: Up to ₹2000 off'
        ]
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 12999,
        originalPrice: 15999,
        rating: 4.3,
        reviewCount: 856,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        id: 3,
        name: 'Premium Running Shoes',
        price: 3499,
        originalPrice: 4999,
        rating: 4.7,
        reviewCount: 2341,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        id: 4,
        name: 'Automatic Coffee Maker',
        price: 8999,
        originalPrice: 11999,
        rating: 4.2,
        reviewCount: 543,
        image: 'https://images.pexels.com/photos/6347903/pexels-photo-6347903.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
  ];
  
  export const initialCartItems: CartItem[] = [
      {
        id: 1,
        name: 'Wireless Headphones Pro Max',
        price: 4999,
        originalPrice: 7999,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        seller: 'TechStore Pro',
        sellerId: 1,
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 12999,
        originalPrice: 15999,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 2,
        seller: 'Gadget World',
        sellerId: 2,
        rating: 4.3,
      },
      {
        id: 3,
        name: 'Premium Running Shoes',
        price: 3499,
        originalPrice: 4999,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        quantity: 1,
        seller: 'TechStore Pro',
        sellerId: 1,
        rating: 4.7,
      },
  ];