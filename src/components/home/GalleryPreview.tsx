'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/layout';
import { Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  className: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    title: 'Infinity Ocean Lagoon',
    category: 'Resort Grounds',
    className: 'col-span-1 md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[500px]',
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    title: 'Presidential Suite Interior',
    category: 'Accommodations',
    className: 'col-span-1 min-h-[240px]',
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    title: 'Waterfront Michelin Pavilion',
    category: 'Dining',
    className: 'col-span-1 min-h-[240px]',
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    title: 'The Lotus Spa Pavilion',
    category: 'Wellness',
    className: 'col-span-1 min-h-[240px]',
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    title: 'Private Sunset Boardwalk',
    category: 'Coastline',
    className: 'col-span-1 min-h-[240px]',
  },
];

export function GalleryPreview() {
  return (
    <Section spacing="xl" background="base" id="gallery">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2xl space-y-xs">
          <div className="inline-flex items-center gap-xs text-gold-600 font-semibold tracking-widest text-caption uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Visual Odyssey</span>
          </div>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900 tracking-tight">
            Moments Captured in Paradise
          </h2>
          <p className="text-body text-charcoal-600 font-light">
            An intimate glimpse into the architectural nuances, tranquil waters, and sublime serenity that define Grand Azure.
          </p>
        </div>

        {/* Masonry / Asymmetrical Grid with Framer Motion Hover Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-md sm:gap-lg">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-border shadow-md bg-charcoal-900 ${item.className}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-slow ease-luxury group-hover:scale-108"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent opacity-60 transition-opacity duration-base group-hover:opacity-85" />

              {/* Content Label */}
              <div className="absolute bottom-md left-md right-md sm:bottom-lg sm:left-lg sm:right-lg translate-y-1 transition-transform duration-base group-hover:translate-y-0">
                <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-h4 font-serif font-bold text-ivory-100">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

