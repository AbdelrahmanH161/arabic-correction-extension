import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'error' | 'success';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-background-light text-text-primary': variant === 'default',
          'bg-primary text-text-primary': variant === 'primary',
          'bg-background-card text-text-secondary': variant === 'secondary',
          'bg-text-error text-white': variant === 'error',
          'bg-text-success text-white': variant === 'success',
        },
        className
      )}
    >
      {children}
    </span>
  );
} 