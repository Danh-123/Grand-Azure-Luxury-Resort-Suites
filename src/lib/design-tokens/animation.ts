/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — ANIMATION & TRANSITION TOKENS
 * Fluid easing curves and duration tokens calibrated for premium feel.
 */

export const animation = {
  // Durations
  durations: {
    instant: '75ms',
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    slower: '600ms',
  },

  // Easing Curves
  easings: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    // Luxury signature ease: ultra smooth arrival
    luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type AnimationTokens = typeof animation;

