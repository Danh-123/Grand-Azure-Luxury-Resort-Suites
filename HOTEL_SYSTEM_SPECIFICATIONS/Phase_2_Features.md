# PHASE 2: FEATURE PAGES IMPLEMENTATION
## HIỆN THỰC HÓA CÁC TRANG TÍNH NĂNG CỐT LÕI (BƯỚC 13 – BƯỚC 19)

> **Mô tả:** Hiện thực hóa 7 phân hệ tính năng người dùng hoàn chỉnh trên nền tảng Foundation: Trang chủ (Home), Danh sách phòng (Rooms List), Chi tiết phòng (Room Detail), Quy trình đặt phòng 4 bước (Booking Stepper), Xác thực (Auth), Quản lý hồ sơ & Đơn đặt phòng (Profile & My Bookings), và Bảng điều khiển quản trị (Admin Dashboard).

---

## 📑 DANH MỤC CÁC BƯỚC THỰC THI

| Bước | Tên Bước | Sản phẩm bàn giao |
|:---:|:---|:---|
| Step 13 | **Home Page** | `app/(marketing)/page.tsx + /components/home/* (Hero, Featured Rooms, Amenities, Experience, Testimonials, Gallery, CTA)` |
| Step 14 | **Rooms List Page** | `app/(marketing)/rooms/page.tsx + /components/rooms/* (FilterSidebar, SortBar, RoomGrid)` |
| Step 15 | **Room Detail Page** | `app/(marketing)/rooms/[slug]/page.tsx + /components/room-detail/* (RoomGallery, BookingWidget, ReviewList)` |
| Step 16 | **Booking Page (Multi-step Flow)** | `app/(marketing)/booking/page.tsx, booking/confirmation/page.tsx + /components/booking/* (BookingStepper, SummaryCard)` |
| Step 17 | **Auth Pages** | `app/(auth)/login/page.tsx, register/page.tsx, forgot-password/page.tsx + /components/auth/AuthCard.tsx` |
| Step 18 | **Profile + My Bookings** | `app/(account)/profile/page.tsx, profile/edit/page.tsx, bookings/page.tsx, bookings/[id]/page.tsx + /components/account/*` |
| Step 19 | **Admin Dashboard** | `app/admin/page.tsx, rooms/page.tsx, bookings/page.tsx, users/page.tsx, reviews/page.tsx + AdminLayout + /components/admin/*` |

---

## 🚀 BƯỚC 13: HOME PAGE

### 🎯 Mục tiêu kỹ thuật
Xây dựng trang chủ chuẩn luxury hospitality với video/image hero, widget đặt phòng nhanh nhúng sẵn, grid phòng nổi bật.

### 📁 Tệp & Thư mục bàn giao
`app/(marketing)/page.tsx + /components/home/* (Hero, Featured Rooms, Amenities, Experience, Testimonials, Gallery, CTA)`

### ⚠️ Ranh giới & Ràng buộc
Tái sử dụng Design Tokens và Component Library từ Phase 1. Featured rooms xử lý đủ Loading Skeleton và Error Retry.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 13: HOME PAGE] */
/* ========================================================================================== */

TASK: Build ONLY the Home Page content ("/" inside the (marketing) route group).
Reuse Design Tokens (Step 2), Component Library (Step 3), and consume data via
RoomCardDTO + mappers (Step 4) — do not invent new colors, buttons, or data shapes.

Scope strictly limited to these sections, in this order:
1. Hero Section — fullscreen cinematic background image, dark gradient overlay,
   luxury branding title + short emotional subtitle, BookingWidget embedded
   (Check-in date, Check-out date, Guests stepper, Search button — on submit,
   navigate to /rooms with query params).
2. Featured Rooms — max 6 RoomCard components (from Component Library),
   fetched from GET /api/rooms (Step 4), mapped through toRoomCardDTO.
3. Amenities — grid (2 rows max, responsive per Step 10 rules): Spa, Pool, Gym,
   Restaurant, Lounge, Free WiFi — icon + label only.
4. Experience Section — split layout (image + text), luxury storytelling tone,
   no forms.
5. Testimonials — carousel or grid, max 6 reviews, star Rating component,
   pulled from mock reviews.
6. Gallery Preview — masonry layout, hover zoom (Framer Motion), no lightbox.
7. CTA Section — single strong message, "Book Your Stay" Button (primary,
   links to /rooms).
8. Footer — placeholder only (full Footer built in Step 20).

