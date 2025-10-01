import React, { useState } from 'react'
import { GraduationCap, Play, Clock, Users, Plus } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import ProgressBar from '../components/ui/ProgressBar'
import StatusBadge from '../components/ui/StatusBadge'

function TrainingPage() {
  const { trainingPaths, employees } = useData()
  const [selectedPath, setSelectedPath] = useState(null)

  const getTrainingStats = () => {
    const employeesInTraining = employees.filter(emp => emp.training_path)
    const completedTraining = employees.filter(emp => 
      emp.training_path?.status === 'completed'
    )
    const avgProgress = employeesInTraining.length > 0
      ? Math.round(employeesInTraining.reduce((acc, emp) => 
          acc + (emp.training_path?.completion_percentage || 0), 0
        ) / employeesInTraining.length)
      : 0

    return {
      total: employeesInTraining.length,
      completed: completedTraining.length,
      avgProgress
    }
  }

  const stats = getTrainingStats()

  const getRoleIcon = (role) => {
    switch (role) {
      case 'sales':
        return '💼'
      case 'developer':
        return '💻'
      case 'support':
        return '🎧'
      case 'marketing':
        return '📈'
      default:
        return '👤'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text">Training Management</h1>
          <p className="mt-1 text-sm text-text-muted">
            Manage role-based training paths and track employee progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Training Path
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">In Training</p>
              <p className="text-2xl font-semibold text-text">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <GraduationCap className="h-8 w-8 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Completed</p>
              <p className="text-2xl font-semibold text-text">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-info" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Avg Progress</p>
              <p className="text-2xl font-semibold text-text">{stats.avgProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-text mb-4">Training Paths</h3>
          <div className="space-y-4">
            {trainingPaths.map((path) => (
              <div 
                key={path.id} 
                className="p-4 border border-border rounded-md hover:bg-surface-hover transition-colors cursor-pointer"
                onClick={() => setSelectedPath(path)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getRoleIcon(path.role_category)}</span>
                    <div>
                      <h4 className="text-sm font-medium text-text">{path.name}</h4>
                      <p className="text-xs text-text-muted">
                        {path.modules.length} modules • {path.modules.reduce((acc, mod) => acc + mod.duration, 0)} min total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text">
                      {employees.filter(emp => emp.training_path?.role_category === path.role_category).length}
                    </p>
                    <p className="text-xs text-text-muted">enrolled</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Path Details */}
        {selectedPath ? (
          <div className="card">
            <h3 className="text-lg font-medium text-text mb-4">{selectedPath.name}</h3>
            <div className="space-y-4">
              {selectedPath.modules.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-text">{module.name}</h4>
                      <div className="flex items-center text-xs text-text-muted mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration} min
                        <span className="mx-2">•</span>
                        {module.type}
                        {module.required && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-red-600">Required</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-ghost p-2">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center">
            <div className="text-center">
              <GraduationCap className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">Select a training path to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Employee Progress */}
      <div className="card">
        <h3 className="text-lg font-medium text-text mb-4">Employee Training Progress</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-subtle">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Training Path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {employees.filter(emp => emp.training_path).map((employee) => (
                <tr key={employee.id} className="hover:bg-surface-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <div className="text-sm text-text-muted">{employee.role_category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text">
                      {trainingPaths.find(path => path.role_category === employee.training_path.role_category)?.name || 'Unknown Path'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={employee.training_path.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32">
                      <ProgressBar
                        percentage={employee.training_path.completion_percentage || 0}
                        size="sm"
                        showText={false}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        {employee.training_path.completion_percentage || 0}% complete
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-hover mr-3">
                      View Progress
                    </button>
                    <button className="text-text-muted hover:text-text">
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TrainingPage