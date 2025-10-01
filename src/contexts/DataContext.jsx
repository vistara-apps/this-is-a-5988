import React, { createContext, useContext, useState, useEffect } from 'react'
import { generateMockData } from '../utils/mockData'

const DataContext = createContext()

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export function DataProvider({ children }) {
  const [employees, setEmployees] = useState([])
  const [documentTemplates, setDocumentTemplates] = useState([])
  const [trainingPaths, setTrainingPaths] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize with mock data
    const mockData = generateMockData()
    setEmployees(mockData.employees)
    setDocumentTemplates(mockData.documentTemplates)
    setTrainingPaths(mockData.trainingPaths)
    setLoading(false)
  }, [])

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now().toString(),
      ...employeeData,
      status: 'pending',
      created_at: new Date().toISOString(),
      onboarding_timeline: {
        id: Date.now().toString(),
        overall_status: 'on_track',
        completion_percentage: 0,
        tasks: [
          { id: '1', name: 'Document Signing', status: 'pending', category: 'compliance' },
          { id: '2', name: 'IT Provisioning', status: 'pending', category: 'it' },
          { id: '3', name: 'Training Completion', status: 'pending', category: 'training' }
        ],
        last_updated_at: new Date().toISOString()
      },
      documents: [],
      training_path: null,
      it_accounts: []
    }
    
    setEmployees(prev => [...prev, newEmployee])
    return newEmployee
  }

  const updateEmployee = (id, updates) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ))
  }

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const getEmployee = (id) => {
    return employees.find(emp => emp.id === id)
  }

  const updateEmployeeTaskStatus = (employeeId, taskId, status) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = emp.onboarding_timeline.tasks.map(task =>
          task.id === taskId ? { ...task, status } : task
        )
        const completedTasks = updatedTasks.filter(task => task.status === 'completed').length
        const completionPercentage = Math.round((completedTasks / updatedTasks.length) * 100)
        
        return {
          ...emp,
          onboarding_timeline: {
            ...emp.onboarding_timeline,
            tasks: updatedTasks,
            completion_percentage: completionPercentage,
            overall_status: completionPercentage === 100 ? 'completed' : 'on_track',
            last_updated_at: new Date().toISOString()
          }
        }
      }
      return emp
    }))
  }

  const generateComplianceChecklist = (state, employmentType) => {
    const baseDocuments = [
      { name: 'I-9 Employment Eligibility Verification', required: true },
      { name: 'W-4 Tax Withholding Form', required: true },
      { name: 'Direct Deposit Authorization', required: false },
      { name: 'Employee Handbook Acknowledgment', required: true },
      { name: 'Emergency Contact Information', required: true }
    ]

    const stateSpecific = {
      'CA': [
        { name: 'California State Tax Withholding (DE 4)', required: true },
        { name: 'California Paid Family Leave Notice', required: true }
      ],
      'NY': [
        { name: 'New York State Tax Withholding (IT-2104)', required: true },
        { name: 'New York Paid Family Leave Notice', required: true }
      ],
      'TX': [
        { name: 'Texas Right to Work Notice', required: true }
      ]
    }

    const employmentSpecific = {
      'contractor': [
        { name: 'W-9 Tax Form', required: true },
        { name: 'Independent Contractor Agreement', required: true }
      ]
    }

    let checklist = [...baseDocuments]
    if (stateSpecific[state]) {
      checklist = [...checklist, ...stateSpecific[state]]
    }
    if (employmentSpecific[employmentType]) {
      checklist = [...checklist, ...employmentSpecific[employmentType]]
    }

    return checklist
  }

  const value = {
    employees,
    documentTemplates,
    trainingPaths,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    updateEmployeeTaskStatus,
    generateComplianceChecklist
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}