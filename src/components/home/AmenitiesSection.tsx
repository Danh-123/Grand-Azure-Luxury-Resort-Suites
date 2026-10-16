import React from 'react';
import { Container, Section } from '@/components/layout';
import { Sparkles, Waves, Dumbbell, Utensils, Wine, Wifi } from 'lucide-react';

interface AmenityItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const AMENITIES: AmenityItem[] = [
  { icon: Sparkles, label: 'The Lotus Spa' },
  { icon: Waves, label: 'Infinity Lagoon' },
  { icon: Dumbbell, label: 'Wellness Studio' },
  { icon: Utensils, label: 'Michelin Dining' },
  { icon: Wine, label: 'Azure Sky Lounge' },
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
];

export function AmenitiesSection() {
  return (
    <Section spacing="lg" background="subtle" id="amenities">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-xl space-y-xs">
          <p className="text-caption font-semibold uppercase tracking-widest text-gold-600">
            World-Class Facilities
          </p>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900 tracking-tight">
            Resort Amenities
          </h2>
          <p className="text-body-sm text-charcoal-600 font-light">
            Every convenience and indulgence thoughtfully provided for an incomparable stay.
          </p>
        </div>

        {/* Responsive Grid: 2 cols mobile, 3 cols tablet, 6 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md sm:gap-lg">
          {AMENITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-lg rounded-xl border border-border bg-background-elevated text-center transition-all duration-base hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-glow-sm min-h-[120px]"
              >
                <div className="mb-sm flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-ivory-100">
                  <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-body-sm font-serif font-semibold text-charcoal-900 transition-colors group-hover:text-gold-700">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

