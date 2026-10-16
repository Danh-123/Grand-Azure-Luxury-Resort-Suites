'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

/**
 * 🏛️ STANDARD SUBMIT UX PATTERN:
 * --------------------------------------------------------------------------
 * 1. Disable submit button & show inline spinner while mutation is pending:
 *    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
 * 2. Real-time / onBlur validation displaying inline error message:
 *    <FormField label="Email" error={errors.email}>
 *      <Input {...register('email')} />
 *    </FormField>
 * 3. On mutation success:
 *    - Trigger transient success toast (auto-dismiss 3.5s)
 *    - Reset form or redirect to confirmation page
 * 4. On mutation failure:
 *    - Trigger error toast
 *    - Keep user input intact in the form fields (no blanking out)
 * --------------------------------------------------------------------------
 */

export interface FormFieldProps {
  label?: string;
  name?: string;
  error?: FieldError | string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  name,
  error,
  helperText,
  required = false,
  className,
  children,
}: FormFieldProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message;
  const fieldId = name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('space-y-xs text-left w-full', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-body-sm font-medium text-charcoal-700"
        >
          {label}
          {required && <span className="ml-xs text-error font-semibold">*</span>}
        </label>
      )}

      <div>{children}</div>

      {errorMessage ? (
        <p className="text-caption text-error font-medium animate-in fade-in duration-fast" role="alert">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-caption text-charcoal-500">{helperText}</p>
      ) : null}
    </div>
  );
}

export function FormItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('space-y-xs', className)}>{children}</div>;
}

export function FormLabel({
  className,
  children,
  htmlFor,
  required,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-body-sm font-medium text-charcoal-700', className)}
    >
      {children}
      {required && <span className="ml-xs text-error font-semibold">*</span>}
    </label>
  );
}

export function FormMessage({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <p
      className={cn('text-caption text-error font-medium animate-in fade-in duration-fast', className)}
      role="alert"
    >
      {children}
    </p>
  );
}

