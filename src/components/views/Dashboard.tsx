import React from 'react';
import { DashboardStats } from '../dashboard/DashboardStats';
import { OnboardingTimeline } from '../dashboard/OnboardingTimeline';
import { RecentActivity } from '../dashboard/RecentActivity';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="display">Dashboard</h1>
        <p className="text-text-muted mt-2">
          Monitor your team's onboarding progress and stay on top of critical tasks.
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <OnboardingTimeline />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-gradient-to-br from-primary to-primary-hover rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <p className="text-blue-100 mb-4">Streamline your onboarding workflow</p>
          <div className="space-y-2">
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
              Add New Employee
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
              Generate Compliance Forms
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded text-sm transition-colors">
              Send Reminder Emails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};