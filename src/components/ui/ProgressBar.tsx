import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  showLabel = true,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-accent',
    warning: 'bg-warning',
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-text">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};