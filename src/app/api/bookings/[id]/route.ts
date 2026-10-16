import { NextRequest, NextResponse } from 'next/server';
import { mockBookings } from '@/mock/bookings.mock';
import { mockRooms } from '@/mock/rooms.mock';
import { toBookingDetailDTO } from '@/lib/mappers/booking.mapper';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(400);

  const { id } = await params;
  const booking = mockBookings.find((b) => b.id === id || b.bookingCode === id);

  if (!booking) {
    return NextResponse.json(
      { error: `Booking with identifier '${id}' not found.` },
      { status: 404 }
    );
  }

  const room = mockRooms.find((r) => r.id === booking.roomId);
  const dto = toBookingDetailDTO(booking, room);

  return NextResponse.json({ data: dto });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(500);

  const { id } = await params;
  const bookingIndex = mockBookings.findIndex((b) => b.id === id || b.bookingCode === id);

  if (bookingIndex === -1) {
    return NextResponse.json(
      { error: `Booking with identifier '${id}' not found.` },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...mockBookings[bookingIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    mockBookings[bookingIndex] = updated;

    const room = mockRooms.find((r) => r.id === updated.roomId);
    const dto = toBookingDetailDTO(updated, room);

    return NextResponse.json({
      success: true,
      data: dto,
      message: 'Booking updated successfully.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

