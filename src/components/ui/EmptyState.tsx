import React from 'react';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background-subtle/50 px-lg py-3xl text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-600 mb-lg shadow-sm">
        {icon || <Inbox className="h-8 w-8" aria-hidden="true" />}
      </div>
      <h3 className="text-h4 font-serif font-semibold text-charcoal-900 mb-xs">
        {title}
      </h3>
      <p className="max-w-md text-body-sm text-charcoal-500 mb-lg">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

