/**
 * 🏛️ DOMAIN MODEL: ROOM & AMENITY
 * Mirrors database entities directly.
 */

export type RoomType = 'deluxe' | 'suite' | 'villa' | 'penthouse' | 'presidential';

export type BedType = 'King' | 'Super King' | '2 Twin' | '2 Queen';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface RoomCapacity {
  adults: number;
  children: number;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  capacity: RoomCapacity;
  bedType: BedType;
  sizeSqm: number;
  amenities: Amenity[];
  roomType: RoomType;
  isAvailable: boolean;
  featured?: boolean;
}

