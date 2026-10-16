'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { roomsService } from '@/services/rooms.service';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { Container, Section, Grid } from '@/components/layout';
import { RoomCard, RoomCardSkeleton, ErrorState, EmptyState, Button } from '@/components/ui';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedRoomsSection() {
  const [rooms, setRooms] = useState<RoomCardDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async (isRetry = false) => {
    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await roomsService.getAll();
      // Pick featured rooms or up to 6 luxury rooms
      const featured = data.filter((r) => r.featured).slice(0, 6);
      setRooms(featured.length > 0 ? featured : data.slice(0, 6));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unable to connect to reservation inventory.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <Section spacing="xl" background="base" id="featured-rooms">
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-md">
          <div className="space-y-xs max-w-2xl">
            <div className="flex items-center gap-xs text-gold-600 font-semibold tracking-widest text-caption uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Accommodations</span>
            </div>
            <h2 className="text-h2 font-serif font-bold text-charcoal-900 tracking-tight">
              Featured Suites & Private Villas
            </h2>
            <p className="text-body text-charcoal-600 font-light">
              Each residence is conceived as an intimate sanctuary, combining panoramic coastal views with private infinity pools and dedicated butler services.
            </p>
          </div>

          <Link href="/rooms" className="shrink-0 self-start md:self-end">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Explore All Suites
            </Button>
          </Link>
        </div>

        {/* 5 UI States Handling */}
        {isLoading ? (
          <Grid cols={3} gap="lg">
            {Array.from({ length: 6 }).map((_, idx) => (
              <RoomCardSkeleton key={idx} />
            ))}
          </Grid>
        ) : error ? (
          <ErrorState
            title="Unable to load accommodations"
            message={error}
            onRetry={() => fetchRooms(true)}
            isRetrying={isRetrying}
            retryLabel="Retry Loading"
          />
        ) : rooms.length === 0 ? (
          <EmptyState
            title="No featured residences found"
            description="Our luxury suites are currently undergoing seasonal preparation. Please check back shortly."
            actionLabel="View All Rooms"
            onAction={() => {
              window.location.href = '/rooms';
            }}
          />
        ) : (
          <Grid cols={3} gap="lg">
            {rooms.map((room, idx) => (
              <RoomCard key={room.id} room={room} priority={idx < 3} />
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
}
