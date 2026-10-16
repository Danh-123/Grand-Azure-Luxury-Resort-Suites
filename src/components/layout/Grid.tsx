import React from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Grid({
  cols = 3,
  gap = 'lg',
  className,
  children,
  ...props
}: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-sm',
    md: 'gap-md',
    lg: 'gap-lg sm:gap-xl',
    xl: 'gap-xl sm:gap-2xl',
  };

  return (
    <div className={cn('grid', colClasses[cols], gapClasses[gap], className)} {...props}>
      {children}
    </div>
  );
}

