/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — Z-INDEX LAYERING TOKENS
 * Strict z-index scale preventing stacking context collisions.
 */

export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  header: 1200,
  banner: 1250,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

export type ZIndexTokens = typeof zIndex;

