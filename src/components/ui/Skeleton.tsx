import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({
  className,
  variant = 'rounded',
  ...props
}: SkeletonProps) {
  const variants = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-md',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-charcoal-200/60',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * 🏛️ Luxury Hotel Room Card Skeleton Preset
 * Prevents Cumulative Layout Shift (CLS < 0.1) during catalog loading.
 */
export function RoomCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-background-elevated shadow-sm',
        className
      )}
    >
      {/* Image Skeleton */}
      <Skeleton className="h-56 w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="p-lg space-y-md">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-6 w-3/4" />

        <div className="flex items-center gap-md">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="pt-md border-t border-border flex items-center justify-between">
          <div className="space-y-xs">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * 🏛️ Table Row Skeleton Preset for Admin Tables
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-border animate-pulse">
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className="p-md">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

