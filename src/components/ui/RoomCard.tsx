import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, Users, Maximize2, Bed } from 'lucide-react';

export interface RoomCardProps {
  room: RoomCardDTO;
  className?: string;
  priority?: boolean;
}

export function RoomCard({ room, className, priority = false }: RoomCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: room.currency || 'USD',
    minimumFractionDigits: 0,
  }).format(room.pricePerNight);

  const roomTypeLabels: Record<string, string> = {
    presidential: 'Presidential',
    penthouse: 'Penthouse',
    villa: 'Private Villa',
    suite: 'Suite',
    deluxe: 'Deluxe',
  };

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-border bg-background-elevated shadow-sm transition-all duration-base hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-glow',
        className
      )}
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative h-64 w-full overflow-hidden bg-charcoal-800">
        <Image
          src={room.thumbnailUrl}
          alt={room.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-slow ease-luxury group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-md left-md right-md flex items-center justify-between">
          <Badge variant="luxury">
            {roomTypeLabels[room.roomType] || room.roomType}
          </Badge>
          <div className="flex items-center gap-xs rounded-full bg-charcoal-900/80 px-sm py-[3px] backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            <span className="text-caption font-semibold text-ivory-100">
              {room.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-charcoal-400">
              ({room.reviewCount})
            </span>
          </div>
        </div>

        {/* Bottom Specs on Image */}
        <div className="absolute bottom-md left-md right-md flex items-center gap-md text-caption text-ivory-100/90 font-medium">
          <span className="flex items-center gap-xs">
            <Users className="h-3.5 w-3.5 text-gold-400" />
            {room.capacity.adults} Adults
          </span>
          <span className="flex items-center gap-xs">
            <Bed className="h-3.5 w-3.5 text-gold-400" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-xs">
            <Maximize2 className="h-3.5 w-3.5 text-gold-400" />
            {room.sizeSqm} m²
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-lg space-y-md">
        <div>
          <Link href={`/rooms/${room.slug}`}>
            <h3 className="text-h4 font-serif font-semibold text-charcoal-900 transition-colors group-hover:text-gold-700 line-clamp-1">
              {room.name}
            </h3>
          </Link>
          <p className="mt-xs text-body-sm text-charcoal-500 line-clamp-2">
            Complimentary airport limousine, private ocean balcony, and bespoke concierge privileges included.
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between pt-md border-t border-border/60">
          <div>
            <span className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider block">
              From
            </span>
            <div className="flex items-baseline gap-xs">
              <span className="text-h3 font-serif font-bold text-gold-700">
                {formattedPrice}
              </span>
              <span className="text-caption text-charcoal-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-xs">
            <Link href={`/rooms/${room.slug}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <Link href={`/booking?room=${room.slug}`}>
              <Button variant="primary" size="sm">
                Reserve
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

