'use client';

import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

export const Loader = ({ 
  className, 
  size = 'medium',
  variant = 'default' 
}: SpinnerProps) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  const variantClasses = {
    default: "border-t-primary",
    primary: "border-t-primary",
    secondary: "border-t-secondary",
    accent: "border-t-accent"
  };

  return (
    <div role="status" className={cn("animate-spin relative", className)}>
      <div className={cn(
        "border-2 rounded-full",
        variantClasses[variant],
        "border-l-transparent border-r-transparent border-b-transparent",
        sizeClasses[size]
      )} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};