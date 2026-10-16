/**
 * 🏛️ ZUSTAND STORE: useFilterStore
 * Scope: Rooms catalog search, filtering, and sorting state.
 * Allows deep-linking to URL query parameters without rewriting components.
 */

import { create } from 'zustand';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface FilterState {
  priceRange: [number, number]; // [min, max]
  capacity: number; // total guests
  roomType: string; // 'all' | 'deluxe' | 'suite' | 'villa' | 'penthouse' | 'presidential'
  amenities: string[]; // array of selected amenity IDs
  sortBy: SortOption;
}

export interface FilterActions {
  setPriceRange: (range: [number, number]) => void;
  setCapacity: (capacity: number) => void;
  setRoomType: (type: string) => void;
  toggleAmenity: (amenityId: string) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

export type FilterStore = FilterState & FilterActions;

const initialFilterState: FilterState = {
  priceRange: [300, 2500],
  capacity: 1,
  roomType: 'all',
  amenities: [],
  sortBy: 'recommended',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilterState,

  setPriceRange: (priceRange) => set({ priceRange }),

  setCapacity: (capacity) => set({ capacity }),

  setRoomType: (roomType) => set({ roomType }),

  toggleAmenity: (amenityId) =>
    set((state) => {
      const exists = state.amenities.includes(amenityId);
      return {
        amenities: exists
          ? state.amenities.filter((id) => id !== amenityId)
          : [...state.amenities, amenityId],
      };
    }),

  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set(initialFilterState),
}));

