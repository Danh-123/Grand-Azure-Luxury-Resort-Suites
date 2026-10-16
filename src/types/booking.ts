/**
 * 🏛️ DOMAIN MODEL: BOOKING
 * Mirrors backend reservation records.
 */

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface PriceBreakdown {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number; // e.g. 10% VAT
  serviceFee: number; // e.g. 5% luxury resort fee
  total: number;
}

export interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  roomId: string;
  userId: string | null; // Nullable for non-authenticated draft bookings
  checkIn: string; // ISO date string (YYYY-MM-DD)
  checkOut: string; // ISO date string (YYYY-MM-DD)
  guests: {
    adults: number;
    children: number;
  };
  status: BookingStatus;
  totalPrice: number;
  priceBreakdown: PriceBreakdown;
  guestInfo: GuestInfo;
  createdAt: string; // ISO timestamp
  updatedAt?: string;
}

