# PHASE 1: FOUNDATION ARCHITECTURE
## NỀN MÓNG KIẾN TRÚC & HỆ THỐNG QUY CHUẨN KỸ THUẬT (BƯỚC 01 – BƯỚC 12)

> **Mô tả:** Thiết lập toàn bộ khung kiến trúc Clean Architecture, Design Tokens (chuẩn Luxury Hospitality), Thư viện UI Component, DTO & Pure Mappers, App Router Routing, Zustand State Management, Zod Forms, Next.js 15 Best Practices, Responsive, Performance và 5 UI States bắt buộc.

---

## 📑 DANH MỤC CÁC BƯỚC THỰC THI

| Bước | Tên Bước | Sản phẩm bàn giao |
|:---:|:---|:---|
| Step 01 | **Project Architecture Convention** | `ARCHITECTURE.md + folder skeleton (/app, /components/ui, /features, /lib, /services, /types...)` |
| Step 02 | **Design Tokens** | `/lib/design-tokens/* (colors, typography, spacing, radius, shadow, z-index, breakpoints, animation) + tailwind.config.ts` |
| Step 03 | **Component Library (Design System)** | `/components/ui/* (Button, Input, Card, Badge, Modal, Toast, Skeleton, EmptyState, ErrorState...), /components/layout/*, /app/design-system/page.tsx` |
| Step 04 | **Data Models & DTO** | `/types/*.ts (Domain Types), /types/dto/*.ts (UI DTOs), /lib/mappers/*.ts, /mock/*.ts, /app/api/*` |
| Step 05 | **Routing Convention (App Router)** | `Cây thư mục /app hoàn chỉnh với placeholder pages, route groups (marketing), (auth), (account), admin/, root layout, loading, error, not-found` |
| Step 06 | **State Management Convention (Zustand)** | `/store/* (useBookingStore, useAuthStore, useFilterStore, useUIStore)` |
| Step 07 | **Form & Validation Convention** | `/schemas/* (Zod schemas), /components/form/FormField.tsx wrapper dùng chung` |
| Step 08 | **Next.js Best Practices & Rendering Strategy** | `next.config.ts, next/font (Serif + Sans), /lib/seo.ts (generateMetadata), loading/error skeletons per route, dynamic import` |
| Step 09 | **Naming Convention & Code Style** | `CONTRIBUTING.md` |
| Step 10 | **Responsive Rules** | `RESPONSIVE_GUIDE.md` |
| Step 11 | **Performance & Optimization Rules** | `PERFORMANCE_GUIDE.md` |
| Step 12 | **Global UI State Convention** | `UI_STATE_GUIDE.md + hoàn thiện bổ sung các variants trong Component Library` |

---

## 🚀 BƯỚC 01: PROJECT ARCHITECTURE CONVENTION

### 🎯 Mục tiêu kỹ thuật
Xác lập phân quyền cấu trúc thư mục tối cao. Tuyệt đối không viết business logic trong app/. Cấm cross-feature import. Mọi API call qua services/.

### 📁 Tệp & Thư mục bàn giao
`ARCHITECTURE.md + folder skeleton (/app, /components/ui, /features, /lib, /services, /types...)`

### ⚠️ Ranh giới & Ràng buộc
Tuân thủ nghiêm ngặt ranh giới thư mục. Không code feature trước.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 01: PROJECT ARCHITECTURE CONVENTION] */
/* ========================================================================================== */

TASK: Define ONLY the top-level project architecture and folder ownership
rules. Do not build any code yet — this governs where EVERY future file
(from this prompt onward) must be placed. This is the very first Foundation
step, before Design Tokens, because Design Tokens and everything after it
needs to know its home folder.

