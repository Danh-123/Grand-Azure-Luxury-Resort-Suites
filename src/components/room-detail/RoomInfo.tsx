import React from 'react';
import { RoomDetailDTO } from '@/types/dto/room.dto';
import { Rating } from '@/components/ui/Rating';
import {
  Users,
  Bed,
  Maximize2,
  Waves,
  UserCheck,
  Sun,
  Wifi,
  Sparkles,
  Coffee,
  Bath,
  Umbrella,
  CloudRain,
  Trees,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface RoomInfoProps {
  room: RoomDetailDTO;
}

const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  UserCheck,
  Sun,
  Wifi,
  Sparkles,
  Coffee,
  Bath,
  Maximize2,
  Umbrella,
  CloudRain,
  Trees,
};

export function RoomInfo({ room }: RoomInfoProps) {
  return (
    <div className="space-y-2xl">
      {/* Title & Key Rating */}
      <div className="space-y-sm">
        <div className="flex flex-wrap items-center gap-md">
          <Rating
            value={room.rating}
            showNumber
            reviewsCount={room.reviewCount}
            size="md"
          />
          <span className="text-caption text-charcoal-400">•</span>
          <span className="text-caption font-semibold text-gold-700 uppercase tracking-wider">
            {room.roomType.toUpperCase()} COLLECTION
          </span>
        </div>

        <h1 className="text-display font-serif font-bold text-charcoal-900 tracking-tight leading-tight">
          {room.name}
        </h1>
      </div>

      {/* Quick Specs Highlight Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md rounded-2xl border border-border bg-background-elevated p-md sm:p-lg shadow-sm">
        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
              Capacity
            </p>
            <p className="text-body-sm font-semibold text-charcoal-900">
              {room.capacity.adults} Adults
              {room.capacity.children > 0 ? `, ${room.capacity.children} Ch.` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Bed className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
              Bedding
            </p>
            <p className="text-body-sm font-semibold text-charcoal-900">
              {room.bedType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Maximize2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
              Space
            </p>
            <p className="text-body-sm font-semibold text-charcoal-900">
              {room.sizeSqm} m² / {Math.round(room.sizeSqm * 10.764)} sq ft
            </p>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
              Orientation
            </p>
            <p className="text-body-sm font-semibold text-charcoal-900">
              Ocean Horizon
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-sm">
        <h3 className="text-h3 font-serif font-bold text-charcoal-900">
          About The Sanctuary
        </h3>
        <p className="text-body text-charcoal-600 font-light leading-relaxed">
          {room.description}
        </p>
        <p className="text-body text-charcoal-600 font-light leading-relaxed">
          Immerse yourself in unrivaled luxury designed with hand-selected natural materials, artisanal custom millwork, and seamless indoor-outdoor living spaces that invite the gentle sounds of the azure ocean into your private retreat.
        </p>
      </div>

      {/* Amenities Grid */}
      <div className="space-y-md pt-lg border-t border-border">
        <h3 className="text-h3 font-serif font-bold text-charcoal-900">
          Suite Amenities & Privileges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {room.amenities.map((amenity) => {
            const IconComponent = AMENITY_ICONS[amenity.icon] || CheckCircle2;
            return (
              <div
                key={amenity.id}
                className="flex items-center gap-md rounded-xl border border-border/80 bg-background-elevated p-md transition-all duration-base hover:border-gold-500/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-body-sm font-medium text-charcoal-900">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

