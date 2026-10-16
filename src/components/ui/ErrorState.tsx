'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  isRetrying = false,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-error-border bg-error-light/30 px-lg py-3xl text-center',
        className
      )}
      role="alert"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-light text-error mb-lg shadow-sm">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-h4 font-serif font-semibold text-charcoal-900 mb-xs">
        {title}
      </h3>
      <p className="max-w-md text-body-sm text-charcoal-600 mb-lg">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          isLoading={isRetrying}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

