/**
 * 🏛️ LUXURY HOTEL DESIGN SYSTEM — DESIGN TOKENS ENTRY POINT
 * Central exporter for all design tokens.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadow';
export * from './z-index';
export * from './breakpoints';
export * from './animation';

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadow } from './shadow';
import { zIndex } from './z-index';
import { breakpoints } from './breakpoints';
import { animation } from './animation';

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  zIndex,
  breakpoints,
  animation,
} as const;

export type DesignTokens = typeof designTokens;

