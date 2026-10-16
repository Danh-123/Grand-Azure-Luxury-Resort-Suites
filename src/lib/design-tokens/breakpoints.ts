/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — BREAKPOINTS TOKENS
 * Responsive screen widths matching Definition of Done:
 * - Mobile: < 640px
 * - Tablet: 640px - 1024px
 * - Desktop: > 1024px
 */

export const breakpoints = {
  mobile: '320px',
  sm: '640px',
  md: '768px',
  tablet: '768px',
  lg: '1024px',
  desktop: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  wide: '1536px',
} as const;

export type BreakpointTokens = typeof breakpoints;

