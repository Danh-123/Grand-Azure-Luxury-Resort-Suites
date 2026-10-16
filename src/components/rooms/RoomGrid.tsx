'use client';

import React from 'react';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { RoomCard } from '@/components/ui/RoomCard';
import { RoomCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';

interface RoomGridProps {
  rooms: RoomCardDTO[];
  isLoading: boolean;
  isRetrying: boolean;
  error: string | null;
  onRetry: () => void;
  totalRooms: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export function RoomGrid({
  rooms,
  isLoading,
  isRetrying,
  error,
  onRetry,
  totalRooms,
  currentPage,
  totalPages,
  onPageChange,
  onClearFilters,
}: RoomGridProps) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
        {Array.from({ length: 6 }).map((_, idx) => (
          <RoomCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <ErrorState
        title="Unable to load residences"
        message={error}
        onRetry={onRetry}
        isRetrying={isRetrying}
        retryLabel="Retry Catalog Search"
      />
    );
  }

  // 3. Empty State
  if (totalRooms === 0 || rooms.length === 0) {
    return (
      <EmptyState
        title="No suites match your filters"
        description="We couldn't find any accommodations matching your current criteria. Try expanding your price range or clearing selected amenities."
        actionLabel="Clear All Filters"
        onAction={onClearFilters}
      />
    );
  }

  // 4. Success State with Real Pagination
  return (
    <div className="space-y-2xl">
      {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* Real Pagination */}
      {totalPages > 1 && (
        <div className="pt-xl border-t border-border flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

