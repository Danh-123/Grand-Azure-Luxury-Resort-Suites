'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';
import { DashboardStats } from '@/services/admin.service';

const DynamicRevenueChart = dynamic(
  () => import('./RevenueChart').then((mod) => mod.RevenueChart),
  {
    loading: () => (
      <div className="h-80 w-full rounded-xl border border-border bg-background-elevated p-lg flex flex-col justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-52 w-full" />
      </div>
    ),
    ssr: false,
  }
);

const DynamicRoomTypeChart = dynamic(
  () => import('./RoomTypeChart').then((mod) => mod.RoomTypeChart),
  {
    loading: () => (
      <div className="h-80 w-full rounded-xl border border-border bg-background-elevated p-lg flex flex-col justify-between">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-52 w-full" />
      </div>
    ),
    ssr: false,
  }
);

interface DashboardChartsSectionProps {
  monthlyRevenueSeries: DashboardStats['monthlyRevenueSeries'];
  roomTypeDistribution: DashboardStats['roomTypeDistribution'];
}

export function DashboardChartsSection({
  monthlyRevenueSeries,
  roomTypeDistribution,
}: DashboardChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-md lg:gap-lg">
      <div className="lg:col-span-2">
        <DynamicRevenueChart data={monthlyRevenueSeries} />
      </div>
      <div className="lg:col-span-1">
        <DynamicRoomTypeChart data={roomTypeDistribution} />
      </div>
    </div>
  );
}

