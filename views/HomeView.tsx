import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Item } from '../types';
import { CATEGORIES } from '../constants';

interface HomeViewProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ items, onItemClick }) => {
  // TODO: Data Interface - Fetch Categories
  // API: GET /api/categories
  // const [categories, setCategories] = useState<Category[]>([]);
  
  const [activeCategory, setActiveCategory] = useState('all');

  // TODO: Data Interface - Server-side filtering/search
  // API: GET /api/items?category={activeCategory}&q={searchQuery}
  // Currently filtering client-side for demo purposes
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(i => i.category === activeCategory);

  useEffect(() => {
    // TODO: Data Interface - Initial Data Load
    // fetch('/api/items/feed').then(...)
  }, []);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-yellow-400 px-4 pt-4 pb-2 z-40 rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-500/30 px-2 py-1 rounded-lg">
            <MapPin size={14} className="text-black" />
            <span className="text-xs font-bold text-black">Sunshine Gardens</span>
          </div>
          <div className="flex-1 bg-white rounded-full flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search for 'Baby Stroller'" 
              className="bg-transparent text-sm w-full outline-none placeholder-gray-400"
              // TODO: Implement search handler
              // onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 py-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center flex-shrink-0 min-w-[60px] transition-opacity ${activeCategory === cat.id ? 'opacity-100 scale-105' : 'opacity-70'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1 ${activeCategory === cat.id ? 'bg-white shadow-md' : 'bg-white/50'}`}>
                {cat.icon}
              </div>
              <span className={`text-xs ${activeCategory === cat.id ? 'font-bold' : 'font-medium'}`}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-ish Grid */}
      <div className="p-3 grid grid-cols-2 gap-3">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => onItemClick(item)}
            className="bg-white rounded-xl overflow-hidden shadow-sm active:opacity-90 transition-opacity"
          >
            <div className="relative aspect-square bg-gray-200">
              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              {item.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight h-10 mb-2">{item.title}</h3>
              <div className="flex items-end justify-between mb-2">
                <div className="flex items-baseline text-red-500 font-bold">
                  <span className="text-xs">¥</span>
                  <span className="text-lg">{item.price}</span>
                </div>
                <div className="text-xs text-gray-400 line-through">¥{item.originalPrice}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <img src={item.seller.avatar} className="w-4 h-4 rounded-full" alt="avatar" />
                <span className="text-[10px] text-gray-500 truncate">{item.seller.name}</span>
                {item.seller.rating >= 4.8 && (
                   <span className="bg-yellow-100 text-yellow-700 text-[9px] px-1 rounded">Reliable</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>No treasures found here...</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;