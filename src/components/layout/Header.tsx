import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const Header: React.FC = () => {
  const { user } = useApp();

  return (
    <header className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees, documents..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-text-muted hover:text-text">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text">{user?.name}</p>
              <p className="text-xs text-text-muted capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </div>
        </div>
      </div>
    </header>
  );
};