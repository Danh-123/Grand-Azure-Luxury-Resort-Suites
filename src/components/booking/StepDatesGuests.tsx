'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Button } from '@/components/ui/Button';
import { Calendar, Users, Minus, Plus, ArrowRight } from 'lucide-react';

export function StepDatesGuests() {
  const selectedRoom = useBookingStore((s) => s.selectedRoom);
  const checkIn = useBookingStore((s) => s.checkIn);
  const checkOut = useBookingStore((s) => s.checkOut);
  const guests = useBookingStore((s) => s.guests);
  const setDates = useBookingStore((s) => s.setDates);
  const setGuests = useBookingStore((s) => s.setGuests);
  const nextStep = useBookingStore((s) => s.nextStep);

  const today = new Date().toISOString().split('T')[0];
  const defaultCheckout = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [localCheckIn, setLocalCheckIn] = useState(checkIn || today);
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || defaultCheckout);
  const [adults, setAdults] = useState(guests.adults || 2);
  const [children, setChildren] = useState(guests.children || 0);

  const maxAdults = selectedRoom?.capacity.adults || 4;
  const maxChildren = selectedRoom?.capacity.children || 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDates(localCheckIn, localCheckOut);
    setGuests({ adults, children });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-xl">
      <div className="space-y-xs">
        <h2 className="text-h2 font-serif font-bold text-charcoal-900">
          Step 1: Dates &amp; Guests
        </h2>
        <p className="text-body text-charcoal-600 font-light">
          Review or modify your arrival and departure schedule to ensure an impeccable itinerary.
        </p>
      </div>

      {/* Date Pickers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <div className="rounded-xl border border-border bg-background-elevated p-md focus-within:border-gold-500 transition-colors shadow-sm">
          <label className="flex items-center gap-xs text-[11px] font-semibold uppercase tracking-wider text-gold-600 select-none">
            <Calendar className="h-4 w-4" />
            Check-In Date
          </label>
          <input
            type="date"
            min={today}
            value={localCheckIn}
            onChange={(e) => setLocalCheckIn(e.target.value)}
            className="w-full bg-transparent text-body-sm font-semibold text-charcoal-900 focus:outline-none cursor-pointer mt-1"
            required
          />
        </div>

        <div className="rounded-xl border border-border bg-background-elevated p-md focus-within:border-gold-500 transition-colors shadow-sm">
          <label className="flex items-center gap-xs text-[11px] font-semibold uppercase tracking-wider text-gold-600 select-none">
            <Calendar className="h-4 w-4" />
            Check-Out Date
          </label>
          <input
            type="date"
            min={localCheckIn || today}
            value={localCheckOut}
            onChange={(e) => setLocalCheckOut(e.target.value)}
            className="w-full bg-transparent text-body-sm font-semibold text-charcoal-900 focus:outline-none cursor-pointer mt-1"
            required
          />
        </div>
      </div>

      {/* Guests Counter Box */}
      <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-lg shadow-sm">
        <div className="flex items-center gap-xs text-body-sm font-semibold text-charcoal-900">
          <Users className="h-4 w-4 text-gold-600" />
          <span>Guest Occupancy</span>
        </div>

        <div className="divide-y divide-border">
          {/* Adults */}
          <div className="flex items-center justify-between pb-md">
            <div>
              <p className="text-body-sm font-semibold text-charcoal-900">Adults</p>
              <p className="text-caption text-charcoal-500">
                Ages 13 and above (Suite capacity: max {maxAdults})
              </p>
            </div>
            <div className="flex items-center gap-md">
              <button
                type="button"
                onClick={() => setAdults((a) => Math.max(1, a - 1))}
                disabled={adults <= 1}
                aria-label="Decrease adults"
                className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 hover:border-gold-500 hover:text-gold-700 disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-body font-bold text-charcoal-900">
                {adults}
              </span>
              <button
                type="button"
                onClick={() => setAdults((a) => Math.min(maxAdults, a + 1))}
                disabled={adults >= maxAdults}
                aria-label="Increase adults"
                className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 hover:border-gold-500 hover:text-gold-700 disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between pt-md">
            <div>
              <p className="text-body-sm font-semibold text-charcoal-900">Children</p>
              <p className="text-caption text-charcoal-500">
                Ages 0 to 12 (Max {maxChildren})
              </p>
            </div>
            <div className="flex items-center gap-md">
              <button
                type="button"
                onClick={() => setChildren((c) => Math.max(0, c - 1))}
                disabled={children <= 0}
                aria-label="Decrease children"
                className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 hover:border-gold-500 hover:text-gold-700 disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-body font-bold text-charcoal-900">
                {children}
              </span>
              <button
                type="button"
                onClick={() => setChildren((c) => Math.min(maxChildren, c + 1))}
                disabled={children >= maxChildren}
                aria-label="Increase children"
                className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-full border border-border bg-background text-charcoal-700 hover:border-gold-500 hover:text-gold-700 disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Next Step */}
      <div className="flex justify-end pt-md">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Continue to Guest Information
        </Button>
      </div>
    </form>
  );
}

