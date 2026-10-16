'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, ArrowRight, Eye, User, Calendar, DollarSign } from 'lucide-react';
import { BookingSummaryDTO } from '@/types/dto/booking.dto';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface RecentBookingsTableProps {
  bookings: BookingSummaryDTO[];
}

export function RecentBookingsTable({ bookings }: RecentBookingsTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingSummaryDTO | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="confirmed">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="pending">Pending Review</Badge>;
      case 'cancelled':
        return <Badge variant="cancelled">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="completed">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background-elevated shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-md lg:p-lg border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm">
        <div>
          <div className="flex items-center gap-xs text-[11px] font-bold uppercase tracking-wider text-gold-700">
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Latest Operations</span>
          </div>
          <h3 className="text-h4 font-serif font-bold text-charcoal-900 mt-0.5">
            Recent Reservations
          </h3>
        </div>

        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-gold-700 hover:text-gold-800 transition-colors"
        >
          <span>Manage All Bookings</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-background-subtle border-b border-border text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
            <tr>
              <th className="py-sm px-md">Reservation ID</th>
              <th className="py-sm px-md">Suite / Room</th>
              <th className="py-sm px-md">Check-in / Out</th>
              <th className="py-sm px-md">Total Amount</th>
              <th className="py-sm px-md">Status</th>
              <th className="py-sm px-md text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-background-subtle/60 transition-colors"
              >
                <td className="py-sm px-md font-mono font-semibold text-charcoal-900">
                  {booking.bookingCode}
                </td>
                <td className="py-sm px-md">
                  <div className="font-semibold text-charcoal-800 line-clamp-1 max-w-[200px]">
                    {booking.roomName}
                  </div>
                  <div className="text-[11px] text-charcoal-400">
                    {booking.nights} night{booking.nights > 1 ? 's' : ''} stay
                  </div>
                </td>
                <td className="py-sm px-md whitespace-nowrap text-caption text-charcoal-600">
                  <div>In: {booking.checkIn}</div>
                  <div>Out: {booking.checkOut}</div>
                </td>
                <td className="py-sm px-md font-bold text-charcoal-900 whitespace-nowrap">
                  {booking.formattedTotal}
                </td>
                <td className="py-sm px-md whitespace-nowrap">
                  {getStatusBadge(booking.status)}
                </td>
                <td className="py-sm px-md text-right whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBooking(booking)}
                    className="h-8 px-2 text-charcoal-600 hover:text-gold-700"
                    leftIcon={<Eye className="h-4 w-4" />}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Quick Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Reservation ${selectedBooking.bookingCode}`}
        >
          <div className="space-y-md text-left pt-xs">
            <div className="flex items-center justify-between pb-sm border-b border-border">
              <span className="text-body-sm font-semibold text-charcoal-700">
                Current Status
              </span>
              <div>{getStatusBadge(selectedBooking.status)}</div>
            </div>

            <div className="rounded-lg bg-background-subtle p-md space-y-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                Suite Reserved
              </div>
              <div className="text-body-md font-serif font-bold text-charcoal-900">
                {selectedBooking.roomName}
              </div>
              <div className="text-caption text-charcoal-500">
                Length of stay: {selectedBooking.nights} nights
              </div>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div className="rounded-lg border border-border p-sm space-y-0.5">
                <span className="text-[11px] text-charcoal-400 font-medium">Check-In</span>
                <p className="text-body-sm font-semibold text-charcoal-800">{selectedBooking.checkIn}</p>
              </div>
              <div className="rounded-lg border border-border p-sm space-y-0.5">
                <span className="text-[11px] text-charcoal-400 font-medium">Check-Out</span>
                <p className="text-body-sm font-semibold text-charcoal-800">{selectedBooking.checkOut}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-sm rounded-lg bg-gold-50 border border-gold-200 text-gold-900">
              <span className="font-semibold text-body-sm">Gross Total Paid:</span>
              <span className="font-serif text-h4 font-bold">{selectedBooking.formattedTotal}</span>
            </div>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </Button>
              <Link href={`/admin/bookings`}>
                <Button variant="primary" size="md">
                  Full Moderation
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
