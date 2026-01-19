import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  MessageSquare, 
  User as UserIcon, 
  Plus, 
  Search, 
  MapPin, 
  Heart, 
  Share2, 
  ArrowLeft, 
  MoreHorizontal,
  Camera,
  Sparkles,
  Send,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { AppView, Item, Category, User } from './types';
import { MOCK_ITEMS, CATEGORIES, CURRENT_USER } from './constants';
import { generateListingDescription } from './services/geminiService';

// --- Helper Components ---

const TabBar: React.FC<{ currentView: AppView; onChange: (view: AppView) => void }> = ({ currentView, onChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 flex justify-between items-end z-50 max-w-md mx-auto h-[80px]">
      <button 
        onClick={() => onChange(AppView.HOME)}
        className={`flex flex-col items-center gap-1 mb-3 ${currentView === AppView.HOME ? 'text-yellow-500 font-bold' : 'text-gray-400'}`}
      >
        <Home size={24} fill={currentView === AppView.HOME ? "currentColor" : "none"} />
        <span className="text-xs">Home</span>
      </button>

      <button 
        onClick={() => onChange(AppView.MESSAGES)}
        className={`flex flex-col items-center gap-1 mb-3 ${currentView === AppView.MESSAGES ? 'text-yellow-500 font-bold' : 'text-gray-400'}`}
      >
        <MessageSquare size={24} fill={currentView === AppView.MESSAGES ? "currentColor" : "none"} />
        <span className="text-xs">Chat</span>
      </button>

      <div className="relative -top-6">
        <button 
          onClick={() => onChange(AppView.PUBLISH)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-4 shadow-lg transform transition-transform active:scale-95 border-4 border-gray-100"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
        <div className="text-xs text-center font-semibold mt-1 text-gray-600">Sell</div>
      </div>

      <button 
        className={`flex flex-col items-center gap-1 mb-3 text-gray-400 cursor-not-allowed opacity-50`}
      >
        <div className="relative">
          <Heart size={24} />
        </div>
        <span className="text-xs">Likes</span>
      </button>

      <button 
        onClick={() => onChange(AppView.PROFILE)}
        className={`flex flex-col items-center gap-1 mb-3 ${currentView === AppView.PROFILE ? 'text-yellow-500 font-bold' : 'text-gray-400'}`}
      >
        <UserIcon size={24} fill={currentView === AppView.PROFILE ? "currentColor" : "none"} />
        <span className="text-xs">Me</span>
      </button>
    </div>
  );
};

// --- Main Views ---

const HomeView: React.FC<{ items: Item[]; onItemClick: (item: Item) => void }> = ({ items, onItemClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(i => i.category === activeCategory);

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

const ItemDetailView: React.FC<{ item: Item; onBack: () => void }> = ({ item, onBack }) => {
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
          <span className="text-gray-400 line-through text-sm">Original ¥{item.originalPrice}</span>
          <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg font-bold">Free Shipping in Block</span>
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
              <div className="text-xs text-gray-500">{item.seller.location} • Credit Excellent</div>
            </div>
          </div>
          <button className="text-yellow-600 border border-yellow-400 px-3 py-1 rounded-full text-xs font-bold">
            Follow
          </button>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-6 rounded-xl overflow-hidden h-32 bg-yellow-50 relative flex items-center justify-center border border-yellow-100">
           <MapPin className="text-yellow-500 mb-1 mr-1" />
           <span className="text-yellow-700 font-medium text-sm">Trade in Sunshine Gardens</span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-4 z-50 pb-safe">
        <div className="flex gap-5 px-2">
          <button className="flex flex-col items-center text-gray-500">
            <MessageSquare size={20} />
            <span className="text-[10px]">Chat</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Heart size={20} />
            <span className="text-[10px]">Want</span>
          </button>
        </div>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2.5 rounded-full shadow-md transition-colors">
          I want this
        </button>
      </div>
    </div>
  );
};

const PublishView: React.FC<{ onPublish: (item: Item) => void; onCancel: () => void }> = ({ onPublish, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1].id); // Default Electronics
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  // AI Generation Handler
  const handleAIGenerate = async () => {
    if (!title) return alert("Please enter a title first!");
    
    setIsGenerating(true);
    try {
      const result = await generateListingDescription(title, category, "Good");
      setDescription(result.description);
      if (!price) setPrice(result.suggestedPrice.toString());
      setTags(result.tags);
    } catch (e) {
      alert("AI is taking a nap. Try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (!title || !price || !description) return alert("Please fill in all required fields");
    
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      price: parseInt(price),
      originalPrice: Math.floor(parseInt(price) * 1.5),
      description,
      images: [`https://picsum.photos/seed/${title.replace(/\s/g, '')}/400/400`],
      seller: CURRENT_USER,
      category,
      likes: 0,
      views: 0,
      tags,
      postedAt: new Date().toISOString()
    };
    onPublish(newItem);
  };

  return (
    <div className="bg-white min-h-screen pb-safe">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-20">
        <button onClick={onCancel} className="text-gray-500 text-sm">Cancel</button>
        <h2 className="font-bold text-lg">Sell Item</h2>
        <button onClick={handleSubmit} className="bg-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold">Publish</button>
      </div>

      <div className="p-4 space-y-6">
        {/* Image Upload Placeholder */}
        <div className="flex gap-3 overflow-x-auto pb-2">
           <div className="w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300 flex-shrink-0">
             <Camera size={24} />
             <span className="text-xs mt-1">Add Photos</span>
           </div>
           {/* Mock uploaded image based on title */}
           {title && (
             <div className="w-24 h-24 rounded-lg overflow-hidden relative">
               <img src={`https://picsum.photos/seed/${title.replace(/\s/g, '')}/200/200`} className="w-full h-full object-cover" alt="preview" />
               <div className="absolute top-1 right-1 bg-black/50 p-0.5 rounded-full"><CheckCircle2 size={12} className="text-white" /></div>
             </div>
           )}
        </div>

        {/* Title Input */}
        <div>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-bold placeholder-gray-400 border-none outline-none"
            placeholder="What are you selling? (e.g. Old Bike)"
          />
        </div>

        {/* Description Input with AI */}
        <div className="relative">
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 resize-none text-sm text-gray-700 placeholder-gray-400 border-none outline-none"
            placeholder="Describe condition, reason for selling, pick-up details..."
          />
          <button 
            onClick={handleAIGenerate}
            disabled={isGenerating || !title}
            className={`absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isGenerating ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isGenerating ? (
              <span>Thinking...</span>
            ) : (
              <>
                <Sparkles size={12} />
                <span>AI Polish</span>
              </>
            )}
          </button>
        </div>

        <hr className="border-gray-100" />

        {/* Meta Data */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
               <Tag size={18} />
               <span className="text-sm font-medium">Price (¥)</span>
            </div>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-right text-red-500 font-bold outline-none w-32 placeholder-red-200"
              placeholder="0.00"
            />
          </div>
          
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-gray-600">
               <span className="text-lg">📂</span>
               <span className="text-sm font-medium">Category</span>
             </div>
             <select 
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="bg-transparent text-sm text-gray-500 outline-none text-right"
             >
               {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                 <option key={c.id} value={c.id}>{c.name}</option>
               ))}
             </select>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-gray-600">
               <MapPin size={18} />
               <span className="text-sm font-medium">Location</span>
             </div>
             <span className="text-sm text-gray-500">{CURRENT_USER.location}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex gap-2">
            {tags.map(t => (
              <span key={t} className="bg-yellow-50 text-yellow-600 text-xs px-2 py-1 rounded border border-yellow-200">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileView: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-yellow-400 pt-10 pb-6 px-6 rounded-b-[40px]">
         <div className="flex items-center gap-4 mb-6">
            <img src={CURRENT_USER.avatar} alt="me" className="w-16 h-16 rounded-full border-2 border-white" />
            <div>
               <h2 className="text-xl font-bold">{CURRENT_USER.name}</h2>
               <div className="text-xs bg-black/10 inline-block px-2 py-0.5 rounded-full mt-1">
                 Credit Score: Excellent
               </div>
            </div>
         </div>
         <div className="flex justify-between text-center px-4">
            <div>
              <div className="font-bold text-lg">12</div>
              <div className="text-xs opacity-70">Sold</div>
            </div>
            <div>
              <div className="font-bold text-lg">4</div>
              <div className="text-xs opacity-70">Selling</div>
            </div>
            <div>
              <div className="font-bold text-lg">48</div>
              <div className="text-xs opacity-70">Liked</div>
            </div>
            <div>
              <div className="font-bold text-lg">5.0</div>
              <div className="text-xs opacity-70">Rating</div>
            </div>
         </div>
      </div>

      <div className="p-4 space-y-3 -mt-4">
         <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <span className="font-medium">My Wallet</span>
            <span className="text-gray-400 text-sm">¥ 350.00 ></span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-50 pb-3">
              <span>My Posts</span>
              <span>></span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-50 pb-3">
              <span>Bought Items</span>
              <span>></span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Settings</span>
              <span>></span>
            </div>
         </div>
      </div>
    </div>
  )
}

const MessagesView: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-24 px-4 pt-12">
      <h2 className="text-xl font-bold mb-6">Messages</h2>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-3 pb-3 border-b border-gray-50">
             <div className="relative">
               <img src={`https://picsum.photos/seed/${i}/100/100`} className="w-12 h-12 rounded-full" />
               <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></div>
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-baseline mb-1">
                 <span className="font-bold text-sm">Neighbor #{i}</span>
                 <span className="text-[10px] text-gray-400">10:3{i} AM</span>
               </div>
               <p className="text-xs text-gray-500 truncate">Is the item still available? I can pick up now.</p>
             </div>
             <img src={`https://picsum.photos/seed/item${i}/100/100`} className="w-12 h-12 rounded-md object-cover" />
          </div>
        ))}
        <div className="text-center text-gray-400 text-xs py-4">No more messages</div>
      </div>
    </div>
  )
}

