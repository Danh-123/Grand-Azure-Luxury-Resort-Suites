/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — BORDER RADIUS TOKENS
 * Elegant, refined border radius scales for luxury hospitality components.
 */

export const radius = {
  none: '0px',
  sm: '0.25rem',   // 4px (micro badges, tags)
  md: '0.5rem',    // 8px (default cards, buttons, form inputs)
  lg: '0.75rem',   // 12px (elevated modals, feature cards)
  xl: '1rem',      // 16px (hero callouts, drawers)
  '2xl': '1.5rem', // 24px (curved luxury banners)
  full: '9999px',  // rounded pills, avatar circles
} as const;

export type RadiusTokens = typeof radius;

