import { BookingStatus, GuestInfo, PriceBreakdown } from '../booking';

/**
 * 🏛️ UI DTO: BookingSummaryDTO
 * Lightweight summary for customer order lists and dashboard tables.
 */
export interface BookingSummaryDTO {
  id: string;
  bookingCode: string;
  roomId: string;
  roomName: string;
  roomThumbnail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: BookingStatus;
  totalPrice: number;
  formattedTotal: string;
  createdAt: string;
}

/**
 * 🏛️ UI DTO: BookingDetailDTO
 * Comprehensive reservation record for confirmation and receipt views.
 */
export interface BookingDetailDTO extends BookingSummaryDTO {
  guests: {
    adults: number;
    children: number;
  };
  priceBreakdown: PriceBreakdown;
  guestInfo: GuestInfo;
}

