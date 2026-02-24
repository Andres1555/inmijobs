import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import type { Friend, Photo, Post, User } from '@/features/profile';
import { ProfileHeader } from '@/features/profile';
import { ProfileTabTodo } from '@/features/profile/components/ProfileTabTodo';
import { ProfileTabInfo } from '@/features/profile/components/ProfileTabInfo';

export const Route = createFileRoute('/(private)/profile')({
  component: ProfilePage,
});

const TABS = ['Todo', 'Información', 'Amigos', 'Fotos', 'Reels', 'Más'] as const;
type TabType = typeof TABS[number];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('Todo');

  const [user] = useState<User>({
    id: '1',
    name: 'Meyerowitz Rebeca',
    role: 'UI/UX Designer | Frontend Developer | Figma Expert',
    location: 'Ciudad Guayana · UNEGInforma',
    flags: ['VE', 'CA'],
    avatarUrl: '/assets/mascota/1.png',
    coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070',
    friendsCount: 2,
  });

  const [friends] = useState<Array<Friend>>([
    { id: '1', name: 'Alexis Diaz', avatarUrl: '/assets/mascota/2.png' },
    { id: '2', name: 'Eduardo Crespo', avatarUrl: '/assets/brand/icon.png' },
  ]);

  const [photos] = useState<Array<Photo>>([
    { id: '1', url: '/assets/brand/isologo.png' },
    { id: '2', url: '/assets/mascota/2.png' },
    { id: '3', url: '/assets/brand/icon.png' },
  ]);

  const [posts] = useState<Array<Post>>([
    {
      id: '1',
      author: user,
      content: 'Mascota corporativa y concepts arts, para una red social dedicada a turistas e inmigrantes...',
      imageUrl: '/assets/mascota/1.png',
      likes: 12,
      comments: 5,
      timestamp: '2 días',
    }
  ]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Todo':
        return <ProfileTabTodo user={user} friends={friends} photos={photos} posts={posts} />;
      case 'Información':
        return <ProfileTabInfo />;
      case 'Amigos':
        return <div className="p-4 bg-white mt-4 rounded-xl border">Vista de Amigos (En construcción)</div>;
      case 'Fotos':
        return <div className="p-4 bg-white mt-4 rounded-xl border">Vista de Fotos (En construcción)</div>;
      default:
        return <div className="p-4 bg-white mt-4 rounded-xl border">Vista de {activeTab} (En construcción)</div>;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-3 px-2 sm:px-0 space-y-2">
      <ProfileHeader user={user} />

      <div className="flex border-b dark:border-border overflow-x-auto -mx-2 px-2 mt-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors relative
                                ${isActive
                  ? 'text-blue-600'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-muted/20 rounded-t-md'
                }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-100 transition-all">
        {renderTabContent()}
      </div>
    </div>
  );
}