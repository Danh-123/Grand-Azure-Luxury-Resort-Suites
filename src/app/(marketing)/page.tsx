import React from 'react';
import type { Metadata } from 'next';
import {
  HeroSection,
  FeaturedRoomsSection,
  AmenitiesSection,
  ExperienceSection,
  TestimonialsSection,
  GalleryPreview,
  CtaSection,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Grand Azure Luxury Resort & Suites | Coastal Sanctuary',
  description:
    'Experience unrivaled luxury on pristine shorelines. Discover oceanfront suites, private villas, Michelin gastronomy, and bespoke 24/7 butler service at Grand Azure Resort.',
  openGraph: {
    title: 'Grand Azure Luxury Resort & Suites | Coastal Sanctuary',
    description:
      'Experience unrivaled luxury on pristine shorelines. Discover oceanfront suites, private villas, Michelin gastronomy, and bespoke 24/7 butler service at Grand Azure Resort.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Grand Azure Luxury Resort & Suites',
      },
    ],
  },
};

/**
 * 🏛️ React Server Component: Home Page ("/")
 * Composes sections strictly per Step 13 architectural specifications:
 * 1. HeroSection with BookingWidget
 * 2. FeaturedRoomsSection with 5 UI states (Skeleton, Error with retry, Success grid)
 * 3. AmenitiesSection (Spa, Pool, Gym, Restaurant, Lounge, Free WiFi)
 * 4. ExperienceSection (Split layout luxury storytelling)
 * 5. TestimonialsSection (Max 6 guest reviews with Rating)
 * 6. GalleryPreview (Masonry layout with Framer Motion hover zoom)
 * 7. CtaSection (Book Your Stay primary link to /rooms)
 */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Accommodations */}
      <FeaturedRoomsSection />

      {/* 3. Resort Amenities */}
      <AmenitiesSection />

      {/* 4. The Grand Azure Experience */}
      <ExperienceSection />

      {/* 5. Guest Testimonials */}
      <TestimonialsSection />

      {/* 6. Gallery Preview */}
      <GalleryPreview />

      {/* 7. Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
