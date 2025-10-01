import React from 'react'
import { Menu, Bell, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Header({ onMenuClick }) {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-border px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={onMenuClick}
            className="btn btn-ghost p-2"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden lg:flex items-center">
          <h1 className="text-xl font-semibold text-text">OnboardFlow</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="btn btn-ghost p-2 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User menu */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-text">{user?.name}</p>
                <p className="text-xs text-text-muted">{user?.organization?.name}</p>
              </div>
              <button 
                onClick={logout}
                className="btn btn-ghost p-2"
                title="Sign out"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header