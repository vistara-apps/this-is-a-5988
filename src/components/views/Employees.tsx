import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { useApp } from '../../contexts/AppContext';
import { Plus, Search, Filter, User, Mail, Calendar } from 'lucide-react';
import { AddEmployeeModal } from '../modals/AddEmployeeModal';

export const Employees: React.FC = () => {
  const { employees } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="display">Employees</h1>
          <p className="text-text-muted mt-2">
            Manage your team members and their onboarding progress.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="border border-border rounded-lg p-4 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text">
                      {employee.first_name} {employee.last_name}
                    </h3>
                    <p className="text-sm text-text-muted capitalize">
                      {employee.role_category}
                    </p>
                  </div>
                </div>
                <StatusBadge status={employee.status} />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-text-muted">
                  <Mail className="w-4 h-4 mr-2" />
                  {employee.email}
                </div>
                <div className="flex items-center text-text-muted">
                  <Calendar className="w-4 h-4 mr-2" />
                  Start: {new Date(employee.start_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-text-muted">
                  <span className="font-medium mr-2">Location:</span>
                  {employee.state}, {employee.country}
                </div>
                <div className="flex items-center text-text-muted">
                  <span className="font-medium mr-2">Type:</span>
                  <span className="capitalize">{employee.employment_type}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted mb-2">No employees found</p>
            <p className="text-sm text-text-muted">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Get started by adding your first employee'
              }
            </p>
          </div>
        )}
      </Card>

      {showAddModal && (
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};