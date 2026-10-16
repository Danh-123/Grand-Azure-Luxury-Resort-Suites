# 🏛️ HOTEL MANAGEMENT SYSTEM — ARCHITECTURE CONVENTION
## Quy chuẩn Kiến trúc & Bản đồ Phân quyền Thư mục Dự án

> **Phiên bản:** 1.0 Production Grade  
> **Áp dụng cho:** Next.js 15 (App Router), TypeScript (Strict Mode), Tailwind CSS, Zustand, Zod  
> **Quy tắc pháp lý:** Bắt buộc tuân thủ 100% theo Hiến pháp Kỹ thuật `Antigravity.md` và `BaseRule.md`.

---

## 1. TÔN CHỈ THIẾT KẾ KIẾN TRÚC (ARCHITECTURAL PRINCIPLES)

1. **Feature-Driven Clean Architecture:** Mã nguồn được tổ chức theo tính năng (domain isolation). Mọi ranh giới giữa các module được phân định nghiêm ngặt.
2. **Zero Hallucination & Zero Drift:** Không tự ý đưa vào các thư viện ngoài danh mục đã thỏa thuận. Sử dụng 100% Design Tokens từ hệ thống.
3. **Anti-Preemption Policy (Không code đón đầu):** Mỗi bước chỉ tập trung thực hiện đúng phạm vi được giao. Tuyệt đối không tạo code logic hay components của các bước kế tiếp khi chưa tới phiên.
4. **Single Source of Truth (SSOT):** Mọi token, kiểu dữ liệu, hàm mapper và store đều có một vị trí duy nhất quy định.

---

## 2. BẢN ĐỒ CÂY THƯ MỤC CHUẨN (`/src`)

Toàn bộ mã nguồn ứng dụng được đặt thống nhất bên trong thư mục `/src`:

```
src/
├── app/                  # NEXT.JS 15 APP ROUTER ROUTES ONLY (Routing Boundaries)
│   ├── (marketing)/      # Route group công khai: "/", "/rooms", "/rooms/[slug]", "/booking"
│   ├── (auth)/           # Route group xác thực: "/login", "/register", "/forgot-password"
│   ├── (account)/        # Route group khách hàng: "/profile", "/bookings", "/bookings/[id]"
│   ├── admin/            # Phân hệ quản trị: "/admin/*"
│   ├── api/              # Route handlers mô phỏng API backend (Mock latency 300-800ms)
│   ├── layout.tsx        # Root layout (fonts, providers, global styles)
│   ├── loading.tsx       # Root loading fallback
│   ├── error.tsx         # Root error boundary (kèm nút thử lại)
│   └── not-found.tsx     # Root 404 page
│
├── components/           # REUSABLE UI PRIMITIVES (Feature-Agnostic)
│   ├── ui/               # Atomic components (Button, Input, Card, Badge, Modal, Toast...)
│   ├── layout/           # Shared layout primitives (Container, Section, Grid, Header, Footer)
│   └── form/             # Form primitives tích hợp React Hook Form + Zod (FormField, FormItem)
│
├── features/             # FEATURE-SCOPED MODULES (Domain Isolation)
│   ├── booking/          # Components, hooks phục vụ riêng cho luồng Booking Stepper
│   ├── rooms/            # Components, hooks phục vụ trang danh sách phòng & bộ lọc
│   ├── room-detail/      # Components, hooks phục vụ trang chi tiết phòng & widget tính giá
│   ├── auth/             # Components, hooks phục vụ đăng nhập / đăng ký
│   ├── account/          # Components, hooks phục vụ quản lý hồ sơ & đơn đặt phòng
│   └── admin/            # Components, hooks phục vụ bảng điều khiển quản trị
│
├── hooks/                # GLOBAL REUSABLE HOOKS (useMediaQuery, useDebounce, useScrollLock...)
├── lib/                  # PURE HELPERS & LOGIC (Không chứa JSX/React)
│   ├── design-tokens/    # colors.ts, typography.ts, spacing.ts, radius.ts, shadow.ts...
│   ├── mappers/          # Pure functions: Domain Entity -> UI DTO
│   ├── seo.ts            # generateMetadata helpers
│   └── utils.ts          # cn() tailwind-merge helper
│
├── services/             # API CALLING & DATA WRAPPERS (*.service.ts)
├── providers/            # APP-LEVEL CONTEXT PROVIDERS (Theme, Query, UI Providers)
├── schemas/              # ZOD VALIDATION SCHEMAS (*.schema.ts)
├── types/                # DOMAIN TYPES (Phản chiếu thực thể CSDL)
│   └── dto/              # DATA TRANSFER OBJECTS (UI-facing shapes)
├── store/                # ZUSTAND STORES (Client Flow State Only)
├── mock/                 # REALISTIC LUXURY HOTEL MOCK DATA
├── constants/            # GLOBAL CONSTANTS (Navigation, amenities, status enums)
└── styles/               # GLOBAL CSS (globals.css)
```

