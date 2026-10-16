'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookingDetailDTO } from '@/types/dto/booking.dto';
import { BookingStatus } from '@/types/booking';
import { bookingService } from '@/services/booking.service';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CancelBookingModal } from './CancelBookingModal';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Bed,
  Sparkles,
  Ban,
} from 'lucide-react';

interface BookingDetailViewProps {
  booking: BookingDetailDTO;
}

export function BookingDetailView({ booking: initialBooking }: BookingDetailViewProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [booking, setBooking] = useState<BookingDetailDTO>(initialBooking);
  const [copied, setCopied] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';

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

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    const previousBooking = { ...booking };

    // Optimistic cancellation
    setBooking((prev) => ({ ...prev, status: 'cancelled' }));
    setIsCancelModalOpen(false);

    try {
      await bookingService.cancel(booking.id);
      showToast({
        type: 'info',
        title: 'Reservation Cancelled',
        message: `Reservation #${booking.bookingCode || booking.id} has been cancelled successfully.`,
      });
    } catch (err: unknown) {
      setBooking(previousBooking);
      const msg = err instanceof Error ? err.message : 'Failed to cancel reservation.';
      showToast({
        type: 'error',
        title: 'Cancellation Failed',
        message: msg,
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="confirmed">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="pending">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="cancelled">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="completed">Completed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-xl">
      {/* Top Header: Navigation & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-border pb-md">
        <Link href="/bookings">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to All Bookings
          </Button>
        </Link>

        <div className="flex items-center gap-sm">
          {getStatusBadge(booking.status)}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="h-3.5 w-3.5" />}
          >
            Print Voucher
          </Button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Left Column (7/12) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-xl">
          {/* Room Snapshot */}
          <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-md shadow-sm">
            <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-xl bg-charcoal-800">
              <Image
                src={booking.roomThumbnail}
                alt={booking.roomName}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-md left-md right-md text-ivory-100 space-y-xs">
                <Badge variant="luxury">Confirmed Residence</Badge>
                <h2 className="text-h2 font-serif font-bold text-ivory-100">
                  {booking.roomName}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-md text-body-sm text-charcoal-600 pt-xs">
              <span className="flex items-center gap-xs">
                <Bed className="h-4 w-4 text-gold-600" />
                King Bed
              </span>
              <span>•</span>
              <span>Ocean Horizon Balcony</span>
              <span>•</span>
              <span className="text-gold-700 font-semibold">Dedicated Butler Service Included</span>
            </div>
          </div>

          {/* Stay Itinerary & Guest Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
            {/* Itinerary */}
            <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-sm shadow-sm">
              <div className="flex items-center gap-xs text-body-sm font-semibold text-charcoal-900 border-b border-border pb-xs">
                <Calendar className="h-4 w-4 text-gold-600" />
                <span>Stay Itinerary</span>
              </div>

              <div className="space-y-xs text-body-sm pt-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Check-In:</span>
                  <span className="font-semibold text-charcoal-900">{booking.checkIn} (15:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Check-Out:</span>
                  <span className="font-semibold text-charcoal-900">{booking.checkOut} (12:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Duration:</span>
                  <span className="font-semibold text-charcoal-900">
                    {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Guests:</span>
                  <span className="font-semibold text-charcoal-900">
                    {booking.guests?.adults || 2} Adults
                    {booking.guests?.children ? `, ${booking.guests.children} Children` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-sm shadow-sm">
              <div className="flex items-center gap-xs text-body-sm font-semibold text-charcoal-900 border-b border-border pb-xs">
                <User className="h-4 w-4 text-gold-600" />
                <span>Lead Guest Information</span>
              </div>

              <div className="space-y-xs text-body-sm pt-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Full Name:</span>
                  <span className="font-semibold text-charcoal-900">{booking.guestInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Email:</span>
                  <span className="font-semibold text-charcoal-900 truncate max-w-[170px]">
                    {booking.guestInfo.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Phone:</span>
                  <span className="font-semibold text-charcoal-900">{booking.guestInfo.phone}</span>
                </div>
                {booking.guestInfo.specialRequests && (
                  <div className="pt-xs text-[11px] text-charcoal-500 italic">
                    &ldquo;{booking.guestInfo.specialRequests}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5/12): Voucher & Pricing Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-lg">
          {/* Digital Voucher Card */}
          <div className="rounded-2xl border border-gold-500/40 bg-background-elevated p-lg shadow-xl space-y-md text-center">
            <span className="text-[11px] font-semibold text-gold-700 uppercase tracking-widest block">
              Reservation Code
            </span>

            <div className="flex items-center justify-center gap-md rounded-xl bg-gold-50 px-md py-sm border border-gold-500/30">
              <span className="text-h3 font-mono font-bold text-charcoal-900">
                {booking.bookingCode || booking.id}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-xs rounded-lg bg-gold-500 px-sm py-xs text-[11px] font-bold text-charcoal-900 hover:bg-gold-600 transition-colors"
                aria-label="Copy booking reference code"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <p className="text-[11px] text-charcoal-500">
              Present this digital reference upon arrival at the private valet pavilion.
            </p>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-md shadow-sm">
            <h4 className="text-body-sm font-semibold text-charcoal-900 uppercase tracking-wider">
              Financial Breakdown
            </h4>

            <div className="space-y-xs text-body-sm border-t border-border pt-md text-charcoal-600">
              <div className="flex justify-between">
                <span>Room Charges ({booking.nights} nights)</span>
                <span>{formatPrice(booking.priceBreakdown?.subtotal || booking.totalPrice * 0.85)}</span>
              </div>
              <div className="flex justify-between">
                <span>Resort Service Fee (10%)</span>
                <span>{formatPrice(booking.priceBreakdown?.serviceFee || booking.totalPrice * 0.09)}</span>
              </div>
              <div className="flex justify-between">
                <span>Hospitality Taxes (8%)</span>
                <span>{formatPrice(booking.priceBreakdown?.taxes || booking.totalPrice * 0.06)}</span>
              </div>

              <div className="flex justify-between pt-md border-t border-border text-h4 font-serif font-bold text-charcoal-900">
                <span>Total Balance</span>
                <span className="text-gold-700">
                  {booking.formattedTotal || formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation Action */}
          {canCancel && (
            <div className="rounded-2xl border border-error-border/60 bg-error-light/20 p-md text-center space-y-sm">
              <p className="text-caption text-charcoal-600">
                Need to amend or cancel your stay? Complimentary cancellation applies up to 48 hours prior.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCancelModalOpen(true)}
                className="w-full text-error border-error/50 hover:bg-error-light/40"
                leftIcon={<Ban className="h-3.5 w-3.5" />}
              >
                Cancel This Reservation
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Cancellation Modal */}
      {isCancelModalOpen && (
        <CancelBookingModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          bookingCode={booking.bookingCode || booking.id}
          roomName={booking.roomName}
          onConfirm={handleConfirmCancel}
          isCancelling={isCancelling}
        />
      )}
    </div>
  );
}

