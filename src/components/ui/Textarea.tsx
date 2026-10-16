'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, disabled, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-xs text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-body-sm font-medium text-charcoal-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            'w-full rounded-md border border-border bg-background-elevated px-md py-sm text-body text-charcoal-900 transition-colors duration-base placeholder:text-charcoal-400',
            'focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20',
            'disabled:cursor-not-allowed disabled:bg-charcoal-50 disabled:opacity-60',
            error && 'border-error focus:border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