Do NOT create other pages. Do NOT build a real Header/Footer yet — use a
minimal temporary nav so the page is previewable (final one comes in Step 20).

STATE HANDLING: Featured Rooms section must show RoomCardSkeleton while
loading and ErrorState with retry if the mock API call fails.

Output: Home page + any Home-only section components in /components/home/*.
```

---

## 🚀 BƯỚC 14: ROOMS LIST PAGE

### 🎯 Mục tiêu kỹ thuật
Xây dựng trang danh sách phòng với bộ lọc đa tiêu chí (giá, loại phòng, tiện ích, số khách), thanh sắp xếp và phân trang thật.

### 📁 Tệp & Thư mục bàn giao
`app/(marketing)/rooms/page.tsx + /components/rooms/* (FilterSidebar, SortBar, RoomGrid)`

### ⚠️ Ranh giới & Ràng buộc
FilterSidebar trên desktop chuyển thành FilterDrawer trên mobile. Kết nối useFilterStore và query params.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 14: ROOMS LIST PAGE] */
/* ========================================================================================== */

TASK: Build ONLY the Rooms List Page ("/rooms"). Reuse Design Tokens,
Component Library, RoomCardDTO, and useFilterStore (Step 6) — do not build a
new state pattern for filters.

Scope:
- Filter sidebar (desktop) / filter drawer (mobile, per Step 10 responsive
  rules): price range slider, capacity filter, room type filter, amenities
  checkboxes. Bound to useFilterStore — filters are functional against the
  mock GET /api/rooms?minPrice=&maxPrice=&capacity=&type= query params.
- Sort bar: Price low→high, Price high→low, Most popular, Newest — also
  drives the API query.
- Room grid: RoomCard components (reused from Component Library / Home page),
  responsive grid per Step 10 (1 col mobile, 2 tablet, 3 desktop).
- Pagination component (from Step 3) — real pagination against mock data
  (paginate the mock array, not fake UI-only).
- Each RoomCard "View Details" button navigates to /rooms/[slug].

STATE HANDLING: Loading = grid of RoomCardSkeleton. Empty = EmptyState
("No rooms match your filters" + "Clear filters" button). Error = ErrorState
with retry.

Do NOT build the Room Detail Page.

Output: Rooms List page + FilterSidebar/SortBar components in /components/rooms/*.
```

---

## 🚀 BƯỚC 15: ROOM DETAIL PAGE

### 🎯 Mục tiêu kỹ thuật
Xây dựng trang chi tiết phòng: thư viện ảnh tương tác, widget tính giá tự động cố định (sticky), danh sách đánh giá và phòng tương tự.

### 📁 Tệp & Thư mục bàn giao
`app/(marketing)/rooms/[slug]/page.tsx + /components/room-detail/* (RoomGallery, BookingWidget, ReviewList)`

### ⚠️ Ranh giới & Ràng buộc
Khi nhấn "Book Now" đẩy dữ liệu vào useBookingStore và chuyển hướng sang /booking. Không gọi backend thật.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 15: ROOM DETAIL PAGE] */
/* ========================================================================================== */

TASK: Build ONLY the Room Detail Page ("/rooms/[slug]"). Fetch via
GET /api/rooms/[id], map through toRoomDetailDTO. Use generateStaticParams
+ ISR per Step 8 rendering strategy.

Scope:
- Gallery: large main image + thumbnail strip below, click thumbnail to swap
  main image (client component, useState — no lightbox needed).
- Room info: name, price/night, Rating component, description, capacity,
  bed type, size.
- Amenities: icon list (reuse Amenity icon mapping from Home page).
- Booking widget (sticky sidebar desktop / sticky bottom bar mobile per
  Step 10): Check-in, Check-out, Guests, auto price calculation (nights ×
  pricePerNight, mock tax/fee logic from priceBreakdown shape in Step 4),
  "Book Now" button — on click, call useBookingStore.setRoom() +
  setDates() + navigate to /booking.
- Reviews section: fetch GET /api/rooms/[id]/reviews, star Rating, user
  name, comment, date — paginated or "show more" if > 6.
- Related rooms: 3-4 RoomCard components (same room type or nearby price),
  reused component from Rooms List.

RULE: No payment logic, no backend calls beyond the mock endpoints listed.

