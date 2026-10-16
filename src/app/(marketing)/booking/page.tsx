import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { BookingFlow } from '@/components/booking';
import { Sparkles, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reserve Your Sanctuary | Grand Azure Luxury Resort',
  description:
    'Complete your luxury suite reservation in 4 intuitive steps with instant confirmation and personal butler coordination.',
};

function BookingLoadingFallback() {
  return (
    <div className="w-full space-y-xl py-xl animate-pulse">
      <div className="h-12 w-full max-w-xl mx-auto rounded-full bg-charcoal-200/60" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 h-96 rounded-2xl bg-charcoal-200/50" />
        <div className="lg:col-span-4 h-96 rounded-2xl bg-charcoal-200/50" />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden min-h-screen">
      {/* Header Banner */}
      <section className="relative border-b border-border bg-gradient-to-b from-charcoal-900 to-charcoal-950 py-xl sm:py-2xl text-ivory-100">
        <Container size="xl">
          <nav aria-label="Breadcrumb" className="mb-sm flex items-center gap-xs text-caption text-charcoal-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/rooms" className="hover:text-gold-400 transition-colors">
              Accommodations
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400 font-medium">Reservation Flow</span>
          </nav>

          <div className="max-w-2xl space-y-xs">
            <div className="inline-flex items-center gap-xs text-gold-400 text-caption font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bespoke Concierge Booking</span>
            </div>
            <h1 className="text-h2 sm:text-h1 font-serif font-bold text-ivory-100 tracking-tight">
              Reserve Your Sanctuary
            </h1>
            <p className="text-body text-ivory-100/80 font-light">
              Experience transparent pricing, instant confirmation, and intuitive butler onboarding.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Multi-Step Booking Content */}
      <Section spacing="lg" background="base" className="flex-1">
        <Container size="xl">
          <Suspense fallback={<BookingLoadingFallback />}>
            <BookingFlow />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
