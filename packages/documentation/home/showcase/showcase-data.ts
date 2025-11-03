/**
 * Mock data for showcase demos
 */

export const dashboardStats = [
  { label: 'Revenue', value: 42500, unit: '$', change: 12.5 },
  { label: 'Users', value: 12345, unit: '', change: 8.2 },
  { label: 'Orders', value: 1829, unit: '', change: 23.5 },
  { label: 'Conversion', value: 3.42, unit: '%', change: -2.1 },
];

export const recentOrders = [
  { id: '#12489', customer: 'Sarah Johnson', amount: '$1,299.99', status: 'completed' },
  { id: '#12488', customer: 'Michael Chen', amount: '$899.50', status: 'processing' },
  { id: '#12487', customer: 'Emma Davis', amount: '$2,150.00', status: 'completed' },
  { id: '#12486', customer: 'James Wilson', amount: '$450.75', status: 'pending' },
  { id: '#12485', customer: 'Lisa Anderson', amount: '$1,675.25', status: 'completed' },
];

export const usersTableData = [
  {
    id: '001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '002',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2024-02-20',
  },
  {
    id: '003',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'Moderator',
    status: 'active',
    joinDate: '2024-03-10',
  },
  {
    id: '004',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'User',
    status: 'inactive',
    joinDate: '2024-01-05',
  },
  {
    id: '005',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2024-04-12',
  },
  {
    id: '006',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2024-02-28',
  },
];

export const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 19000 },
  { month: 'Mar', revenue: 15000 },
  { month: 'Apr', revenue: 25000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 32000 },
];

// E-commerce data
export const product = {
  id: '1001',
  name: 'Premium Wireless Headphones',
  brand: 'AudioPro',
  price: 299.99,
  originalPrice: 379.99,
  discount: 21,
  rating: 4.8,
  reviewCount: 342,
  inStock: true,
  stock: 47,
  sku: 'APH-WH-2024-BLK',
  description:
    'Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for music lovers, travelers, and professionals.',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop&q=80',
  ],
  colors: [
    { name: 'Midnight Black', code: '#1a1a1a' },
    { name: 'Silver Gray', code: '#C0C0C0' },
    { name: 'Navy Blue', code: '#1e3a8a' },
  ],
  sizes: ['One Size'],
  features: [
    'Active Noise Cancellation (ANC) - Industry-leading technology',
    '30-hour battery life with quick charge (10 min = 3 hours)',
    'Premium memory foam ear cushions for all-day comfort',
    'Bluetooth 5.3 with aptX HD & AAC codec support',
    'Built-in microphone with CVC 8.0 noise cancellation',
    'Foldable design with premium carrying case included',
    'Touch controls for music, calls, and voice assistant',
    'Multi-device pairing - Connect up to 2 devices simultaneously',
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32Ω',
    'Bluetooth Version': '5.3',
    'Bluetooth Range': 'Up to 10m (33ft)',
    'Battery Capacity': '650mAh',
    'Charging Time': '2 hours',
    'Weight': '250g',
  },
};

export const customerReviews = [
  {
    id: 'r1',
    author: 'Sarah M.',
    rating: 5,
    date: '2025-01-15',
    verified: true,
    title: 'Best headphones I\'ve ever owned!',
    content:
      'The sound quality is exceptional and the noise cancellation actually works. I use these daily for work calls and music. Battery life is impressive too!',
    helpful: 24,
  },
  {
    id: 'r2',
    author: 'Michael K.',
    rating: 5,
    date: '2025-01-10',
    verified: true,
    title: 'Perfect for travel',
    content:
      'Used these on a 12-hour flight and they were perfect. The ANC blocked out the engine noise and they were comfortable the entire time.',
    helpful: 18,
  },
  {
    id: 'r3',
    author: 'Emma R.',
    rating: 4,
    date: '2025-01-05',
    verified: true,
    title: 'Great sound, minor comfort issue',
    content:
      'Sound quality is amazing and features are top-notch. Only issue is they get a bit warm after 3-4 hours of continuous use. Still highly recommend!',
    helpful: 12,
  },
];

export const productFAQs = [
  {
    question: 'How long does the battery last?',
    answer:
      'With ANC on, you can expect up to 25-30 hours of playback. With ANC off, battery life extends to approximately 35-40 hours. Quick charge feature gives you 3 hours of playback from just 10 minutes of charging.',
  },
  {
    question: 'Are these compatible with iPhone and Android?',
    answer:
      'Yes! These headphones work with any device that supports Bluetooth. They support both aptX HD (for Android) and AAC (for iOS) for the best audio quality on your device.',
  },
  {
    question: 'Can I use them while charging?',
    answer:
      'Absolutely! You can use the headphones while they\'re charging via the USB-C cable. They also come with a 3.5mm audio cable for wired listening if needed.',
  },
  {
    question: 'What\'s included in the box?',
    answer:
      'The package includes: Premium Wireless Headphones, USB-C charging cable, 3.5mm audio cable, premium carrying case, airplane adapter, and user manual with quick start guide.',
  },
];

export const relatedProducts = [
  {
    id: '1002',
    name: 'Portable Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80',
    rating: 4.6,
    inStock: true,
  },
  {
    id: '1003',
    name: 'True Wireless Earbuds Pro',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&q=80',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '1004',
    name: 'Premium Audio Cable',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop&q=80',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '1005',
    name: 'Headphone Stand & Charger',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop&q=80',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '1006',
    name: 'USB-C Fast Charger',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1591290619762-2569ad467a99?w=400&h=400&fit=crop&q=80',
    rating: 4.4,
    inStock: true,
  },
];
