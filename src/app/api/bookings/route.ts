import { NextRequest, NextResponse } from 'next/server';
import { mockBookings } from '@/mock/bookings.mock';
import { mockRooms } from '@/mock/rooms.mock';
import { toBookingSummaryDTO, toBookingDetailDTO } from '@/lib/mappers/booking.mapper';
import { Booking } from '@/types/booking';
import { sendTelegramBookingNotification } from '@/lib/telegram';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await sleep(450);

  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  let list = [...mockBookings];
  if (userId) {
    list = list.filter((b) => b.userId === userId);
  }

  const dtos = list.map((b) => {
    const room = mockRooms.find((r) => r.id === b.roomId);
    return toBookingSummaryDTO(b, room);
  });

  return NextResponse.json({
    data: dtos,
    total: dtos.length,
  });
}

export async function POST(request: NextRequest) {
  await sleep(600);

  try {
    const body = await request.json();
    const { roomId, userId, checkIn, checkOut, guests, guestInfo } = body;

    const room = mockRooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json(
        { error: `Room with id '${roomId}' does not exist.` },
        { status: 400 }
      );
    }

    // Simulated failure case for QA testing error state & retry flow
    if (guestInfo?.email?.toLowerCase() === 'fail@error.com') {
      return NextResponse.json(
        { error: 'Simulated reservation processing failure. Please retry.' },
        { status: 500 }
      );
    }

    // Compute nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const subtotal = room.pricePerNight * nights;
    const taxes = Math.round(subtotal * 0.1); // 10%
    const serviceFee = Math.round(subtotal * 0.05); // 5%
    const total = subtotal + taxes + serviceFee;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingCode: `GA-${Math.floor(10000 + Math.random() * 90000)}`,
      roomId,
      userId: userId || null,
      checkIn,
      checkOut,
      guests: guests || { adults: 2, children: 0 },
      status: 'confirmed',
      totalPrice: total,
      priceBreakdown: {
        nights,
        pricePerNight: room.pricePerNight,
        subtotal,
        taxes,
        serviceFee,
        total,
      },
      guestInfo: guestInfo || {
        fullName: 'Valued Guest',
        email: 'guest@hotel.com',
        phone: '+1 555-0100',
      },
      createdAt: new Date().toISOString(),
    };

    // 1. Add to in-memory mock store (ensures instant local demo resilience)
    mockBookings.unshift(newBooking);

    // 2. Persist to real Supabase PostgreSQL if configured
    if (isSupabaseConfigured()) {
      try {
        await supabaseAdmin.from('bookings').insert({
          id: newBooking.id,
          booking_code: newBooking.bookingCode,
          room_id: newBooking.roomId,
          user_id: newBooking.userId,
          check_in: newBooking.checkIn,
          check_out: newBooking.checkOut,
          adults: newBooking.guests.adults,
          children: newBooking.guests.children,
          total_nights: newBooking.priceBreakdown.nights,
          total_price: newBooking.totalPrice,
          subtotal: newBooking.priceBreakdown.subtotal,
          taxes: newBooking.priceBreakdown.taxes,
          service_fee: newBooking.priceBreakdown.serviceFee,
          guest_name: newBooking.guestInfo.fullName,
          guest_email: newBooking.guestInfo.email,
          guest_phone: newBooking.guestInfo.phone,
          special_requests: newBooking.guestInfo.specialRequests || null,
          status: newBooking.status,
          created_at: newBooking.createdAt,
        });
      } catch (dbErr) {
        console.error('[Supabase Persistence] Failed to record booking into PostgreSQL:', dbErr);
      }
    }

    // 3. Dispatch Instant Telegram Bot Notification (0đ)
    try {
      await sendTelegramBookingNotification({
        bookingCode: newBooking.bookingCode,
        roomName: room.name,
        roomType: room.roomType,
        checkIn: newBooking.checkIn,
        checkOut: newBooking.checkOut,
        nights: newBooking.priceBreakdown.nights,
        guests: newBooking.guests,
        guestInfo: newBooking.guestInfo,
        totalPrice: newBooking.totalPrice,
        createdAt: newBooking.createdAt,
      });
    } catch (telegramErr) {
      console.error('[Telegram Notification] Failed to dispatch alert:', telegramErr);
    }

    const dto = toBookingDetailDTO(newBooking, room);

    return NextResponse.json({
      success: true,
      data: dto,
      message: 'Reservation created successfully.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