---

## 3. QUY TẮC PHÂN QUYỀN VÀ SỞ HỮU THƯ MỤC (STRICT FOLDER OWNERSHIP)

### A. Quy tắc sở hữu UI Components
- **Chỉ dùng cho 1 Feature:** Nằm tại `features/<feature-name>/components/`. Tuyệt đối không đưa lên `components/ui/`.
- **Dùng chung từ 2 Feature / 2 Trang trở lên:** Nằm tại `components/ui/` hoặc `components/layout/`.
- **Nguyên tắc "Thăng cấp" (Lift Up):** Nếu chưa chắc chắn một component có được tái sử dụng hay không, bắt đầu đặt tại `features/`. Khi xuất hiện trang thứ hai cần dùng, chủ động di chuyển lên `components/` — **không đoán trước để đưa lên sớm**.

### B. Cấm Tuyệt Đối Cross-Feature Import
- Các module bên trong `features/` độc lập hoàn toàn với nhau.
- **NGHIÊM CẤM:** `features/booking` import trực tiếp từ `features/admin` hoặc ngược lại.
- **Giải pháp:** Bất kỳ logic, hook hay UI nào cần chia sẻ giữa 2 feature bắt buộc phải được nhấc lên `components/`, `hooks/`, hoặc `lib/`.

### C. Vai trò của `app/`
- Thư mục `app/` chỉ làm nhiệm vụ kết nối (Orchestration Routing): đọc params, gọi Server Component hoặc Client Leaf Component từ `features/`.
- Tuyệt đối không viết component UI dài hoặc logic nghiệp vụ trực tiếp trong các file `page.tsx`.

---

## 4. RANH GIỚI RENDERING NEXT.JS 15 (SERVER VS CLIENT BOUNDARIES)

1. **Mặc định là React Server Components (RSC):**
   - 100% `page.tsx` và `layout.tsx` là Server Components.
   - Thực hiện fetch dữ liệu ban đầu, render SEO metadata, và chuẩn bị DTO ngay tại Server Components.
2. **Quy tắc "Leaf Component Only" cho Client Boundary:**
   - Chỉ đặt chỉ thị `"use client"` ở component lá (leaf node) nhỏ nhất có yêu cầu tương tác:
     * Component có sự kiện người dùng: `onClick`, `onChange`, `onSubmit`.
     * Component sử dụng React Hooks: `useState`, `useEffect`, `useRef`.
     * Component kết nối Zustand Store hoặc Form Context.
     * Component sử dụng hiệu ứng chuyển động tương tác của Framer Motion.
   - **CẤM:** Không được thêm `"use client"` ở đầu `page.tsx` hay `layout.tsx`.

---

## 5. HỢP ĐỒNG DỮ LIỆU & LỚP DỊCH VỤ (DATA CONTRACT & DTO)

```
[Backend / API / Mock]
        │
        ▼
[services/*.service.ts] ──> Gọi API, nhận Domain Entity (types/*.ts)
        │
        ▼
[/lib/mappers/*.ts]     ──> Pure Mapper chuyển Domain Entity -> UI DTO (types/dto/*.ts)
        │
        ▼
[UI Components]         ──> CHỈ chấp nhận và render UI DTOs
```

- **Lớp dịch vụ trung gian (`services/`):** Component và Page tuyệt đối không gọi `fetch()` trực tiếp. Mọi thao tác qua `services/*.service.ts`.
- **UI DTO:** UI chỉ tiêu thụ DTO từ `types/dto/`. Không để lộ cấu trúc bảng CSDL thô vào component.
- **Pure Mappers:** Chuyển đổi dữ liệu 100% qua các pure function tại `lib/mappers/`.

---

## 6. QUẢN LÝ STATE & HYDRATION GUARD

