'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-xs',
    left: 'right-full top-1/2 -translate-y-1/2 mr-xs',
    right: 'left-full top-1/2 -translate-y-1/2 ml-xs',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-tooltip whitespace-nowrap rounded-md bg-charcoal-900 px-sm py-xs text-[11px] font-medium text-ivory-100 shadow-lg animate-in fade-in duration-fast',
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

