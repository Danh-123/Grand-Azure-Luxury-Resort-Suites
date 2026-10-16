import React from 'react';
import type { Metadata } from 'next';
import { adminService } from '@/services/admin.service';
import { StatCards } from '@/components/admin/StatCards';
import { DashboardChartsSection } from '@/components/admin/DashboardChartsSection';
import { RecentBookingsTable } from '@/components/admin/RecentBookingsTable';

export const metadata: Metadata = {
  title: 'Executive Console | Grand Azure Admin',
  description: 'Operations, inventory management, revenue metrics, and reservations overview.',
};

export default async function AdminDashboardPage() {
  const stats = await adminService.getDashboardStats();
  const recentBookings = await adminService.getRecentBookings(5);

  return (
    <div className="space-y-xl">
      {/* Title & Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
            Resort Operations Overview
          </span>
          <h1 className="text-h2 font-serif font-bold text-charcoal-900 mt-0.5">
            Executive Performance Dashboard
          </h1>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <StatCards stats={stats} />

      {/* 2 Dynamic Charts */}
      <DashboardChartsSection
        monthlyRevenueSeries={stats.monthlyRevenueSeries}
        roomTypeDistribution={stats.roomTypeDistribution}
      />

      {/* Recent Reservations Table */}
      <RecentBookingsTable bookings={recentBookings} />
    </div>
  );
}
