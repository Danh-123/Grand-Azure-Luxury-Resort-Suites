import React from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Sparkles, Calendar } from 'lucide-react';

export function CtaSection() {
  return (
    <Section spacing="xl" background="dark" className="overflow-hidden" id="cta">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center space-y-xl">
        <div className="inline-flex items-center gap-xs rounded-full border border-gold-500/30 bg-gold-500/10 px-md py-xs text-caption font-semibold uppercase tracking-widest text-gold-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Your Sanctuary Awaits</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-md">
          <h2 className="text-display font-serif font-bold text-ivory-100 tracking-tight leading-tight">
            Experience Unrivaled Grandeur on the Coast
          </h2>
          <p className="text-body-lg text-ivory-100/80 font-light leading-relaxed max-w-2xl mx-auto">
            Reserve your private villa or penthouse suite today. Uncompromising seclusion, bespoke culinary artistry, and intuitive 24-hour butler service await your arrival.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-md pt-md">
          <Link href="/rooms" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-body font-serif font-bold tracking-wide shadow-glow"
              leftIcon={<Calendar className="h-5 w-5" />}
            >
              Book Your Stay
            </Button>
          </Link>
          <Link href="/rooms" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-charcoal-700 text-ivory-100 hover:border-gold-500 hover:text-gold-400"
            >
              Explore Accommodations
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

