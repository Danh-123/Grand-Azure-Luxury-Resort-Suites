'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-base ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none min-h-touchMin min-w-touchMin';

    const variants = {
      primary:
        'bg-gold-500 text-charcoal-900 hover:bg-gold-600 active:bg-gold-700 shadow-sm hover:shadow-glow-sm font-semibold',
      secondary:
        'bg-charcoal-800 text-ivory-100 hover:bg-charcoal-700 active:bg-charcoal-900 shadow-sm',
      outline:
        'border border-gold-500/60 text-gold-700 hover:bg-gold-50 hover:border-gold-500 active:bg-gold-100',
      ghost:
        'text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 active:bg-gold-100',
      danger:
        'bg-error text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
    };

    const sizes = {
      sm: 'text-caption px-md py-xs rounded-sm gap-xs',
      md: 'text-body-sm px-lg py-sm rounded-md gap-sm',
      lg: 'text-body px-xl py-md rounded-lg gap-sm font-semibold',
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

