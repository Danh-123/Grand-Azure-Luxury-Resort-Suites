'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, helperText, id, disabled, ...props }, ref) => {
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
          <div className="pointer-events-none absolute left-md flex items-center text-gold-600">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </div>
          <input
            id={inputId}
            ref={ref}
            type="date"
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'w-full min-h-touchMin rounded-md border border-border bg-background-elevated pl-xl pr-md py-sm text-body text-charcoal-900 transition-colors duration-base',
              'focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20',
              'disabled:cursor-not-allowed disabled:bg-charcoal-50 disabled:opacity-60',
              error && 'border-error focus:border-error focus:ring-error/20',
              className
            )}
            {...props}
          />
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

DatePicker.displayName = 'DatePicker';

