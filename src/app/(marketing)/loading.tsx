import React from 'react';
import { Container, Section, Grid } from '@/components/layout';
import { RoomCardSkeleton, Skeleton } from '@/components/ui';

export default function MarketingLoading() {
  return (
    <Section spacing="lg">
      <Container className="space-y-xl">
        <div className="space-y-xs">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Grid cols={3} gap="lg">
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
        </Grid>
      </Container>
    </Section>
  );
}

