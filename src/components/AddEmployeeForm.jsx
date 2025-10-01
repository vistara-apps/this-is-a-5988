import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const ROLE_CATEGORIES = [
  'sales', 'support', 'developer', 'marketing', 'operations', 'hr', 'finance'
]

const EMPLOYMENT_TYPES = [
  'full-time', 'part-time', 'contractor'
]

function AddEmployeeForm({ onClose }) {
  const { addEmployee } = useData()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    state: 'CA',
    country: 'US',
    employment_type: 'full-time',
    role_category: 'sales',
    start_date: '',
    assigned_manager_id: '1'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addEmployee(formData)
      onClose()
    } catch (error) {
      console.error('Failed to add employee:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-text">
            First Name *
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            className="input mt-1"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-text">
            Last Name *
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            className="input mt-1"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input mt-1"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-text">
            State *
          </label>
          <select
            id="state"
            name="state"
            required
            className="input mt-1"
            value={formData.state}
            onChange={handleChange}
          >
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="employment_type" className="block text-sm font-medium text-text">
            Employment Type *
          </label>
          <select
            id="employment_type"
            name="employment_type"
            required
            className="input mt-1"
            value={formData.employment_type}
            onChange={handleChange}
          >
            {EMPLOYMENT_TYPES.map(type => (
              <option key={type} value={type}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="role_category" className="block text-sm font-medium text-text">
            Role Category *
          </label>
          <select
            id="role_category"
            name="role_category"
            required
            className="input mt-1"
            value={formData.role_category}
            onChange={handleChange}
          >
            {ROLE_CATEGORIES.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-text">
            Start Date *
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            required
            className="input mt-1"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </div>
    </form>
  )
}

export default AddEmployeeForm