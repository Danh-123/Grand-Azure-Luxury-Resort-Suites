import { Booking } from '@/types/booking';
import { Room } from '@/types/room';
import { BookingSummaryDTO, BookingDetailDTO } from '@/types/dto/booking.dto';

/**
 * 🏛️ Formatter helper: formats price to USD currency string
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 🏛️ Pure Mapper: Converts Booking entity to BookingSummaryDTO
 */
export function toBookingSummaryDTO(booking: Booking, room?: Room): BookingSummaryDTO {
  return {
    id: booking.id,
    bookingCode: booking.bookingCode,
    roomId: booking.roomId,
    roomName: room ? room.name : `Suite #${booking.roomId.substring(0, 6)}`,
    roomThumbnail:
      room && room.images.length > 0
        ? room.images[0]
        : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    nights: booking.priceBreakdown.nights,
    status: booking.status,
    totalPrice: booking.totalPrice,
    formattedTotal: formatCurrency(booking.totalPrice),
    createdAt: booking.createdAt,
  };
}

/**
 * 🏛️ Pure Mapper: Converts Booking entity to BookingDetailDTO
 */
export function toBookingDetailDTO(booking: Booking, room?: Room): BookingDetailDTO {
  const summary = toBookingSummaryDTO(booking, room);
  return {
    ...summary,
    guests: booking.guests,
    priceBreakdown: booking.priceBreakdown,
    guestInfo: booking.guestInfo,
  };
}

