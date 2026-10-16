'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isMounted, isAuthenticated, router, pathname]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-lg py-xl animate-pulse">
        <div className="h-10 w-48 rounded-xl bg-charcoal-200/60" />
        <div className="h-44 rounded-2xl bg-charcoal-200/50" />
        <div className="h-64 rounded-2xl bg-charcoal-200/40" />
      </div>
    );
  }

  return <>{children}</>;
}

