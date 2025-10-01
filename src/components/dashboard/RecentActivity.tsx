import React from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { FileText, User, CheckCircle, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'document' | 'training' | 'account' | 'onboarding';
  message: string;
  employee: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in_progress';
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'document',
    message: 'Signed I-9 Employment Verification',
    employee: 'Alex Chen',
    timestamp: '2 hours ago',
    status: 'completed',
  },
  {
    id: '2',
    type: 'training',
    message: 'Completed Development Environment Setup',
    employee: 'Alex Chen',
    timestamp: '4 hours ago',
    status: 'completed',
  },
  {
    id: '3',
    type: 'account',
    message: 'Google Workspace account created',
    employee: 'Maria Rodriguez',
    timestamp: '1 day ago',
    status: 'completed',
  },
  {
    id: '4',
    type: 'document',
    message: 'W-4 form reminder sent',
    employee: 'Maria Rodriguez',
    timestamp: '2 days ago',
    status: 'pending',
  },
  {
    id: '5',
    type: 'onboarding',
    message: 'Onboarding completed successfully',
    employee: 'David Kim',
    timestamp: '3 days ago',
    status: 'completed',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'document':
      return FileText;
    case 'training':
      return CheckCircle;
    case 'account':
      return User;
    case 'onboarding':
      return CheckCircle;
    default:
      return Clock;
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="subtitle">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary-hover">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {mockActivity.map((activity) => {
          const Icon = getIcon(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-bg-subtle rounded-lg transition-colors">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text">{activity.message}</p>
                <p className="text-xs text-text-muted">
                  {activity.employee} • {activity.timestamp}
                </p>
              </div>
              <StatusBadge status={activity.status} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};