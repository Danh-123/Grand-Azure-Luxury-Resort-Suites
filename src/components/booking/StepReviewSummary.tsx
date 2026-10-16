'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/useBookingStore';
import { useAuthStore } from '@/store/useAuthStore';
import { bookingService } from '@/services/booking.service';
import { BookingDetailDTO } from '@/types/dto/booking.dto';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ErrorState } from '@/components/ui/ErrorState';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Bed,
} from 'lucide-react';

interface StepReviewSummaryProps {
  onSuccess: (booking: BookingDetailDTO) => void;
}

export function StepReviewSummary({ onSuccess }: StepReviewSummaryProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const selectedRoom = useBookingStore((s) => s.selectedRoom);
  const checkIn = useBookingStore((s) => s.checkIn);
  const checkOut = useBookingStore((s) => s.checkOut);
  const guests = useBookingStore((s) => s.guests);
  const guestInfo = useBookingStore((s) => s.guestInfo);
  const setStep = useBookingStore((s) => s.setStep);
  const prevStep = useBookingStore((s) => s.prevStep);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Nights calculation
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;
  }, [checkIn, checkOut]);

  if (!selectedRoom || !checkIn || !checkOut) {
    return null;
  }

  const subtotal = nights * selectedRoom.pricePerNight;
  const serviceCharge = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.08);
  const totalAmount = subtotal + serviceCharge + taxes;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedRoom.currency || 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  const handleConfirm = async () => {
    // Business Rule (Step 17): Guests cannot finalize booking without authenticating
    if (!isAuthenticated) {
      router.push('/login?returnUrl=/booking');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await bookingService.create({
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        guests,
        guestInfo: {
          fullName: guestInfo.fullName,
          email: guestInfo.email,
          phone: guestInfo.phone,
          specialRequests: guestInfo.specialRequests,
        },
      });

      onSuccess(created);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Reservation processing failed. Please retry.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-xl">
      <div className="space-y-xs">
        <h2 className="text-h2 font-serif font-bold text-charcoal-900">
          Step 3: Review &amp; Confirmation
        </h2>
        <p className="text-body text-charcoal-600 font-light">
          Review your reservation specifications before our concierge confirms your private sanctuary.
        </p>
      </div>

      {/* Error state if submission fails */}
      {error && (
        <ErrorState
          title="Reservation Submission Error"
          message={error}
          onRetry={handleConfirm}
          isRetrying={isSubmitting}
          retryLabel="Retry Confirmation"
        />
      )}

      {/* Selected Suite Preview Card */}
      <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-md shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-md">
          <span className="text-caption font-semibold uppercase tracking-wider text-gold-600">
            Selected Accommodation
          </span>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-[12px] font-semibold text-gold-700 hover:text-gold-800 underline underline-offset-2"
          >
            Change Suite
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-lg">
          <div className="relative h-28 w-36 sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-xl border border-border bg-charcoal-800">
            <Image
              src={selectedRoom.thumbnailUrl}
              alt={selectedRoom.name}
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>

          <div className="space-y-xs flex-1">
            <Badge variant="luxury">{selectedRoom.roomType.toUpperCase()}</Badge>
            <h3 className="text-h3 font-serif font-bold text-charcoal-900">
              {selectedRoom.name}
            </h3>
            <div className="flex flex-wrap items-center gap-md text-caption text-charcoal-600">
              <span className="flex items-center gap-xs">
                <Bed className="h-3.5 w-3.5 text-gold-600" />
                {selectedRoom.bedType}
              </span>
              <span>•</span>
              <span>{selectedRoom.sizeSqm} m² / {Math.round(selectedRoom.sizeSqm * 10.764)} sq ft</span>
              <span>•</span>
              <span className="text-gold-700 font-semibold">{formatPrice(selectedRoom.pricePerNight)} / night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Itinerary & Guest Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
        {/* Itinerary */}
        <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-sm shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-xs">
            <div className="flex items-center gap-xs text-body-sm font-semibold text-charcoal-900">
              <Calendar className="h-4 w-4 text-gold-600" />
              <span>Itinerary Details</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[11px] font-semibold text-gold-700 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-xs text-body-sm pt-xs">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Check-In:</span>
              <span className="font-semibold text-charcoal-900">{checkIn} (from 15:00)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Check-Out:</span>
              <span className="font-semibold text-charcoal-900">{checkOut} (until 12:00)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Total Duration:</span>
              <span className="font-semibold text-charcoal-900">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Guests:</span>
              <span className="font-semibold text-charcoal-900">
                {guests.adults} Adults{guests.children > 0 ? `, ${guests.children} Children` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Lead Guest */}
        <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-sm shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-xs">
            <div className="flex items-center gap-xs text-body-sm font-semibold text-charcoal-900">
              <User className="h-4 w-4 text-gold-600" />
              <span>Lead Guest</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[11px] font-semibold text-gold-700 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-xs text-body-sm pt-xs">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Guest Name:</span>
              <span className="font-semibold text-charcoal-900">{guestInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Email:</span>
              <span className="font-semibold text-charcoal-900 truncate max-w-[180px]">{guestInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Phone:</span>
              <span className="font-semibold text-charcoal-900">{guestInfo.phone}</span>
            </div>
            {guestInfo.specialRequests && (
              <div className="pt-xs text-[11px] text-charcoal-500 italic">
                &ldquo;{guestInfo.specialRequests}&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transparent Pricing Summary Card */}
      <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-md shadow-sm">
        <h4 className="text-body-sm font-semibold text-charcoal-900 uppercase tracking-wider">
          Payment &amp; Surcharges Breakdown
        </h4>

        <div className="space-y-sm text-body-sm border-t border-border pt-md">
          <div className="flex justify-between text-charcoal-600">
            <span>Room Rate ({formatPrice(selectedRoom.pricePerNight)} × {nights} nights)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Resort Service Charge (10%)</span>
            <span>{formatPrice(serviceCharge)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Government Hospitality Tax (8%)</span>
            <span>{formatPrice(taxes)}</span>
          </div>

          <div className="flex justify-between pt-md border-t border-border items-baseline text-h3 font-serif font-bold text-charcoal-900">
            <span>Total Payable</span>
            <span className="text-gold-700">{formatPrice(totalAmount)}</span>
          </div>
        </div>

        <div className="flex items-center gap-xs rounded-xl bg-gold-50 p-sm text-[12px] text-gold-900 border border-gold-500/20">
          <ShieldCheck className="h-4 w-4 text-gold-700 shrink-0" />
          <span>Payment will be collected at check-in. No credit card charge is incurred today.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-md">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={prevStep}
          disabled={isSubmitting}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Details
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleConfirm}
          isLoading={isSubmitting}
          leftIcon={<CheckCircle2 className="h-5 w-5" />}
          className="font-serif font-bold tracking-wide shadow-glow"
        >
          Confirm Reservation
        </Button>
      </div>
    </div>
  );
}

