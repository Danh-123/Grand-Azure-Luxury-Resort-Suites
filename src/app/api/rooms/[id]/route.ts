import { NextRequest, NextResponse } from 'next/server';
import { mockRooms } from '@/mock/rooms.mock';
import { mockReviews } from '@/mock/reviews.mock';
import { toRoomDetailDTO } from '@/lib/mappers/room.mapper';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(400);

  const { id } = await params;
  const room = mockRooms.find((r) => r.id === id || r.slug === id);

  if (!room) {
    return NextResponse.json(
      { error: `Room with identifier '${id}' was not found.` },
      { status: 404 }
    );
  }

  const dto = toRoomDetailDTO(room, mockReviews);
  return NextResponse.json({ data: dto });
}

