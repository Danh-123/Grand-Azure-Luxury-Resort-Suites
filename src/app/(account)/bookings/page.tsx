import React from 'react';
import type { Metadata } from 'next';
import { BookingsList } from '@/components/account';

export const metadata: Metadata = {
  title: 'My Bookings | Grand Azure Luxury Resort',
  description: 'View and manage all your past, upcoming, and active reservations.',
};

export default function MyBookingsPage() {
  return (
    <div className="space-y-lg">
      <div className="space-y-xs">
        <h2 className="text-h2 font-serif font-bold text-charcoal-900">
          My Reservations
        </h2>
        <p className="text-body text-charcoal-600 font-light">
          Review your upcoming sanctuary stays, access digital arrival vouchers, or manage cancellation requests.
        </p>
      </div>

      <BookingsList />
    </div>
  );
}
