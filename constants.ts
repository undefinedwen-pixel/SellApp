import { Category, Item, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: '热心邻居小王',
  avatar: 'https://picsum.photos/seed/me/100/100',
  rating: 4.9,
  location: 'A区 5号楼'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部', icon: '🏠' },
  { id: 'electronics', name: '数码', icon: '📱' },
  { id: 'furniture', name: '家具', icon: '🛋️' },
  { id: 'kids', name: '母婴', icon: '👶' },
  { id: 'books', name: '书籍', icon: '📚' },
  { id: 'clothing', name: '服饰', icon: '👕' },
  { id: 'appliances', name: '家电', icon: '🔌' },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    title: '宜家三人座布艺沙发 - 搬家急出',
    price: 350,
    originalPrice: 1200,
    description: '去年买的，非常干净。家里没宠物，不抽烟。因为要搬出小区了，这周末前必须处理掉。B区自提。',
    images: ['https://picsum.photos/seed/sofa/400/400', 'https://picsum.photos/seed/sofa2/400/400'],
    seller: { id: 'u2', name: '莎莎', avatar: 'https://picsum.photos/seed/sarah/100/100', rating: 5.0, location: 'B区' },
    category: 'furniture',
    likes: 12,
    views: 154,
    tags: ['急出', '自提'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    title: '机械键盘青轴',
    price: 80,
    originalPrice: 250,
    description: '声音清脆，RGB灯效完美。F1键帽丢了一个，但不影响使用。',
    images: ['https://picsum.photos/seed/keyboard/400/400'],
    seller: { id: 'u3', name: '游戏阿祖', avatar: 'https://picsum.photos/seed/joe/100/100', rating: 4.5, location: 'C区' },
    category: 'electronics',
    likes: 45,
    views: 890,
    tags: ['数码', '游戏'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '3',
    title: '全新未拆封电饭煲',
    price: 120,
    originalPrice: 199,
    description: '公司年会中的奖品。没拆封过。全新原盒。',
    images: ['https://picsum.photos/seed/cooker/400/400'],
    seller: { id: 'u4', name: '王阿姨', avatar: 'https://picsum.photos/seed/wang/100/100', rating: 4.8, location: 'A区' },
    category: 'appliances',
    likes: 5,
    views: 40,
    tags: ['全新'],
    isNew: true,
    postedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: '4',
    title: '哈利波特全集英文版',
    price: 50,
    originalPrice: 300,
    description: '英文原版。只读过一次。保存完好。',
    images: ['https://picsum.photos/seed/books/400/400'],
    seller: { id: 'u5', name: '书虫', avatar: 'https://picsum.photos/seed/read/100/100', rating: 5.0, location: 'D区' },
    category: 'books',
    likes: 22,
    views: 200,
    tags: [],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '5',
    title: '轻便婴儿推车',
    price: 150,
    originalPrice: 800,
    description: '用了6个月。轮子很顺滑。可折叠。',
    images: ['https://picsum.photos/seed/stroller/400/400'],
    seller: { id: 'u6', name: '超级辣妈', avatar: 'https://picsum.photos/seed/mom/100/100', rating: 4.7, location: 'B区' },
    category: 'kids',
    likes: 8,
    views: 90,
    tags: ['母婴'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  }
];