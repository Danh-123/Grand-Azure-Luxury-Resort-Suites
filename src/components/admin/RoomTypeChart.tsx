'use client';

import React from 'react';
import { PieChart, BedDouble } from 'lucide-react';

interface RoomTypeItem {
  type: string;
  label: string;
  percentage: number;
  revenue: number;
  color: string;
}

interface RoomTypeChartProps {
  data: RoomTypeItem[];
}

export function RoomTypeChart({ data }: RoomTypeChartProps) {
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <div className="rounded-xl border border-border bg-background-elevated p-lg shadow-sm flex flex-col justify-between">
      {/* Chart Header */}
      <div className="border-b border-border/60 pb-md">
        <div className="flex items-center gap-xs text-[11px] font-bold uppercase tracking-wider text-gold-700">
          <PieChart className="h-3.5 w-3.5" />
          <span>Category Analytics</span>
        </div>
        <h3 className="text-h4 font-serif font-bold text-charcoal-900 mt-0.5">
          Revenue by Room Tier
        </h3>
      </div>

      {/* Visual Stacked Progress Bar */}
      <div className="pt-md space-y-md">
        <div>
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-background-subtle border border-border">
            {data.map((item) => (
              <div
                key={item.type}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
                className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full hover:opacity-90"
                title={`${item.label}: ${item.percentage}%`}
              />
            ))}
          </div>
        </div>

        {/* Detailed Breakdown List */}
        <div className="space-y-sm">
          {data.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-between p-sm rounded-lg hover:bg-background-subtle transition-colors"
            >
              <div className="flex items-center gap-sm">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-body-sm font-semibold text-charcoal-800">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-md text-caption">
                <span className="font-bold text-charcoal-900">
                  ${item.revenue.toLocaleString()}
                </span>
                <span className="w-10 text-right font-semibold text-gold-700">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Total */}
      <div className="mt-md pt-sm border-t border-border flex items-center justify-between text-caption text-charcoal-500">
        <span className="flex items-center gap-1">
          <BedDouble className="h-3.5 w-3.5 text-gold-700" />
          <span>Total Tiered Yield</span>
        </span>
        <span className="font-bold text-charcoal-900">
          ${totalRevenue.toLocaleString()} USD
        </span>
      </div>
    </div>
  );
}

