import React from 'react'

function ProgressBar({ percentage, variant = 'primary', size = 'default', showText = true }) {
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3'
  }

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
  }

  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between text-sm text-text-muted mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar