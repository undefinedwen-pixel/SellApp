import React, { useState } from 'react';
import { Camera, CheckCircle2, Sparkles, Tag, MapPin } from 'lucide-react';
import { Item } from '../types';
import { CATEGORIES, CURRENT_USER } from '../constants';
import { generateListingDescription } from '../services/geminiService';

interface PublishViewProps {
  onPublish: (item: Item) => void;
  onCancel: () => void;
}

const PublishView: React.FC<PublishViewProps> = ({ onPublish, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1].id); // Default Electronics
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  
  // TODO: Data Interface - Image Upload
  // const [uploading, setUploading] = useState(false);
  // const handleImageUpload = (file) => { ... upload to S3/Cloudinary ... }

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
    
    // TODO: Data Interface - Create Listing
    // API: POST /api/items
    // Payload: { title, price, description, category, tags, images, sellerId: CURRENT_USER.id }
    
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      price: parseInt(price),
      originalPrice: Math.floor(parseInt(price) * 1.5),
      description,
      // TODO: Replace with actual uploaded image URLs
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
           {/* TODO: Implement drag and drop or file picker */}
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

export default PublishView;