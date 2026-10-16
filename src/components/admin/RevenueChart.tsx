'use client';

import React, { useState } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonthlyData {
  month: string;
  revenue: number;
  bookings: number;
}

interface RevenueChartProps {
  data: MonthlyData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'bookings'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxBookings = Math.max(...data.map((d) => d.bookings));

  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div className="rounded-xl border border-border bg-background-elevated p-lg shadow-sm flex flex-col justify-between">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm border-b border-border/60 pb-md">
        <div>
          <div className="flex items-center gap-xs text-[11px] font-bold uppercase tracking-wider text-gold-700">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Financial Performance</span>
          </div>
          <h3 className="text-h4 font-serif font-bold text-charcoal-900 mt-0.5">
            Revenue & Booking Velocity
          </h3>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center bg-background-subtle rounded-lg p-1 border border-border self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMetric('revenue')}
            className={cn(
              'px-sm py-1 rounded-md text-caption font-semibold transition-all min-h-[36px]',
              activeMetric === 'revenue'
                ? 'bg-background-elevated text-gold-700 shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            )}
          >
            Gross Revenue ($)
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('bookings')}
            className={cn(
              'px-sm py-1 rounded-md text-caption font-semibold transition-all min-h-[36px]',
              activeMetric === 'bookings'
                ? 'bg-background-elevated text-gold-700 shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            )}
          >
            Reservations (Count)
          </button>
        </div>
      </div>

      {/* SVG Bar / Area Visualization */}
      <div className="pt-lg">
        {/* Value hover preview */}
        <div className="h-6 flex items-center justify-between text-caption text-charcoal-500 mb-xs">
          <span>
            {hoveredIndex !== null ? (
              <strong className="text-charcoal-900 font-semibold">
                {data[hoveredIndex].month} 2026:
                <span className="text-gold-700 ml-1">
                  {activeMetric === 'revenue'
                    ? `$${data[hoveredIndex].revenue.toLocaleString()}`
                    : `${data[hoveredIndex].bookings} reservations`}
                </span>
              </strong>
            ) : (
              'Hover over any bar for exact figures'
            )}
          </span>
          <span className="text-[11px] text-charcoal-400">Past 6 Months</span>
        </div>

        {/* Bars Container */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-sm px-xs border-b border-border">
          {data.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const currentVal = activeMetric === 'revenue' ? item.revenue : item.bookings;
            const maxVal = activeMetric === 'revenue' ? maxRevenue : maxBookings;
            const heightPercent = Math.round((currentVal / maxVal) * 100);

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar */}
                <div className="w-full max-w-[48px] bg-background-subtle rounded-t-lg relative flex items-end h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={cn(
                      'w-full rounded-t-lg transition-all duration-300 relative',
                      isHovered
                        ? 'bg-gold-500 shadow-glow'
                        : 'bg-gold-600/80 group-hover:bg-gold-500'
                    )}
                  >
                    {/* Tooltip on top of bar when hovered */}
                    {isHovered && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal-900 text-ivory-100 text-[11px] font-semibold px-2 py-1 rounded shadow-lg pointer-events-none z-10">
                        {activeMetric === 'revenue'
                          ? `$${item.revenue.toLocaleString()}`
                          : `${item.bookings} rsv.`}
                      </div>
                    )}
                  </div>
                </div>

                {/* X Axis Label */}
                <span
                  className={cn(
                    'mt-2 text-[12px] font-medium transition-colors',
                    isHovered ? 'text-gold-700 font-bold' : 'text-charcoal-500'
                  )}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Summary Footer */}
      <div className="mt-md pt-sm flex items-center justify-between text-caption text-charcoal-500">
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-gold-600 inline-block" />
            <span>Monthly Total</span>
          </div>
        </div>
        <span className="text-[11px] font-medium text-charcoal-400">
          Peak month: {data.reduce((max, cur) => (cur.revenue > max.revenue ? cur : max)).month} ($
          {maxRevenue.toLocaleString()})
        </span>
      </div>
    </div>
  );
}

