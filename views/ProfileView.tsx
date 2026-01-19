import React, { useEffect } from 'react';
import { CURRENT_USER } from '../constants';

const ProfileView: React.FC = () => {

  useEffect(() => {
    // TODO: Data Interface - Fetch User Profile & Stats
    // API: GET /api/users/me
  }, []);

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
              {/* TODO: Link to My Listings page */}
              <span>></span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-50 pb-3">
              <span>Bought Items</span>
               {/* TODO: Link to Order History page */}
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

export default ProfileView;