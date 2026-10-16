import { RoomCardDTO, RoomDetailDTO } from '@/types/dto/room.dto';
import { Review } from '@/types/review';

export interface RoomFilterParams {
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  type?: string;
  sort?: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';
  amenities?: string[];
}

export const roomsService = {
  /**
   * Fetch all room cards matching filter criteria
   */
  async getAll(params?: RoomFilterParams): Promise<RoomCardDTO[]> {
    const query = new URLSearchParams();
    if (params?.minPrice !== undefined) query.set('minPrice', String(params.minPrice));
    if (params?.maxPrice !== undefined) query.set('maxPrice', String(params.maxPrice));
    if (params?.capacity !== undefined) query.set('capacity', String(params.capacity));
    if (params?.type && params.type !== 'all') query.set('type', params.type);
    if (params?.sort) query.set('sort', params.sort);
    if (params?.amenities && params.amenities.length > 0) {
      query.set('amenities', params.amenities.join(','));
    }

    const queryString = query.toString();
    const url = `/api/rooms${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch rooms list');
    const json = await res.json();
    return json.data;
  },

  /**
   * Fetch full details for a room by ID or slug
   */
  async getById(idOrSlug: string): Promise<RoomDetailDTO> {
    const res = await fetch(`/api/rooms/${idOrSlug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch room detail for '${idOrSlug}'`);
    const json = await res.json();
    return json.data;
  },

  /**
   * Fetch guest reviews for a room
   */
  async getReviews(roomId: string): Promise<Review[]> {
    const res = await fetch(`/api/rooms/${roomId}/reviews`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch reviews for room '${roomId}'`);
    const json = await res.json();
    return json.data;
  },
};

