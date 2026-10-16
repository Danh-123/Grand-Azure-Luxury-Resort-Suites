import React from 'react';
import type { Metadata } from 'next';
import { adminService } from '@/services/admin.service';
import { AdminUsersTable } from '@/components/admin/AdminUsersTable';

export const metadata: Metadata = {
  title: 'User & Membership Directory | Grand Azure Admin',
  description: 'Manage executive accounts, resort operations staff, and VIP guest membership records.',
};

export default async function AdminUsersPage() {
  const users = await adminService.getUsers();

  return (
    <div className="space-y-xl">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
          Identity & Privileges
        </span>
        <h1 className="text-h2 font-serif font-bold text-charcoal-900 mt-0.5">
          User & Membership Directory
        </h1>
        <p className="text-body-sm text-charcoal-600 mt-1">
          Review VIP client records, manage administrative roles, and provision new access profiles.
        </p>
      </div>

      {/* Interactive Admin Table */}
      <AdminUsersTable initialUsers={users} />
    </div>
  );
}