Output: Room Detail page + RoomGallery/BookingWidget/ReviewList components
in /components/room-detail/*.
```

---

## 🚀 BƯỚC 16: BOOKING PAGE (MULTI-STEP FLOW)

### 🎯 Mục tiêu kỹ thuật
Xây dựng quy trình đặt phòng 4 bước mượt mà (Dates & Guests -> Guest Info -> Summary -> Confirmation) với Framer Motion.

### 📁 Tệp & Thư mục bàn giao
`app/(marketing)/booking/page.tsx, booking/confirmation/page.tsx + /components/booking/* (BookingStepper, SummaryCard)`

### ⚠️ Ranh giới & Ràng buộc
useBookingStore là nguồn dữ liệu duy nhất giữa các bước. Validate bằng Zod guestInfoSchema. Sidebar tóm tắt cố định.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 16: BOOKING PAGE (MULTI-STEP FLOW)] */
/* ========================================================================================== */

TASK: Build ONLY the Booking Page ("/booking" + "/booking/confirmation").
This is a client-heavy multi-step flow — use useBookingStore (Step 6)
as the single source of truth across all steps, and guestInfoSchema
(Step 7) for validation. If no room is selected in the store on load,
redirect to /rooms.

Scope — 4 steps in one flow (stepper UI, Framer Motion transitions between
steps, back/next navigation):

STEP 1 — Dates & Guests: Check-in, Check-out, Guests — pre-filled from
useBookingStore if arriving from Room Detail; editable.

STEP 2 — Guest Info: Full name, Email, Phone — React Hook Form + Zod
(guestInfoSchema), using the shared FormField component (Step 7).

STEP 3 — Booking Summary: Room (thumbnail + name), Nights, full price
breakdown (subtotal, taxes, fees, total from Step 4 DTO shape), guest info
review, "Confirm Booking" button.

STEP 4 — Confirmation: on confirm, POST /api/bookings (mock), on success
show success screen with mock Booking ID, "View My Booking" CTA →
/bookings/[id], and reset useBookingStore.

Also build a persistent BookingSummaryCard sidebar (desktop) visible
across steps 1-3, showing the room + running price total.

RULES: No payment gateway. Only frontend (Zod) validation — no backend
validation needed since backend doesn't exist. Smooth step transitions
(Framer Motion). Handle the "POST fails" case with an ErrorState + retry
on Step 3, not a silent failure.

Output: Booking page + confirmation page + BookingStepper/BookingSummaryCard
components in /components/booking/*.
```

---

## 🚀 BƯỚC 17: AUTH PAGES

### 🎯 Mục tiêu kỹ thuật
Xây dựng các trang xác thực (Đăng nhập, Đăng ký, Quên mật khẩu) trên layout tối giản, tích hợp Zod validation và useAuthStore mock session.

### 📁 Tệp & Thư mục bàn giao
`app/(auth)/login/page.tsx, register/page.tsx, forgot-password/page.tsx + /components/auth/AuthCard.tsx`

### ⚠️ Ranh giới & Ràng buộc
Business Rule: Khách vãng lai xem được phòng nhưng bắt buộc phải đăng nhập ở Bước 4 của quy trình Booking mới hoàn tất được.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 17: AUTH PAGES] */
/* ========================================================================================== */

TASK: Build ONLY the auth pages ("/login", "/register", "/forgot-password"
inside the (auth) route group with its minimal layout). Use loginSchema /
registerSchema / forgotPasswordSchema (Step 7) + FormField component, and
useAuthStore (Step 6) for the fake session.

- Login: Email, Password fields, "Forgot password?" link, "Sign in" button
  (calls POST /api/auth/login mock, loading state on button, on success
  sets useAuthStore + redirects to /profile, on failure shows inline error
  banner "Invalid credentials" — mock: any input succeeds except a hardcoded
  test failure case for demo purposes).
- Register: Name, Email, Password, Confirm password — Zod cross-field
  validation (password === confirmPassword) — on success, auto-login +
  redirect to /profile.
- Forgot Password: Email field only, on submit show a success message
  state (no real email sent, just UI confirmation).

BUSINESS RULE (explicit, do not deviate): Guests CAN browse Home, Rooms List,
and Room Detail without logging in. Guests CANNOT complete Step 4 (final
confirm) of the Booking flow without being authenticated — if
useAuthStore.isAuthenticated is false at Step 3→4, redirect to /login with a
return URL back to /booking.

RULES: UI only, no real auth/JWT. Fake API calls with visible loading state
on submit buttons. Basic Zod validation only.

