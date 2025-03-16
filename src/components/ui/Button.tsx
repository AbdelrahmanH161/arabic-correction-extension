import React from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-primary hover:bg-primary-hover text-white',
      secondary: 'bg-background-light hover:bg-gray-600 text-white',
      success: 'bg-text-success hover:bg-green-700 text-white',
      danger: 'bg-text-error hover:bg-red-700 text-white',
      ghost: 'bg-transparent hover:bg-background-light text-white',
    };

    const sizeClasses = {
      sm: 'text-xs px-2 py-1 rounded',
      md: 'text-sm px-4 py-2 rounded-md',
      lg: 'text-base px-6 py-3 rounded-lg',
    };

    return (
      <button
        className={cn(
          'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps }; 