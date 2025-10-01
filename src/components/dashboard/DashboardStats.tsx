import React from 'react';
import { Card } from '../ui/Card';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const DashboardStats: React.FC = () => {
  const { employees } = useApp();
  
  const totalEmployees = employees.length;
  const activeOnboardings = employees.filter(e => e.status === 'pending' || e.status === 'active').length;
  const completedOnboardings = employees.filter(e => e.status === 'completed').length;
  const overdueItems = 2; // Mock data

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Onboardings',
      value: activeOnboardings,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Completed This Month',
      value: completedOnboardings,
      icon: CheckCircle,
      color: 'text-accent',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Overdue Items',
      value: overdueItems,
      icon: AlertCircle,
      color: 'text-error',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} variant="stat">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-muted">{stat.title}</p>
                <p className="text-2xl font-semibold text-text">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};