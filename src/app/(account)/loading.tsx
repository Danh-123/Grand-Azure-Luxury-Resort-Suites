import React from 'react';
import { Skeleton } from '@/components/ui';

export default function AccountLoading() {
  return (
    <div className="space-y-xl">
      <div className="space-y-xs">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-60" />
      </div>
      <div className="rounded-xl border border-border bg-background-elevated p-xl space-y-md">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
}

