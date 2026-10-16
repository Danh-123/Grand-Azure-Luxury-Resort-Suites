'use client';

import React from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterControlsProps {
  onApply?: () => void;
  className?: string;
}

const ROOM_TYPES = [
  { value: 'all', label: 'All Accommodations' },
  { value: 'deluxe', label: 'Deluxe Rooms' },
  { value: 'suite', label: 'Suites' },
  { value: 'villa', label: 'Private Villas' },
  { value: 'penthouse', label: 'Penthouses' },
  { value: 'presidential', label: 'Presidential' },
];

const AMENITY_OPTIONS = [
  { id: 'am-1', label: 'Private Pool' },
  { id: 'am-2', label: '24/7 Butler' },
  { id: 'am-3', label: 'Oceanfront Terrace' },
  { id: 'am-4', label: 'High-speed Wi-Fi' },
  { id: 'am-9', label: 'Private Beach Access' },
  { id: 'am-7', label: 'Rooftop Jacuzzi' },
];

const CAPACITY_OPTIONS = [
  { value: 1, label: 'Any' },
  { value: 2, label: '2+ Guests' },
  { value: 3, label: '3+ Guests' },
  { value: 4, label: '4+ Guests' },
  { value: 6, label: '6+ Guests' },
];

export function FilterControls({ onApply, className = '' }: FilterControlsProps) {
  const {
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

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setPriceRange([priceRange[0], val]);
  };

  const hasActiveFilters =
    priceRange[0] !== 300 ||
    priceRange[1] !== 2500 ||
    capacity > 1 ||
    roomType !== 'all' ||
    amenities.length > 0;

  return (
    <div className={`space-y-xl ${className}`}>
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-sm border-b border-border">
        <div className="flex items-center gap-xs">
          <Sparkles className="h-4 w-4 text-gold-600" />
          <h3 className="text-body-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-xs text-[11px] font-semibold text-gold-700 hover:text-gold-800 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Room Type Filter */}
      <div className="space-y-sm">
        <label className="text-caption font-semibold text-charcoal-700 uppercase tracking-wider block">
          Accommodation Type
        </label>
        <div className="space-y-xs">
          {ROOM_TYPES.map((type) => {
            const isSelected = roomType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setRoomType(type.value)}
                className={`w-full flex items-center justify-between px-md py-xs rounded-lg text-body-sm transition-colors min-h-[40px] text-left ${
                  isSelected
                    ? 'bg-gold-50 text-gold-800 font-semibold border border-gold-500/30'
                    : 'text-charcoal-600 hover:bg-background-subtle hover:text-charcoal-900'
                }`}
              >
                <span>{type.label}</span>
                {isSelected && <Check className="h-4 w-4 text-gold-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider / Inputs */}
      <div className="space-y-sm pt-sm border-t border-border">
        <div className="flex items-center justify-between">
          <label className="text-caption font-semibold text-charcoal-700 uppercase tracking-wider">
            Price Per Night
          </label>
          <span className="text-body-sm font-semibold text-gold-700">
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={300}
          max={2500}
          step={50}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-gold-500 cursor-pointer h-2 bg-charcoal-200 rounded-lg"
          aria-label="Max price per night"
        />

        {/* Min / Max Inputs */}
        <div className="grid grid-cols-2 gap-sm pt-xs">
          <div>
            <span className="text-[11px] text-charcoal-400 block mb-1">Min (USD)</span>
            <input
              type="number"
              value={priceRange[0]}
              min={300}
              max={priceRange[1]}
              onChange={handleMinPrice}
              className="w-full rounded-md border border-border bg-background-elevated px-sm py-xs text-body-sm text-charcoal-900 focus:border-gold-500 focus:outline-none"
            />
          </div>
          <div>
            <span className="text-[11px] text-charcoal-400 block mb-1">Max (USD)</span>
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max={2500}
              onChange={handleMaxPrice}
              className="w-full rounded-md border border-border bg-background-elevated px-sm py-xs text-body-sm text-charcoal-900 focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Guests / Capacity */}
      <div className="space-y-sm pt-sm border-t border-border">
        <label className="text-caption font-semibold text-charcoal-700 uppercase tracking-wider block">
          Guests Capacity
        </label>
        <div className="grid grid-cols-3 gap-xs">
          {CAPACITY_OPTIONS.map((opt) => {
            const isSelected = capacity === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCapacity(opt.value)}
                className={`py-xs px-xs rounded-md text-caption font-medium border text-center transition-colors min-h-[40px] flex items-center justify-center ${
                  isSelected
                    ? 'border-gold-500 bg-gold-50 text-gold-800 font-bold shadow-sm'
                    : 'border-border bg-background-elevated text-charcoal-700 hover:border-gold-400'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div className="space-y-sm pt-sm border-t border-border">
        <label className="text-caption font-semibold text-charcoal-700 uppercase tracking-wider block">
          Luxury Amenities
        </label>
        <div className="space-y-xs">
          {AMENITY_OPTIONS.map((item) => {
            const isChecked = amenities.includes(item.id);
            return (
              <label
                key={item.id}
                className="flex items-center gap-sm px-sm py-xs rounded-md cursor-pointer hover:bg-background-subtle transition-colors min-h-[36px]"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(item.id)}
                  className="h-4 w-4 rounded border-border text-gold-600 focus:ring-gold-500 accent-gold-600"
                />
                <span className="text-body-sm text-charcoal-700 select-none">
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Optional Apply button (Mobile drawer) */}
      {onApply && (
        <div className="pt-md border-t border-border">
          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}

