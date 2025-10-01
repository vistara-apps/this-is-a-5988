import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Employee } from '../../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
  const { addEmployee, organization } = useApp();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    state: '',
    country: 'US',
    employment_type: 'full-time' as const,
    role_category: 'dev' as const,
    start_date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEmployee: Employee = {
      id: Date.now().toString(),
      organization_id: organization?.id || '1',
      ...formData,
      status: 'pending',
      assigned_manager_id: '1',
      created_at: new Date().toISOString(),
    };

    addEmployee(newEmployee);
    onClose();
    
    // Reset form
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      state: '',
      country: 'US',
      employment_type: 'full-time',
      role_category: 'dev',
      start_date: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-dialog w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="subtitle">Add New Employee</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-hover rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label block mb-2">First Name</label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="label block mb-2">Last Name</label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="label block mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label block mb-2">State</label>
              <select
                required
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="WA">Washington</option>
              </select>
            </div>
            <div>
              <label className="label block mb-2">Country</label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label block mb-2">Employment Type</label>
            <select
              required
              value={formData.employment_type}
              onChange={(e) => setFormData(prev => ({ ...prev, employment_type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contractor">Contractor</option>
            </select>
          </div>

          <div>
            <label className="label block mb-2">Role Category</label>
            <select
              required
              value={formData.role_category}
              onChange={(e) => setFormData(prev => ({ ...prev, role_category: e.target.value as any }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="dev">Developer</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="support">Support</option>
              <option value="ops">Operations</option>
            </select>
          </div>

          <div>
            <label className="label block mb-2">Start Date</label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};