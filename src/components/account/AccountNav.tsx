'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Calendar, LogOut } from 'lucide-react';

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const isProfileActive = pathname.startsWith('/profile');
  const isBookingsActive = pathname.startsWith('/bookings');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-border pb-md mb-xl">
      {/* Navigation Tabs */}
      <nav aria-label="Account Tabs" className="flex items-center gap-xs">
        <Link
          href="/profile"
          className={`flex items-center gap-xs px-md py-sm rounded-xl text-body-sm font-semibold transition-all duration-base min-h-touchMin ${
            isProfileActive
              ? 'bg-gold-500 text-charcoal-900 shadow-sm'
              : 'text-charcoal-600 hover:bg-background-subtle hover:text-charcoal-900'
          }`}
          aria-current={isProfileActive ? 'page' : undefined}
        >
          <User className="h-4 w-4" />
          <span>My Profile</span>
        </Link>

        <Link
          href="/bookings"
          className={`flex items-center gap-xs px-md py-sm rounded-xl text-body-sm font-semibold transition-all duration-base min-h-touchMin ${
            isBookingsActive
              ? 'bg-gold-500 text-charcoal-900 shadow-sm'
              : 'text-charcoal-600 hover:bg-background-subtle hover:text-charcoal-900'
          }`}
          aria-current={isBookingsActive ? 'page' : undefined}
        >
          <Calendar className="h-4 w-4" />
          <span>My Bookings</span>
        </Link>
      </nav>

      {/* Logout Action */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-xs text-body-sm font-medium text-charcoal-500 hover:text-error transition-colors self-start sm:self-auto min-h-touchMin px-sm"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

