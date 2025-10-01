import React, { useState } from 'react'
import { FileText, Download, Plus, CheckCircle } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import Modal from '../components/ui/Modal'

function CompliancePage() {
  const { generateComplianceChecklist } = useData()
  const [showGenerator, setShowGenerator] = useState(false)
  const [generatedChecklist, setGeneratedChecklist] = useState(null)
  const [formData, setFormData] = useState({
    state: 'CA',
    employmentType: 'full-time'
  })

  const handleGenerate = (e) => {
    e.preventDefault()
    const checklist = generateComplianceChecklist(formData.state, formData.employmentType)
    setGeneratedChecklist(checklist)
  }

  const handleDownload = () => {
    // Mock download functionality
    const blob = new Blob([JSON.stringify(generatedChecklist, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compliance-checklist-${formData.state}-${formData.employmentType}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text">Compliance Management</h1>
          <p className="mt-1 text-sm text-text-muted">
            Generate state-specific compliance checklists and manage document templates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowGenerator(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Checklist
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Document Templates</p>
              <p className="text-2xl font-semibold text-text">12</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">States Supported</p>
              <p className="text-2xl font-semibold text-text">50</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Download className="h-8 w-8 text-info" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Checklists Generated</p>
              <p className="text-2xl font-semibold text-text">47</p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Document Templates */}
      <div className="card">
        <h3 className="text-lg font-medium text-text mb-4">Common Document Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'I-9 Employment Eligibility', required: true, states: 'All States' },
            { name: 'W-4 Tax Withholding', required: true, states: 'All States' },
            { name: 'Employee Handbook', required: true, states: 'All States' },
            { name: 'Direct Deposit Authorization', required: false, states: 'All States' },
            { name: 'Emergency Contact Form', required: true, states: 'All States' },
            { name: 'Background Check Consent', required: false, states: 'Most States' }
          ].map((doc, index) => (
            <div key={index} className="p-4 border border-border rounded-md hover:bg-surface-hover transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text">{doc.name}</h4>
                  <p className="text-xs text-text-muted mt-1">{doc.states}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doc.required 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {doc.required ? 'Required' : 'Optional'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State-Specific Requirements */}
      <div className="card">
        <h3 className="text-lg font-medium text-text mb-4">State-Specific Requirements</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="text-sm font-medium text-blue-900">California</h4>
            <ul className="text-sm text-blue-800 mt-2 space-y-1">
              <li>• California State Tax Withholding (DE 4)</li>
              <li>• Paid Family Leave Notice</li>
              <li>• Workers' Compensation Notice</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h4 className="text-sm font-medium text-green-900">New York</h4>
            <ul className="text-sm text-green-800 mt-2 space-y-1">
              <li>• New York State Tax Withholding (IT-2104)</li>
              <li>• Paid Family Leave Notice</li>
              <li>• Disability Benefits Notice</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
            <h4 className="text-sm font-medium text-purple-900">Texas</h4>
            <ul className="text-sm text-purple-800 mt-2 space-y-1">
              <li>• Right to Work Notice</li>
              <li>• Workers' Compensation Notice</li>
              <li>• Unemployment Benefits Notice</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Generated Checklist Display */}
      {generatedChecklist && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text">
              Generated Checklist ({formData.state} - {formData.employmentType})
            </h3>
            <button 
              onClick={handleDownload}
              className="btn btn-secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
          <div className="space-y-2">
            {generatedChecklist.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-3" />
                  <span className="text-sm text-text">{doc.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doc.required 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {doc.required ? 'Required' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist Generator Modal */}
      <Modal
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
        title="Generate Compliance Checklist"
        size="lg"
      >
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-text">
              State *
            </label>
            <select
              id="state"
              className="input mt-1"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            >
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="WA">Washington</option>
              <option value="OR">Oregon</option>
            </select>
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-text">
              Employment Type *
            </label>
            <select
              id="employmentType"
              className="input mt-1"
              value={formData.employmentType}
              onChange={(e) => setFormData(prev => ({ ...prev, employmentType: e.target.value }))}
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contractor">Contractor</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setShowGenerator(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Generate Checklist
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CompliancePage