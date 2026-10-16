import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Compass, ArrowUpRight } from 'lucide-react';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950 text-ivory-100">
      {/* Main Footer Links */}
      <div className="py-2xl border-b border-charcoal-800/80">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-xl">
            {/* Col 1 & 2: Brand Identity */}
            <div className="lg:col-span-2 space-y-md">
              <Link href="/" className="inline-flex items-center gap-sm group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 transition-transform group-hover:scale-105">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-serif text-h3 font-bold text-ivory-100 block tracking-wide">
                    Grand Azure
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                    Luxury Resort & Private Suites
                  </span>
                </div>
              </Link>

              <p className="text-body-sm text-charcoal-300 max-w-sm leading-relaxed">
                An enclave of peerless luxury where coastal serenity meets bespoke hospitality. Featuring private infinity villas, Michelin-starred culinary journeys, and world-class oceanfront wellness.
              </p>

              <div className="space-y-xs text-caption text-charcoal-300 pt-xs">
                <div className="flex items-center gap-sm">
                  <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>01 Oceanfront Boulevard, Danang Riviera, Vietnam</span>
                </div>
                <div className="flex items-center gap-sm">
                  <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>+84 (0) 236 888 9999 • Concierge Line</span>
                </div>
                <div className="flex items-center gap-sm">
                  <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>concierge@grandazure.com</span>
                </div>
              </div>
            </div>

            {/* Col 3: Accommodations */}
            <div className="space-y-md">
              <h4 className="font-serif text-body-lg font-bold text-gold-400 uppercase tracking-wider text-[13px]">
                Accommodations
              </h4>
              <ul className="space-y-sm text-body-sm text-charcoal-300">
                <li>
                  <Link
                    href="/rooms/presidential-oceanfront-villa"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Presidential Oceanfront Villa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms/imperial-penthouse-suite"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Imperial Penthouse Suite
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms/azure-beachfront-villa"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Azure Beachfront Villa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms"
                    className="hover:text-gold-400 transition-colors inline-flex items-center gap-1 text-gold-500 font-semibold"
                  >
                    <span>View All 12 Suites</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Guest Services */}
            <div className="space-y-md">
              <h4 className="font-serif text-body-lg font-bold text-gold-400 uppercase tracking-wider text-[13px]">
                Guest Privileges
              </h4>
              <ul className="space-y-sm text-body-sm text-charcoal-300">
                <li>
                  <Link href="/booking" className="hover:text-gold-400 transition-colors">
                    Reserve a Suite
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-gold-400 transition-colors">
                    Azure Membership Profile
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-gold-400 transition-colors">
                    Track Reservations
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-gold-400 transition-colors">
                    Member Access & Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/design-system"
                    className="hover:text-gold-400 transition-colors text-charcoal-400"
                  >
                    Design System Catalog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: VIP Experience & Recognition */}
            <div className="space-y-md">
              <h4 className="font-serif text-body-lg font-bold text-gold-400 uppercase tracking-wider text-[13px]">
                Accreditations
              </h4>
              <div className="space-y-sm text-caption text-charcoal-300">
                <div className="rounded-lg bg-charcoal-900 border border-charcoal-800 p-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-gold-400 font-serif font-bold text-body-sm">
                    <Compass className="h-4 w-4" />
                    <span>Forbes 5-Star Luxury</span>
                  </div>
                  <p className="text-[11px] text-charcoal-400">
                    Awarded Outstanding Coastal Resort & Private Sanctuary 2026.
                  </p>
                </div>

                <div className="rounded-lg bg-charcoal-900 border border-charcoal-800 p-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-gold-400 font-serif font-bold text-body-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Michelin Key Certified</span>
                  </div>
                  <p className="text-[11px] text-charcoal-400">
                    Recognized for exceptional architectural & culinary prestige.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sub-footer Copyright */}
      <div className="py-lg bg-charcoal-950">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-md text-caption text-charcoal-400">
            <p>
              © 2026 Grand Azure Luxury Resort & Suites. All rights reserved.
            </p>
            <div className="flex items-center gap-lg">
              <Link href="/design-system" className="hover:text-gold-400 transition-colors">
                System Tokens
              </Link>
              <Link href="/" className="hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-gold-400 transition-colors">
                Terms of Hospitality
              </Link>
              <Link href="/admin" className="hover:text-gold-400 transition-colors text-charcoal-500">
                Staff Console
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

