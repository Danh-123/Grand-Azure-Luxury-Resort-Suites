import React from 'react';
import { CalendarCheck, TrendingUp, BedDouble, Users, ArrowUpRight } from 'lucide-react';
import { DashboardStats } from '@/services/admin.service';

interface StatCardsProps {
  stats: DashboardStats;
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    {
      title: 'Total Reservations',
      value: stats.totalBookings.toString(),
      unit: 'bookings',
      trend: stats.bookingsGrowth,
      subtitle: 'vs. previous cycle',
      icon: CalendarCheck,
    },
    {
      title: 'Gross Revenue',
      value: stats.formattedRevenue,
      unit: '',
      trend: stats.revenueGrowth,
      subtitle: 'excl. resort taxes',
      icon: TrendingUp,
    },
    {
      title: 'Average Occupancy',
      value: `${stats.occupancyRate}%`,
      unit: 'capacity',
      trend: stats.occupancyGrowth,
      subtitle: 'season peak target',
      icon: BedDouble,
    },
    {
      title: 'Registered Profiles',
      value: `${stats.totalUsers}`,
      unit: 'VIP guests',
      trend: stats.usersGrowth,
      subtitle: 'Azure membership club',
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="rounded-xl border border-border bg-background-elevated p-lg shadow-sm hover:shadow-md transition-shadow duration-fast flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-caption font-semibold uppercase tracking-wider text-charcoal-500">
                {card.title}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-700">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-md space-y-1">
              <div className="flex items-baseline gap-xs">
                <span className="text-h3 font-serif font-bold text-charcoal-900 tracking-tight">
                  {card.value}
                </span>
                {card.unit && (
                  <span className="text-caption text-charcoal-400 font-medium">
                    {card.unit}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-xs text-[12px] pt-xs">
                <span className="inline-flex items-center gap-0.5 font-bold text-success bg-success-light/50 px-1.5 py-0.5 rounded text-[11px]">
                  <ArrowUpRight className="h-3 w-3" />
                  {card.trend}
                </span>
                <span className="text-charcoal-400">{card.subtitle}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

