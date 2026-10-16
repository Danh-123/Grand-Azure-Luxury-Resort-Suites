# PHASE 3: POLISHING & PRODUCTION READINESS
## HOÀN THIỆN ĐIỀU HƯỚNG, TRANG LỖI TOÀN CỤC & TỔNG DUYỆT QA (BƯỚC 20 – BƯỚC 22)

> **Mô tả:** Hoàn thiện toàn bộ hệ thống điều hướng thực tế (Header/Footer đa thiết bị), các trang biên trạng thái toàn cục (Loading, Error Boundary, 404 Not Found), và thực hiện phiên kiểm định chất lượng tổng thể (QA Report) xác nhận 100% tiêu chí Definition of Done trước khi kết nối cơ sở dữ liệu và API Backend.

---

## 📑 DANH MỤC CÁC BƯỚC THỰC THI

| Bước | Tên Bước | Sản phẩm bàn giao |
|:---:|:---|:---|
| Step 20 | **Global Layout & Navigation** | `/components/layout/Header.tsx, Footer.tsx + tích hợp vào layout.tsx của (marketing) và (account)` |
| Step 21 | **Global Loading / Error / 404 Pages** | `app/loading.tsx, app/error.tsx, app/not-found.tsx + overrides tại các route groups` |
| Step 22 | **QA Checklist & DoD Verification** | `QA_REPORT.md + các bản sửa lỗi (bug-fix diffs) trong phạm vi hiện tại` |

---

## 🚀 BƯỚC 20: GLOBAL LAYOUT & NAVIGATION

### 🎯 Mục tiêu kỹ thuật
Xây dựng Header và Footer chính thức thay thế nav tạm: Auth-aware dropdown, mobile drawer trượt, sitemap và branding.

### 📁 Tệp & Thư mục bàn giao
`/components/layout/Header.tsx, Footer.tsx + tích hợp vào layout.tsx của (marketing) và (account)`

### ⚠️ Ranh giới & Ràng buộc
Không nhúng Header/Footer chung vào (auth) và admin vì các phân hệ này có layout riêng biệt.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 20: GLOBAL LAYOUT & NAVIGATION] */
/* ========================================================================================== */

TASK: Build ONLY the real Header and Footer, replacing the temporary nav
used in Step 13, and wire them into the (marketing) and (account) layouts
(NOT into (auth) or admin, which keep their own minimal/sidebar layouts).

- Header: logo, nav links (Home, Rooms, [About/Contact if desired — ask
  scope, do not invent pages), auth-aware right side (Sign in/Register
  buttons if !isAuthenticated, else Avatar dropdown with Profile/My
  Bookings/Logout if isAuthenticated — read from useAuthStore). Desktop =
  full horizontal nav; mobile = hamburger + slide-in drawer (Framer Motion,
  per Step 10).
- Footer: brand blurb, sitemap links (Rooms, Booking, Login), contact info
  placeholder, social icons, copyright line.
- Wire both into the actual route group layouts, replacing all temporary
  nav placeholders added during Step 13-18.

Output: Header, Footer components + updated layout.tsx files in the
relevant route groups only.
```

---

## 🚀 BƯỚC 21: GLOBAL LOADING / ERROR / 404 PAGES

### 🎯 Mục tiêu kỹ thuật
Xây dựng các trang thông báo toàn cục chuẩn nhận diện thương hiệu sang trọng: 404 tùy biến, Error Boundary có nút thử lại, loading skeleton.

### 📁 Tệp & Thư mục bàn giao
`app/loading.tsx, app/error.tsx, app/not-found.tsx + overrides tại các route groups`

### ⚠️ Ranh giới & Ràng buộc
Mỗi route group có thể override skeleton phù hợp (ví dụ Admin hiển thị TableSkeleton thay vì spinner toàn trang).

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 21: GLOBAL LOADING / ERROR / 404 PAGES] */
/* ========================================================================================== */

TASK: Build ONLY the root-level and route-group-level loading.tsx,
error.tsx, and not-found.tsx (scaffolded empty in Step 5/8 — now give them
real content), using Skeleton/ErrorState/EmptyState from Step 3.

- Root not-found.tsx: on-brand 404 with "Back to Home" CTA.
- Root error.tsx: on-brand error boundary with "Try again" (reset()) and
  "Back to Home" actions.
- Root loading.tsx: full-page branded loading (logo + subtle animation).
- Each route group (marketing, account, admin) may override with a more
  specific skeleton matching that section's layout if it improves UX
  (e.g. admin loading.tsx shows a table skeleton, not a full-page spinner).

Output: loading/error/not-found files across app/ and each route group only.
```

---

## 🚀 BƯỚC 22: QA CHECKLIST & DOD VERIFICATION

### 🎯 Mục tiêu kỹ thuật
Tổng kiểm tra toàn bộ 16 tiêu chí kỹ thuật dự án (DoD, Responsive, Accessibility, TypeScript strict, Zero Hardcoded Tokens).

### 📁 Tệp & Thư mục bàn giao
`QA_REPORT.md + các bản sửa lỗi (bug-fix diffs) trong phạm vi hiện tại`

### ⚠️ Ranh giới & Ràng buộc
Tuyệt đối không viết thêm tính năng mới. Chỉ rà soát và khắc phục các điểm chưa đạt chuẩn trước khi bàn giao.

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
/* [PHẦN 2: TASK EXECUTION SPECIFICATION — NHIỆM VỤ BƯỚC 22: QA CHECKLIST & DOD VERIFICATION] */
/* ========================================================================================== */

TASK: Do NOT write new features. Run a full self-review pass and produce a
QA_REPORT.md documenting the status of each item below (Pass/Fail/Partial +
short note), then fix any Fail items found within existing scope only
(no new features).

Checklist to verify:
- [ ] Every page/list has working Loading, Empty, and Error states
- [ ] No hardcoded color/spacing/radius values — all trace back to design tokens
- [ ] No component duplicates the same visual role differently (audit all
      buttons, cards, badges across every page)
- [ ] All DTOs/types consistent — no field name drift between pages
      (spot-check: price field name identical everywhere)
- [ ] All routes match the Step 5 route table exactly
- [ ] Responsive verified at mobile/tablet/desktop for every page (Step 10)
- [ ] Guest-vs-auth booking rule enforced correctly (Step 17 business rule)
- [ ] All images use next/image, all fonts use next/font
- [ ] No unbounded lists — all paginated (Step 11)
- [ ] Animations are subtle, not excessive, use whileInView where applicable
- [ ] All forms use React Hook Form + Zod + shared FormField (Step 7)
- [ ] Naming convention followed project-wide (Step 9 CONTRIBUTING.md)
- [ ] Project Architecture Convention followed — every file sits in its
      designated folder (components/ vs features/ vs services/ vs lib/...)
- [ ] Every screen/action resolves to a state defined in the Global UI
      State Convention (Step 12) — no orphan spinner-only or blank-only states
- [ ] Every prompt's output satisfies the Definition of Done checklist in
      the Base Rule Prompt
- [ ] Admin section properly gated behind role === 'admin'
- [ ] All mock API routes simulate network delay and can simulate failure
      (for testing Error states)

Output: QA_REPORT.md + any necessary bug-fix diffs, strictly within existing
scope (no new pages/features).
```

---

