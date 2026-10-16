import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockBookings } from '@/mock/bookings.mock';
import { mockRooms } from '@/mock/rooms.mock';
import { toBookingDetailDTO } from '@/lib/mappers/booking.mapper';
import { BookingDetailView } from '@/components/account';

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Reservation #${id} | Grand Azure Luxury Resort`,
    description: 'Detailed reservation record, price breakdown, and digital voucher.',
  };
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id } = await params;
  const booking = mockBookings.find((b) => b.id === id || b.bookingCode === id);

  if (!booking) {
    notFound();
  }

  const room = mockRooms.find((r) => r.id === booking.roomId);
  const dto = toBookingDetailDTO(booking, room);

  return <BookingDetailView booking={dto} />;
}
