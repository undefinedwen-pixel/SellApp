import React, { useState, useEffect } from 'react';
import { AppView, Item } from './types';
import { MOCK_ITEMS } from './constants';

// Views
import HomeView from './views/HomeView';
import ItemDetailView from './views/ItemDetailView';
import PublishView from './views/PublishView';
import ProfileView from './views/ProfileView';
import MessagesView from './views/MessagesView';

// Components
import TabBar from './components/TabBar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Load items
  useEffect(() => {
    // TODO: Data Interface - App Initialization
    // Fetch initial config or check auth status
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