'use client';

import React, { useState } from 'react';
import { AdminGuard } from './AdminGuard';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background-subtle">
        {/* Responsive Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 p-md md:p-lg lg:p-xl max-w-7xl w-full mx-auto space-y-lg">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}

