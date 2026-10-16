'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ShieldAlert, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);

  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingInDemo, setIsLoggingInDemo] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAdmin = isAuthenticated && user?.role === 'admin';

  const handleAdminDemoLogin = async () => {
    setIsLoggingInDemo(true);
    await login({
      email: 'admin@grandazure.com',
      password: 'Admin2026!',
    });
    setIsLoggingInDemo(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-md">
        <div className="w-full max-w-md space-y-md text-center animate-pulse">
          <div className="h-12 w-12 rounded-full bg-charcoal-800 mx-auto" />
          <div className="h-6 w-48 rounded bg-charcoal-800 mx-auto" />
          <div className="h-20 w-full rounded-xl bg-charcoal-800" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex items-center justify-center p-md">
        <div className="w-full max-w-lg rounded-2xl border border-charcoal-700 bg-charcoal-900 p-xl shadow-2xl space-y-lg text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
              Restricted Area
            </span>
            <h2 className="text-h3 font-serif font-bold text-ivory-100">
              Executive Console Access Required
            </h2>
            <p className="text-body-sm text-charcoal-400 max-w-sm mx-auto">
              This operational console requires verified Administrator privileges. Your current session does not have administrative permissions.
            </p>
          </div>

          <div className="pt-sm space-y-sm">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center gap-xs font-semibold"
              isLoading={isLoggingInDemo}
              onClick={handleAdminDemoLogin}
              leftIcon={<Sparkles className="h-4 w-4 text-charcoal-900" />}
            >
              Sign In as Executive Admin (Demo)
            </Button>

            <div className="flex items-center gap-sm pt-xs">
              <Button
                variant="outline"
                size="md"
                className="w-1/2 border-charcoal-700 text-charcoal-300 hover:text-ivory-100 hover:border-charcoal-600 justify-center"
                onClick={() => router.push('/')}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to Site
              </Button>

              <Link
                href="/login?returnUrl=/admin"
                className="w-1/2 inline-flex items-center justify-center h-10 rounded-md border border-charcoal-700 bg-transparent px-md text-body-sm font-medium text-charcoal-300 hover:text-ivory-100 hover:border-charcoal-600 transition-colors"
              >
                <KeyRound className="h-4 w-4 mr-xs" />
                Standard Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

