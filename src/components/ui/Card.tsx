import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'stat' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const baseClasses = 'bg-surface rounded-lg p-6';
  
  const variantClasses = {
    default: 'shadow-card',
    stat: 'shadow-card border-l-4 border-accent',
    interactive: 'shadow-card hover:shadow-card-hover cursor-pointer transition-shadow duration-250',
  };

  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};