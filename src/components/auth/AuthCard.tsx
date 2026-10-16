import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  badge = 'Member Privileges',
  footer,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Luxury Neoclassical Card */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-background-elevated/95 p-lg sm:p-xl shadow-2xl backdrop-blur-xl">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative text-center space-y-xs mb-lg sm:mb-xl">
          <div className="flex justify-center mb-xs">
            <Badge variant="luxury" className="text-[10px] py-0 px-sm">
              <Sparkles className="h-3 w-3 mr-1 inline text-gold-600" />
              {badge}
            </Badge>
          </div>

          <h1 className="text-h2 font-serif font-bold text-charcoal-900 tracking-tight">
            {title}
          </h1>

          <p className="text-body-sm text-charcoal-500 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Form Body */}
        <div className="relative">{children}</div>

        {/* Card Footer */}
        {footer && (
          <div className="mt-xl pt-md border-t border-border/80 text-center text-body-sm text-charcoal-600">
            {footer}
          </div>
        )}
      </div>

      {/* Return to Resort Homepage */}
      <p className="mt-md text-center text-caption text-charcoal-500">
        <Link href="/" className="hover:text-gold-700 transition-colors">
          &larr; Return to Grand Azure Resort
        </Link>
      </p>
    </div>
  );
}

