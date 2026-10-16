'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Calendar, Users, Search, ChevronDown, Minus, Plus } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

export function BookingWidget() {
  const router = useRouter();
  const setDates = useBookingStore((s) => s.setDates);
  const setGuestsStore = useBookingStore((s) => s.setGuests);

  // Default to today and 3 days later
  const today = new Date().toISOString().split('T')[0];
  const defaultCheckout = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckout);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDates(checkIn, checkOut);
    setGuestsStore({ adults, children });

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      capacity: String(adults + children),
    });

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-gold-500/30 bg-charcoal-900/85 p-md shadow-2xl backdrop-blur-xl sm:p-lg"
    >
      <div className="grid grid-cols-1 gap-md md:grid-cols-4 items-center">
        {/* Check-In Date */}
        <div className="relative rounded-lg border border-charcoal-700 bg-charcoal-800/80 p-sm text-left transition-colors hover:border-gold-500/60 focus-within:border-gold-500">
          <label className="flex items-center gap-xs text-[11px] font-semibold tracking-wider text-gold-400 uppercase select-none">
            <Calendar className="h-3.5 w-3.5" />
            Check-In
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-body-sm font-semibold text-ivory-100 focus:outline-none cursor-pointer [color-scheme:dark]"
            required
          />
        </div>

        {/* Check-Out Date */}
        <div className="relative rounded-lg border border-charcoal-700 bg-charcoal-800/80 p-sm text-left transition-colors hover:border-gold-500/60 focus-within:border-gold-500">
          <label className="flex items-center gap-xs text-[11px] font-semibold tracking-wider text-gold-400 uppercase select-none">
            <Calendar className="h-3.5 w-3.5" />
            Check-Out
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-body-sm font-semibold text-ivory-100 focus:outline-none cursor-pointer [color-scheme:dark]"
            required
          />
        </div>

        {/* Guests Popover / Selector */}
        <div className="relative">
          <div
            onClick={() => setIsGuestOpen(!isGuestOpen)}
            className="rounded-lg border border-charcoal-700 bg-charcoal-800/80 p-sm text-left transition-colors hover:border-gold-500/60 cursor-pointer select-none"
          >
            <span className="flex items-center gap-xs text-[11px] font-semibold tracking-wider text-gold-400 uppercase">
              <Users className="h-3.5 w-3.5" />
              Guests
            </span>
            <div className="flex items-center justify-between text-body-sm font-semibold text-ivory-100 mt-0.5">
              <span>
                {adults} Adults{children > 0 ? `, ${children} Children` : ''}
              </span>
              <ChevronDown className="h-4 w-4 text-charcoal-400" />
            </div>
          </div>

          {/* Guest Count Dropdown */}
          {isGuestOpen && (
            <div className="absolute top-full left-0 right-0 z-popover mt-xs rounded-xl border border-charcoal-700 bg-charcoal-900 p-md shadow-2xl space-y-md animate-in fade-in duration-fast">
              {/* Adults Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm font-semibold text-ivory-100">Adults</p>
                  <p className="text-[11px] text-charcoal-400">Age 13 or above</p>
                </div>
                <div className="flex items-center gap-sm">
                  <button
                    type="button"
                    onClick={() => setAdults((a) => Math.max(1, a - 1))}
                    disabled={adults <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-700 text-ivory-100 hover:border-gold-500 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-body-sm font-bold text-ivory-100">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdults((a) => Math.min(8, a + 1))}
                    disabled={adults >= 8}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-700 text-ivory-100 hover:border-gold-500 disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between pt-sm border-t border-charcoal-800">
                <div>
                  <p className="text-body-sm font-semibold text-ivory-100">Children</p>
                  <p className="text-[11px] text-charcoal-400">Ages 0 to 12</p>
                </div>
                <div className="flex items-center gap-sm">
                  <button
                    type="button"
                    onClick={() => setChildren((c) => Math.max(0, c - 1))}
                    disabled={children <= 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-700 text-ivory-100 hover:border-gold-500 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-body-sm font-bold text-ivory-100">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildren((c) => Math.min(6, c + 1))}
                    disabled={children >= 6}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-700 text-ivory-100 hover:border-gold-500 disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                className="w-full mt-sm"
                onClick={() => setIsGuestOpen(false)}
              >
                Apply Guests
              </Button>
            </div>
          )}
        </div>

        {/* Search CTA Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-serif font-bold tracking-wide"
            leftIcon={<Search className="h-4 w-4" />}
          >
            Check Availability
          </Button>
        </div>
      </div>
    </form>
  );
}

