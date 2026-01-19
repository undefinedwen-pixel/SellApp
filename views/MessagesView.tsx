import React, { useEffect } from 'react';

const MessagesView: React.FC = () => {

  useEffect(() => {
     // TODO: Data Interface - Fetch Conversation List
     // API: GET /api/conversations
     // Response: [{ id, lastMessage, unreadCount, otherUser: { ... } }]
  }, []);

  return (
    <div className="bg-white min-h-screen pb-24 px-4 pt-12">
      <h2 className="text-xl font-bold mb-6">消息</h2>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          // TODO: Replace with dynamic data mapping
          <div key={i} className="flex gap-3 pb-3 border-b border-gray-50 cursor-pointer">
             <div className="relative">
               <img src={`https://picsum.photos/seed/${i}/100/100`} className="w-12 h-12 rounded-full" alt="avatar" />
               <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></div>
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-baseline mb-1">
                 <span className="font-bold text-sm">邻居 #{i}</span>
                 <span className="text-[10px] text-gray-400">10:3{i}</span>
               </div>
               <p className="text-xs text-gray-500 truncate">宝贝还在吗？我可以现在去拿。</p>
             </div>
             <img src={`https://picsum.photos/seed/item${i}/100/100`} className="w-12 h-12 rounded-md object-cover" alt="item preview" />
          </div>
        ))}
        <div className="text-center text-gray-400 text-xs py-4">没有更多消息了</div>
      </div>
    </div>
  )
}

export default MessagesView;