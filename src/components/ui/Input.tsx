'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-xs text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-charcoal-700"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-md flex items-center text-charcoal-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'w-full min-h-touchMin rounded-md border border-border bg-background-elevated px-md py-sm text-body text-charcoal-900 transition-colors duration-base placeholder:text-charcoal-400',
              'focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20',
              'disabled:cursor-not-allowed disabled:bg-charcoal-50 disabled:opacity-60',
              leftIcon && 'pl-xl',
              rightIcon && 'pr-xl',
              error && 'border-error focus:border-error focus:ring-error/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-md flex items-center text-charcoal-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-caption text-error" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-caption text-charcoal-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

