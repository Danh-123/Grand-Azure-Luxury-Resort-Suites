'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  readOnly = true,
  onChange,
  size = 'md',
  showNumber = false,
  reviewsCount,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const currentVal = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn('inline-flex items-center gap-xs', className)}>
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: max }).map((_, idx) => {
          const starNumber = idx + 1;
          const isFilled = starNumber <= Math.round(currentVal);

          if (readOnly) {
            return (
              <Star
                key={idx}
                className={cn(
                  starSizes[size],
                  isFilled ? 'fill-gold-500 text-gold-500' : 'fill-charcoal-200 text-charcoal-200'
                )}
                aria-hidden="true"
              />
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange?.(starNumber)}
              onMouseEnter={() => setHoverValue(starNumber)}
              onMouseLeave={() => setHoverValue(null)}
              aria-label={`Rate ${starNumber} of ${max} stars`}
              className="p-[2px] transition-transform hover:scale-110 min-h-[32px] min-w-[32px] flex items-center justify-center"
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled ? 'fill-gold-500 text-gold-500' : 'fill-charcoal-200 text-charcoal-200'
                )}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-body-sm font-semibold text-charcoal-900 ml-xs">
          {value.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className="text-caption text-charcoal-500">
          ({reviewsCount} reviews)
        </span>
      )}
    </div>
  );
}

