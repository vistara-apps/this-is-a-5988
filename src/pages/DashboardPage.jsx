import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import StatusBadge from '../components/ui/StatusBadge'
import ProgressBar from '../components/ui/ProgressBar'

function DashboardPage() {
  const { employees } = useData()

  // Calculate stats
  const totalEmployees = employees.length
  const activeOnboardings = employees.filter(emp => emp.status === 'pending').length
  const completedOnboardings = employees.filter(emp => 
    emp.onboarding_timeline?.overall_status === 'completed'
  ).length
  const delayedOnboardings = employees.filter(emp => 
    emp.onboarding_timeline?.overall_status === 'delayed'
  ).length

  const avgCompletionTime = employees.length > 0 
    ? Math.round(employees.reduce((acc, emp) => 
        acc + (emp.onboarding_timeline?.completion_percentage || 0), 0
      ) / employees.length)
    : 0

  const recentEmployees = employees
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
          <p className="mt-1 text-sm text-text-muted">
            Overview of your onboarding activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/employees" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Total Employees</p>
              <p className="text-2xl font-semibold text-text">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-info" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Active Onboardings</p>
              <p className="text-2xl font-semibold text-text">{activeOnboardings}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Completed</p>
              <p className="text-2xl font-semibold text-text">{completedOnboardings}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Delayed</p>
              <p className="text-2xl font-semibold text-text">{delayedOnboardings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text">Recent Employees</h3>
            <Link to="/employees" className="text-sm text-primary hover:text-primary-hover">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentEmployees.length > 0 ? (
              recentEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text">
                      {employee.first_name} {employee.last_name}
                    </p>
                    <p className="text-xs text-text-muted">{employee.role_category}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={employee.onboarding_timeline?.overall_status || 'pending'} />
                    <p className="text-xs text-text-muted mt-1">
                      {employee.onboarding_timeline?.completion_percentage || 0}% complete
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-muted text-center py-4">
                No employees yet. Add your first employee to get started.
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/employees" 
              className="block p-3 rounded-md border border-border hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center">
                <Plus className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">Add New Employee</p>
                  <p className="text-xs text-text-muted">Start a new onboarding process</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/compliance" 
              className="block p-3 rounded-md border border-border hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">Generate Compliance Checklist</p>
                  <p className="text-xs text-text-muted">Create state-specific document packets</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/training" 
              className="block p-3 rounded-md border border-border hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-info mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">Manage Training Paths</p>
                  <p className="text-xs text-text-muted">Configure role-based training modules</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      {employees.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Overall Progress</h3>
          <ProgressBar 
            percentage={avgCompletionTime} 
            variant="primary" 
            size="lg"
          />
          <p className="text-sm text-text-muted mt-2">
            Average completion rate across all active onboardings
          </p>
        </div>
      )}
    </div>
  )
}

export default DashboardPage