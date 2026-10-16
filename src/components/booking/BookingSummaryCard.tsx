'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Users, Sparkles, ShieldCheck, Bed } from 'lucide-react';

interface BookingSummaryCardProps {
  room: RoomCardDTO;
  checkIn: string | null;
  checkOut: string | null;
  guests: { adults: number; children: number };
}

export function BookingSummaryCard({
  room,
  checkIn,
  checkOut,
  guests,
}: BookingSummaryCardProps) {
  // Nights calculation
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;
  }, [checkIn, checkOut]);

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

  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return 'Select date';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0">
      <div className="sticky top-28 rounded-2xl border border-border bg-background-elevated p-lg shadow-xl space-y-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-md">
          <h3 className="text-body-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Reservation Summary
          </h3>
          <Badge variant="luxury">Step 1-3</Badge>
        </div>

        {/* Room Snapshot */}
        <div className="flex items-start gap-md">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-charcoal-800">
            <Image
              src={room.thumbnailUrl}
              alt={room.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="space-y-xs min-w-0">
            <Badge variant="luxury" className="text-[10px] py-0 px-xs">
              {room.roomType.toUpperCase()}
            </Badge>
            <h4 className="text-body-sm font-serif font-bold text-charcoal-900 truncate">
              {room.name}
            </h4>
            <p className="text-[11px] text-charcoal-500 flex items-center gap-1">
              <Bed className="h-3 w-3 text-gold-600" />
              {room.bedType} • {room.sizeSqm} m²
            </p>
          </div>
        </div>

        {/* Selected Itinerary Specs */}
        <div className="rounded-xl border border-border/80 bg-background-subtle/50 p-md space-y-sm text-body-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-xs text-caption text-charcoal-500">
              <Calendar className="h-3.5 w-3.5 text-gold-600" />
              Stay Duration
            </span>
            <span className="font-semibold text-charcoal-900">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-caption text-charcoal-500">Dates</span>
            <span className="text-[12px] font-medium text-charcoal-900">
              {formatDateDisplay(checkIn)} &rarr; {formatDateDisplay(checkOut)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-xs text-caption text-charcoal-500">
              <Users className="h-3.5 w-3.5 text-gold-600" />
              Guests
            </span>
            <span className="font-semibold text-charcoal-900">
              {guests.adults} Adults
              {guests.children > 0 ? `, ${guests.children} Children` : ''}
            </span>
          </div>
        </div>

        {/* Itemized Price Breakdown */}
        <div className="space-y-xs pt-xs border-t border-border text-body-sm">
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
            <span>Occupancy Surcharges (8%)</span>
            <span>{formatPrice(taxes)}</span>
          </div>

          <div className="flex justify-between pt-md border-t border-border/80 items-baseline">
            <div>
              <span className="text-body-sm font-semibold text-charcoal-900 block">
                Total Reservation
              </span>
              <span className="text-[10px] text-charcoal-400">Taxes & fees included</span>
            </div>
            <span className="text-h3 font-serif font-bold text-gold-700">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="rounded-xl bg-gold-50/70 p-sm border border-gold-500/20 space-y-xs text-[11px] text-gold-800">
          <div className="flex items-center gap-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-700 shrink-0" />
            <span>Free cancellation up to 48 hours prior</span>
          </div>
          <div className="flex items-center gap-xs">
            <Sparkles className="h-3.5 w-3.5 text-gold-700 shrink-0" />
            <span>No prepayment required today</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

