import React from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { useApp } from '../../contexts/AppContext';
import { mockOnboardingTimelines } from '../../data/mockData';
import { Calendar, User } from 'lucide-react';

export const OnboardingTimeline: React.FC = () => {
  const { employees } = useApp();
  
  const getTimelineForEmployee = (employeeId: string) => {
    return mockOnboardingTimelines.find(t => t.employee_id === employeeId);
  };

  const activeOnboardings = employees
    .filter(e => e.status !== 'completed')
    .map(employee => ({
      employee,
      timeline: getTimelineForEmployee(employee.id),
    }))
    .filter(item => item.timeline);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="subtitle">Active Onboardings</h2>
        <button className="text-sm text-primary hover:text-primary-hover">
          View All
        </button>
      </div>
      
      <div className="space-y-6">
        {activeOnboardings.map(({ employee, timeline }) => (
          <div key={employee.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-text">
                    {employee.first_name} {employee.last_name}
                  </h3>
                  <p className="text-sm text-text-muted capitalize">
                    {employee.role_category} • {employee.employment_type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={timeline?.overall_status || 'pending'} />
                <div className="flex items-center text-sm text-text-muted mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Start: {new Date(employee.start_date).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">Overall Progress</span>
                <span className="text-sm text-text-muted">
                  {timeline?.completion_percentage || 0}%
                </span>
              </div>
              <ProgressBar 
                value={timeline?.completion_percentage || 0} 
                variant={timeline?.overall_status === 'on_track' ? 'success' : 'warning'}
                showLabel={false}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {timeline?.tasks_json.map(task => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-bg-subtle rounded">
                  <span className="text-sm text-text">{task.name}</span>
                  <StatusBadge status={task.status} />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {activeOnboardings.length === 0 && (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No active onboardings</p>
            <button className="text-primary hover:text-primary-hover text-sm mt-2">
              Add New Employee
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};