Enforce this exact top-level structure inside /src (or project root if the
Next.js app doesn't use /src — decide once, document it, never mix):

app/            -> Next.js App Router routes ONLY (page.tsx, layout.tsx,
                   loading.tsx, error.tsx, route handlers). No business
                   logic, no reusable UI lives here directly.
components/     -> Shared, feature-agnostic UI building blocks only
                   (Button, Card, Modal, etc. from Component Library step,
                   plus layout primitives). If a component is reused across
                   2+ features, it belongs here — nowhere else.
features/       -> Feature-scoped components + local logic that is NOT
                   reused elsewhere (e.g. features/booking/BookingStepper.tsx,
                   features/rooms/FilterSidebar.tsx, features/admin/...).
                   Organized as features/<feature-name>/components,
                   features/<feature-name>/hooks.
hooks/          -> Global reusable hooks only (e.g. useMediaQuery,
                   useDebounce). Feature-specific hooks live inside
                   features/<name>/hooks instead.
lib/            -> Pure helper/utility modules with no React (design-tokens,
                   mappers, seo.ts, cn utility, etc.)
services/       -> API-calling wrappers only (e.g. services/rooms.service.ts
                   wraps fetch('/api/rooms')). Components NEVER call fetch()
                   directly — always through a service function.
providers/      -> React Context providers / app-level wrapper providers
                   (theme provider, query provider, etc.)
schemas/        -> Zod validation schemas (from Form Convention step)
types/          -> Domain types + DTOs + dto/ subfolder (from Data Model step)
constants/      -> App-wide constants (nav links, amenity list, status enum
                   labels, etc.) — no magic strings scattered in components
mock/           -> Mock data arrays (from Data Model step)
store/          -> Zustand stores (from State Management step)
styles/         -> Global CSS only (globals.css) — component styling stays
                   in Tailwind classes, not separate CSS files

HARD RULES:
- A component used by only ONE feature → features/<name>/components.
  A component used by 2+ features or pages → components/.
  If unsure, start in features/ and move to components/ later once reused
  a second time — never guess "might be reused" and pre-place in components/.
- Components NEVER fetch data directly — always via a services/ function.
- No file may import across features/ directly (e.g. features/booking
  importing from features/admin) — shared logic must be lifted to lib/,
  components/, or hooks/ first.
- Every future prompt in this document must place its output files
  according to this table — this document is the folder ownership contract
  for the rest of the project.

Output: the folder skeleton (with a one-line README.md in each top-level
folder explaining its scope) + this convention documented as
ARCHITECTURE.md at the project root. No feature code yet.
```

---

## 🚀 BƯỚC 02: DESIGN TOKENS

### 🎯 Mục tiêu kỹ thuật
Xây dựng toàn bộ hệ thống biến số giao diện (tokens) chuẩn Luxury Hospitality (Gold, Champagne, Charcoal, Ivory). Ánh xạ vào Tailwind CSS.

### 📁 Tệp & Thư mục bàn giao
`/lib/design-tokens/* (colors, typography, spacing, radius, shadow, z-index, breakpoints, animation) + tailwind.config.ts`

### ⚠️ Ranh giới & Ràng buộc
Zero Hardcoded Values: Không dùng hex code hay pixel tùy ý ở bất kỳ đâu trong toàn bộ dự án.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 02: DESIGN TOKENS] */
/* ========================================================================================== */

TASK: Build ONLY the design token layer. Do not build any components or pages yet.

Create the following files:

/lib/design-tokens/colors.ts
  - Primary palette (luxury gold/champagne + deep neutral, e.g. charcoal/ivory)
  - Semantic colors: success, warning, error, info
  - Background layers: base, elevated, overlay
  - Text colors: primary, secondary, muted, inverse
  - Border colors: default, subtle, focus

/lib/design-tokens/typography.ts
  - Font families: 1 serif (display/headings, luxury feel) + 1 sans (body)
  - Type scale: display, h1–h6, body-lg, body, body-sm, caption
  - Font weights, line-heights, letter-spacing per scale step

/lib/design-tokens/spacing.ts
  - Spacing scale (4px base grid): xs, sm, md, lg, xl, 2xl, 3xl, 4xl

/lib/design-tokens/radius.ts
  - Border radius scale: none, sm, md, lg, xl, full

/lib/design-tokens/shadow.ts
  - Elevation scale: sm, md, lg, xl, glow (for premium hover states)

/lib/design-tokens/z-index.ts
  - Layering scale: dropdown, sticky, overlay, modal, toast, tooltip

/lib/design-tokens/breakpoints.ts
  - mobile, tablet, desktop, wide — matching Tailwind config

/lib/design-tokens/animation.ts
  - Duration tokens: fast, base, slow
  - Easing curves: standard, decelerate, accelerate

Then update tailwind.config.ts to consume ALL of the above tokens
(no hardcoded hex/px values allowed anywhere else in the project after this).

Output: token files + updated tailwind.config.ts only. No components.
```

---

## 🚀 BƯỚC 03: COMPONENT LIBRARY (DESIGN SYSTEM)

### 🎯 Mục tiêu kỹ thuật
Xây dựng bộ thư viện UI atomic kế thừa shadcn/ui và layout primitives dùng chung, kèm trang showcase design-system trực quan.

### 📁 Tệp & Thư mục bàn giao
`/components/ui/* (Button, Input, Card, Badge, Modal, Toast, Skeleton, EmptyState, ErrorState...), /components/layout/*, /app/design-system/page.tsx`

### ⚠️ Ranh giới & Ràng buộc
100% components có Props interface chặt chẽ, sử dụng 100% Design Tokens từ Step 2.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 03: COMPONENT LIBRARY (DESIGN SYSTEM)] */
/* ========================================================================================== */

TASK: Build ONLY the shared component library, using the design tokens
from Step 2. Do not build any page.

Build these components in /components/ui (extend shadcn/ui, don't replace):

- Button (variants: primary, secondary, outline, ghost, danger | sizes: sm, md, lg | states: default, hover, disabled, loading)
- Input, Textarea, Select, DatePicker, GuestCounter (custom stepper for guest count)
- Card (variants: default, elevated, interactive/hoverable)
- Badge (variants matching booking status: pending, confirmed, cancelled, completed)
- Modal / Dialog
- Toast / Notification
- Tabs
- Rating (star display, read-only and interactive)
- Skeleton (for loading states — generic + RoomCardSkeleton preset)
- EmptyState (icon + title + description + optional CTA)
- ErrorState (icon + message + retry button)
- Pagination
- Avatar
- Tooltip

Also build layout primitives in /components/layout:
- Container (max-width wrapper, responsive padding)
- Section (vertical spacing wrapper for page sections)
- Grid (responsive grid wrapper)

RULES:
- Every component must be fully typed with a documented Props interface.
- Every component must use ONLY tokens from /lib/design-tokens (via Tailwind
  classes mapped to those tokens) — zero hardcoded values.
- Build a single /app/design-system/page.tsx showcase page that renders every
  component + every variant, so it can be visually reviewed before building
  real pages.

Output: component files + layout primitives + design-system showcase page only.
```

---

## 🚀 BƯỚC 04: DATA MODELS & DTO

### 🎯 Mục tiêu kỹ thuật
Định nghĩa toàn bộ Domain Models, UI DTOs, Pure Mappers, Mock Data thực tế và Mock API Route Handlers có simulated network latency (300-800ms).

### 📁 Tệp & Thư mục bàn giao
`/types/*.ts (Domain Types), /types/dto/*.ts (UI DTOs), /lib/mappers/*.ts, /mock/*.ts, /app/api/*`

### ⚠️ Ranh giới & Ràng buộc
UI chỉ nhận DTO qua mappers thuần túy; components không bao giờ tiêu thụ Domain Model hay gọi fetch trực tiếp.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 04: DATA MODELS & DTO] */
/* ========================================================================================== */

TASK: Build ONLY the data layer (types, DTOs, mock data, mock API routes).
Do not build any UI.

STEP A — Domain Types (/types/*.ts)
Define full internal domain models (as if from a real database):
- Room: id, name, description, images[], pricePerNight, currency, rating,
  reviewCount, capacity{adults,children}, bedType, sizeSqm, amenities[],
  roomType, isAvailable
- Booking: id, roomId, userId (nullable for guest), checkIn, checkOut,
  guests{adults,children}, status ('pending'|'confirmed'|'cancelled'|'completed'),
  totalPrice, priceBreakdown{nights, subtotal, taxes, fees, total},
  guestInfo{fullName,email,phone}, createdAt
- User: id, name, email, phone, avatarUrl, role ('guest'|'admin'), createdAt
- Review: id, roomId, userId, userName, userAvatar, rating, comment, createdAt
- Amenity: id, name, icon

STEP B — DTOs (/types/dto/*.ts)
Define UI-facing shapes derived from domain types (the ONLY shapes components
are allowed to consume):
- RoomCardDTO (lightweight, for grid/list cards): id, name, thumbnailUrl,
  pricePerNight, currency, rating, capacity, roomType
- RoomDetailDTO (full detail page): extends RoomCardDTO + images[], description,
  amenities[], bedType, sizeSqm, reviews[]
- BookingSummaryDTO: id, roomName, roomThumbnail, checkIn, checkOut, nights,
  status, totalPrice
- BookingDetailDTO: extends BookingSummaryDTO + full priceBreakdown + guestInfo
- UserProfileDTO: id, name, email, phone, avatarUrl

STEP C — Mapper functions (/lib/mappers/*.ts)
Pure functions converting domain type → DTO (e.g. `toRoomCardDTO(room: Room): RoomCardDTO`).
ALL components consume DTOs via mappers — never raw domain types directly.
This guarantees field names never drift between pages.

STEP D — Mock data (/mock/*.ts)
- 12 realistic rooms (suite, deluxe, villa, ocean-view, etc.) with real-looking
  Unsplash luxury hotel image URLs.
- 6 mock reviews per room.
- 8 mock bookings across all statuses.
- 3 mock users (1 admin, 2 guests).

STEP E — Mock API routes (/app/api/*)
Create route handlers that return the mock data as JSON, with a simulated
300–800ms delay (setTimeout) to mimic real network latency:
- GET /api/rooms (supports query params: minPrice, maxPrice, capacity, type, sort)
- GET /api/rooms/[id]
- GET /api/rooms/[id]/reviews
- POST /api/bookings (accepts booking payload, returns mock created booking)
- GET /api/bookings?userId=
- GET /api/bookings/[id]
- PATCH /api/bookings/[id] (for cancel)
- POST /api/auth/login, /api/auth/register (fake, returns mock user + fake token)

Output: types, DTOs, mappers, mock data, mock API routes only. No UI components, no pages.
```

---

## 🚀 BƯỚC 05: ROUTING CONVENTION (APP ROUTER)

### 🎯 Mục tiêu kỹ thuật
Thiết lập toàn bộ khung điều hướng Next.js 15 App Router với các Route Groups chia sẻ layout mà không làm đổi URL.

### 📁 Tệp & Thư mục bàn giao
`Cây thư mục /app hoàn chỉnh với placeholder pages, route groups (marketing), (auth), (account), admin/, root layout, loading, error, not-found`

### ⚠️ Ranh giới & Ràng buộc
Tên thư mục URL theo chuẩn kebab-case, số nhiều cho danh sách (rooms, bookings), [slug]/[id] nhất quán.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 05: ROUTING CONVENTION (APP ROUTER)] */
/* ========================================================================================== */

TASK: Define ONLY the folder structure and routing convention (Next.js 15 App Router).
Do not build page content — create placeholder files only (empty page returning
a `<div>PageName placeholder</div>`) so the route tree exists and is navigable.

Enforce this exact structure:

app/
  (marketing)/              -> route group, public-facing pages, shares one layout
    layout.tsx
    page.tsx                 -> Home ("/")
    rooms/
      page.tsx                -> Rooms List ("/rooms")
      [slug]/
        page.tsx               -> Room Detail ("/rooms/[slug]")
    booking/
      page.tsx                 -> Booking flow ("/booking") — roomId via ?room=slug
      confirmation/
        page.tsx                -> Booking success ("/booking/confirmation")
  (auth)/                    -> route group, minimal layout (no header/footer)
    layout.tsx
    login/page.tsx            -> "/login"
    register/page.tsx         -> "/register"
    forgot-password/page.tsx  -> "/forgot-password"
  (account)/                 -> route group, requires auth (mocked)
    layout.tsx
    profile/
      page.tsx                 -> "/profile"
      edit/page.tsx             -> "/profile/edit"
    bookings/
      page.tsx                 -> "/bookings" (My Bookings list)
      [id]/page.tsx              -> "/bookings/[id]" (Booking detail)
  admin/                     -> separate layout, sidebar nav
    layout.tsx
    page.tsx                  -> "/admin" (Dashboard overview)
    rooms/page.tsx             -> "/admin/rooms"
    bookings/page.tsx          -> "/admin/bookings"
    users/page.tsx             -> "/admin/users"
    reviews/page.tsx           -> "/admin/reviews"
  api/                       -> mock API routes (already built in Step 4)
  design-system/page.tsx    -> already built in Step 3
  layout.tsx                 -> root layout (fonts, providers, global CSS)
  loading.tsx                 -> global loading fallback
  error.tsx                   -> global error boundary
  not-found.tsx                -> global 404

RULES:
- Route segment names are always kebab-case, always plural for list resources
  (rooms, bookings), singular for the resource itself in dynamic segments.
- Use route groups `(marketing)`, `(auth)`, `(account)` to share layouts without
  affecting the URL.
- Every dynamic route uses [slug] or [id] consistently as documented above —
  do not mix naming across routes.
- Document the final route table as a comment block at the top of app/layout.tsx.

Output: full folder/file tree with placeholder pages + route table comment only.
```

---

## 🚀 BƯỚC 06: STATE MANAGEMENT CONVENTION (ZUSTAND)

### 🎯 Mục tiêu kỹ thuật
Xây dựng tầng state phía client với Zustand cho luồng booking nhiều bước, session mock và UI controls.

### 📁 Tệp & Thư mục bàn giao
`/store/* (useBookingStore, useAuthStore, useFilterStore, useUIStore)`

### ⚠️ Ranh giới & Ràng buộc
Tuyệt đối không lưu Server Data vào Zustand. Store persist bắt buộc phải có Hydration Guard chống Next.js 15 mismatch.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 06: STATE MANAGEMENT CONVENTION (ZUSTAND)] */
/* ========================================================================================== */

TASK: Build ONLY the client state layer using Zustand. Do not build page UI.

Create these stores in /store:

- useBookingStore: holds the in-progress booking draft as the user moves
  through the multi-step Booking Page (selectedRoom, checkIn, checkOut,
  guests, guestInfo, currentStep). Includes actions: setRoom, setDates,
  setGuests, setGuestInfo, nextStep, prevStep, reset.
  This store is the single source of truth across Step 1-4 of Booking —
  no prop drilling between steps.

- useAuthStore: holds mock auth session (user: UserProfileDTO | null,
  isAuthenticated, isLoading). Actions: login (fake), logout, register (fake).
  Persist to a mock in-memory session only (no real cookies/JWT yet) —
  but structure it so swapping in real auth later only touches this store.

- useFilterStore: holds Rooms List filter/sort state (priceRange, capacity,
  roomType, amenities[], sortBy) so filters can be deep-linked to URL query
  params later without rewriting components.

- useUIStore: holds global UI state (isMobileNavOpen, activeModal, toasts[]).

RULES:
- Server data (rooms, bookings from API) is NEVER stored in Zustand — it stays
  in React Query / fetch + component state. Zustand is ONLY for client-only,
  cross-component UI/flow state as listed above.
- Every store must be fully typed, with actions colocated in the same file
  (no separate action files).
- Add a short JSDoc comment on top of each store explaining its exact scope,
  to prevent future features from dumping unrelated state into it.

Output: store files only. No components, no pages.
```

---

## 🚀 BƯỚC 07: FORM & VALIDATION CONVENTION

### 🎯 Mục tiêu kỹ thuật
Chuẩn hóa 100% biểu mẫu nhập liệu trên toàn hệ thống bằng React Hook Form + Zod + shadcn/ui Form primitives.

### 📁 Tệp & Thư mục bàn giao
`/schemas/* (Zod schemas), /components/form/FormField.tsx wrapper dùng chung`

### ⚠️ Ranh giới & Ràng buộc
Nút submit bắt buộc hiển thị loading spinner và vô hiệu hóa trong khi gửi; báo lỗi inline và toast.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 07: FORM & VALIDATION CONVENTION] */
/* ========================================================================================== */

TASK: Build ONLY the shared form infrastructure. Do not build full pages.

- Standardize on React Hook Form + Zod + shadcn/ui Form components for
  EVERY form in this project (Auth, Booking guest info, Profile edit,
  Admin CRUD forms) — no other form pattern is allowed.
- Create /lib/validations/*.ts with Zod schemas:
  - loginSchema, registerSchema, forgotPasswordSchema
  - guestInfoSchema (full name, email, phone — with real regex/format checks)
  - profileEditSchema
- Create a reusable /components/form/FormField.tsx wrapper (label + input +
  inline error message + helper text) built on shadcn/ui Form primitives,
  so every form field across the app looks and behaves identically.
- Define the standard submit UX pattern as a code comment/example:
  disable submit button + show spinner while pending → show inline field
  errors on blur/submit → show toast on success → show toast + keep form
  filled on failure.

Output: validation schemas + FormField wrapper + one example usage snippet only.
```

---

## 🚀 BƯỚC 08: NEXT.JS BEST PRACTICES & RENDERING STRATEGY

### 🎯 Mục tiêu kỹ thuật
Thiết lập chiến lược render (RSC vs Client Leaf), cấu hình tối ưu hình ảnh next/image, SEO metadata và code splitting.

### 📁 Tệp & Thư mục bàn giao
`next.config.ts, next/font (Serif + Sans), /lib/seo.ts (generateMetadata), loading/error skeletons per route, dynamic import`

### ⚠️ Ranh giới & Ràng buộc
Server Component là mặc định. Chỉ dùng "use client" ở các component lá nhỏ nhất có tương tác.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 08: NEXT.JS BEST PRACTICES & RENDERING STRATEGY] */
/* ========================================================================================== */

TASK: Document and scaffold ONLY the rendering/optimization conventions.
No feature pages yet.

- Decide and document per-route rendering strategy in a comment table:
  Home = static-ish (revalidate periodically), Rooms List = dynamic (filters),
  Room Detail = static with generateStaticParams from mock data + revalidate,
  Booking/Profile/Admin = dynamic, client-heavy.
- Set up next/font (1 serif + 1 sans from Step 2 tokens) in app/layout.tsx.
- Set up generateMetadata per route (title template, description, OG image
  placeholder) — create a /lib/seo.ts helper for consistent metadata objects.
- Establish the Server vs Client Component boundary rule as a comment:
  "Pages and data-fetching wrappers = Server Components. Anything with
  useState/useEffect/onClick/framer-motion = extract into a small Client
  Component leaf, imported into the Server Component page."
- Add loading.tsx and error.tsx at each route group level (marketing, account,
  admin) using the Skeleton/ErrorState components from Step 3.
- Confirm next/image is configured (remotePatterns for the mock image host)
  in next.config.ts.
- Add dynamic import() with next/dynamic for heavy client-only components
  (e.g. Gallery lightbox, Admin charts) to keep initial bundle light.

Output: config files, seo helper, loading/error boundaries, and the rendering
strategy comment table only.
```

---

## 🚀 BƯỚC 09: NAMING CONVENTION & CODE STYLE

### 🎯 Mục tiêu kỹ thuật
Văn bản hóa toàn bộ quy ước đặt tên file, component, hook, types, import order và tiêu chuẩn coding của dự án.

### 📁 Tệp & Thư mục bàn giao
`CONTRIBUTING.md`

### ⚠️ Ranh giới & Ràng buộc
PascalCase cho Component, useCamelCase cho Hook, kebab-case cho utils/routes/types. Prefix is/has cho boolean.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 09: NAMING CONVENTION & CODE STYLE] */
/* ========================================================================================== */

TASK: Produce ONLY a CONTRIBUTING.md-style convention document (no code).

Document, with examples, the rules already implied above so every future
prompt/AI session follows them without re-explaining:
- File naming: components PascalCase.tsx, hooks useCamelCase.ts,
  utils/lib kebab-case.ts, route folders/segments kebab-case,
  type files kebab-case.ts (e.g. room.ts, booking-dto.ts)
- Component naming: PascalCase, named after what they render, no "New"/"Final"/
  "V2" suffixes
- Props interfaces: `ComponentNameProps`
- Boolean props/vars prefixed is/has/can/should
- Folder-by-feature inside /components where a feature has 3+ related
  components (e.g. /components/booking/BookingStepper.tsx,
  BookingSummaryCard.tsx)
- Import order: external packages → internal absolute imports (@/...) →
  relative imports → types
- One component per file, default export for pages, named export for
  reusable components

Output: a single CONTRIBUTING.md file only.
```

---

## 🚀 BƯỚC 10: RESPONSIVE RULES

### 🎯 Mục tiêu kỹ thuật
Xác lập quy tắc thích ứng giao diện đa màn hình: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px).

### 📁 Tệp & Thư mục bàn giao
`RESPONSIVE_GUIDE.md`

### ⚠️ Ranh giới & Ràng buộc
Diện tích chạm (touch target) trên mobile tối thiểu 44x44px. Typography co giãn theo clamp(). Grid 1/2/3 cột rõ ràng.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 10: RESPONSIVE RULES] */
/* ========================================================================================== */

TASK: Produce ONLY a responsive design reference (doc + Tailwind config check),
no feature pages.

Document concrete rules (not just "must be responsive"):
- Breakpoints (must match /lib/design-tokens/breakpoints.ts from Step 2):
  mobile < 640px, tablet 640–1024px, desktop > 1024px, wide > 1280px
- Grid rules per section type:
  - Room cards: 1 col mobile, 2 col tablet, 3 col desktop
  - Amenities: 2 col mobile, 3 col tablet, 6 col desktop
  - Admin tables: horizontal scroll on mobile, full table desktop
- Typography scale rule: display/h1 shrink ~30-40% on mobile vs desktop
  (define exact clamp() values using tokens from Step 2)
- Spacing rule: section vertical padding = sm on mobile, lg on desktop
  (map to spacing tokens, not arbitrary values)
- Navigation rule: full nav bar desktop → hamburger + slide-in drawer mobile
- Booking widget: inline horizontal fields desktop → stacked full-width
  fields + sticky bottom CTA button on mobile
- Touch target minimum size 44x44px on all interactive elements on mobile

Output: a single RESPONSIVE_GUIDE.md document only.
```

---

## 🚀 BƯỚC 11: PERFORMANCE & OPTIMIZATION RULES

### 🎯 Mục tiêu kỹ thuật
Quy tắc tối ưu hiệu năng: LCP < 2.5s, CLS < 0.1, lazy load hình ảnh dưới nếp gấp, fetch song song Promise.all, debounce filter 300ms.

### 📁 Tệp & Thư mục bàn giao
`PERFORMANCE_GUIDE.md`

### ⚠️ Ranh giới & Ràng buộc
Tối đa 2-3 phần tử hoạt họa Framer Motion đồng thời trên một khung nhìn; phân trang mọi danh sách > 20 phần tử.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 11: PERFORMANCE & OPTIMIZATION RULES] */
/* ========================================================================================== */

TASK: Produce ONLY a performance checklist document, no code changes.

Document actionable (not just aspirational) rules:
- Max 2-3 simultaneously-animating elements per viewport (Framer Motion) —
  use `whileInView` with `viewport={{ once: true }}` instead of animating
  everything on mount
- All below-the-fold images: next/image with `loading="lazy"` (default);
  above-the-fold hero image: `priority`
- Heavy client-only widgets (gallery lightbox, charts, map) loaded via
  next/dynamic with `ssr: false` and a Skeleton fallback
- Avoid client-side waterfalls: fetch room + reviews in parallel
  (Promise.all), not sequential awaits
- Pagination or infinite scroll for any list > 20 items — never render
  unbounded lists
- Debounce filter/search inputs (300ms) before triggering a mock API call
- Target metrics to keep in mind while coding (not measured by AI, but
  guides decisions): LCP < 2.5s, CLS < 0.1, no layout shift from images
  (always set width/height or use fill with a sized parent)

Output: a single PERFORMANCE_GUIDE.md document only.
```

---

## 🚀 BƯỚC 12: GLOBAL UI STATE CONVENTION

### 🎯 Mục tiêu kỹ thuật
Chuẩn hóa xử lý trọn vẹn 5 trạng thái giao diện bắt buộc: Loading (Skeleton), Empty, Error (Retry), Success (Toast), Disabled.

### 📁 Tệp & Thư mục bàn giao
`UI_STATE_GUIDE.md + hoàn thiện bổ sung các variants trong Component Library`

### ⚠️ Ranh giới & Ràng buộc
Không bao giờ để màn hình rơi vào trạng thái chờ trống rỗng hoặc spinner toàn màn hình gây giật layout.

### 📋 Prompt chi tiết cho AI:

```markdown
/* ========================================================================================== */
/* [PHẦN 1: BASE RULE — BỘ QUY TẮC KỸ THUẬT NỀN TẢNG BẮT BUỘC CHO MỌI NHIỆM VỤ]             */
/* ========================================================================================== */

You are a Staff Frontend Engineer specializing in Next.js 15 (App Router), TypeScript, and Design Systems.
We are building a production-grade, highly scalable web application.

[GLOBAL EXECUTION CONSTRAINTS]
1. ZERO HALLUCINATION POLICY:
   - Do NOT invent unapproved dependencies, styling variables, or component patterns.
   - Strictly reuse design tokens (/lib/design-tokens), shared UI components (/components/ui), and standard DTOs.
2. NEXT.JS 15 ARCHITECTURE & RENDERING BOUNDARIES:
   - Default to React Server Components (RSC) for all pages and layouts.
   - Use "use client" ONLY at the lowest leaf nodes requiring user interactivity (events, hooks, local UI state).
   - Data fetching happens in Server Components or dedicated services (/services/*.service.ts). Components NEVER call fetch() or endpoints directly.
   - Never convert a whole page or layout into a Client Component just to use Zustand or hooks.
3. STATE & HYDRATION RULES:
   - Server data: Handled via RSC fetch / TanStack Query (no server data in global stores).
   - Client stores (Zustand): Reserved strictly for cross-step client UI flow (e.g., booking draft, auth session mock).
   - Zustand stores with persistence MUST implement safe hydration guards (skip rendering persisted state until mounted on client to prevent Next.js 15 hydration mismatch).
4. DATA & MAPPING CONTRACT:
   - Raw Domain Entities (/types) -> API Responses.
   - UI consumes ONLY explicit DTOs (/types/dto).
   - Transformation must happen via pure mapper functions in /lib/mappers or directly inside the service layer before reaching the UI.
5. CODE STYLE & COMPONENT STRUCTURE:
   - Follow strict folder ownership: 
     - Shared agnostic UI: /components/ui
     - Domain/feature isolated UI: /features/<feature-name>/components
     - Core utilities & tokens: /lib
   - Strict TypeScript: no `any`, strictly typed props interfaces (`ComponentNameProps`), typed events, and Zod schemas for all forms.

[DEFINITION OF DONE (DoD) - SELF-AUDIT BEFORE RETURNING CODE]
[ ] Fully responsive: mobile (<640px), tablet (640-1024px), desktop (>1024px). Minimum 44x44px touch targets.
[ ] No hardcoded Tailwind colors/spacing outside design tokens.
[ ] Accessible (semantic HTML, proper ARIA attributes, keyboard navigable).
[ ] 5 UI States handled where applicable: Loading (skeletons), Empty, Error (with retry), Success (transient toasts), Disabled.
[ ] Clean hydration: No mismatch between server render and client mount.
[ ] Zero console warnings or ESLint/TypeScript errors.

/* ========================================================================================== */
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 12: GLOBAL UI STATE CONVENTION] */
/* ========================================================================================== */

TASK: Produce ONLY a UI state convention document + verify/extend the
Component Library (Step 4) to fully cover it. No feature pages.

Every data-driven view in this project must resolve to exactly ONE of these
5 states at any time — document the exact component/pattern for each,
and ensure Step 4's components already cover them (add any missing variant):

1. LOADING → Skeleton component matching the shape of the eventual content
   (never a generic spinner for list/grid views — use RoomCardSkeleton,
   TableRowSkeleton, etc. so there's no layout shift when data arrives).
2. EMPTY → EmptyState component (icon + title + short description +
   optional CTA button) — used when a request succeeds but returns zero
   results (e.g. no rooms match filters, no bookings yet).
3. ERROR → ErrorState component (icon + message + "Retry" button that
   re-triggers the same fetch) — used when a request fails.
4. SUCCESS (transient action feedback) → Toast component, auto-dismiss
   ~3-4s, positioned consistently (e.g. top-right desktop / top mobile),
   variants: success (green), error (red), info (neutral).
5. DISABLED → consistent visual treatment for any disabled interactive
   element: reduced opacity (per a token, e.g. opacity-50), `cursor-not-allowed`,
   no hover/active transform, and `aria-disabled="true"`.

Also define the LOADING BUTTON pattern (used in every form submit across
the project): button shows a spinner + is disabled while a mutation is
pending, reverts on success/failure — implement as a `loading` prop on the
shared Button component if not already present from Step 4.

Output: UI_STATE_GUIDE.md + any missing Button/Skeleton/EmptyState/ErrorState/
Toast variant additions to the existing Component Library. Do not create new
pages.
```

---

