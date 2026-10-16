import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { BookingWidget } from './BookingWidget';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85"
          alt="Grand Azure Luxury Resort Oceanfront View"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-slower ease-luxury"
        />
        {/* Cinematic Scrim & Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/50 to-charcoal-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal-950/40 to-charcoal-950/80" />
      </div>

      {/* Hero Foreground Content */}
      <Container size="xl" className="relative z-10 py-3xl sm:py-4xl text-center text-ivory-100 flex flex-col items-center">
        {/* Luxury Overline Badge */}
        <div className="mb-md animate-in fade-in slide-in-from-bottom-3 duration-slow">
          <Badge variant="luxury">
            ✦ A Sanctuary of Refined Elegance ✦
          </Badge>
        </div>

        {/* Grand Headline */}
        <h1 className="max-w-4xl text-display font-serif font-bold tracking-tight text-ivory-100 drop-shadow-md sm:leading-[1.1] mb-md animate-in fade-in slide-in-from-bottom-4 duration-slow">
          Where Coastal Serenity Meets Timeless Splendor
        </h1>

        {/* Short Emotional Subtitle */}
        <p className="max-w-2xl text-body-lg text-ivory-100/90 font-light leading-relaxed mb-2xl drop-shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-slow">
          Immerse yourself in private oceanfront villas, Michelin-starred culinary artistry, and bespoke Butler privileges nestled along pristine azure shores.
        </p>

        {/* Embedded Quick Booking Widget */}
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-slow">
          <BookingWidget />
        </div>
      </Container>

      {/* Subtle Bottom Gold Accent Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent z-10" />
    </section>
  );
}

