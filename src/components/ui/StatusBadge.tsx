import React from 'react';
import { clsx } from 'clsx';
import { StatusType } from '../../types';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  not_started: {
    label: 'Not Started',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  sent: {
    label: 'Sent',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  signed: {
    label: 'Signed',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  expired: {
    label: 'Expired',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  provisioned: {
    label: 'Provisioned',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  on_track: {
    label: 'On Track',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  delayed: {
    label: 'Delayed',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  active: {
    label: 'Active',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};