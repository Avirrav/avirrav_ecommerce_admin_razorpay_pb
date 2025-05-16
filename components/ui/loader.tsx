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
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const variantClasses = {
    default: "border-t-primary",
    primary: "border-t-primary",
    secondary: "border-t-blue-500",
    accent: "border-t-yellow-500"
  };

  return (
    <div role="status" className={cn("animate-pulse relative", className)}>
      <div className={cn(
        "border-[3px] rounded-md animate-spin",
        variantClasses[variant],
        "border-l-transparent border-r-transparent border-b-transparent",
        sizeClasses[size],
        "shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
      )} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};