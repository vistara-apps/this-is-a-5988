import { User, Organization, Employee, DocumentTemplate, Document, TrainingPath, ITAccount, OnboardingTimeline, TrainingModule } from '../types';

export const mockUser: User = {
  id: '1',
  organization_id: '1',
  email: 'admin@techcorp.com',
  role: 'admin',
  name: 'Sarah Johnson',
  created_at: '2024-01-01T00:00:00Z',
};

export const mockOrganization: Organization = {
  id: '1',
  name: 'TechCorp Inc.',
  industry: 'Technology',
  employee_count: 25,
  subscription_tier: 'growth',
  created_at: '2024-01-01T00:00:00Z',
  settings_json: {},
};

export const mockEmployees: Employee[] = [
  {
    id: '1',
    organization_id: '1',
    first_name: 'Alex',
    last_name: 'Chen',
    email: 'alex.chen@techcorp.com',
    state: 'CA',
    country: 'US',
    employment_type: 'full-time',
    role_category: 'dev',
    start_date: '2024-01-15',
    status: 'active',
    assigned_manager_id: '1',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    organization_id: '1',
    first_name: 'Maria',
    last_name: 'Rodriguez',
    email: 'maria.rodriguez@techcorp.com',
    state: 'TX',
    country: 'US',
    employment_type: 'full-time',
    role_category: 'sales',
    start_date: '2024-01-20',
    status: 'pending',
    assigned_manager_id: '1',
    created_at: '2024-01-12T00:00:00Z',
  },
  {
    id: '3',
    organization_id: '1',
    first_name: 'David',
    last_name: 'Kim',
    email: 'david.kim@techcorp.com',
    state: 'NY',
    country: 'US',
    employment_type: 'part-time',
    role_category: 'support',
    start_date: '2024-02-01',
    status: 'completed',
    assigned_manager_id: '1',
    created_at: '2024-01-25T00:00:00Z',
  },
];

export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: '1',
    organization_id: '1',
    name: 'I-9 Employment Eligibility Verification',
    category: 'compliance',
    required_for_states: ['ALL'],
    required_for_employment_types: ['full-time', 'part-time'],
    template_url: '/templates/i9.pdf',
    fillable_fields_json: {
      employee_name: 'text',
      ssn: 'text',
      address: 'text',
    },
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    organization_id: '1',
    name: 'W-4 Employee\'s Withholding Certificate',
    category: 'compliance',
    required_for_states: ['ALL'],
    required_for_employment_types: ['full-time', 'part-time'],
    template_url: '/templates/w4.pdf',
    fillable_fields_json: {
      employee_name: 'text',
      filing_status: 'select',
      allowances: 'number',
    },
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    organization_id: '1',
    name: 'California DE 4 State Withholding',
    category: 'compliance',
    required_for_states: ['CA'],
    required_for_employment_types: ['full-time', 'part-time'],
    template_url: '/templates/ca-de4.pdf',
    fillable_fields_json: {},
    created_at: '2024-01-01T00:00:00Z',
  },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    employee_id: '1',
    template_id: '1',
    status: 'signed',
    sent_at: '2024-01-10T10:00:00Z',
    signed_at: '2024-01-10T14:30:00Z',
    signature_ip: '192.168.1.100',
    document_url: '/documents/alex-chen-i9-signed.pdf',
    reminder_count: 0,
    next_reminder_at: null,
  },
  {
    id: '2',
    employee_id: '2',
    template_id: '1',
    status: 'sent',
    sent_at: '2024-01-12T09:00:00Z',
    signed_at: null,
    signature_ip: null,
    document_url: '/documents/maria-rodriguez-i9.pdf',
    reminder_count: 1,
    next_reminder_at: '2024-01-15T09:00:00Z',
  },
];

