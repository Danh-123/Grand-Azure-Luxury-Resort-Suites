import type { Config } from 'tailwindcss';
import {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  zIndex,
  breakpoints,
  animation,
} from './src/lib/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    screens: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      tablet: breakpoints.tablet,
      lg: breakpoints.lg,
      desktop: breakpoints.desktop,
      xl: breakpoints.xl,
      '2xl': breakpoints['2xl'],
      wide: breakpoints.wide,
    },
    extend: {
      colors: {
        gold: colors.gold,
        champagne: colors.champagne,
        charcoal: colors.charcoal,
        ivory: colors.ivory,
        background: {
          DEFAULT: colors.background.base,
          elevated: colors.background.elevated,
          subtle: colors.background.subtle,
          dark: colors.background.darkBase,
          'dark-elevated': colors.background.darkElevated,
          'dark-subtle': colors.background.darkSubtle,
          overlay: colors.background.overlay,
        },
        foreground: {
          DEFAULT: colors.text.primary,
          secondary: colors.text.secondary,
          muted: colors.text.muted,
          inverse: colors.text.inverse,
          accent: colors.text.accent,
          'dark-primary': colors.text.darkPrimary,
          'dark-secondary': colors.text.darkSecondary,
          'dark-muted': colors.text.darkMuted,
        },
        border: {
          DEFAULT: colors.border.default,
          subtle: colors.border.subtle,
          strong: colors.border.strong,
          focus: colors.border.focus,
          'dark-default': colors.border.darkDefault,
          'dark-subtle': colors.border.darkSubtle,
        },
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,
      },
      fontFamily: {
        serif: [...typography.fonts.serif],
        sans: [...typography.fonts.sans],
        mono: [...typography.fonts.mono],
      },
      fontSize: {
        display: [
          typography.scale.display.fontSize,
          {
            lineHeight: typography.scale.display.lineHeight,
            letterSpacing: typography.scale.display.letterSpacing,
            fontWeight: typography.scale.display.fontWeight,
          },
        ],
        h1: [
          typography.scale.h1.fontSize,
          {
            lineHeight: typography.scale.h1.lineHeight,
            letterSpacing: typography.scale.h1.letterSpacing,
            fontWeight: typography.scale.h1.fontWeight,
          },
        ],
        h2: [
          typography.scale.h2.fontSize,
          {
            lineHeight: typography.scale.h2.lineHeight,
            letterSpacing: typography.scale.h2.letterSpacing,
            fontWeight: typography.scale.h2.fontWeight,
          },
        ],
        h3: [
          typography.scale.h3.fontSize,
          {
            lineHeight: typography.scale.h3.lineHeight,
            letterSpacing: typography.scale.h3.letterSpacing,
            fontWeight: typography.scale.h3.fontWeight,
          },
        ],
        h4: [
          typography.scale.h4.fontSize,
          {
            lineHeight: typography.scale.h4.lineHeight,
            letterSpacing: typography.scale.h4.letterSpacing,
            fontWeight: typography.scale.h4.fontWeight,
          },
        ],
        h5: [
          typography.scale.h5.fontSize,
          {
            lineHeight: typography.scale.h5.lineHeight,
            letterSpacing: typography.scale.h5.letterSpacing,
            fontWeight: typography.scale.h5.fontWeight,
          },
        ],
        h6: [
          typography.scale.h6.fontSize,
          {
            lineHeight: typography.scale.h6.lineHeight,
            letterSpacing: typography.scale.h6.letterSpacing,
            fontWeight: typography.scale.h6.fontWeight,
          },
        ],
        'body-lg': [
          typography.scale['body-lg'].fontSize,
          {
            lineHeight: typography.scale['body-lg'].lineHeight,
            letterSpacing: typography.scale['body-lg'].letterSpacing,
          },
        ],
        body: [
          typography.scale.body.fontSize,
          {
            lineHeight: typography.scale.body.lineHeight,
            letterSpacing: typography.scale.body.letterSpacing,
          },
        ],
        'body-sm': [
          typography.scale['body-sm'].fontSize,
          {
            lineHeight: typography.scale['body-sm'].lineHeight,
            letterSpacing: typography.scale['body-sm'].letterSpacing,
          },
        ],
        caption: [
          typography.scale.caption.fontSize,
          {
            lineHeight: typography.scale.caption.lineHeight,
            letterSpacing: typography.scale.caption.letterSpacing,
            fontWeight: typography.scale.caption.fontWeight,
          },
        ],
      },
      fontWeight: typography.weights,
      lineHeight: typography.lineHeights,
      letterSpacing: typography.letterSpacing,
      spacing: {
        '3xs': spacing['3xs'],
        '2xs': spacing['2xs'],
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        '2xl': spacing['2xl'],
        '3xl': spacing['3xl'],
        '4xl': spacing['4xl'],
        '5xl': spacing['5xl'],
        touchMin: spacing.touchMin,
      },
      minHeight: {
        touchMin: spacing.touchMin,
      },
      minWidth: {
        touchMin: spacing.touchMin,
      },
      borderRadius: {
        none: radius.none,
        sm: radius.sm,
        DEFAULT: radius.md,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        '2xl': radius['2xl'],
        full: radius.full,
      },
      boxShadow: {
        sm: shadow.sm,
        DEFAULT: shadow.md,
        md: shadow.md,
        lg: shadow.lg,
        xl: shadow.xl,
        '2xl': shadow['2xl'],
        glow: shadow.glow,
        'glow-sm': shadow['glow-sm'],
        inner: shadow.inner,
      },
      zIndex: {
        docked: String(zIndex.docked),
        dropdown: String(zIndex.dropdown),
        sticky: String(zIndex.sticky),
        header: String(zIndex.header),
        banner: String(zIndex.banner),
        overlay: String(zIndex.overlay),
        modal: String(zIndex.modal),
        popover: String(zIndex.popover),
        toast: String(zIndex.toast),
        tooltip: String(zIndex.tooltip),
      },
      transitionDuration: {
        instant: animation.durations.instant,
        fast: animation.durations.fast,
        base: animation.durations.base,
        slow: animation.durations.slow,
        slower: animation.durations.slower,
      },
      transitionTimingFunction: {
        standard: animation.easings.standard,
        decelerate: animation.easings.decelerate,
        accelerate: animation.easings.accelerate,
        luxury: animation.easings.luxury,
      },
    },
  },
  plugins: [],
};

export default config;

