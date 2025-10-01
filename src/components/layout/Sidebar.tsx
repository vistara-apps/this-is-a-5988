import React from 'react';
import { clsx } from 'clsx';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  GraduationCap, 
  Settings,
  Monitor,
  CheckSquare 
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'compliance', label: 'Compliance', icon: CheckSquare },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'training', label: 'Training', icon: GraduationCap },
  { id: 'it-provisioning', label: 'IT Provisioning', icon: Monitor },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="w-64 bg-surface border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">OnboardFlow</h1>
        <p className="text-sm text-text-muted mt-1">TechCorp Inc.</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={clsx(
                    'w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text hover:bg-surface-hover'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-accent text-white text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};