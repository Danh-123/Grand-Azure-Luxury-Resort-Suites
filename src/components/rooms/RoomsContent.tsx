'use client';

import React, { useEffect, useState, useCallback, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/store/useFilterStore';
import { roomsService } from '@/services/rooms.service';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { FilterSidebar } from './FilterSidebar';
import { FilterDrawer } from './FilterDrawer';
import { SortBar } from './SortBar';
import { RoomGrid } from './RoomGrid';

const ITEMS_PER_PAGE = 6;

export function RoomsContent() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Zustand Store
  const {
    priceRange,
    capacity,
    setCapacity,
    roomType,
    amenities,
    sortBy,
    resetFilters,
  } = useFilterStore();

  // Local State
  const [allRooms, setAllRooms] = useState<RoomCardDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync initial query params from URL (e.g. ?capacity=4 from BookingWidget)
  useEffect(() => {
    const urlCapacity = searchParams.get('capacity');
    if (urlCapacity) {
      const capNum = Number(urlCapacity);
      if (!isNaN(capNum) && capNum > 1) {
        setCapacity(capNum);
      }
    }
  }, [searchParams, setCapacity]);

  // Fetch Rooms based on active filters & sorting
  const fetchRooms = useCallback(
    async (isRetry = false) => {
      if (isRetry) {
        setIsRetrying(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const data = await roomsService.getAll({
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          capacity: capacity > 1 ? capacity : undefined,
          type: roomType !== 'all' ? roomType : undefined,
          sort: sortBy,
          amenities: amenities.length > 0 ? amenities : undefined,
        });

        startTransition(() => {
          setAllRooms(data);
          setCurrentPage(1); // Reset page on filter change
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to retrieve accommodations.';
        setError(message);
      } finally {
        setIsLoading(false);
        setIsRetrying(false);
      }
    },
    [priceRange, capacity, roomType, sortBy, amenities]
  );

  // Trigger fetch when any filter or sort option changes
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Pagination calculation
  const totalRooms = allRooms.length;
  const totalPages = Math.ceil(totalRooms / ITEMS_PER_PAGE) || 1;
  const paginatedRooms = allRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Smooth scroll back to top of catalog
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Top Sort & Filter Control Bar */}
      <SortBar
        totalCount={totalRooms}
        displayedCount={paginatedRooms.length}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        onOpenMobileFilters={() => setIsMobileDrawerOpen(true)}
      />

      {/* Main Layout: Desktop Sidebar + Responsive Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-xl">
        {/* Desktop Sticky Sidebar */}
        <FilterSidebar />

        {/* Room Catalog Grid & Pagination */}
        <div className="flex-1 w-full min-w-0">
          <RoomGrid
            rooms={paginatedRooms}
            isLoading={isLoading}
            isRetrying={isRetrying}
            error={error}
            onRetry={() => fetchRooms(true)}
            totalRooms={totalRooms}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onClearFilters={resetFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </div>
  );
}

