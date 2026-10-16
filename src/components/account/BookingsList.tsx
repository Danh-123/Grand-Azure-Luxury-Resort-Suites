'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { bookingService } from '@/services/booking.service';
import { BookingSummaryDTO } from '@/types/dto/booking.dto';
import { BookingStatus } from '@/types/booking';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { CancelBookingModal } from './CancelBookingModal';
import { Calendar, Bed, ArrowRight, Ban } from 'lucide-react';

export function BookingsList() {
  const { showToast } = useToast();
  const user = useAuthStore((s) => s.user);

  const [bookings, setBookings] = useState<BookingSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cancellation modal state
  const [selectedForCancel, setSelectedForCancel] = useState<BookingSummaryDTO | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookings = useCallback(async (isRetry = false) => {
    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await bookingService.getAll(user?.id);
      setBookings(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to retrieve reservation history.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Optimistic Cancellation
  const handleConfirmCancel = async () => {
    if (!selectedForCancel) return;

    const bookingId = selectedForCancel.id;
    const previousBookings = [...bookings];

    // Optimistically update status to cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    setIsCancelling(true);

    try {
      await bookingService.cancel(bookingId);
      showToast({
        type: 'info',
        title: 'Reservation Cancelled',
        message: `Reservation #${selectedForCancel.bookingCode || selectedForCancel.id} has been cancelled successfully.`,
      });
      setSelectedForCancel(null);
    } catch (err: unknown) {
      // Revert on error
      setBookings(previousBookings);
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

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="space-y-md">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md rounded-2xl border border-border bg-background-elevated p-lg animate-pulse"
          >
            <div className="flex items-center gap-md w-full sm:w-auto">
              <Skeleton className="h-20 w-28 rounded-xl shrink-0" />
              <div className="space-y-xs flex-1 sm:w-64">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-sm w-full sm:w-auto justify-end">
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <ErrorState
        title="Unable to load reservations"
        message={error}
        onRetry={() => fetchBookings(true)}
        isRetrying={isRetrying}
        retryLabel="Retry Loading"
      />
    );
  }

  // 3. Empty State
  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No Reservations Recorded Yet"
        description="Your personal itinerary is waiting to be written. Explore our collection of oceanfront villas and penthouses."
        actionLabel="Explore Suites & Villas"
        onAction={() => {
          window.location.href = '/rooms';
        }}
      />
    );
  }

  // 4. Success State
  return (
    <div className="space-y-md">
      {bookings.map((booking) => {
        const canCancel = booking.status === 'confirmed' || booking.status === 'pending';

        return (
          <div
            key={booking.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md rounded-2xl border border-border bg-background-elevated p-md sm:p-lg shadow-sm transition-all duration-base hover:border-gold-500/40"
          >
            {/* Left: Room Thumbnail & Specs */}
            <div className="flex items-start sm:items-center gap-md">
              <div className="relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl border border-border bg-charcoal-800">
                <Image
                  src={booking.roomThumbnail}
                  alt={booking.roomName}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-xs">
                <div className="flex items-center gap-xs">
                  {getStatusBadge(booking.status)}
                  <span className="text-caption font-mono font-semibold text-charcoal-400">
                    #{booking.bookingCode || booking.id}
                  </span>
                </div>

                <h3 className="text-body font-serif font-bold text-charcoal-900">
                  {booking.roomName}
                </h3>

                <p className="text-caption text-charcoal-500 flex items-center gap-xs">
                  <Calendar className="h-3.5 w-3.5 text-gold-600" />
                  <span>
                    {booking.checkIn} &rarr; {booking.checkOut} ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Total Price & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-md w-full sm:w-auto pt-sm sm:pt-0 border-t sm:border-t-0 border-border">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-charcoal-400 block uppercase">Total Rate</span>
                <span className="text-body font-serif font-bold text-gold-700">
                  {booking.formattedTotal || `$${booking.totalPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="flex items-center gap-xs">
                <Link href={`/bookings/${booking.id}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Details
                  </Button>
                </Link>

                {canCancel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedForCancel(booking)}
                    className="text-error hover:text-error hover:bg-error-light/30"
                    leftIcon={<Ban className="h-3.5 w-3.5" />}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Cancellation Confirmation Modal */}
      {selectedForCancel && (
        <CancelBookingModal
          isOpen={!!selectedForCancel}
          onClose={() => setSelectedForCancel(null)}
          bookingCode={selectedForCancel.bookingCode || selectedForCancel.id}
          roomName={selectedForCancel.roomName}
          onConfirm={handleConfirmCancel}
          isCancelling={isCancelling}
        />
      )}
    </div>
  );
}

