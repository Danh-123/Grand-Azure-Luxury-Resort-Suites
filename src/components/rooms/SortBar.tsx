'use client';

import React from 'react';
import { useFilterStore, SortOption } from '@/store/useFilterStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface SortBarProps {
  totalCount: number;
  displayedCount: number;
  currentPage: number;
  itemsPerPage: number;
  onOpenMobileFilters: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Most Popular / Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Guest Rating: Highest First' },
];

export function SortBar({
  totalCount,
  displayedCount,
  currentPage,
  itemsPerPage,
  onOpenMobileFilters,
}: SortBarProps) {
  const {
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    capacity,
    setCapacity,
    roomType,
    setRoomType,
    amenities,
    toggleAmenity,
    resetFilters,
  } = useFilterStore();

  // Calculate active filter count
  let activeFilterCount = 0;
  if (priceRange[0] !== 300 || priceRange[1] !== 2500) activeFilterCount++;
  if (capacity > 1) activeFilterCount++;
  if (roomType !== 'all') activeFilterCount++;
  activeFilterCount += amenities.length;

  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="space-y-md mb-xl">
      {/* Top Bar: Count, Mobile Trigger, Sort Select */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md rounded-xl border border-border bg-background-elevated p-md shadow-sm">
        {/* Count Label */}
        <div className="flex items-center gap-sm">
          <p className="text-body-sm text-charcoal-700">
            {totalCount > 0 ? (
              <>
                Showing <span className="font-semibold text-charcoal-900">{startIndex}–{endIndex}</span> of{' '}
                <span className="font-semibold text-charcoal-900">{totalCount}</span> luxury accommodations
              </>
            ) : (
              '0 accommodations found'
            )}
          </p>
        </div>

        {/* Action Controls: Mobile Filters Button & Sort Dropdown */}
        <div className="flex items-center gap-sm justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenMobileFilters}
            className="lg:hidden relative"
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-xs flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-charcoal-900">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Sort Select */}
          <div className="flex items-center gap-xs">
            <span className="text-caption text-charcoal-500 hidden md:inline-flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-background px-md py-xs text-body-sm font-medium text-charcoal-800 transition-colors focus:border-gold-500 focus:outline-none min-h-[38px] cursor-pointer"
              aria-label="Sort accommodations"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-xs pt-xs">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider mr-xs">
            Active Filters:
          </span>

          {roomType !== 'all' && (
            <Badge variant="luxury" className="flex items-center gap-xs pl-sm pr-xs py-0.5">
              <span>Type: {roomType}</span>
              <button
                type="button"
                onClick={() => setRoomType('all')}
                className="hover:text-error transition-colors"
                aria-label={`Remove room type filter ${roomType}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {capacity > 1 && (
            <Badge variant="luxury" className="flex items-center gap-xs pl-sm pr-xs py-0.5">
              <span>Guests: {capacity}+</span>
              <button
                type="button"
                onClick={() => setCapacity(1)}
                className="hover:text-error transition-colors"
                aria-label="Remove capacity filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {(priceRange[0] !== 300 || priceRange[1] !== 2500) && (
            <Badge variant="luxury" className="flex items-center gap-xs pl-sm pr-xs py-0.5">
              <span>Price: ${priceRange[0]}–${priceRange[1]}</span>
              <button
                type="button"
                onClick={() => setPriceRange([300, 2500])}
                className="hover:text-error transition-colors"
                aria-label="Remove price filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {amenities.map((amId) => (
            <Badge key={amId} variant="luxury" className="flex items-center gap-xs pl-sm pr-xs py-0.5">
              <span>Amenity: {amId}</span>
              <button
                type="button"
                onClick={() => toggleAmenity(amId)}
                className="hover:text-error transition-colors"
                aria-label={`Remove amenity filter ${amId}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <button
            type="button"
            onClick={resetFilters}
            className="text-[11px] font-semibold text-charcoal-500 hover:text-gold-700 underline underline-offset-2 ml-xs"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

