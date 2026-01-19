import { Category, Item, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'AlexNeighbor',
  avatar: 'https://picsum.photos/seed/me/100/100',
  rating: 4.9,
  location: 'Block A, 5th Floor'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '🏠' },
  { id: 'electronics', name: 'Digital', icon: '📱' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️' },
  { id: 'kids', name: 'Baby/Kids', icon: '👶' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'clothing', name: 'Fashion', icon: '👕' },
  { id: 'appliances', name: 'Appliances', icon: '🔌' },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Minimalist IKEA Sofa - Moving Sale',
    price: 350,
    originalPrice: 1200,
    description: 'Bought last year, very clean. No pets, no smoking. Must go by this weekend because I am moving out of the complex. Pickup at Block B.',
    images: ['https://picsum.photos/seed/sofa/400/400', 'https://picsum.photos/seed/sofa2/400/400'],
    seller: { id: 'u2', name: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/100/100', rating: 5.0, location: 'Block B' },
    category: 'furniture',
    likes: 12,
    views: 154,
    tags: ['Urgent', 'Self-pickup'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    title: 'Mechanical Keyboard Blue Switch',
    price: 80,
    originalPrice: 250,
    description: 'Clicky sound. RGB works perfectly. Missing one keycap on F1 but works fine.',
    images: ['https://picsum.photos/seed/keyboard/400/400'],
    seller: { id: 'u3', name: 'GamerJoe', avatar: 'https://picsum.photos/seed/joe/100/100', rating: 4.5, location: 'Block C' },
    category: 'electronics',
    likes: 45,
    views: 890,
    tags: ['Tech', 'Gaming'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '3',
    title: 'Unopened Rice Cooker',
    price: 120,
    originalPrice: 199,
    description: 'Won it at the company annual dinner. Never opened. Brand new in box.',
    images: ['https://picsum.photos/seed/cooker/400/400'],
    seller: { id: 'u4', name: 'Auntie Wang', avatar: 'https://picsum.photos/seed/wang/100/100', rating: 4.8, location: 'Block A' },
    category: 'appliances',
    likes: 5,
    views: 40,
    tags: ['Brand New'],
    isNew: true,
    postedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: '4',
    title: 'Harry Potter Full Set',
    price: 50,
    originalPrice: 300,
    description: 'English version. Read once. Good condition.',
    images: ['https://picsum.photos/seed/books/400/400'],
    seller: { id: 'u5', name: 'Bookworm', avatar: 'https://picsum.photos/seed/read/100/100', rating: 5.0, location: 'Block D' },
    category: 'books',
    likes: 22,
    views: 200,
    tags: [],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '5',
    title: 'Baby Stroller - Lightweight',
    price: 150,
    originalPrice: 800,
    description: 'Used for 6 months. Wheels are smooth. Foldable.',
    images: ['https://picsum.photos/seed/stroller/400/400'],
    seller: { id: 'u6', name: 'SuperMom', avatar: 'https://picsum.photos/seed/mom/100/100', rating: 4.7, location: 'Block B' },
    category: 'kids',
    likes: 8,
    views: 90,
    tags: ['Kids'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  }
];