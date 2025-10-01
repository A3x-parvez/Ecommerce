export interface Tier {
  minQty: number;
  price: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  avatar: string;
}

// The Product interface is expanded with OPTIONAL fields to avoid breaking the old structure.
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
  // --- NEW OPTIONAL FIELDS FOR ENHANCED UI ---
  vendorType?: 'Normal' | 'Wholesale' | 'Both';
  category?: 'Electronics' | 'Fashion' | 'Home' | 'Mobiles';
  tiers?: Tier[];
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

// --- EXPANDED & ENRICHED PRODUCT LIST ---
export const products: Product[] = [
  // --- Original 4 Products (updated with new fields) ---
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
    ],
    description: 'Premium wireless headphones with active noise cancellation, crystal clear sound quality, and up to 30 hours of battery life. Perfect for music lovers and professionals.',
    features: ['Active Noise Cancellation', '30 Hours Battery Life', 'Quick Charge', 'Premium Build'],
    specifications: { 'Driver Size': '40mm', 'Battery Life': '30 hours', 'Weight': '250g' },
    inStock: true,
    seller: 'TechStore Pro',
    sellerId: 1,
    offers: ['Flat 37% off', 'Bank Offer: 10% off on HDFC cards'],
    vendorType: 'Both',
    category: 'Electronics',
    tiers: [{ minQty: 10, price: 4500 }, { minQty: 50, price: 4200 }],
    reviews: [
      { id: 1, author: 'Rohan Sharma', rating: 5, text: 'Amazing sound quality and battery life!', avatar: 'https://i.pravatar.cc/150?u=rohan' },
      { id: 2, author: 'Priya Mehta', rating: 4, text: 'Very comfortable for long use.', avatar: 'https://i.pravatar.cc/150?u=priya' },
    ],
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Series 8',
    price: 12999,
    originalPrice: 15999,
    rating: 4.8,
    reviewCount: 2856,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Track your fitness goals with the latest Smart Watch. Features GPS, heart rate monitoring, and a stunning always-on display.',
    features: ['GPS Tracking', 'Heart Rate Monitor', 'Sleep Tracking', 'Water Resistant'],
    specifications: { 'Display': '1.9" OLED', 'Water Resistance': '50m' },
    inStock: true,
    seller: 'Gadget World',
    sellerId: 2,
    offers: ['No Cost EMI available'],
    vendorType: 'Normal',
    category: 'Electronics',
    reviews: [
      { id: 1, author: 'Amit Singh', rating: 5, text: 'The best fitness watch I have ever owned. Super accurate.', avatar: 'https://i.pravatar.cc/150?u=amit' },
    ],
  },
  {
    id: 3,
    name: 'Premium Running Shoes',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviewCount: 2341,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Lightweight and comfortable running shoes, designed for maximum performance and durability.',
    features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight Design'],
    specifications: { 'Weight': '250g', 'Sole': 'Rubber' },
    inStock: true,
    seller: 'Fashion Hub',
    sellerId: 3,
    offers: ['Special 30% Off'],
    vendorType: 'Normal',
    category: 'Fashion',
    reviews: [
      { id: 1, author: 'Vikas Kumar', rating: 5, text: 'Perfect for my daily runs.', avatar: 'https://i.pravatar.cc/150?u=vikas' },
    ],
  },
  {
    id: 4,
    name: 'Automatic Coffee Maker',
    price: 8999,
    originalPrice: 11999,
    rating: 4.2,
    reviewCount: 543,
    image: 'https://images.pexels.com/photos/6347903/pexels-photo-6347903.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/6347903/pexels-photo-6347903.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Brew the perfect cup of coffee every morning with this fully automatic coffee maker.',
    features: ['One-touch Brewing', 'Programmable Timer', 'Keep Warm Function'],
    specifications: { 'Capacity': '1.5 Litres', 'Power': '900W' },
    inStock: true,
    seller: 'Home Essentials',
    sellerId: 4,
    offers: ['1 Year Warranty'],
    vendorType: 'Normal',
    category: 'Home',
    reviews: [
      { id: 1, author: 'Anjali Desai', rating: 4, text: 'Makes great coffee, easy to clean.', avatar: 'https://i.pravatar.cc/150?u=anjali' },
    ],
  },

  // --- NEW PRODUCTS FOR A RICHER UI ---
  {
    id: 5,
    name: 'Latest Smartphone Pro 15',
    price: 79999,
    originalPrice: 84999,
    rating: 4.9,
    reviewCount: 5432,
    image: 'https://images.pexels.com/photos/14742336/pexels-photo-14742336.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/14742336/pexels-photo-14742336.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Experience the future with the new Smartphone Pro. Featuring a cinematic camera system and the fastest chip ever.',
    features: ['Cinematic Mode Camera', 'A16 Bionic Chip', 'Super Retina XDR Display'],
    specifications: { 'Chip': 'A16 Bionic', 'Display': '6.1" OLED' },
    inStock: false,
    seller: 'Gadget World',
    sellerId: 2,
    offers: ['Exchange Bonus Available'],
    vendorType: 'Normal',
    category: 'Mobiles',
    reviews: [
        { id: 1, author: 'Sneha Patil', rating: 5, text: 'The camera is unbelievable!', avatar: 'https://i.pravatar.cc/150?u=sneha' },
    ],
  },
  {
    id: 6,
    name: 'Premium Leather Biker Jacket',
    price: 8999,
    originalPrice: 12999,
    rating: 4.7,
    reviewCount: 987,
    image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'A stylish and durable biker jacket made from 100% genuine leather.',
    features: ['Genuine Leather', 'Multiple Pockets', 'Satin Lining'],
    specifications: { 'Material': '100% Lambskin Leather', 'Fit': 'Slim Fit' },
    inStock: true,
    seller: 'Fashion Hub',
    sellerId: 3,
    offers: ['Special 30% Off'],
    vendorType: 'Wholesale',
    category: 'Fashion',
    tiers: [{ minQty: 5, price: 8500 }, { minQty: 20, price: 8000 }],
    reviews: [{ id: 1, author: 'Vikas Kumar', rating: 5, text: 'Fits perfectly and the leather is top quality.', avatar: 'https://i.pravatar.cc/150?u=vikas2' }],
  },
  {
    id: 7,
    name: 'Bulk Pack Plain T-Shirts (Pack of 10)',
    price: 2999,
    originalPrice: 4999,
    rating: 4.6,
    reviewCount: 541,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'A pack of 10 high-quality plain cotton t-shirts, perfect for printing or daily wear.',
    features: ['100% Cotton', '180 GSM Fabric', 'Unisex Fit'],
    specifications: { 'Fabric': 'Cotton', 'Pack Size': '10 Units' },
    inStock: true,
    seller: 'Fashion Hub',
    sellerId: 3,
    offers: ['Free Shipping on orders above 20 packs'],
    vendorType: 'Wholesale',
    category: 'Fashion',
    tiers: [{ minQty: 10, price: 2500 }, { minQty: 50, price: 2200 }],
    reviews: [{ id: 1, author: 'Print House', rating: 5, text: 'Excellent quality for the price. Will reorder.', avatar: 'https://i.pravatar.cc/150?u=printhouse' }],
  },
  {
    id: 8,
    name: '4K Ultra HD Smart LED TV (55 inch)',
    price: 34999,
    originalPrice: 49999,
    rating: 4.6,
    reviewCount: 3120,
    image: 'https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: ['https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Immerse yourself in stunning 4K clarity. This Smart TV comes with all your favorite apps pre-installed.',
    features: ['4K UHD Display', 'Dolby Atmos Sound', 'Smart TV with WebOS'],
    specifications: { 'Screen Size': '55 inch', 'Resolution': '3840 x 2160' },
    inStock: true,
    seller: 'TechStore Pro',
    sellerId: 1,
    offers: ['Free Installation', '2 Years Warranty'],
    vendorType: 'Both',
    category: 'Electronics',
    tiers: [{ minQty: 5, price: 32000 }, { minQty: 15, price: 30000 }],
    reviews: [{ id: 1, author: 'Rajesh Gupta', rating: 5, text: 'Picture quality is mind-blowing.', avatar: 'https://i.pravatar.cc/150?u=rajesh' }],
  },
];

// --- INITIAL CART DATA (for development consistency) ---
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
];

