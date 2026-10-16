'use client';

import React from 'react';
import { Container, Section } from '@/components/layout';
import { ErrorState } from '@/components/ui';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section spacing="xl">
      <Container size="sm">
        <ErrorState
          title="Reservation Service Unavailable"
          message={error.message || 'Unable to retrieve suite catalog at this moment.'}
          retryLabel="Try Again"
          onRetry={reset}
        />
      </Container>
    </Section>
  );
}

