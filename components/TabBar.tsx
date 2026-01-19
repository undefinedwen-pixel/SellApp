import React from 'react';
import { Home, MessageSquare, Plus, Heart, User as UserIcon } from 'lucide-react';
import { AppView } from '../types';

interface TabBarProps {
  currentView: AppView;
  onChange: (view: AppView) => void;
}

const TabBar: React.FC<TabBarProps> = ({ currentView, onChange }) => {
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

export default TabBar;