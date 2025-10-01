import React, { useState } from 'react'
import { Save, Upload, Download, Users, Building, Mail, Key } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('organization')
  const [settings, setSettings] = useState({
    organization: {
      name: user?.organization?.name || 'Acme Corp',
      industry: user?.organization?.industry || 'Technology',
      employee_count: user?.organization?.employee_count || 25,
      subscription_tier: user?.organization?.subscription_tier || 'pro'
    },
    notifications: {
      email_reminders: true,
      slack_notifications: false,
      manager_alerts: true,
      completion_reports: true
    },
    integrations: {
      google_workspace: false,
      slack: false,
      github: false,
      docusign: false
    }
  })

  const handleSave = (section) => {
    // Mock save functionality
    console.log(`Saving ${section} settings:`, settings[section])
  }

  const tabs = [
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'users', name: 'Users & Permissions', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Mail },
    { id: 'integrations', name: 'Integrations', icon: Key }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text">Settings</h1>
        <p className="mt-1 text-sm text-text-muted">
          Manage your organization settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text hover:border-border'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Organization Settings */}
        {activeTab === 'organization' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-text">Organization Settings</h3>
              <button 
                onClick={() => handleSave('organization')}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="org_name" className="block text-sm font-medium text-text">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="org_name"
                  className="input mt-1"
                  value={settings.organization.name}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    organization: { ...prev.organization, name: e.target.value }
                  }))}
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-text">
                  Industry
                </label>
                <select
                  id="industry"
                  className="input mt-1"
                  value={settings.organization.industry}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    organization: { ...prev.organization, industry: e.target.value }
                  }))}
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label htmlFor="employee_count" className="block text-sm font-medium text-text">
                  Employee Count
                </label>
                <select
                  id="employee_count"
                  className="input mt-1"
                  value={settings.organization.employee_count}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    organization: { ...prev.organization, employee_count: parseInt(e.target.value) }
                  }))}
                >
                  <option value={5}>1-5 employees</option>
                  <option value={10}>6-10 employees</option>
                  <option value={25}>11-25 employees</option>
                  <option value={50}>26-50 employees</option>
                  <option value={100}>51-100 employees</option>
                  <option value={500}>100+ employees</option>
                </select>
              </div>

              <div>
                <label htmlFor="subscription" className="block text-sm font-medium text-text">
                  Subscription Tier
                </label>
                <div className="mt-1 p-3 bg-bg-subtle rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text capitalize">{settings.organization.subscription_tier}</span>
                    <button className="text-sm text-primary hover:text-primary-hover">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users & Permissions */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-text">Team Members</h3>
                <button className="btn btn-primary">
                  <Users className="w-4 h-4 mr-2" />
                  Invite User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-bg-subtle">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text">{user?.name}</div>
                        <div className="text-sm text-text-muted">{user?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                          Admin
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                        Just now
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-hover">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-text">Notification Preferences</h3>
              <button 
                onClick={() => handleSave('notifications')}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
            
            <div className="space-y-6">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h4>
                    <p className="text-sm text-text-muted">
                      {key === 'email_reminders' && 'Send email reminders for pending tasks'}
                      {key === 'slack_notifications' && 'Send notifications to Slack channels'}
                      {key === 'manager_alerts' && 'Alert managers about onboarding delays'}
                      {key === 'completion_reports' && 'Weekly onboarding completion reports'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, [key]: e.target.checked }
                      }))}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-text mb-6">API Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'google_workspace', name: 'Google Workspace', description: 'Automatically create Google accounts' },
                  { key: 'slack', name: 'Slack', description: 'Add users to Slack workspace' },
                  { key: 'github', name: 'GitHub', description: 'Grant repository access' },
                  { key: 'docusign', name: 'DocuSign', description: 'Send documents for e-signature' }
                ].map((integration) => (
                  <div key={integration.key} className="p-4 border border-border rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-text">{integration.name}</h4>
                      {settings.integrations[integration.key] ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                          Connected
                        </span>
                      ) : (
                        <button 
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            integrations: { ...prev.integrations, [integration.key]: true }
                          }))}
                          className="btn btn-primary text-xs px-3 py-1"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-text-muted">{integration.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-medium text-text mb-6">Data Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="btn btn-secondary flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
                <button className="btn btn-secondary flex items-center justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPage