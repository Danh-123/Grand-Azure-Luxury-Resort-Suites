/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — COLOR TOKENS
 * Single Source of Truth for all color values.
 * Strictly no arbitrary hex values allowed outside these tokens.
 */

export const colors = {
  // Brand Gold Palette (Luxury Hospitality Accent)
  gold: {
    50: '#FBF8F1',
    100: '#F5EEDB',
    200: '#EBDDB6',
    300: '#DFC68C',
    400: '#D4AF63',
    500: '#C59A3F', // Brand Signature Gold
    600: '#AA7F2F',
    700: '#876125',
    800: '#6E4E22',
    900: '#5A3F1E',
    glow: 'rgba(197, 154, 63, 0.35)',
  },

  // Champagne Tones (Warm luxury neutral accents)
  champagne: {
    light: '#F8F4EC',
    DEFAULT: '#EDE3D2',
    dark: '#DFCDB7',
  },

  // Deep Neutral Charcoal Palette (Dark luxury contrast)
  charcoal: {
    50: '#F4F5F7',
    100: '#E4E7EB',
    200: '#CBD2D9',
    300: '#9FAAB7',
    400: '#738191',
    500: '#525F6E',
    600: '#394450',
    700: '#262E37',
    800: '#1A2026', // Rich deep surface
    900: '#12161A', // Dark container base
    950: '#0A0D10', // Deep obsidian
  },

  // Ivory & Warm White Palette (Light luxury surfaces)
  ivory: {
    50: '#FFFFFD',
    100: '#FCFAF5',
    200: '#F7F4EB',
    300: '#EFEAD9',
    400: '#E4DDC5',
    500: '#D5CBAF',
  },

  // Background Layers
  background: {
    base: '#FAFAF8',
    elevated: '#FFFFFF',
    subtle: '#F4F5F7',
    darkBase: '#12161A',
    darkElevated: '#1A2026',
    darkSubtle: '#262E37',
    overlay: 'rgba(10, 13, 16, 0.75)',
  },

  // Foreground / Text Colors
  text: {
    primary: '#1A2026',
    secondary: '#525F6E',
    muted: '#738191',
    inverse: '#FFFFFF',
    accent: '#C59A3F',
    darkPrimary: '#F4F5F7',
    darkSecondary: '#CBD2D9',
    darkMuted: '#9FAAB7',
  },

  // Border Colors
  border: {
    default: '#E4E7EB',
    subtle: '#F0F2F5',
    strong: '#CBD2D9',
    focus: '#C59A3F',
    darkDefault: '#262E37',
    darkSubtle: '#1A2026',
    darkFocus: '#D4AF63',
  },

  // Semantic Status Colors
  semantic: {
    success: {
      DEFAULT: '#10B981',
      light: '#ECFDF5',
      dark: '#065F46',
      border: '#A7F3D0',
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FFFBEB',
      dark: '#92400E',
      border: '#FDE68A',
    },
    error: {
      DEFAULT: '#EF4444',
      light: '#FEF2F2',
      dark: '#991B1B',
      border: '#FECACA',
    },
    info: {
      DEFAULT: '#3B82F6',
      light: '#EFF6FF',
      dark: '#1E40AF',
      border: '#BFDBFE',
    },
  },
} as const;

export type ColorTokens = typeof colors;

