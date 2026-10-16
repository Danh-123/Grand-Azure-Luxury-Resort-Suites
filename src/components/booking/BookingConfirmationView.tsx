'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookingDetailDTO } from '@/types/dto/booking.dto';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Calendar,
  Users,
  Copy,
  Check,
  Printer,
  Sparkles,
  Bed,
} from 'lucide-react';

interface BookingConfirmationViewProps {
  booking: BookingDetailDTO;
}

export function BookingConfirmationView({ booking }: BookingConfirmationViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.bookingCode || booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2xl py-md sm:py-xl">
      {/* Celebration Header */}
      <div className="text-center space-y-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 border border-gold-300 text-gold-700 shadow-glow mb-xs animate-in zoom-in-90 duration-base">
          <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
        </div>

        <div className="space-y-xs">
          <Badge variant="confirmed">Reservation Confirmed</Badge>
          <h1 className="text-display font-serif font-bold text-charcoal-900 tracking-tight">
            Your Sanctuary is Reserved
          </h1>
          <p className="text-body text-charcoal-600 font-light max-w-xl mx-auto">
            We are honored to welcome you to Grand Azure Resort. A bespoke itinerary has been dispatched to{' '}
            <span className="font-semibold text-charcoal-900">{booking.guestInfo.email}</span>.
          </p>
        </div>
      </div>

      {/* Reservation Code Voucher Card */}
      <div className="rounded-2xl border border-gold-500/40 bg-background-elevated p-lg sm:p-xl shadow-xl space-y-lg text-center relative overflow-hidden">
        {/* Subtle background luxury glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-xs">
          <span className="text-[11px] font-semibold text-gold-700 uppercase tracking-widest block">
            Confirmation Reference
          </span>
          <div className="inline-flex items-center gap-md rounded-xl bg-gold-50/80 px-lg py-sm border border-gold-500/30">
            <span className="text-h3 sm:text-h2 font-mono font-bold text-charcoal-900 tracking-wider">
              {booking.bookingCode || booking.id}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-xs rounded-lg bg-gold-500 px-sm py-xs text-[11px] font-bold text-charcoal-900 hover:bg-gold-600 transition-colors"
              aria-label="Copy booking code"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Room Snapshot */}
        <div className="flex flex-col sm:flex-row items-center gap-lg rounded-xl border border-border bg-background p-md text-left">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-charcoal-800">
            <Image
              src={booking.roomThumbnail}
              alt={booking.roomName}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>

          <div className="space-y-xs flex-1">
            <div className="flex items-center justify-between">
              <span className="text-caption font-semibold uppercase tracking-wider text-gold-700">
                Confirmed Suite
              </span>
              <Badge variant="luxury">Luxury Tier</Badge>
            </div>
            <h3 className="text-h4 font-serif font-bold text-charcoal-900">
              {booking.roomName}
            </h3>
            <p className="text-caption text-charcoal-500 flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-gold-600" />
              Private Balcony • Dedicated 24/7 Butler Service
            </p>
          </div>
        </div>

        {/* Reservation Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-md pt-sm border-t border-border text-left">
          <div>
            <span className="text-[11px] text-charcoal-400 block uppercase">Check-In</span>
            <span className="text-body-sm font-semibold text-charcoal-900 flex items-center gap-1 mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-gold-600" />
              {booking.checkIn}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-charcoal-400 block uppercase">Check-Out</span>
            <span className="text-body-sm font-semibold text-charcoal-900 flex items-center gap-1 mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-gold-600" />
              {booking.checkOut}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-charcoal-400 block uppercase">Occupancy</span>
            <span className="text-body-sm font-semibold text-charcoal-900 flex items-center gap-1 mt-0.5">
              <Users className="h-3.5 w-3.5 text-gold-600" />
              {booking.guests?.adults || 2} Adults
            </span>
          </div>

          <div>
            <span className="text-[11px] text-charcoal-400 block uppercase">Total Balance</span>
            <span className="text-h4 font-serif font-bold text-gold-700 block mt-0.5">
              {booking.formattedTotal || `$${booking.totalPrice.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-md pt-sm">
        <Link href={`/bookings/${booking.id}`} className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto font-serif font-bold tracking-wide"
            leftIcon={<Sparkles className="h-4 w-4" />}
          >
            View In My Bookings
          </Button>
        </Link>

        <Button
          variant="outline"
          size="lg"
          onClick={handlePrint}
          className="w-full sm:w-auto"
          leftIcon={<Printer className="h-4 w-4" />}
        >
          Print Itinerary
        </Button>

        <Link href="/" className="w-full sm:w-auto">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

