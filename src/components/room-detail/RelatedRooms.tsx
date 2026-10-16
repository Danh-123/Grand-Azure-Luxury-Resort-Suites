import React from 'react';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { RoomCard } from '@/components/ui/RoomCard';
import { Sparkles } from 'lucide-react';

interface RelatedRoomsProps {
  rooms: RoomCardDTO[];
}

export function RelatedRooms({ rooms }: RelatedRoomsProps) {
  if (rooms.length === 0) return null;

  return (
    <div className="space-y-xl pt-3xl border-t border-border">
      {/* Header */}
      <div className="space-y-xs">
        <div className="inline-flex items-center gap-xs text-gold-600 text-caption font-semibold uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curated Recommendations</span>
        </div>
        <h3 className="text-h2 font-serif font-bold text-charcoal-900">
          Similar Accommodations
        </h3>
        <p className="text-body text-charcoal-600 font-light">
          Other exquisite sanctuaries offering comparable coastal panoramas and personalized butler privileges.
        </p>
      </div>

      {/* Grid of Related RoomCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
        {rooms.slice(0, 3).map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

