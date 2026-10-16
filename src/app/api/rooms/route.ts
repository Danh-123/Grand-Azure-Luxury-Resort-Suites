import { NextRequest, NextResponse } from 'next/server';
import { mockRooms } from '@/mock/rooms.mock';
import { toRoomCardDTO } from '@/lib/mappers/room.mapper';

// Simulated network latency
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await sleep(400);

  const searchParams = request.nextUrl.searchParams;
  const isErrorSimulated = searchParams.get('error') === 'true';
  if (isErrorSimulated) {
    return NextResponse.json(
      { error: 'Simulated catalog retrieval failure. Please retry.' },
      { status: 500 }
    );
  }

  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const capacity = searchParams.get('capacity') ? Number(searchParams.get('capacity')) : undefined;
  const roomType = searchParams.get('type');
  const sort = searchParams.get('sort') || 'recommended';

  let filtered = [...mockRooms];

  if (minPrice !== undefined && !isNaN(minPrice)) {
    filtered = filtered.filter((r) => r.pricePerNight >= minPrice);
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    filtered = filtered.filter((r) => r.pricePerNight <= maxPrice);
  }
  if (capacity !== undefined && !isNaN(capacity)) {
    filtered = filtered.filter((r) => r.capacity.adults + r.capacity.children >= capacity);
  }
  if (roomType && roomType !== 'all') {
    filtered = filtered.filter((r) => r.roomType === roomType);
  }

  const amenitiesParam = searchParams.get('amenities');
  if (amenitiesParam) {
    const requiredAmenities = amenitiesParam.split(',').filter(Boolean);
    if (requiredAmenities.length > 0) {
      filtered = filtered.filter((r) =>
        requiredAmenities.every((amenityId) =>
          r.amenities.some((a) => a.id === amenityId || a.name.toLowerCase().includes(amenityId.toLowerCase()))
        )
      );
    }
  }

  // Sorting
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sort === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const dtos = filtered.map(toRoomCardDTO);

  return NextResponse.json({
    data: dtos,
    total: dtos.length,
    timestamp: new Date().toISOString(),
  });
}

