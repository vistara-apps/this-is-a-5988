import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { CheckSquare, Plus, FileText, Download, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { mockDocumentTemplates } from '../../data/mockData';

export const ComplianceChecklists: React.FC = () => {
  const { employees } = useApp();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [generatedChecklist, setGeneratedChecklist] = useState<any>(null);

  const generateChecklist = () => {
    const employee = employees.find(e => e.id === selectedEmployee);
    if (!employee) return;

    const requiredDocs = mockDocumentTemplates.filter(template => {
      const stateMatch = template.required_for_states.includes('ALL') || 
                        template.required_for_states.includes(employee.state);
      const typeMatch = template.required_for_employment_types.includes(employee.employment_type);
      return stateMatch && typeMatch;
    });

    setGeneratedChecklist({
      employee,
      requiredDocuments: requiredDocs,
      generatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display">Compliance Checklists</h1>
        <p className="text-text-muted mt-2">
          Generate state-specific employment forms and compliance documents automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="subtitle mb-4">Generate New Checklist</h2>
          
          <div className="space-y-4">
            <div>
              <label className="label block mb-2">Select Employee</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Choose an employee...</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name} ({employee.state}, {employee.employment_type})
                  </option>
                ))}
              </select>
            </div>

            <Button 
              onClick={generateChecklist}
              disabled={!selectedEmployee}
              className="w-full"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Generate Compliance Checklist
            </Button>
          </div>

          {generatedChecklist && (
            <div className="mt-6 p-4 bg-bg-subtle rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-text">Generated Checklist</h3>
                <StatusBadge status="completed" />
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Employee:</strong> {generatedChecklist.employee.first_name} {generatedChecklist.employee.last_name}</p>
                <p><strong>State:</strong> {generatedChecklist.employee.state}</p>
                <p><strong>Employment Type:</strong> {generatedChecklist.employee.employment_type}</p>
                <p><strong>Required Documents:</strong> {generatedChecklist.requiredDocuments.length}</p>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="secondary">
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Start Onboarding
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="subtitle mb-4">Document Templates</h2>
          
          <div className="space-y-3">
            {mockDocumentTemplates.map(template => (
              <div key={template.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-text">{template.name}</p>
                    <p className="text-sm text-text-muted capitalize">
                      {template.category} • {template.required_for_states.join(', ')}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>

          <Button variant="secondary" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Template
          </Button>
        </Card>
      </div>

      {generatedChecklist && (
        <Card>
          <h2 className="subtitle mb-4">Required Documents for {generatedChecklist.employee.first_name} {generatedChecklist.employee.last_name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedChecklist.requiredDocuments.map((doc: any) => (
              <div key={doc.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-text">{doc.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    doc.required_for_states.includes('ALL') 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doc.required_for_states.includes('ALL') ? 'Federal' : 'State Required'}
                  </span>
                </div>
                
                <p className="text-sm text-text-muted mb-3 capitalize">
                  {doc.category} document
                </p>
                
                {doc.required_for_states.includes('ALL') && (
                  <div className="flex items-center text-sm text-error mb-2">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Federally mandated
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="secondary" size="sm">
                    Customize
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};