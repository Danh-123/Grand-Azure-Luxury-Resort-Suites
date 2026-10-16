import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Compass, Anchor, Sparkles } from 'lucide-react';

export function ExperienceSection() {
  return (
    <Section spacing="xl" background="base" id="experience">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-3xl items-center">
          {/* Visual Column */}
          <div className="relative">
            <div className="relative h-[440px] sm:h-[540px] w-full overflow-hidden rounded-2xl shadow-xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                alt="Grand Azure Private Infinity Terrace and Oceanview"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-slow ease-luxury hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating Luxury Accreditation Card */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 max-w-xs rounded-xl border border-gold-500/40 bg-charcoal-900/95 p-md sm:p-lg text-ivory-100 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-sm mb-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-body-sm font-serif font-bold text-ivory-100">
                    Forbes 5-Star Luxury
                  </p>
                  <p className="text-[11px] text-charcoal-400">
                    Voted World&apos;s Best Coastal Hideaway 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Storytelling Copy */}
          <div className="space-y-lg">
            <div className="space-y-xs">
              <div className="flex items-center gap-xs text-gold-600 font-semibold tracking-widest text-caption uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Grand Azure Philosophy</span>
              </div>
              <h2 className="text-h2 font-serif font-bold text-charcoal-900 leading-tight">
                Architectural Grandeur in Harmony with Coastal Solitude
              </h2>
            </div>

            <p className="text-body text-charcoal-600 font-light leading-relaxed">
              Perched on a secluded private peninsula, Grand Azure was conceived as a sanctuary where world-class hospitality blends seamlessly with natural serenity. Here, time slows to the rhythm of gentle ocean tides and curated personal experiences.
            </p>

            <p className="text-body text-charcoal-600 font-light leading-relaxed">
              From dawn yoga rituals overlooking private limestone lagoons to bespoke yacht charters into golden sunsets, every detail is orchestrated by dedicated personal valets and master craftsmen.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-sm">
              <div className="flex items-start gap-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-body-sm font-semibold text-charcoal-900">
                    Curated Expeditions
                  </h4>
                  <p className="text-caption text-charcoal-500">
                    Private catamaran charters and coral reef diving.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <Anchor className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-body-sm font-semibold text-charcoal-900">
                    Intuitive Valet Butler
                  </h4>
                  <p className="text-caption text-charcoal-500">
                    Discreet 24-hour service tailored to your cadence.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-md">
              <Link href="/rooms">
                <Button variant="primary">
                  Explore The Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

