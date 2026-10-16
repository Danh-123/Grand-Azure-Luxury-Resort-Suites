import React from 'react';
import type { Metadata } from 'next';
import { adminService } from '@/services/admin.service';
import { AdminRoomsTable } from '@/components/admin/AdminRoomsTable';

export const metadata: Metadata = {
  title: 'Room Inventory Management | Grand Azure Admin',
  description: 'Manage suite inventory, pricing, specifications, and availability.',
};

export default async function AdminRoomsPage() {
  const rooms = await adminService.getRooms();

  return (
    <div className="space-y-xl">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
          Inventory Control
        </span>
        <h1 className="text-h2 font-serif font-bold text-charcoal-900 mt-0.5">
          Suites & Villas Directory
        </h1>
        <p className="text-body-sm text-charcoal-600 mt-1">
          Monitor occupancy status, adjust room rates, bedding configurations, and catalog visibility in real time.
        </p>
      </div>

      {/* Interactive Admin Table */}
      <AdminRoomsTable initialRooms={rooms} />
    </div>
  );
}
