'use client';

import React from 'react';
import { Menu, Bell, Search, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface AdminTopbarProps {
  onOpenSidebar: () => void;
}

export function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-header h-16 border-b border-border bg-background-elevated/95 backdrop-blur-md px-md lg:px-xl flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-md">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-border text-charcoal-700 hover:bg-background-subtle hover:text-charcoal-900 transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-xs text-[12px] text-charcoal-500 font-medium">
          <span className="text-gold-700 font-semibold">Console</span>
          <span>/</span>
          <span className="text-charcoal-900 font-bold">Executive Portal</span>
        </div>
      </div>

      {/* Right: Status Pill, Notifications & User */}
      <div className="flex items-center gap-md">
        {/* Live operational badge */}
        <div className="hidden md:flex items-center gap-1.5 px-sm py-1 rounded-full bg-success-light/40 border border-success/30 text-success text-[11px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>Azure Core Live</span>
        </div>

        {/* Admin Quick Info */}
        <div className="flex items-center gap-sm pl-sm border-l border-border">
          <Avatar
            src={user?.avatarUrl}
            name={user?.name || 'Administrator'}
            size="sm"
          />
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-semibold text-charcoal-900 leading-tight">
              {user?.name || 'Alexander Sterling'}
            </p>
            <p className="text-[11px] text-gold-700 font-medium leading-tight">
              Executive Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

