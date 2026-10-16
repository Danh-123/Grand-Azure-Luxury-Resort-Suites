/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — TYPOGRAPHY TOKENS
 * Single Source of Truth for typography, scale, font weights, and spacing.
 */

export const typography = {
  // Font Families (Configured with Next/Font)
  fonts: {
    serif: ['var(--font-serif)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
    sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
    mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
  },

  // Font Weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeights: {
    none: '1',
    tight: '1.15',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0em',
    wide: '0.04em',
    wider: '0.08em',
    widest: '0.15em', // Used for luxury all-caps eyebrow headers and badges
  },

  // Type Scale with pre-configured fontSize, lineHeight, letterSpacing, and default weight
  scale: {
    display: {
      fontSize: '3.75rem', // 60px
      lineHeight: '1.1',
      letterSpacing: '-0.025em',
      fontWeight: '600',
    },
    h1: {
      fontSize: '3rem', // 48px
      lineHeight: '1.15',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    },
    h2: {
      fontSize: '2.25rem', // 36px
      lineHeight: '1.2',
      letterSpacing: '-0.015em',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.75rem', // 28px
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.375rem', // 22px
      lineHeight: '1.3',
      letterSpacing: '-0.005em',
      fontWeight: '600',
    },
    h5: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.35',
      letterSpacing: '0',
      fontWeight: '600',
    },
    h6: {
      fontSize: '1rem', // 16px
      lineHeight: '1.4',
      letterSpacing: '0.02em',
      fontWeight: '600',
    },
    'body-lg': {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: '400',
    },
    body: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      letterSpacing: '0',
      fontWeight: '400',
    },
    'body-sm': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.45',
      letterSpacing: '0',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      letterSpacing: '0.03em',
      fontWeight: '500',
    },
  },
} as const;

export type TypographyTokens = typeof typography;

