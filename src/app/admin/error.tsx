'use client';

import React from 'react';
import { ErrorState } from '@/components/ui';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-3xl max-w-xl mx-auto">
      <ErrorState
        title="Admin Console Error"
        message={error.message || 'Unable to synchronize management data.'}
        retryLabel="Retry Operations"
        onRetry={reset}
      />
    </div>
  );
}

