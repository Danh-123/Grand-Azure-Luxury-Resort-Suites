'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Edit3,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export function ProfileView() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <div className="space-y-xl">
      {/* Profile Header Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-background-elevated p-lg sm:p-xl shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-36 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-lg">
          <div className="flex items-center gap-lg">
            <Avatar
              src={user.avatarUrl}
              name={user.name}
              size="xl"
              className="ring-4 ring-gold-500/20 shadow-md"
            />

            <div className="space-y-xs">
              <div className="flex items-center gap-xs">
                <h2 className="text-h2 font-serif font-bold text-charcoal-900">
                  {user.name}
                </h2>
                <Badge variant="luxury" className="text-[10px] py-0 px-xs">
                  <Sparkles className="h-3 w-3 mr-1 inline" />
                  VIP Diamond
                </Badge>
              </div>

              <p className="text-body-sm text-charcoal-500 flex items-center gap-xs">
                <Mail className="h-3.5 w-3.5 text-gold-600" />
                <span>{user.email}</span>
              </p>

              {user.phone && (
                <p className="text-caption text-charcoal-500 flex items-center gap-xs">
                  <Phone className="h-3.5 w-3.5 text-gold-600" />
                  <span>{user.phone}</span>
                </p>
              )}
            </div>
          </div>

          <Link href="/profile/edit" className="shrink-0">
            <Button variant="primary" leftIcon={<Edit3 className="h-4 w-4" />}>
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Member Statistics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md sm:gap-lg">
        <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-xs shadow-sm">
          <div className="flex items-center justify-between text-caption text-charcoal-400 uppercase font-semibold">
            <span>Privilege Tier</span>
            <Award className="h-4 w-4 text-gold-600" />
          </div>
          <p className="text-h2 font-serif font-bold text-charcoal-900">
            Diamond VIP
          </p>
          <p className="text-caption text-charcoal-500">
            Includes complimentary airport limo &amp; butler service.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-xs shadow-sm">
          <div className="flex items-center justify-between text-caption text-charcoal-400 uppercase font-semibold">
            <span>Total Nights Stayed</span>
            <Calendar className="h-4 w-4 text-gold-600" />
          </div>
          <p className="text-h2 font-serif font-bold text-charcoal-900">
            8 Nights
          </p>
          <p className="text-caption text-charcoal-500">
            Across 3 bespoke coastal sanctuaries.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background-elevated p-lg space-y-xs shadow-sm">
          <div className="flex items-center justify-between text-caption text-charcoal-400 uppercase font-semibold">
            <span>Azure Reward Points</span>
            <Sparkles className="h-4 w-4 text-gold-600" />
          </div>
          <p className="text-h2 font-serif font-bold text-gold-700">
            14,250 pts
          </p>
          <p className="text-caption text-charcoal-500">
            Eligible for complimentary suite upgrades.
          </p>
        </div>
      </div>

      {/* Quick Navigation to Bookings */}
      <div className="rounded-2xl border border-border bg-background-elevated p-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md shadow-sm">
        <div className="space-y-xs">
          <h4 className="text-body font-serif font-bold text-charcoal-900">
            Manage Your Resort Reservations
          </h4>
          <p className="text-body-sm text-charcoal-500 font-light">
            Review your upcoming arrival schedules, view digital confirmation vouchers, or modify itinerary details.
          </p>
        </div>

        <Link href="/bookings" className="shrink-0">
          <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
            View All Bookings
          </Button>
        </Link>
      </div>
    </div>
  );
}

