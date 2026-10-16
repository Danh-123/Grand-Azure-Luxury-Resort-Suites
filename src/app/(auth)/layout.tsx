import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-background to-background-subtle px-md py-xl sm:py-2xl">
      {/* Background Subtle Luxury Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Logo */}
      <header className="relative z-10 mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-xs group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-600 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-serif text-h3 font-bold text-charcoal-900 tracking-tight transition-colors group-hover:text-gold-700">
            Grand Azure Resort
          </span>
        </Link>
      </header>

      {/* Main Form Content */}
      <main className="relative z-10 my-auto py-lg w-full flex justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-caption text-charcoal-400 py-xs">
        <p>© 2026 Grand Azure Luxury Resort & Suites. All privileges reserved.</p>
      </footer>
    </div>
  );
}
