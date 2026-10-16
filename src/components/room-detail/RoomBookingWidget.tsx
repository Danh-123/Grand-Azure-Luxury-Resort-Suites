'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { RoomDetailDTO } from '@/types/dto/room.dto';
import { useBookingStore } from '@/store/useBookingStore';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  Users,
  Minus,
  Plus,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface RoomBookingWidgetProps {
  room: RoomDetailDTO;
}

export function RoomBookingWidget({ room }: RoomBookingWidgetProps) {
  const router = useRouter();

  const setRoom = useBookingStore((s) => s.setRoom);
  const setDates = useBookingStore((s) => s.setDates);
  const setGuestsStore = useBookingStore((s) => s.setGuests);
  const setStep = useBookingStore((s) => s.setStep);

  // Default dates
  const today = new Date().toISOString().split('T')[0];
  const defaultCheckout = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckout);
  const [adults, setAdults] = useState(Math.min(2, room.capacity.adults || 2));
  const [children, setChildren] = useState(0);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  // Auto calculate nights
  const nights = useMemo(() => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;
  }, [checkIn, checkOut]);

  // Price calculations
  const subtotal = nights * room.pricePerNight;
  const serviceCharge = Math.round(subtotal * 0.1); // 10%
  const taxes = Math.round(subtotal * 0.08); // 8%
  const totalAmount = subtotal + serviceCharge + taxes;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: room.currency || 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Push into Zustand store
    setRoom(room);
    setDates(checkIn, checkOut);
    setGuestsStore({ adults, children });
    setStep(1);

    router.push('/booking');
  };

  return (
    <>
      {/* Desktop Sticky Sidebar Widget */}
      <div className="sticky top-28 self-start w-full rounded-2xl border border-gold-500/30 bg-background-elevated p-lg sm:p-xl shadow-xl space-y-lg">
        {/* Header: Pricing Highlight */}
        <div className="flex items-baseline justify-between border-b border-border pb-md">
          <div>
            <span className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider block">
              Reservation Rate
            </span>
            <div className="flex items-baseline gap-xs">
              <span className="text-display font-serif font-bold text-gold-700">
                {formatPrice(room.pricePerNight)}
              </span>
              <span className="text-body-sm text-charcoal-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-xs rounded-full bg-gold-50 px-sm py-[3px] text-caption font-semibold text-gold-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Best Rate Guaranteed</span>
          </div>
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleBooking} className="space-y-md">
          {/* Dates Selection Grid */}
          <div className="grid grid-cols-2 gap-sm">
            <div className="rounded-xl border border-border bg-background p-sm focus-within:border-gold-500 transition-colors">
              <label className="flex items-center gap-xs text-[11px] font-semibold uppercase tracking-wider text-gold-600 select-none">
                <Calendar className="h-3.5 w-3.5" />
                Check-In
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-body-sm font-semibold text-charcoal-900 focus:outline-none cursor-pointer mt-0.5"
                required
              />
            </div>

            <div className="rounded-xl border border-border bg-background p-sm focus-within:border-gold-500 transition-colors">
              <label className="flex items-center gap-xs text-[11px] font-semibold uppercase tracking-wider text-gold-600 select-none">
                <Calendar className="h-3.5 w-3.5" />
                Check-Out
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-body-sm font-semibold text-charcoal-900 focus:outline-none cursor-pointer mt-0.5"
                required
              />
            </div>
          </div>

          {/* Guests Popover Selector */}
          <div className="relative">
            <div
              onClick={() => setIsGuestOpen(!isGuestOpen)}
              className="flex items-center justify-between rounded-xl border border-border bg-background p-sm cursor-pointer hover:border-gold-500/60 transition-colors"
            >
              <div>
                <span className="flex items-center gap-xs text-[11px] font-semibold uppercase tracking-wider text-gold-600 select-none">
                  <Users className="h-3.5 w-3.5" />
                  Guests
                </span>
                <p className="text-body-sm font-semibold text-charcoal-900 mt-0.5">
                  {adults} Adults{children > 0 ? `, ${children} Children` : ''}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-charcoal-400" />
            </div>

            {/* Guest Popover Dropdown */}
            {isGuestOpen && (
              <div className="absolute top-full left-0 right-0 z-popover mt-xs rounded-xl border border-border bg-background-elevated p-md shadow-2xl space-y-md animate-in fade-in duration-fast">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-semibold text-charcoal-900">Adults</p>
                    <p className="text-[11px] text-charcoal-400">Max {room.capacity.adults}</p>
                  </div>
                  <div className="flex items-center gap-sm">
                    <button
                      type="button"
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      disabled={adults <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-charcoal-700 hover:border-gold-500 disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-body-sm font-bold text-charcoal-900">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => Math.min(room.capacity.adults, a + 1))}
                      disabled={adults >= room.capacity.adults}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-charcoal-700 hover:border-gold-500 disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-sm border-t border-border">
                  <div>
                    <p className="text-body-sm font-semibold text-charcoal-900">Children</p>
                    <p className="text-[11px] text-charcoal-400">Max {room.capacity.children || 2}</p>
                  </div>
                  <div className="flex items-center gap-sm">
                    <button
                      type="button"
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      disabled={children <= 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-charcoal-700 hover:border-gold-500 disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-body-sm font-bold text-charcoal-900">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setChildren((c) => Math.min(room.capacity.children || 2, c + 1))
                      }
                      disabled={children >= (room.capacity.children || 2)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-charcoal-700 hover:border-gold-500 disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsGuestOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* Transparent Price Breakdown */}
          <div className="space-y-xs pt-md border-t border-border text-body-sm">
            <div className="flex justify-between text-charcoal-600">
              <span>
                {formatPrice(room.pricePerNight)} × {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-charcoal-600">
              <span>Resort Service Fee (10%)</span>
              <span>{formatPrice(serviceCharge)}</span>
            </div>

            <div className="flex justify-between text-charcoal-600">
              <span>Estimated Taxes & Surcharges (8%)</span>
              <span>{formatPrice(taxes)}</span>
            </div>

            <div className="flex justify-between pt-sm border-t border-border/80 text-h4 font-serif font-bold text-charcoal-900">
              <span>Total Stay</span>
              <span className="text-gold-700">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Book Now Action */}
          <div className="pt-sm">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-serif font-bold tracking-wide shadow-glow"
            >
              Reserve This Sanctuary
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-xs text-[11px] text-charcoal-500 pt-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
            <span>Instant Confirmation • No Prepayment Required</span>
          </div>
        </form>
      </div>

      {/* Mobile Sticky Bottom Bar (per Step 10 & 15) */}
      <div className="fixed bottom-0 left-0 right-0 z-docked border-t border-border bg-charcoal-900/95 p-md backdrop-blur-md sm:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[11px] text-charcoal-400 block">Total for {nights} nights</span>
          <span className="text-h4 font-serif font-bold text-gold-400">
            {formatPrice(totalAmount)}
          </span>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handleBooking}
          className="font-serif font-semibold"
        >
          Book Now
        </Button>
      </div>
    </>
  );
}

