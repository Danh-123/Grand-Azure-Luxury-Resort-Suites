import React from 'react';
import type { Metadata } from 'next';
import { mockBookings } from '@/mock/bookings.mock';
import { mockRooms } from '@/mock/rooms.mock';
import { toBookingDetailDTO } from '@/lib/mappers/booking.mapper';
import { Container, Section } from '@/components/layout';
import { BookingConfirmationView } from '@/components/booking/BookingConfirmationView';

interface ConfirmationPageProps {
  searchParams: Promise<{ id?: string }>;
}

export const metadata: Metadata = {
  title: 'Reservation Confirmed | Grand Azure Luxury Resort',
  description: 'Your sanctuary is confirmed. View your luxury itinerary and concierge details.',
};

export default async function BookingConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { id } = await searchParams;

  // Find booking by ID / code or default to latest reservation
  const targetBooking =
    (id && mockBookings.find((b) => b.id === id || b.bookingCode === id)) ||
    mockBookings[0];

  const room = mockRooms.find((r) => r.id === targetBooking.roomId);
  const dto = toBookingDetailDTO(targetBooking, room);

  return (
    <Section spacing="lg" background="base" className="min-h-screen">
      <Container size="xl">
        <BookingConfirmationView booking={dto} />
      </Container>
    </Section>
  );
}
