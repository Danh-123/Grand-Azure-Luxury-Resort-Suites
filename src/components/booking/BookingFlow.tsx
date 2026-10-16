'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/useBookingStore';
import { mockRooms } from '@/mock/rooms.mock';
import { toRoomCardDTO } from '@/lib/mappers/room.mapper';
import { BookingDetailDTO } from '@/types/dto/booking.dto';
import { BookingStepper } from './BookingStepper';
import { BookingSummaryCard } from './BookingSummaryCard';
import { StepDatesGuests } from './StepDatesGuests';
import { StepGuestInfo } from './StepGuestInfo';
import { StepReviewSummary } from './StepReviewSummary';
import { BookingConfirmationView } from './BookingConfirmationView';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Building2 } from 'lucide-react';

export function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Zustand Store
  const selectedRoom = useBookingStore((s) => s.selectedRoom);
  const checkIn = useBookingStore((s) => s.checkIn);
  const checkOut = useBookingStore((s) => s.checkOut);
  const guests = useBookingStore((s) => s.guests);
  const currentStep = useBookingStore((s) => s.currentStep);
  const setStep = useBookingStore((s) => s.setStep);
  const setRoom = useBookingStore((s) => s.setRoom);
  const resetStore = useBookingStore((s) => s.reset);

  const [isMounted, setIsMounted] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<BookingDetailDTO | null>(null);

  // Hydration safety mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pre-fill room from ?room=slug if not already in store
  useEffect(() => {
    if (!isMounted) return;

    const roomParam = searchParams.get('room');
    if (roomParam && !selectedRoom) {
      const found = mockRooms.find((r) => r.slug === roomParam || r.id === roomParam);
      if (found) {
        setRoom(toRoomCardDTO(found));
      }
    }
  }, [isMounted, searchParams, selectedRoom, setRoom]);

  // Loading skeleton during SSR/hydration
  if (!isMounted) {
    return (
      <div className="w-full space-y-xl py-xl animate-pulse">
        <div className="h-12 w-full max-w-xl mx-auto rounded-full bg-charcoal-200/60" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-8 h-96 rounded-2xl bg-charcoal-200/50" />
          <div className="lg:col-span-4 h-96 rounded-2xl bg-charcoal-200/50" />
        </div>
      </div>
    );
  }

  // If no room is selected in store or URL query
  if (!selectedRoom && currentStep < 4) {
    return (
      <div className="py-2xl">
        <EmptyState
          icon={<Building2 className="h-8 w-8 text-gold-600" />}
          title="No Accommodation Selected"
          description="Please choose a luxury suite or private villa from our collection before proceeding to reservation."
          actionLabel="Browse Suites & Villas"
          onAction={() => router.push('/rooms')}
        />
      </div>
    );
  }

  const handleBookingComplete = (booking: BookingDetailDTO) => {
    setCompletedBooking(booking);
    setStep(4);
    resetStore(); // Reset draft store per Step 16 spec
  };

  return (
    <div className="w-full space-y-xl">
      {/* 4-Step Visual Progress Stepper */}
      <BookingStepper currentStep={currentStep} onStepClick={setStep} />

      {/* Step 4: Full Confirmation View */}
      {currentStep === 4 && completedBooking ? (
        <BookingConfirmationView booking={completedBooking} />
      ) : (
        /* Steps 1–3: Stepper Form + Persistent Summary Sidebar */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl lg:gap-2xl items-start">
          {/* Main Left Content Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepDatesGuests />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepGuestInfo />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepReviewSummary onSuccess={handleBookingComplete} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent Sidebar (Visible across Steps 1-3) */}
          {selectedRoom && (
            <div className="lg:col-span-5 xl:col-span-4">
              <BookingSummaryCard
                room={selectedRoom}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

