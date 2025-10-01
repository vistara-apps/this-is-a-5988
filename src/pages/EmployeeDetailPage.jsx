import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, FileText, Monitor, GraduationCap, CheckCircle, XCircle } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import StatusBadge from '../components/ui/StatusBadge'
import ProgressBar from '../components/ui/ProgressBar'

function EmployeeDetailPage() {
  const { id } = useParams()
  const { getEmployee, updateEmployeeTaskStatus } = useData()
  const employee = getEmployee(id)

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Employee not found.</p>
        <Link to="/employees" className="mt-4 btn btn-primary">
          Back to Employees
        </Link>
      </div>
    )
  }

  const handleTaskUpdate = (taskId, newStatus) => {
    updateEmployeeTaskStatus(employee.id, taskId, newStatus)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTaskIcon = (category) => {
    switch (category) {
      case 'compliance':
        return <FileText className="w-5 h-5" />
      case 'it':
        return <Monitor className="w-5 h-5" />
      case 'training':
        return <GraduationCap className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getTaskColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success'
      case 'in_progress':
        return 'text-info'
      case 'blocked':
        return 'text-error'
      default:
        return 'text-text-muted'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/employees" className="btn btn-ghost p-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-text">
            {employee.first_name} {employee.last_name}
          </h1>
          <p className="text-sm text-text-muted">{employee.email}</p>
        </div>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Employee Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-text-muted">Role</p>
              <p className="text-sm text-text">{employee.role_category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Employment Type</p>
              <p className="text-sm text-text">{employee.employment_type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Location</p>
              <p className="text-sm text-text">{employee.state}, {employee.country}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Start Date</p>
              <p className="text-sm text-text">{formatDate(employee.start_date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Status</p>
              <StatusBadge status={employee.onboarding_timeline?.overall_status || 'pending'} />
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Progress Overview</h3>
          <div className="space-y-4">
            <div>
              <ProgressBar
                percentage={employee.onboarding_timeline?.completion_percentage || 0}
                variant="primary"
                size="lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-semibold text-success">
                  {employee.onboarding_timeline?.tasks?.filter(t => t.status === 'completed').length || 0}
                </p>
                <p className="text-xs text-text-muted">Completed</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-info">
                  {employee.onboarding_timeline?.tasks?.filter(t => t.status === 'in_progress').length || 0}
                </p>
                <p className="text-xs text-text-muted">In Progress</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-text-muted">
                  {employee.onboarding_timeline?.tasks?.filter(t => t.status === 'pending').length || 0}
                </p>
                <p className="text-xs text-text-muted">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary">
              Send Reminder Email
            </button>
            <button className="w-full btn btn-secondary">
              Generate IT Credentials
            </button>
            <button className="w-full btn btn-secondary">
              Download Documents
            </button>
            <button className="w-full btn btn-ghost text-error border-error hover:bg-red-50">
              Reset Onboarding
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <h3 className="text-lg font-medium text-text mb-6">Onboarding Timeline</h3>
        <div className="space-y-6">
          {employee.onboarding_timeline?.tasks?.map((task, index) => (
            <div key={task.id} className="flex items-start space-x-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  task.status === 'completed' 
                    ? 'bg-success border-success text-white' 
                    : task.status === 'in_progress'
                    ? 'bg-info border-info text-white'
                    : task.status === 'blocked'
                    ? 'bg-error border-error text-white'
                    : 'bg-white border-border text-text-muted'
                }`}>
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : task.status === 'blocked' ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    getTaskIcon(task.category)
                  )}
                </div>
                {index < employee.onboarding_timeline.tasks.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>

              {/* Task content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-text">{task.name}</h4>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={task.status} />
                    {task.status !== 'completed' && (
                      <div className="flex space-x-1">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleTaskUpdate(task.id, 'in_progress')}
                            className="text-xs btn btn-ghost px-2 py-1"
                          >
                            Start
                          </button>
                        )}
                        {task.status === 'in_progress' && (
                          <button
                            onClick={() => handleTaskUpdate(task.id, 'completed')}
                            className="text-xs btn btn-ghost px-2 py-1"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2">
                  {task.category === 'compliance' && (
                    <div className="text-sm text-text-muted">
                      <p>• I-9 Form - Status: {employee.documents?.length > 0 ? 'Signed' : 'Pending'}</p>
                      <p>• W-4 Form - Status: Pending</p>
                      <p>• State Tax Forms - Status: Pending</p>
                    </div>
                  )}
                  {task.category === 'it' && (
                    <div className="text-sm text-text-muted">
                      <p>• Google Workspace - Status: {employee.it_accounts?.find(acc => acc.platform === 'google') ? 'Provisioned' : 'Pending'}</p>
                      <p>• Slack Access - Status: Pending</p>
                      <p>• GitHub Access - Status: Pending</p>
                    </div>
                  )}
                  {task.category === 'training' && (
                    <div className="text-sm text-text-muted">
                      <p>• Role-specific training path assigned</p>
                      <p>• Progress: {employee.training_path?.completion_percentage || 0}% complete</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetailPage