import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge } from '@/components/ui/Badge';
import { RoomCardSkeleton } from '@/components/ui/Skeleton';
import { RoomsContent } from '@/components/rooms';
import { Sparkles, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Suites & Private Villas | Grand Azure Luxury Resort',
  description:
    'Discover our exclusive collection of 12 luxury suites, private oceanfront villas, and panoramic penthouses with bespoke butler service at Grand Azure Resort.',
  openGraph: {
    title: 'Suites & Private Villas | Grand Azure Luxury Resort',
    description:
      'Discover our exclusive collection of 12 luxury suites, private oceanfront villas, and panoramic penthouses with bespoke butler service at Grand Azure Resort.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Grand Azure Suites & Villas Collection',
      },
    ],
  },
};

function RoomsLoadingFallback() {
  return (
    <div className="w-full space-y-xl">
      <div className="h-14 w-full rounded-xl bg-charcoal-200/50 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
        {Array.from({ length: 6 }).map((_, idx) => (
          <RoomCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Header Banner */}
      <section className="relative border-b border-border bg-gradient-to-b from-charcoal-900 to-charcoal-950 py-2xl sm:py-3xl text-ivory-100">
        <Container size="xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-md flex items-center gap-xs text-caption text-charcoal-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400 font-medium">Accommodations</span>
          </nav>

          <div className="max-w-3xl space-y-xs">
            <div className="inline-flex items-center gap-xs text-gold-400 text-caption font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Azure Collection</span>
            </div>
            <h1 className="text-display font-serif font-bold text-ivory-100 tracking-tight">
              Suites & Private Villas
            </h1>
            <p className="text-body-lg text-ivory-100/80 font-light leading-relaxed">
              Explore 12 uniquely designed residences featuring floor-to-ceiling ocean horizons, private infinity plunge pools, and intuitive around-the-clock butler service.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Catalog Section */}
      <Section spacing="lg" background="base">
        <Container size="xl">
          <Suspense fallback={<RoomsLoadingFallback />}>
            <RoomsContent />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
