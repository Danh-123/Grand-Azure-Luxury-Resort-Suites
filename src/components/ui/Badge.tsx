import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'luxury' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium uppercase tracking-wider rounded-full select-none';

  const variants = {
    pending: 'bg-warning-light text-warning-dark border border-warning-border',
    confirmed: 'bg-success-light text-success-dark border border-success-border',
    cancelled: 'bg-error-light text-error-dark border border-error-border',
    completed: 'bg-info-light text-info-dark border border-info-border',
    luxury: 'bg-gold-100 text-gold-800 border border-gold-300 font-semibold',
    neutral: 'bg-charcoal-100 text-charcoal-700 border border-charcoal-200',
    outline: 'border border-gold-500 text-gold-700 bg-transparent',
  };

  const sizes = {
    sm: 'text-[10px] px-sm py-[2px]',
    md: 'text-caption px-md py-[3px]',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

