'use client';

import React from 'react';
import { ErrorState } from '@/components/ui';

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-2xl max-w-xl mx-auto">
      <ErrorState
        title="Guest Account Error"
        message={error.message || 'We encountered an issue loading your profile or reservation history.'}
        retryLabel="Reload Profile"
        onRetry={reset}
      />
    </div>
  );
}

