export interface Organization {
  id: string;
  name: string;
  industry: string;
  employee_count: number;
  subscription_tier: 'starter' | 'growth' | 'scale';
  created_at: string;
  settings_json: Record<string, any>;
}

export interface User {
  id: string;
  organization_id: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  name: string;
  created_at: string;
}

export interface Employee {
  id: string;
  organization_id: string;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  country: string;
  employment_type: 'full-time' | 'part-time' | 'contractor';
  role_category: 'sales' | 'support' | 'dev' | 'marketing' | 'ops';
  start_date: string;
  status: 'pending' | 'active' | 'completed';
  assigned_manager_id: string;
  created_at: string;
}

export interface DocumentTemplate {
  id: string;
  organization_id: string;
  name: string;
  category: 'compliance' | 'policy' | 'it';
  required_for_states: string[];
  required_for_employment_types: string[];
  template_url: string;
  fillable_fields_json: Record<string, any>;
  created_at: string;
}

export interface Document {
  id: string;
  employee_id: string;
  template_id: string;
  status: 'pending' | 'sent' | 'signed' | 'expired';
  sent_at: string | null;
  signed_at: string | null;
  signature_ip: string | null;
  document_url: string;
  reminder_count: number;
  next_reminder_at: string | null;
}

export interface TrainingPath {
  id: string;
  employee_id: string;
  role_category: string;
  status: 'not_started' | 'in_progress' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  modules_json: TrainingModule[];
}

export interface TrainingModule {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  video_url?: string;
  quiz_questions?: QuizQuestion[];
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface TrainingModuleCompletion {
  id: string;
  training_path_id: string;
  module_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  completed_at: string | null;
  quiz_score: number | null;
}

export interface ITAccount {
  id: string;
  employee_id: string;
  platform: 'google' | 'slack' | 'github' | 'other';
  username: string;
  status: 'pending' | 'provisioned' | 'failed';
  provisioned_at: string | null;
  credentials_sent_at: string | null;
  error_message: string | null;
}

export interface OnboardingTask {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  due_date?: string;
  completion_percentage: number;
  dependencies?: string[];
}

export interface OnboardingTimeline {
  id: string;
  employee_id: string;
  overall_status: 'on_track' | 'delayed' | 'blocked' | 'completed';
  completion_percentage: number;
  tasks_json: OnboardingTask[];
  last_updated_at: string;
}

export type StatusType = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'not_started' | 'sent' | 'signed' | 'expired' | 'provisioned' | 'failed' | 'on_track' | 'delayed';