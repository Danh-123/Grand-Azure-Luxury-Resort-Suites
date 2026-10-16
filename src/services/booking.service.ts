import { BookingSummaryDTO, BookingDetailDTO } from '@/types/dto/booking.dto';
import { BookingStatus, GuestInfo } from '@/types/booking';

export interface CreateBookingPayload {
  roomId: string;
  userId?: string | null;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  guestInfo: GuestInfo;
}

export const bookingService = {
  /**
   * Fetch all bookings (optionally filtered by userId)
   */
  async getAll(userId?: string): Promise<BookingSummaryDTO[]> {
    const url = userId ? `/api/bookings?userId=${userId}` : '/api/bookings';
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch bookings list');
    const json = await res.json();
    return json.data;
  },

  /**
   * Fetch a single booking by ID or reservation code
   */
  async getById(id: string): Promise<BookingDetailDTO> {
    const res = await fetch(`/api/bookings/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch booking details for '${id}'`);
    const json = await res.json();
    return json.data;
  },

  /**
   * Create a new booking
   */
  async create(payload: CreateBookingPayload): Promise<BookingDetailDTO> {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create reservation');
    const json = await res.json();
    return json.data;
  },

  /**
   * Cancel an existing booking
   */
  async cancel(id: string): Promise<BookingDetailDTO> {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' as BookingStatus }),
    });
    if (!res.ok) throw new Error(`Failed to cancel booking '${id}'`);
    const json = await res.json();
    return json.data;
  },
};

