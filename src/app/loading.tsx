import React from 'react';
import { Sparkles } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex items-center justify-center p-md relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center space-y-md relative z-10 max-w-sm">
        {/* Animated Emblem */}
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/20 border-t-gold-400 animate-spin" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        {/* Brand typography */}
        <div className="space-y-1">
          <h2 className="font-serif text-h3 font-bold text-ivory-100 tracking-wide">
            Grand Azure
          </h2>
          <p className="text-[12px] font-medium tracking-widest uppercase text-gold-400">
            Luxury Resort & Private Suites
          </p>
          <p className="text-caption text-charcoal-400 pt-1">
            Preparing your bespoke luxury experience...
          </p>
        </div>
      </div>
    </div>
  );
}
