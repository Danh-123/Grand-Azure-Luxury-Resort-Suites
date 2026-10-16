'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  User,
  CalendarCheck,
  ShieldCheck,
  LogOut,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [isMounted, setIsMounted] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Suites & Villas', href: '/rooms' },
    { label: 'Reserve', href: '/booking' },
    { label: 'Design System', href: '/design-system' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-header w-full transition-all duration-300',
        isScrolled
          ? 'bg-background-elevated/95 backdrop-blur-md shadow-md border-b border-border/80 py-sm'
          : 'bg-background-elevated/90 backdrop-blur-sm border-b border-border/40 py-md'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-md sm:px-lg lg:px-xl">
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-xs sm:gap-sm group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-h4 sm:text-h3 font-bold tracking-tight text-charcoal-900 group-hover:text-gold-700 transition-colors">
              Grand Azure
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-charcoal-400 -mt-1">
              Resort & Luxury Suites
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-md lg:gap-lg"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-body-sm font-medium transition-colors relative py-1 hover:text-gold-700',
                  isActive
                    ? 'text-gold-700 font-semibold'
                    : 'text-charcoal-700'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth-Aware Section */}
        <div className="hidden md:flex items-center gap-md">
          {!isMounted ? (
            <div className="h-10 w-28 rounded-md bg-charcoal-100 animate-pulse" />
          ) : isAuthenticated && user ? (
            /* User Avatar Dropdown */
            <div className="relative z-50" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-sm p-1 rounded-full hover:bg-background-subtle border border-transparent hover:border-border transition-all min-h-[44px]"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <Avatar
                  src={user.avatarUrl}
                  name={user.name}
                  size="sm"
                />
                <span className="text-body-sm font-semibold text-charcoal-800 max-w-[120px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-charcoal-400 transition-transform duration-200',
                    userDropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-background-elevated p-sm shadow-xl z-dropdown text-left"
                  >
                    {/* User Header */}
                    <div className="p-sm border-b border-border/60 pb-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-charcoal-900 text-body-sm truncate block">
                          {user.name}
                        </span>
                        <Badge
                          variant={user.role === 'admin' ? 'luxury' : 'outline'}
                          size="sm"
                          className="capitalize text-[10px]"
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-charcoal-400 truncate block">
                        {user.email}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="py-xs space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-charcoal-700 hover:bg-background-subtle hover:text-gold-700 transition-colors"
                      >
                        <User className="h-4 w-4 text-charcoal-400" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-charcoal-700 hover:bg-background-subtle hover:text-gold-700 transition-colors"
                      >
                        <CalendarCheck className="h-4 w-4 text-charcoal-400" />
                        <span>My Bookings</span>
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm font-semibold text-gold-700 hover:bg-gold-50 transition-colors"
                        >
                          <ShieldCheck className="h-4 w-4 text-gold-600" />
                          <span>Executive Console</span>
                        </Link>
                      )}
                    </div>

                    {/* Sign Out */}
                    <div className="pt-xs border-t border-border/60">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-error hover:bg-error-light/30 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Guest Actions */
            <div className="flex items-center gap-sm">
              <Link
                href="/login"
                className="text-body-sm font-semibold text-charcoal-700 hover:text-gold-700 px-sm py-2 transition-colors min-h-[44px] inline-flex items-center"
              >
                Sign In
              </Link>
              <Link href="/rooms">
                <Button
                  variant="primary"
                  size="md"
                  className="font-serif font-bold shadow-sm"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Book a Suite
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg border border-border text-charcoal-700 hover:bg-background-subtle hover:text-charcoal-900 transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer (Framer Motion Slide-In) */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-modal flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-80 max-w-[85vw] h-full bg-background-elevated border-l border-border shadow-2xl z-10 flex flex-col justify-between p-lg overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-md border-b border-border">
                  <div className="flex items-center gap-xs">
                    <Sparkles className="h-5 w-5 text-gold-600" />
                    <span className="font-serif text-h4 font-bold text-charcoal-900">
                      Grand Azure
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center justify-center h-10 w-10 rounded-lg text-charcoal-500 hover:text-charcoal-900 hover:bg-background-subtle transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="py-lg space-y-xs" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-md py-sm rounded-lg text-body font-medium transition-colors min-h-[44px]',
                          isActive
                            ? 'bg-gold-50 text-gold-800 font-bold border-l-4 border-gold-600'
                            : 'text-charcoal-700 hover:bg-background-subtle'
                        )}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 opacity-40" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Auth Bottom Section */}
              <div className="pt-md border-t border-border space-y-md">
                {isAuthenticated && user ? (
                  <div className="space-y-sm">
                    <div className="flex items-center gap-sm p-sm rounded-lg bg-background-subtle border border-border">
                      <Avatar
                        src={user.avatarUrl}
                        name={user.name}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-body-sm font-semibold text-charcoal-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-charcoal-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-xs">
                      <Link
                        href="/profile"
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-charcoal-700 hover:bg-background-subtle min-h-[44px]"
                      >
                        <User className="h-4 w-4 text-charcoal-400" />
                        <span>My Account Profile</span>
                      </Link>

                      <Link
                        href="/bookings"
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-charcoal-700 hover:bg-background-subtle min-h-[44px]"
                      >
                        <CalendarCheck className="h-4 w-4 text-charcoal-400" />
                        <span>My Reservations</span>
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileDrawerOpen(false)}
                          className="flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm font-semibold text-gold-700 hover:bg-gold-50 min-h-[44px]"
                        >
                          <ShieldCheck className="h-4 w-4 text-gold-600" />
                          <span>Executive Portal</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          setMobileDrawerOpen(false);
                        }}
                        className="w-full flex items-center gap-sm px-sm py-2 rounded-lg text-body-sm text-error hover:bg-error-light/30 min-h-[44px]"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-sm">
                    <Link
                      href="/login"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="w-full flex items-center justify-center h-11 rounded-lg border border-border bg-background-subtle text-body-sm font-semibold text-charcoal-800 hover:bg-background-elevated transition-colors"
                    >
                      Sign In to Account
                    </Link>
                    <Link
                      href="/rooms"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full font-serif font-bold"
                      >
                        Reserve a Suite
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

