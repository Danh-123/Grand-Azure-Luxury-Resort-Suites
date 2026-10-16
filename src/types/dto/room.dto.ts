import { Amenity, BedType, RoomCapacity, RoomType } from '../room';
import { Review } from '../review';

/**
 * 🏛️ UI DTO: RoomCardDTO
 * Lightweight, optimized for catalog lists, search grids and sliders.
 */
export interface RoomCardDTO {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  capacity: RoomCapacity;
  roomType: RoomType;
  bedType: BedType;
  sizeSqm: number;
  isAvailable: boolean;
  featured?: boolean;
}

/**
 * 🏛️ UI DTO: RoomDetailDTO
 * Full suite presentation data for room detail page.
 */
export interface RoomDetailDTO extends RoomCardDTO {
  images: string[];
  description: string;
  amenities: Amenity[];
  reviews: Review[];
}

