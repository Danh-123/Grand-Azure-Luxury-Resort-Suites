/**
 * 🏛️ ZUSTAND STORE: useBookingStore
 * Scope: Multi-step booking flow draft (Step 1 -> Step 4).
 * Single Source of Truth for in-progress reservations without prop drilling.
 * Strictly client-flow state; server data is not stored here.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { GuestInfo } from '@/types/booking';

export interface BookingState {
  selectedRoom: RoomCardDTO | null;
  checkIn: string | null;
  checkOut: string | null;
  guests: {
    adults: number;
    children: number;
  };
  guestInfo: GuestInfo;
  currentStep: number; // 1: Dates & Guests, 2: Guest Details, 3: Review, 4: Confirmed
}

export interface BookingActions {
  setRoom: (room: RoomCardDTO | null) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (guests: { adults: number; children: number }) => void;
  setGuestInfo: (info: Partial<GuestInfo>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export type BookingStore = BookingState & BookingActions;

const initialGuestInfo: GuestInfo = {
  fullName: '',
  email: '',
  phone: '',
  specialRequests: '',
};

const initialState: BookingState = {
  selectedRoom: null,
  checkIn: null,
  checkOut: null,
  guests: {
    adults: 2,
    children: 0,
  },
  guestInfo: initialGuestInfo,
  currentStep: 1,
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setRoom: (room) => set({ selectedRoom: room }),

      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),

      setGuests: (guests) => set({ guests }),

      setGuestInfo: (info) =>
        set((state) => ({
          guestInfo: { ...state.guestInfo, ...info },
        })),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(4, state.currentStep + 1),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(1, state.currentStep - 1),
        })),

      setStep: (step) => set({ currentStep: step }),

      reset: () => set(initialState),
    }),
    {
      name: 'grand-azure-booking-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

