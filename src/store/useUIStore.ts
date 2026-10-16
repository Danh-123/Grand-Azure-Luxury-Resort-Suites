/**
 * 🏛️ ZUSTAND STORE: useUIStore
 * Scope: Ephemeral client UI controls (Mobile drawer, Filter sidebar, Modals).
 * Does not persist across sessions.
 */

import { create } from 'zustand';

export interface UIState {
  isMobileNavOpen: boolean;
  isFilterDrawerOpen: boolean;
  activeModal: string | null;
}

export interface UIActions {
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setFilterDrawerOpen: (open: boolean) => void;
  toggleFilterDrawer: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  isMobileNavOpen: false,
  isFilterDrawerOpen: false,
  activeModal: null,

  setMobileNavOpen: (isMobileNavOpen) => set({ isMobileNavOpen }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

  setFilterDrawerOpen: (isFilterDrawerOpen) => set({ isFilterDrawerOpen }),
  toggleFilterDrawer: () =>
    set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),

  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));

