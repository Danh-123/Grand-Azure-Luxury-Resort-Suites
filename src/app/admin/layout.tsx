import React from 'react';
import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Executive Console | Grand Azure Admin',
  description: 'Operations, inventory management, revenue metrics, and reservations overview.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