Output: 3 auth pages + shared AuthCard layout wrapper in /components/auth/*.
```

---

## 🚀 BƯỚC 18: PROFILE + MY BOOKINGS

### 🎯 Mục tiêu kỹ thuật
Xây dựng trung tâm tài khoản khách hàng: xem/sửa hồ sơ, danh sách đơn đặt phòng với Status Badges, hủy đơn qua Modal xác nhận.

### 📁 Tệp & Thư mục bàn giao
`app/(account)/profile/page.tsx, profile/edit/page.tsx, bookings/page.tsx, bookings/[id]/page.tsx + /components/account/*`

### ⚠️ Ranh giới & Ràng buộc
Bảo vệ bằng useAuthStore (chưa đăng nhập chuyển về /login). Hủy đơn cập nhật giao diện lạc quan (optimistic) + toast.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 18: PROFILE + MY BOOKINGS] */
/* ========================================================================================== */

TASK: Build ONLY the account pages ("/profile", "/profile/edit", "/bookings",
"/bookings/[id]" inside the (account) route group). Requires
useAuthStore.isAuthenticated — if false, redirect to /login.

Scope:
- Profile page: Avatar, Name, Email, Phone (read-only display) + "Edit
  Profile" button → /profile/edit.
- Edit Profile: form (profileEditSchema + FormField, Step 7) — Avatar
  upload UI (file picker, preview only, no real upload), Name, Email,
  Phone — Save button with loading state, toast on success.
- My Bookings list ("/bookings"): fetch GET /api/bookings?userId=,
  map to BookingSummaryDTO, render as list/cards: room name, dates,
  status Badge (pending/confirmed/cancelled/completed — Step 3 Badge
  variants), "View details" → /bookings/[id], "Cancel" button (only shown
  if status is pending/confirmed) → PATCH /api/bookings/[id] mock,
  optimistic UI update + toast.
- Booking Detail ("/bookings/[id]"): full BookingDetailDTO — room info,
  full price breakdown, guest info, status, "Cancel Booking" if eligible
  (confirm via Modal from Step 3 before cancelling).

STATE HANDLING: My Bookings list needs Loading (skeleton list), Empty
("You have no bookings yet" + "Browse Rooms" CTA), Error (retry) states.

Output: profile pages + booking list/detail pages + related components in
/components/account/*.
```

---

## 🚀 BƯỚC 19: ADMIN DASHBOARD

### 🎯 Mục tiêu kỹ thuật
Xây dựng phân hệ quản trị với Sidebar điều hướng, 4 Cards thống kê chỉ số, biểu đồ doanh thu dynamic import và các bảng CRUD.

### 📁 Tệp & Thư mục bàn giao
`app/admin/page.tsx, rooms/page.tsx, bookings/page.tsx, users/page.tsx, reviews/page.tsx + AdminLayout + /components/admin/*`

### ⚠️ Ranh giới & Ràng buộc
Phân quyền nghiêm ngặt chỉ cho phép role === "admin". Thao tác chỉnh sửa/xóa là local/optimistic với Modal xác nhận.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 19: ADMIN DASHBOARD] */
/* ========================================================================================== */

TASK: Build ONLY the Admin section ("/admin/*"), with its own AdminLayout
(sidebar nav: Dashboard, Rooms, Bookings, Users, Reviews — collapsible on
mobile/tablet). Gate access on useAuthStore.user.role === 'admin' (redirect
non-admins to "/" ). Reuse Component Library only — do not invent new
table/chart primitives without checking Step 3 first.

Scope:
- Dashboard overview ("/admin"): 4 summary Cards (Total Bookings, Revenue,
  Occupancy Rate, Total Users) computed from mock data; 1-2 simple charts
  (bookings over time, revenue by room type) using a lightweight chart lib,
  loaded via next/dynamic (Step 8 perf rule).
- Rooms management ("/admin/rooms"): table (search bar, pagination,
  columns: thumbnail, name, price, status, actions), Edit/Delete are
  UI-only (open a Modal, no real mutation persisted beyond local state).
- Bookings management ("/admin/bookings"): table with status Badge, filter
  by status, search, pagination — view detail opens Modal with
  BookingDetailDTO.
- Users management ("/admin/users"): table (avatar, name, email, role,
  joined date), search, pagination.
- Reviews management ("/admin/reviews"): table (room, user, rating,
  comment excerpt, date), search, pagination, "Delete" UI-only action.

RULES: No backend logic — all mutations are local/optimistic only. Mock
data only (Step 4). Clean SaaS dashboard aesthetic (distinct from the
luxury marketing pages — more functional/dense, still using the same
design tokens for color/spacing consistency).

Output: admin layout + 5 admin pages + Table/Chart wrapper components in
/components/admin/*.
```

---

