import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export function Container({
  size = 'lg',
  className,
  children,
  ...props
}: ContainerProps) {
  const maxSizes = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-md sm:px-lg lg:px-xl',
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

