/**
 * 🏛️ GRAND AZURE LUXURY RESORT & SUITES — ROUTE DIRECTORY MAP & RENDERING STRATEGY
 * =========================================================================================
 * Route                | Segment               | Rendering Strategy    | Revalidation / Mode
 * ---------------------|-----------------------|-----------------------|--------------------
 * /                    | (marketing)/page.tsx  | Static (ISR)          | revalidate: 3600s
 * /rooms               | (marketing)/rooms     | Dynamic (SSR)         | Query params filters
 * /rooms/[slug]        | (marketing)/rooms     | Static + ISR          | generateStaticParams
 * /booking             | (marketing)/booking   | Dynamic (Client flow) | force-dynamic
 * /booking/confirmation| (marketing)/booking   | Dynamic (Client flow) | force-dynamic
 * /login               | (auth)/login          | Static (Form leaf)    | static prerender
 * /register            | (auth)/register       | Static (Form leaf)    | static prerender
 * /forgot-password     | (auth)/forgot-password| Static (Form leaf)    | static prerender
 * /profile             | (account)/profile     | Dynamic (Auth guard)  | force-dynamic
 * /profile/edit        | (account)/profile/edit| Dynamic (Auth guard)  | force-dynamic
 * /bookings            | (account)/bookings    | Dynamic (User orders) | force-dynamic
 * /bookings/[id]       | (account)/bookings    | Dynamic (Order detail)| force-dynamic
 * /admin/*             | admin/*               | Dynamic (Admin role)  | force-dynamic
 * /design-system       | design-system         | Static (Showcase)     | static prerender
 * /api/*               | api/*                 | Dynamic Route Handlers| Node.js / Edge
 * =========================================================================================
 * 
 * 🛡️ SERVER VS CLIENT COMPONENT BOUNDARY CONSTITUTION:
 * "Pages and data-fetching wrappers = Server Components (RSC).
 *  Anything with useState, useEffect, onClick, or Framer Motion
 *  = extract into a small Client Component leaf, imported into the Server Component page."
 */

import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { constructMetadata } from '@/lib/seo';

const fontSerif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
