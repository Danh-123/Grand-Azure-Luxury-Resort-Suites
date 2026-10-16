import React from 'react';
import type { Metadata } from 'next';
import { adminService } from '@/services/admin.service';
import { AdminBookingsTable } from '@/components/admin/AdminBookingsTable';

export const metadata: Metadata = {
  title: 'Bookings Moderation | Grand Azure Admin',
  description: 'Manage, review, approve, and audit luxury reservations across all resort suites.',
};

export default async function AdminBookingsPage() {
  const bookings = await adminService.getBookings();

  return (
    <div className="space-y-xl">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
          Reservations Console
        </span>
        <h1 className="text-h2 font-serif font-bold text-charcoal-900 mt-0.5">
          Bookings Moderation & Auditing
        </h1>
        <p className="text-body-sm text-charcoal-600 mt-1">
          Review guest reservations, examine financial receipts, confirm pending drafts, or handle booking cancellations.
        </p>
      </div>

      {/* Interactive Admin Table */}
      <AdminBookingsTable initialBookings={bookings} />
    </div>
  );
}
