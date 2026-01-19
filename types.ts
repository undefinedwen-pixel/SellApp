export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number; // 0-5
  location: string;
}

export interface Item {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  seller: User;
  category: string;
  likes: number;
  views: number;
  tags: string[];
  isNew?: boolean;
  postedAt: string; // ISO string
}

export enum AppView {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  PUBLISH = 'PUBLISH',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE'
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}