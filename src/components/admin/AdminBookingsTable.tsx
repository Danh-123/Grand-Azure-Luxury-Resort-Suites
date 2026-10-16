'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  CalendarCheck,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  User,
  Mail,
  Phone,
  FileText,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { BookingDetailDTO } from '@/types/dto/booking.dto';
import { BookingStatus } from '@/types/booking';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Avatar } from '@/components/ui/Avatar';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface AdminBookingsTableProps {
  initialBookings: BookingDetailDTO[];
}

export function AdminBookingsTable({ initialBookings }: AdminBookingsTableProps) {
  const { showToast } = useToast();

  const [bookings, setBookings] = useState<BookingDetailDTO[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Selected Booking for Detail View
  const [selectedBooking, setSelectedBooking] = useState<BookingDetailDTO | null>(null);

  // Status Change Confirmation Modal
  const [statusAction, setStatusAction] = useState<{
    booking: BookingDetailDTO;
    targetStatus: BookingStatus;
  } | null>(null);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesTab = activeTab === 'all' || b.status === activeTab;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        b.bookingCode.toLowerCase().includes(q) ||
        b.guestInfo.fullName.toLowerCase().includes(q) ||
        b.guestInfo.email.toLowerCase().includes(q) ||
        b.roomName.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, currentPage, pageSize]);

  // Status Badge Helper
  const renderStatusBadge = (status: BookingStatus) => {
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

  // Execute Status Change
  const handleConfirmStatusChange = () => {
    if (!statusAction) return;

    const { booking, targetStatus } = statusAction;

    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: targetStatus } : b))
    );

    showToast({
      type: 'success',
      title: 'Reservation Status Updated',
      message: `Reservation ${booking.bookingCode} transitioned to ${targetStatus.toUpperCase()}.`,
    });

    setStatusAction(null);
  };

  const handleResetFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-lg">
      {/* Controls & Filter Tabs */}
      <div className="rounded-xl border border-border bg-background-elevated p-md shadow-sm space-y-md">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-xs border-b border-border/60 pb-sm">
          {[
            { id: 'all', label: 'All Reservations', count: tabCounts.all },
            { id: 'confirmed', label: 'Confirmed', count: tabCounts.confirmed },
            { id: 'pending', label: 'Pending Review', count: tabCounts.pending },
            { id: 'completed', label: 'Completed', count: tabCounts.completed },
            { id: 'cancelled', label: 'Cancelled', count: tabCounts.cancelled },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
              className={cn(
                'px-sm py-1.5 rounded-lg text-caption font-semibold transition-all duration-fast flex items-center gap-1.5 min-h-[38px]',
                activeTab === tab.id
                  ? 'bg-charcoal-900 text-ivory-100 shadow-sm'
                  : 'text-charcoal-600 hover:bg-background-subtle hover:text-charcoal-900'
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px]',
                  activeTab === tab.id
                    ? 'bg-gold-500 text-charcoal-950 font-bold'
                    : 'bg-background-subtle text-charcoal-500'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar & Stats summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by code (e.g. GA-99201), guest name, or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          <div className="flex items-center gap-sm">
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
                className="text-caption text-charcoal-500"
              >
                Clear Search
              </Button>
            )}
            <span className="text-caption text-charcoal-400">
              Showing <strong className="text-charcoal-900">{filteredBookings.length}</strong> matching records
            </span>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-xl border border-border bg-background-elevated p-xl shadow-sm">
          <EmptyState
            title="No Reservations Found"
            description="No guest bookings match the active status tab or search filter."
            actionLabel="Reset View"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-background-elevated shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-background-subtle border-b border-border text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="py-sm px-md">Reservation</th>
                  <th className="py-sm px-md">Guest Information</th>
                  <th className="py-sm px-md">Suite / Stay</th>
                  <th className="py-sm px-md">Dates</th>
                  <th className="py-sm px-md">Amount</th>
                  <th className="py-sm px-md">Status</th>
                  <th className="py-sm px-md text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-background-subtle/60 transition-colors"
                  >
                    {/* Booking Code */}
                    <td className="py-sm px-md">
                      <div className="font-mono font-bold text-charcoal-900">
                        {b.bookingCode}
                      </div>
                      <div className="text-[11px] text-charcoal-400">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Guest Information */}
                    <td className="py-sm px-md">
                      <div className="flex items-center gap-sm">
                        <Avatar
                          name={b.guestInfo.fullName}
                          size="sm"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal-900 truncate">
                            {b.guestInfo.fullName}
                          </p>
                          <p className="text-[11px] text-charcoal-500 truncate">
                            {b.guestInfo.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Suite Name & Nights */}
                    <td className="py-sm px-md">
                      <p className="font-serif font-bold text-charcoal-800 line-clamp-1 max-w-[200px]">
                        {b.roomName}
                      </p>
                      <p className="text-[11px] text-charcoal-400">
                        {b.nights} night{b.nights > 1 ? 's' : ''} • {b.guests.adults}A, {b.guests.children}C
                      </p>
                    </td>

                    {/* Stay Dates */}
                    <td className="py-sm px-md whitespace-nowrap text-caption text-charcoal-600">
                      <div>In: {b.checkIn}</div>
                      <div>Out: {b.checkOut}</div>
                    </td>

                    {/* Total Price */}
                    <td className="py-sm px-md font-bold text-charcoal-900 whitespace-nowrap">
                      {b.formattedTotal}
                    </td>

                    {/* Status */}
                    <td className="py-sm px-md whitespace-nowrap">
                      {renderStatusBadge(b.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-sm px-md text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBooking(b)}
                          className="h-8 px-2 text-charcoal-600 hover:text-gold-700"
                          leftIcon={<Eye className="h-3.5 w-3.5" />}
                        >
                          View
                        </Button>

                        {/* Quick Moderation Transitions */}
                        {b.status === 'pending' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              setStatusAction({
                                booking: b,
                                targetStatus: 'confirmed',
                              })
                            }
                            className="h-8 px-2 text-[11px]"
                          >
                            Approve
                          </Button>
                        )}

                        {b.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setStatusAction({
                                booking: b,
                                targetStatus: 'completed',
                              })
                            }
                            className="h-8 px-2 text-[11px] text-charcoal-700"
                          >
                            Complete
                          </Button>
                        )}

                        {(b.status === 'pending' || b.status === 'confirmed') && (
                          <button
                            type="button"
                            onClick={() =>
                              setStatusAction({
                                booking: b,
                                targetStatus: 'cancelled',
                              })
                            }
                            className="text-error hover:bg-error-light/30 rounded p-1.5 transition-colors"
                            title="Cancel Reservation"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-md border-t border-border flex items-center justify-between">
              <span className="text-caption text-charcoal-500">
                Page {currentPage} of {totalPages}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}

      {/* Booking Full Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Reservation Details: ${selectedBooking.bookingCode}`}
        >
          <div className="space-y-md text-left pt-xs max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info */}
            <div className="flex items-center justify-between p-sm rounded-lg bg-background-subtle border border-border">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">
                  Reservation Code
                </span>
                <span className="font-mono font-bold text-h4 text-charcoal-900">
                  {selectedBooking.bookingCode}
                </span>
              </div>
              <div>{renderStatusBadge(selectedBooking.status)}</div>
            </div>

            {/* Suite & Dates */}
            <div className="rounded-lg border border-border p-md space-y-sm">
              <div className="font-serif text-h4 font-bold text-charcoal-900">
                {selectedBooking.roomName}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm text-caption text-charcoal-600 pt-xs border-t border-border/60">
                <div>
                  <span className="text-charcoal-400 block text-[11px]">Check-in</span>
                  <strong className="text-charcoal-800">{selectedBooking.checkIn}</strong>
                </div>
                <div>
                  <span className="text-charcoal-400 block text-[11px]">Check-out</span>
                  <strong className="text-charcoal-800">{selectedBooking.checkOut}</strong>
                </div>
                <div>
                  <span className="text-charcoal-400 block text-[11px]">Occupancy</span>
                  <strong className="text-charcoal-800">
                    {selectedBooking.guests.adults} Adults, {selectedBooking.guests.children} Children
                  </strong>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="rounded-lg border border-border p-md space-y-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                Guest Contact Profile
              </div>
              <p className="font-semibold text-charcoal-900 text-body-sm">
                {selectedBooking.guestInfo.fullName}
              </p>
              <div className="text-caption text-charcoal-600 flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-charcoal-400" />
                  {selectedBooking.guestInfo.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-charcoal-400" />
                  {selectedBooking.guestInfo.phone}
                </span>
              </div>
              {selectedBooking.guestInfo.specialRequests && (
                <div className="mt-sm p-sm rounded bg-gold-50/60 border border-gold-200/60 text-caption text-gold-900">
                  <strong>Special Requests:</strong> {selectedBooking.guestInfo.specialRequests}
                </div>
              )}
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="rounded-lg border border-border p-md space-y-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                Financial Breakdown (DTO)
              </div>
              <div className="space-y-1 text-caption text-charcoal-600">
                <div className="flex justify-between">
                  <span>
                    Accommodation ({selectedBooking.priceBreakdown.nights} nights @ $
                    {selectedBooking.priceBreakdown.pricePerNight})
                  </span>
                  <span>${selectedBooking.priceBreakdown.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resort Service Fee (5%)</span>
                  <span>${selectedBooking.priceBreakdown.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Value Added Taxes (10%)</span>
                  <span>${selectedBooking.priceBreakdown.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-sm border-t border-border font-bold text-body-sm text-charcoal-900">
                  <span>Total Settled:</span>
                  <span className="text-gold-700 font-serif text-h4">
                    {selectedBooking.formattedTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-sm pt-sm border-t border-border">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Transition Confirmation Modal */}
      {statusAction && (
        <Modal
          isOpen={!!statusAction}
          onClose={() => setStatusAction(null)}
          title="Confirm Status Transition"
        >
          <div className="space-y-md text-left pt-xs">
            <p className="text-body-sm text-charcoal-700">
              Are you sure you want to change reservation{' '}
              <strong className="text-charcoal-900 font-mono">
                {statusAction.booking.bookingCode}
              </strong>{' '}
              status to{' '}
              <strong className="text-gold-700 uppercase">
                {statusAction.targetStatus}
              </strong>
              ?
            </p>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setStatusAction(null)}
              >
                Cancel
              </Button>
              <Button
                variant={statusAction.targetStatus === 'cancelled' ? 'danger' : 'primary'}
                size="md"
                onClick={handleConfirmStatusChange}
              >
                Confirm Transition
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
