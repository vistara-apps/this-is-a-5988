import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './components/views/Dashboard';
import { Employees } from './components/views/Employees';
import { ComplianceChecklists } from './components/views/ComplianceChecklists';
import { useApp } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'compliance':
        return <ComplianceChecklists />;
      case 'documents':
        return <div>Documents view - Coming soon</div>;
      case 'training':
        return <div>Training view - Coming soon</div>;
      case 'it-provisioning':
        return <div>IT Provisioning view - Coming soon</div>;
      case 'settings':
        return <div>Settings view - Coming soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppShell>
      {renderView()}
    </AppShell>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;