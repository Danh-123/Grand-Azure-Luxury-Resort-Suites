/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — SPACING TOKENS
 * Strict 4px base grid spacing scale.
 */

export const spacing = {
  none: '0px',
  '3xs': '0.125rem', // 2px
  '2xs': '0.25rem',  // 4px (Base unit)
  xs: '0.5rem',      // 8px
  sm: '0.75rem',     // 12px
  md: '1rem',        // 16px
  lg: '1.5rem',      // 24px
  xl: '2rem',        // 32px
  '2xl': '3rem',     // 48px
  '3xl': '4rem',     // 64px
  '4xl': '6rem',     // 96px
  '5xl': '8rem',     // 128px

  // Touch Target Minimum (Mandatory accessibility rule: >= 44x44px on mobile)
  touchMin: '44px',
} as const;

export type SpacingTokens = typeof spacing;

