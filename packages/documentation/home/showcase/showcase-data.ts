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
  price: 299.99,
  originalPrice: 379.99,
  discount: 20,
  rating: 4.8,
  reviewCount: 342,
  inStock: true,
  description:
    'Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design.',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
  ],
  thumbnails: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=100&h=100&fit=crop',
  ],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'Silver', code: '#C0C0C0' },
    { name: 'Blue', code: '#0066FF' },
  ],
  sizes: ['One Size'],
  features: [
    'Active noise cancellation technology',
    '30-hour battery life',
    'Premium comfort design',
    'Bluetooth 5.0 connectivity',
    'Built-in microphone for calls',
    'Foldable design for portability',
    'Touch controls',
    'Multi-device pairing',
  ],
};

export const relatedProducts = [
  {
    id: '1002',
    name: 'Portable Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1589003200312-abc08beef416?w=200&h=200&fit=crop',
    rating: 4.6,
  },
  {
    id: '1003',
    name: 'Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1510003382501-ea2b1a32f349?w=200&h=200&fit=crop',
    rating: 4.7,
  },
  {
    id: '1004',
    name: 'Audio Cable',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop',
    rating: 4.5,
  },
  {
    id: '1005',
    name: 'Headphone Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop',
    rating: 4.4,
  },
];
