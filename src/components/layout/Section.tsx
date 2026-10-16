import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'base' | 'elevated' | 'subtle' | 'dark' | 'transparent';
  children: React.ReactNode;
}

export function Section({
  spacing = 'lg',
  background = 'transparent',
  className,
  children,
  ...props
}: SectionProps) {
  const spacings = {
    none: 'py-0',
    sm: 'py-xl sm:py-2xl',
    md: 'py-2xl sm:py-3xl',
    lg: 'py-3xl sm:py-4xl',
    xl: 'py-4xl sm:py-5xl',
  };

  const backgrounds = {
    transparent: 'bg-transparent',
    base: 'bg-background',
    elevated: 'bg-background-elevated',
    subtle: 'bg-background-subtle',
    dark: 'bg-charcoal-900 text-ivory-100',
  };

  return (
    <section
      className={cn('w-full relative', spacings[spacing], backgrounds[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}

