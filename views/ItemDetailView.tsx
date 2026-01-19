import React, { useEffect } from 'react';
import { ArrowLeft, Share2, MoreHorizontal, MessageSquare, Heart, MapPin } from 'lucide-react';
import { Item } from '../types';

interface ItemDetailViewProps {
  item: Item;
  onBack: () => void;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ item, onBack }) => {

  useEffect(() => {
    // TODO: Data Interface - Fetch Full Item Details
    // API: GET /api/items/{item.id}
    // const fullDetails = await fetchItemDetails(item.id);
    
    // TODO: Data Interface - Record View
    // API: POST /api/analytics/view { itemId: item.id }
  }, [item.id]);

  const handleCreateOrder = () => {
     // TODO: Data Interface - Create Order / Payment intent
     // API: POST /api/orders { itemId: item.id }
     console.log('Creating order for', item.id);
  };

  const handleChat = () => {
    // TODO: Data Interface - Initiate Chat Session
    // API: POST /api/conversations { targetUserId: item.seller.id, itemId: item.id }
    console.log('Starting chat with', item.seller.name);
  };

  return (
    <div className="bg-white min-h-screen pb-24 relative">
      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
        <button onClick={onBack} className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white pointer-events-auto hover:bg-black/50 transition">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/50 transition">
            <Share2 size={20} />
          </button>
          <button className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/50 transition">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="w-full h-[400px] bg-gray-100 overflow-hidden relative">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          1 / {item.images.length}
        </div>
      </div>

      <div className="p-4 -mt-6 relative bg-white rounded-t-3xl shadow-inner">
        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-red-500 font-bold text-3xl">¥{item.price}</span>
          <span className="text-gray-400 line-through text-sm">原价 ¥{item.originalPrice}</span>
          <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg font-bold">小区包邮</span>
        </div>

        {/* Title & Tags */}
        <h1 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">#{tag}</span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
          {item.description}
        </p>

        <hr className="border-gray-100 mb-6" />

        {/* Seller Card */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
          <div className="flex items-center gap-3">
            <img src={item.seller.avatar} alt="seller" className="w-10 h-10 rounded-full border border-white shadow-sm" />
            <div>
              <div className="font-bold text-sm">{item.seller.name}</div>
              <div className="text-xs text-gray-500">{item.seller.location} • 信用极好</div>
            </div>
          </div>
          <button className="text-yellow-600 border border-yellow-400 px-3 py-1 rounded-full text-xs font-bold">
            关注
          </button>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-6 rounded-xl overflow-hidden h-32 bg-yellow-50 relative flex items-center justify-center border border-yellow-100">
           <MapPin className="text-yellow-500 mb-1 mr-1" />
           <span className="text-yellow-700 font-medium text-sm">在阳光花园交易</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-4 z-50 pb-safe">
        <div className="flex gap-5 px-2">
          <button className="flex flex-col items-center text-gray-500" onClick={handleChat}>
            <MessageSquare size={20} />
            <span className="text-[10px]">聊一聊</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Heart size={20} />
            <span className="text-[10px]">想要</span>
          </button>
        </div>
        <button 
          onClick={handleCreateOrder}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2.5 rounded-full shadow-md transition-colors"
        >
          我想要
        </button>
      </div>
    </div>
  );
};

export default ItemDetailView;