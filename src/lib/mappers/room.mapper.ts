import { Room } from '@/types/room';
import { Review } from '@/types/review';
import { RoomCardDTO, RoomDetailDTO } from '@/types/dto/room.dto';

/**
 * 🏛️ Pure Mapper: Converts Room entity to lightweight RoomCardDTO
 */
export function toRoomCardDTO(room: Room): RoomCardDTO {
  return {
    id: room.id,
    name: room.name,
    slug: room.slug,
    thumbnailUrl: room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    pricePerNight: room.pricePerNight,
    currency: room.currency,
    rating: room.rating,
    reviewCount: room.reviewCount,
    capacity: room.capacity,
    roomType: room.roomType,
    bedType: room.bedType,
    sizeSqm: room.sizeSqm,
    isAvailable: room.isAvailable,
    featured: room.featured,
  };
}

/**
 * 🏛️ Pure Mapper: Converts Room entity to rich RoomDetailDTO
 */
export function toRoomDetailDTO(room: Room, reviews: Review[] = []): RoomDetailDTO {
  const cardDTO = toRoomCardDTO(room);
  return {
    ...cardDTO,
    images: room.images,
    description: room.description,
    amenities: room.amenities,
    reviews: reviews.filter((r) => r.roomId === room.id),
  };
}

