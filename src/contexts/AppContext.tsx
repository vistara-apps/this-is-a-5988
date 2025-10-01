import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Organization, Employee } from '../types';
import { mockUser, mockOrganization, mockEmployees } from '../data/mockData';

interface AppContextType {
  user: User | null;
  organization: Organization | null;
  employees: Employee[];
  currentView: string;
  setCurrentView: (view: string) => void;
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user] = useState<User | null>(mockUser);
  const [organization] = useState<Organization | null>(mockOrganization);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [currentView, setCurrentView] = useState('dashboard');

  const addEmployee = (employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
    );
  };

  const value: AppContextType = {
    user,
    organization,
    employees,
    currentView,
    setCurrentView,
    setEmployees,
    addEmployee,
    updateEmployee,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};