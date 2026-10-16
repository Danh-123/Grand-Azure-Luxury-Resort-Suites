# 🏨 Grand Azure Luxury Resort & Suites

> **A production-grade, ultra-luxury resort reservation and operations management platform built with Next.js 15 (App Router), React 19, TypeScript strict mode, and Tailwind CSS.**

---

## ✨ Features & System Highlights

- **🏛️ Architecture & Rendering Constitution:**
  - 100% React Server Components (RSC) default architecture.
  - Isolated leaf Client Components (`'use client'`) for stateful interactions.
  - Full SSG / ISR pre-rendering for suite detail pages (`generateStaticParams` + 1h revalidation).
  - Zero hydration mismatch with guarded Zustand store persistence (`useHydratedStore`).

- **🌟 Public Guest Experience:**
  - **Cinematic Homepage:** Hero banner with quick booking widget, featured suites carousel, Michelin dining & wellness amenities, interactive guest testimonials, and photo gallery.
  - **Suites & Villas Catalog (`/rooms`):** Instant faceted filtering (price range, capacity, room tier, amenities), responsive filter drawer on mobile/tablet, sorting, and pagination.
  - **Suite Showcase (`/rooms/[slug]`):** High-resolution image gallery, interactive nightly pricing calculator, guest review scorecard, and related suites.
  - **Multi-step Booking Flow (`/booking`):** 4-step reservation wizard (Dates & Guests, Contact Details with Zod validation, Summary Review, and instant Voucher Confirmation).
  - **Guest Account Portal (`/profile`, `/bookings`):** Profile management, reservation tracking, and optimistic booking cancellation with confirmation modal.

- **🛡️ Executive Admin Console (`/admin`):**
  - Gated access strictly enforcing `role === 'admin'`.
  - Executive KPI dashboard: Gross Revenue, Total Bookings, Occupancy Rate, VIP Directory.
  - Lightweight dynamic SVG financial charts loaded via `next/dynamic`.
  - Room inventory CRUD table with live availability toggle.
  - Reservations moderation with status workflow (`pending`, `confirmed`, `completed`, `cancelled`).
  - User and staff directory management.
  - Guest reviews moderation.

- **🎨 Luxury Design System:**
  - Tailored design tokens: Royal Gold, Mediterranean Charcoal, and Warm Ivory palette.
  - Semantic typography: Cormorant Garamond (Serif) & Plus Jakarta Sans (Sans).
  - Strict touch target compliance ($\ge 44\times 44\text{px}$) across all viewports.
  - 5 UI states handled across all dynamic interfaces: Loading (Skeletons), Empty, Error (with Retry), Success (Toasts), and Disabled.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** [Next.js 15.5.28](https://nextjs.org/) (App Router, Turbopack ready)
- **UI & Runtime:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Client State:** [Zustand 5.0](https://zustand-demo.pmnd.rs/) with localStorage persistence
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Micro-interactions:** [Framer Motion 12.0](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v18.18+ or v20+ recommended
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Danh-123/Grand-Azure-Luxury-Resort-Suites.git

# Navigate into project directory
cd Grand-Azure-Luxury-Resort-Suites

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Validation
```bash
# Typecheck
npx tsc --noEmit

# Lint
npm run lint

# Compile production build
npm run build

# Start production server
npm run start
```

---

## 🔑 Demo Test Credentials

To preview guest and administrative capabilities:

| Account Type | Email | Password | Role / Access |
|:---|:---|:---|:---|
| **Executive Admin** | `admin@grandazure.com` | `Admin2026!` | Full Admin Console (`/admin/*`) & Moderation |
| **VIP Guest** | `elena.rostova@luxurytravel.com` | `Azure2026!` | Guest Portal, Reservations & Profile |
| **Simulate Failure** | `fail@error.com` | `wrongpassword` | Triggers 401/500 Error States for QA Testing |

---

## 📁 Project Architecture

```
src/
├── app/                  # Next.js 15 App Router routes & layouts
│   ├── (marketing)/      # Public resort showcase & room catalog
│   ├── (auth)/           # Authentication flows (login, register, forgot-password)
│   ├── (account)/        # Guest membership & reservation history
│   ├── admin/            # Executive management console
│   └── api/              # Mock API endpoints with simulated latency
├── components/
│   ├── ui/               # Agnostic atomic design system components (20+ primitives)
│   ├── layout/           # Global Header, Footer, Container, Section, Grid
│   ├── home/             # Marketing sections (Hero, Amenities, Testimonials)
│   ├── rooms/            # Catalog filters, sorting bar, room grid
│   ├── room-detail/      # Gallery lightbox, booking widget, review list
│   ├── booking/          # 4-step booking flow & confirmation view
│   ├── auth/             # Login, register, forgot-password forms
│   ├── account/          # Profile editor, bookings list, cancellation modal
│   └── admin/            # Stats cards, revenue charts, CRUD management tables
├── lib/
│   ├── design-tokens/    # Colors, typography, spacing, radius, z-index tokens
│   ├── mappers/          # Pure DTO transformation functions
│   └── utils.ts          # Class merging (clsx + twMerge)
├── mock/                 # Mock database entities (Rooms, Bookings, Users, Reviews)
├── schemas/              # Zod validation schemas
├── services/             # Application API service abstraction layer
├── store/                # Zustand client state stores
└── types/                # Domain models and presentation DTOs
```

---

## 📄 License
This project is licensed under the MIT License.
