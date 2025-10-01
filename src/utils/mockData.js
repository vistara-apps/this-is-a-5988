export function generateMockData() {
  const employees = [
    {
      id: '1',
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah.johnson@company.com',
      state: 'CA',
      country: 'US',
      employment_type: 'full-time',
      role_category: 'sales',
      start_date: '2024-02-01',
      status: 'active',
      assigned_manager_id: '1',
      created_at: '2024-01-15T10:00:00Z',
      onboarding_timeline: {
        id: '1',
        overall_status: 'on_track',
        completion_percentage: 75,
        tasks: [
          { id: '1', name: 'Document Signing', status: 'completed', category: 'compliance' },
          { id: '2', name: 'IT Provisioning', status: 'completed', category: 'it' },
          { id: '3', name: 'Training Completion', status: 'in_progress', category: 'training' }
        ],
        last_updated_at: '2024-01-20T14:30:00Z'
      },
      documents: [
        {
          id: '1',
          template_id: '1',
          status: 'signed',
          sent_at: '2024-01-15T10:00:00Z',
          signed_at: '2024-01-15T14:30:00Z'
        }
      ],
      training_path: {
        id: '1',
        role_category: 'sales',
        status: 'in_progress',
        started_at: '2024-01-16T09:00:00Z',
        completion_percentage: 60
      },
      it_accounts: [
        {
          id: '1',
          platform: 'google',
          username: 'sarah.johnson@company.com',
          status: 'provisioned',
          provisioned_at: '2024-01-15T16:00:00Z'
        }
      ]
    },
    {
      id: '2',
      first_name: 'Mike',
      last_name: 'Chen',
      email: 'mike.chen@company.com',
      state: 'NY',
      country: 'US',
      employment_type: 'full-time',
      role_category: 'developer',
      start_date: '2024-02-15',
      status: 'pending',
      assigned_manager_id: '2',
      created_at: '2024-01-20T11:00:00Z',
      onboarding_timeline: {
        id: '2',
        overall_status: 'delayed',
        completion_percentage: 33,
        tasks: [
          { id: '1', name: 'Document Signing', status: 'in_progress', category: 'compliance' },
          { id: '2', name: 'IT Provisioning', status: 'pending', category: 'it' },
          { id: '3', name: 'Training Completion', status: 'pending', category: 'training' }
        ],
        last_updated_at: '2024-01-21T09:15:00Z'
      },
      documents: [
        {
          id: '2',
          template_id: '1',
          status: 'sent',
          sent_at: '2024-01-20T11:00:00Z',
          reminder_count: 2
        }
      ],
      training_path: null,
      it_accounts: []
    }
  ]

  const documentTemplates = [
    {
      id: '1',
      name: 'I-9 Employment Eligibility Verification',
      category: 'compliance',
      required_for_states: ['ALL'],
      required_for_employment_types: ['full-time', 'part-time'],
      fillable_fields: ['full_name', 'address', 'ssn', 'date_of_birth']
    },
    {
      id: '2',
      name: 'W-4 Tax Withholding Form',
      category: 'compliance',
      required_for_states: ['ALL'],
      required_for_employment_types: ['full-time', 'part-time'],
      fillable_fields: ['full_name', 'address', 'ssn', 'filing_status']
    }
  ]

  const trainingPaths = [
    {
      id: '1',
      role_category: 'sales',
      name: 'Sales Onboarding Path',
      modules: [
        {
          id: '1',
          name: 'Company Overview',
          type: 'video',
          duration: 15,
          required: true
        },
        {
          id: '2',
          name: 'Sales Process & CRM',
          type: 'interactive',
          duration: 30,
          required: true
        },
        {
          id: '3',
          name: 'Product Knowledge',
          type: 'video',
          duration: 45,
          required: true
        }
      ]
    },
    {
      id: '2',
      role_category: 'developer',
      name: 'Developer Onboarding Path',
      modules: [
        {
          id: '1',
          name: 'Development Environment Setup',
          type: 'tutorial',
          duration: 60,
          required: true
        },
        {
          id: '2',
          name: 'Codebase Architecture',
          type: 'interactive',
          duration: 90,
          required: true
        },
        {
          id: '3',
          name: 'Security Best Practices',
          type: 'video',
          duration: 30,
          required: true
        }
      ]
    }
  ]

  return {
    employees,
    documentTemplates,
    trainingPaths
  }
}