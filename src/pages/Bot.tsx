
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BotInterface } from '@/components/bot/BotInterface';

const Bot: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Bot Assistant" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <BotInterface />
        </main>
      </div>
    </div>
  );
};

export default Bot;
