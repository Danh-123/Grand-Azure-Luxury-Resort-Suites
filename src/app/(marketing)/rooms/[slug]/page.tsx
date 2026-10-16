import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockRooms } from '@/mock/rooms.mock';
import { mockReviews } from '@/mock/reviews.mock';
import { toRoomDetailDTO, toRoomCardDTO } from '@/lib/mappers/room.mapper';
import { Container, Section } from '@/components/layout';
import {
  RoomGallery,
  RoomInfo,
  RoomBookingWidget,
  ReviewList,
  RelatedRooms,
} from '@/components/room-detail';
import { ChevronRight } from 'lucide-react';

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // ISR 1 hour

/**
 * 🏛️ SSG / ISR Pre-generation of all room slugs
 */
export async function generateStaticParams() {
  return mockRooms.map((room) => ({
    slug: room.slug,
  }));
}

/**
 * 🏛️ Dynamic SEO Metadata
 */
export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = mockRooms.find((r) => r.slug === slug || r.id === slug);

  if (!room) {
    return {
      title: 'Residence Not Found | Grand Azure Luxury Resort',
    };
  }

  return {
    title: `${room.name} | Grand Azure Luxury Resort & Suites`,
    description: room.description,
    openGraph: {
      title: `${room.name} | Grand Azure Luxury Resort`,
      description: room.description,
      images: [
        {
          url: room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: room.name,
        },
      ],
    },
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const rawRoom = mockRooms.find((r) => r.slug === slug || r.id === slug);

  if (!rawRoom) {
    notFound();
  }

  // Pure mapper: raw entity -> RoomDetailDTO
  const room = toRoomDetailDTO(rawRoom, mockReviews);

  // Find 3 related rooms (same room type or closest price)
  const relatedCandidates = mockRooms
    .filter((r) => r.id !== rawRoom.id)
    .sort((a, b) => {
      // Prioritize same room type
      if (a.roomType === rawRoom.roomType && b.roomType !== rawRoom.roomType) return -1;
      if (b.roomType === rawRoom.roomType && a.roomType !== rawRoom.roomType) return 1;
      // Then closest price
      return (
        Math.abs(a.pricePerNight - rawRoom.pricePerNight) -
        Math.abs(b.pricePerNight - rawRoom.pricePerNight)
      );
    })
    .slice(0, 3)
    .map(toRoomCardDTO);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Breadcrumbs Navigation Bar */}
      <div className="border-b border-border bg-background-elevated/70 py-sm">
        <Container size="xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-xs text-caption text-charcoal-500">
            <Link href="/" className="hover:text-gold-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-charcoal-300" />
            <Link href="/rooms" className="hover:text-gold-700 transition-colors">
              Accommodations
            </Link>
            <ChevronRight className="h-3 w-3 text-charcoal-300" />
            <span className="text-charcoal-900 font-medium truncate max-w-xs sm:max-w-md">
              {room.name}
            </span>
          </nav>
        </Container>
      </div>

      {/* Main Content: Gallery, Info, Sticky Booking Widget */}
      <Section spacing="lg" background="base">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl lg:gap-2xl items-start">
            {/* Left 7/12: Gallery, Details & Reviews */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-2xl">
              <RoomGallery
                images={room.images}
                roomName={room.name}
                roomType={room.roomType}
                featured={room.featured}
              />

              <RoomInfo room={room} />

              <ReviewList
                reviews={room.reviews}
                overallRating={room.rating}
                totalReviewCount={room.reviewCount}
              />
            </div>

            {/* Right 5/12: Sticky Booking Calculator */}
            <div className="lg:col-span-5 xl:col-span-4">
              <RoomBookingWidget room={room} />
            </div>
          </div>

          {/* Related Accommodations Section */}
          <RelatedRooms rooms={relatedCandidates} />
        </Container>
      </Section>
    </div>
  );
}