- **Server Data:** Tuyệt đối không đưa dữ liệu từ Server vào Zustand. Quản lý bằng RSC fetch hoặc TanStack Query.
- **Client Store (Zustand):** Chỉ dùng cho luồng state thuần client xuyên suốt các bước (`useBookingStore`, `useAuthStore`, `useFilterStore`, `useUIStore`).
- **Hydration Guard:** Toàn bộ Zustand store có tính năng persist (`localStorage`) bắt buộc phải bọc Hydration Guard để triệt tiêu lỗi hydration mismatch trên Next.js 15.

---

## 7. QUY CHUẨN 5 TRẠNG THÁI GIAO DIỆN (MANDATORY 5 UI STATES)

Mọi màn hình hoặc danh sách hiển thị dữ liệu đều phải xử lý đầy đủ 5 trạng thái:
1. **LOADING:** Sử dụng `Skeleton` mô phỏng chính xác khung hình nội dung. Không dùng spinner chung gây giật layout (CLS < 0.1).
2. **EMPTY:** Hiển thị `EmptyState` gồm Icon, Tiêu đề, Mô tả và nút kêu gọi hành động (CTA).
3. **ERROR:** Hiển thị `ErrorState` kèm nút **"Thử lại" (Retry Button)**.
4. **SUCCESS:** Phản hồi thoáng qua bằng `Toast` (tự đóng sau 3-4s).
5. **DISABLED:** Giảm opacity-50, con trỏ cursor-not-allowed, tắt hover, aria-disabled="true". Nút submit khi đang gọi mutation phải hiển thị inline spinner và bị disable.

---

## 8. HỆ THỐNG DESIGN TOKENS & RESPONSIVE

1. **Zero Hardcoded Values:** 100% mã màu, khoảng cách (spacing), bo góc (radius), đổ bóng (shadow) lấy từ `/lib/design-tokens` qua Tailwind CSS.
2. **Responsive chuẩn 3 Breakpoints:**
   - **Mobile (< 640px):** 1 cột grid, sticky bottom bar cho booking, mobile drawer menu, touch target tối thiểu **44x44px**.
   - **Tablet (640px - 1024px):** 2 cột grid, bảng biểu hỗ trợ cuộn ngang mượt mà.
   - **Desktop (> 1024px):** 3 cột grid, sticky sidebar, horizontal navigation.

---

## 9. BẢNG CHECKLIST DEFINITION OF DONE (DoD)

Trước khi coi bất kỳ nhiệm vụ nào là hoàn tất, kỹ sư và AI phải tự kiểm tra 12 tiêu chí:

| STT | Tiêu chí Kiểm định (Definition of Done) | Trạng thái |
|:---:|:---|:---:|
| 1 | **Đúng phạm vi Step:** Không có dòng code nào vượt ra ngoài Task được giao | `[ ]` |
| 2 | **Đúng vị trí thư mục:** Tuân thủ 100% bản đồ phân quyền thư mục kiến trúc | `[ ]` |
| 3 | **Ranh giới RSC/Client:** Mặc định RSC, chỉ dùng `"use client"` ở leaf components | `[ ]` |
| 4 | **Dữ liệu & Mapper:** Không gọi `fetch()` trực tiếp; UI chỉ nhận DTO qua Mapper | `[ ]` |
| 5 | **State & Hydration:** Server data không vào Zustand; Store persist có Hydration Guard | `[ ]` |
| 6 | **Đủ 5 UI States:** Xử lý Loading (Skeleton), Empty, Error (Retry), Success, Disabled | `[ ]` |
| 7 | **Zero Hardcoded Tokens:** 100% màu sắc, khoảng cách, radius truy xuất từ Design Tokens | `[ ]` |
| 8 | **Responsive 3 thiết bị:** Hoàn thiện hiển thị trên Mobile (<640px), Tablet, Desktop | `[ ]` |
| 9 | **Touch Target:** Tất cả nút bấm/link trên Mobile đạt diện tích chạm tối thiểu 44x44px | `[ ]` |
| 10 | **Strict TypeScript:** Không sử dụng `any`, có đầy đủ Props Interface và typed events | `[ ]` |
| 11 | **Form & Validation:** 100% form sử dụng React Hook Form + Zod + FormField dùng chung | `[ ]` |
| 12 | **Zero Warnings:** Không phát sinh lỗi console, ESLint error hay hydration mismatch | `[ ]` |

---
*Tài liệu kiến trúc này có hiệu lực xuyên suốt toàn bộ vòng đời phát triển dự án HOTEL SYSTEM.*

