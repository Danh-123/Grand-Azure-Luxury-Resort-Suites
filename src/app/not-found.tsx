import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, BedDouble, PhoneCall, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex items-center justify-center p-md relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-lg relative z-10">
        {/* Brand Emblem */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 shadow-glow">
          <Compass className="h-10 w-10 animate-spin-slow" aria-hidden="true" />
        </div>

        {/* Text Content */}
        <div className="space-y-xs">
          <div className="inline-flex items-center gap-1.5 px-sm py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Destination Not Found (404)</span>
          </div>

          <h1 className="text-h2 sm:text-h1 font-serif font-bold text-ivory-100 pt-xs">
            Sanctuary Not Located
          </h1>

          <p className="text-body-sm text-charcoal-300 max-w-md mx-auto leading-relaxed pt-xs">
            The private wing, suite, or reservation path you requested does not exist or has been secluded for private reservations.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-sm pt-sm">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-serif font-bold shadow-glow"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Return to Resort Home
            </Button>
          </Link>

          <Link href="/rooms" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-charcoal-700 text-charcoal-200 hover:text-ivory-100 hover:border-gold-500"
              leftIcon={<BedDouble className="h-4 w-4 text-gold-400" />}
            >
              Browse Suites & Villas
            </Button>
          </Link>
        </div>

        {/* Concierge Support Line */}
        <div className="pt-lg border-t border-charcoal-800/80 text-caption text-charcoal-400 flex items-center justify-center gap-2">
          <PhoneCall className="h-3.5 w-3.5 text-gold-500" />
          <span>Require assistance? Contact our Concierge at +84 (0) 236 888 9999</span>
        </div>
      </div>
    </div>
  );
}
