'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Minus, Plus, Users } from 'lucide-react';

export interface GuestCounterProps {
  label?: string;
  description?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export function GuestCounter({
  label = 'Guests',
  description,
  value,
  min = 1,
  max = 10,
  onChange,
  className,
  disabled = false,
}: GuestCounterProps) {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md border border-border bg-background-elevated p-md transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <Users className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-body-sm font-semibold text-charcoal-900">{label}</p>
          {description && (
            <p className="text-caption text-charcoal-500">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 transition-colors hover:border-gold-500 hover:bg-gold-50 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span
          className="w-8 text-center text-body font-semibold text-charcoal-900 select-none"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 transition-colors hover:border-gold-500 hover:bg-gold-50 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