// --- Main App Controller ---

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Load items
  useEffect(() => {
    // In a real app, fetch from API here
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setView(AppView.DETAIL);
  };

  const handlePublish = (item: Item) => {
    setItems([item, ...items]);
    setView(AppView.HOME);
  };

  const renderContent = () => {
    switch (view) {
      case AppView.HOME:
        return <HomeView items={items} onItemClick={handleItemClick} />;
      case AppView.DETAIL:
        return selectedItem ? (
          <ItemDetailView 
            item={selectedItem} 
            onBack={() => setView(AppView.HOME)} 
          />
        ) : <HomeView items={items} onItemClick={handleItemClick} />;
      case AppView.PUBLISH:
        return (
          <PublishView 
            onPublish={handlePublish} 
            onCancel={() => setView(AppView.HOME)} 
          />
        );
      case AppView.PROFILE:
        return <ProfileView />;
      case AppView.MESSAGES:
        return <MessagesView />;
      default:
        return <HomeView items={items} onItemClick={handleItemClick} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl overflow-hidden relative font-sans text-gray-800">
      {renderContent()}
      
      {/* Tab Bar is hidden in Publish and Detail view */}
      {view !== AppView.PUBLISH && view !== AppView.DETAIL && (
        <TabBar currentView={view} onChange={setView} />
      )}
    </div>
  );
};

export default App;