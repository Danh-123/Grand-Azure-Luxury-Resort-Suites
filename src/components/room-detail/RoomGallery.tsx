'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
  roomType: string;
  featured?: boolean;
}

export function RoomGallery({
  images,
  roomName,
  roomType,
  featured = false,
}: RoomGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages =
    images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        ];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-sm sm:space-y-md">
      {/* Main Image Aspect Container */}
      <div className="group relative h-[360px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-2xl border border-border bg-charcoal-900 shadow-xl">
        <Image
          src={displayImages[selectedIndex]}
          alt={`${roomName} - View ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-all duration-base ease-luxury"
        />

        {/* Cinematic Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-md left-md right-md flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-xs">
            <Badge variant="luxury">
              {roomType.toUpperCase()}
            </Badge>
            {featured && (
              <Badge variant="luxury" className="bg-gold-500/20 text-gold-300 border-gold-400/40">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                Featured Residence
              </Badge>
            )}
          </div>

          <div className="rounded-full bg-charcoal-900/80 px-md py-xs text-caption font-medium text-ivory-100 backdrop-blur-md">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        </div>

        {/* Previous / Next Controls */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-md top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-900/75 text-ivory-100 shadow-lg backdrop-blur-md transition-all duration-fast hover:bg-gold-500 hover:text-charcoal-900 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 min-h-touchMin min-w-touchMin"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-md top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-900/75 text-ivory-100 shadow-lg backdrop-blur-md transition-all duration-fast hover:bg-gold-500 hover:text-charcoal-900 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 min-h-touchMin min-w-touchMin"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-xs sm:gap-sm">
          {displayImages.map((src, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View photo ${idx + 1} of ${roomName}`}
                className={`relative h-20 sm:h-24 overflow-hidden rounded-xl border transition-all duration-fast min-h-touchMin ${
                  isActive
                    ? 'border-gold-500 ring-2 ring-gold-500/50 shadow-md scale-[1.02]'
                    : 'border-border/80 opacity-70 hover:opacity-100 hover:border-gold-400'
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 25vw, 16vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