export const mockTrainingModules: Record<string, TrainingModule[]> = {
  dev: [
    {
      id: 'dev-1',
      name: 'Company Overview & Culture',
      description: 'Learn about our mission, values, and team culture',
      duration_minutes: 15,
      video_url: 'https://example.com/video/company-overview',
      quiz_questions: [
        {
          id: 'q1',
          question: 'What is our primary company value?',
          options: ['Innovation', 'Quality', 'Collaboration', 'All of the above'],
          correct_answer: 3,
        },
      ],
      order: 1,
    },
    {
      id: 'dev-2',
      name: 'Development Environment Setup',
      description: 'Set up your local development environment and tools',
      duration_minutes: 30,
      video_url: 'https://example.com/video/dev-setup',
      order: 2,
    },
    {
      id: 'dev-3',
      name: 'Code Review Process',
      description: 'Understand our code review workflow and standards',
      duration_minutes: 20,
      video_url: 'https://example.com/video/code-review',
      order: 3,
    },
  ],
  sales: [
    {
      id: 'sales-1',
      name: 'Company Overview & Culture',
      description: 'Learn about our mission, values, and team culture',
      duration_minutes: 15,
      video_url: 'https://example.com/video/company-overview',
      order: 1,
    },
    {
      id: 'sales-2',
      name: 'Product Knowledge',
      description: 'Deep dive into our products and their value propositions',
      duration_minutes: 45,
      video_url: 'https://example.com/video/product-knowledge',
      order: 2,
    },
    {
      id: 'sales-3',
      name: 'Sales Process & CRM',
      description: 'Learn our sales methodology and CRM best practices',
      duration_minutes: 35,
      video_url: 'https://example.com/video/sales-process',
      order: 3,
    },
  ],
};

export const mockTrainingPaths: TrainingPath[] = [
  {
    id: '1',
    employee_id: '1',
    role_category: 'dev',
    status: 'in_progress',
    started_at: '2024-01-15T09:00:00Z',
    completed_at: null,
    modules_json: mockTrainingModules.dev,
  },
  {
    id: '2',
    employee_id: '2',
    role_category: 'sales',
    status: 'not_started',
    started_at: null,
    completed_at: null,
    modules_json: mockTrainingModules.sales,
  },
];

export const mockITAccounts: ITAccount[] = [
  {
    id: '1',
    employee_id: '1',
    platform: 'google',
    username: 'alex.chen@techcorp.com',
    status: 'provisioned',
    provisioned_at: '2024-01-15T08:00:00Z',
    credentials_sent_at: '2024-01-15T08:05:00Z',
    error_message: null,
  },
  {
    id: '2',
    employee_id: '1',
    platform: 'slack',
    username: 'alex.chen',
    status: 'provisioned',
    provisioned_at: '2024-01-15T08:02:00Z',
    credentials_sent_at: '2024-01-15T08:05:00Z',
    error_message: null,
  },
  {
    id: '3',
    employee_id: '2',
    platform: 'google',
    username: 'maria.rodriguez@techcorp.com',
    status: 'pending',
    provisioned_at: null,
    credentials_sent_at: null,
    error_message: null,
  },
];

export const mockOnboardingTimelines: OnboardingTimeline[] = [
  {
    id: '1',
    employee_id: '1',
    overall_status: 'on_track',
    completion_percentage: 75,
    tasks_json: [
      {
        id: 'docs',
        name: 'Document Signing',
        status: 'completed',
        completion_percentage: 100,
      },
      {
        id: 'it',
        name: 'IT Account Setup',
        status: 'completed',
        completion_percentage: 100,
      },
      {
        id: 'training',
        name: 'Training Modules',
        status: 'in_progress',
        completion_percentage: 66,
      },
      {
        id: 'manager',
        name: 'Manager Check-in',
        status: 'not_started',
        completion_percentage: 0,
        due_date: '2024-01-20',
      },
    ],
    last_updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: '2',
    employee_id: '2',
    overall_status: 'delayed',
    completion_percentage: 25,
    tasks_json: [
      {
        id: 'docs',
        name: 'Document Signing',
        status: 'in_progress',
        completion_percentage: 50,
      },
      {
        id: 'it',
        name: 'IT Account Setup',
        status: 'not_started',
        completion_percentage: 0,
        dependencies: ['docs'],
      },
      {
        id: 'training',
        name: 'Training Modules',
        status: 'not_started',
        completion_percentage: 0,
        dependencies: ['docs'],
      },
    ],
    last_updated_at: '2024-01-14T15:00:00Z',
  },
];