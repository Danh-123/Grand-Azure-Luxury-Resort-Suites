'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  MessageSquareQuote,
  LogOut,
  ExternalLink,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Room Inventory',
    href: '/admin/rooms',
    icon: BedDouble,
    exact: false,
  },
  {
    label: 'Bookings Moderation',
    href: '/admin/bookings',
    icon: CalendarCheck,
    exact: false,
  },
  {
    label: 'User Directory',
    href: '/admin/users',
    icon: Users,
    exact: false,
  },
  {
    label: 'Guest Reviews',
    href: '/admin/reviews',
    icon: MessageSquareQuote,
    exact: false,
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-charcoal-900 text-ivory-100 border-r border-charcoal-800">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between p-lg border-b border-charcoal-800">
          <div>
            <Link href="/" className="font-serif text-h4 font-bold text-gold-400 block tracking-wide">
              Grand Azure
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-widest">
                Executive Console
              </span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-charcoal-400 hover:text-ivory-100 min-h-touchMin min-w-touchMin flex items-center justify-center -mr-xs"
            aria-label="Close admin menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-md space-y-xs" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-sm rounded-lg px-md py-sm text-body-sm font-medium transition-all duration-fast min-h-[44px]',
                  active
                    ? 'bg-gold-500/15 text-gold-300 font-semibold border-l-2 border-gold-400 pl-[calc(1rem-2px)] shadow-inner'
                    : 'text-charcoal-300 hover:bg-charcoal-800/80 hover:text-ivory-100'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-gold-400' : 'text-charcoal-400')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Actions */}
      <div className="p-md border-t border-charcoal-800 space-y-sm">
        {/* Profile Card */}
        <div className="flex items-center gap-sm p-sm rounded-lg bg-charcoal-800/40 border border-charcoal-700/60">
          <Avatar
            src={user?.avatarUrl}
            name={user?.name || 'Administrator'}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ivory-100 truncate">
              {user?.name || 'Alexander Sterling'}
            </p>
            <p className="text-[11px] text-charcoal-400 truncate">
              {user?.email || 'admin@grandazure.com'}
            </p>
          </div>
          <Badge variant="luxury" size="sm" className="text-[10px] px-1.5 py-0">
            Admin
          </Badge>
        </div>

        {/* Action Links */}
        <div className="space-y-xs pt-xs">
          <Link
            href="/"
            className="flex items-center justify-between rounded-md px-sm py-xs text-caption text-charcoal-400 hover:text-ivory-100 hover:bg-charcoal-800/60 transition-colors min-h-[38px]"
          >
            <span className="flex items-center gap-xs">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Return to Public Site</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-md px-sm py-xs text-caption text-error hover:bg-error-light/10 transition-colors min-h-[38px]"
          >
            <span className="flex items-center gap-xs">
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out of Portal</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-modal flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Pane */}
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-fast">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

