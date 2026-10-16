# 🏛️ GRAND AZURE LUXURY RESORT — CONTRIBUTING & CODE STYLE CONVENTION
## Chuẩn mực Đặt tên, Tổ chức Mã nguồn & Phong cách Lập trình

> **Áp dụng cho:** Toàn bộ AI Coding Agents & Kỹ sư tham gia dự án HOTEL SYSTEM.  
> **Căn cứ pháp lý:** Hiến pháp Kỹ thuật `Antigravity.md` và `BaseRule.md`.

---

## 1. QUY ƯỚC ĐẶT TÊN TỆP & THƯ MỤC (FILE & FOLDER NAMING)

| Loại Tài Nguyên | Quy chuẩn Đặt tên | Ví dụ Chuẩn | Ví dụ Vi Phạm (Cấm) |
|---|---|---|---|
| **UI Component** | `PascalCase.tsx` | `Button.tsx`, `RoomCard.tsx` | `button.tsx`, `room_card.tsx` |
| **Custom React Hook** | `useCamelCase.ts` | `useMediaQuery.ts`, `useBooking.ts` | `UseMediaQuery.ts`, `use-booking.ts` |
| **Pure Utility / Lib** | `kebab-case.ts` | `utils.ts`, `seo.ts`, `format-date.ts` | `Utils.ts`, `formatDate.ts` |
| **Route Folders** | `kebab-case` | `rooms/`, `room-detail/`, `forgot-password/` | `RoomDetail/`, `forgot_password/` |
| **Route Dynamic Segment** | `[slug]` hoặc `[id]` | `[slug]/page.tsx`, `[id]/page.tsx` | `[roomSlug]/page.tsx`, `[id_booking]/` |
| **Domain Type / DTO** | `kebab-case.ts` | `room.ts`, `room.dto.ts`, `booking.dto.ts` | `Room.ts`, `bookingDTO.ts` |
| **Zod Schema** | `kebab-case.schema.ts` | `auth.schema.ts`, `booking.schema.ts` | `AuthSchema.ts`, `auth_schema.ts` |
| **Service Layer** | `kebab-case.service.ts` | `rooms.service.ts`, `booking.service.ts` | `RoomsService.ts`, `rooms_api.ts` |
| **Zustand Store** | `useCamelCaseStore.ts` | `useBookingStore.ts`, `useAuthStore.ts` | `bookingStore.ts`, `use-booking-store.ts` |

---

## 2. QUY ƯỚC ĐẶT TÊN COMPONENT & PROPS INTERFACE

### A. Tên Component
- Sử dụng **`PascalCase`**, mô tả trực diện chức năng hiển thị của component.
- **TUYỆT ĐỐI CẤM** các hậu tố/tiền tố mơ hồ như `ButtonNew`, `RoomCardFinal`, `BookingV2`, `ComponentTemp`.
- Mỗi file chỉ chứa **duy nhất 1 component chính** (Single Component per File).

### B. Props Interface
- Đặt tên theo mẫu chuẩn: **`[ComponentName]Props`**.
- Khai báo rõ ràng mọi kiểu dữ liệu, **nghiêm cấm sử dụng `any`**.
- Đặt `export interface` ngay phía trên định nghĩa component.

```typescript
// ✅ ĐÚNG CHUẨN:
export interface RoomCardProps {
  room: RoomCardDTO;
  onSelect?: (roomId: string) => void;
  isFeatured?: boolean;
  className?: string;
}

export function RoomCard({ room, onSelect, isFeatured = false, className }: RoomCardProps) {
  // ...
}
```

### C. Đặt tên Biến số Boolean
- Toàn bộ biến, thuộc tính props, hoặc hàm trả về giá trị `boolean` phải có tiền tố rõ nghĩa:
  - `is` (`isLoading`, `isAvailable`, `isHydrated`, `isOpen`, `isDisabled`)
  - `has` (`hasBreakfast`, `hasOceanView`, `hasError`)
  - `can` (`canCancel`, `canEdit`, `canSubmit`)
  - `should` (`shouldRedirect`, `shouldAutoClose`)

---

## 3. QUY TẮC EXPORT / IMPORT

### A. Export Chuẩn
- **Trang (`page.tsx`) và Layout (`layout.tsx`):** Luôn dùng `export default`.
- **Reusable Component & Helper Functions:** Luôn dùng **`Named Export`** (`export function Button(...)`) để tận dụng auto-import và refactor an toàn từ IDE.

### B. Thứ tự Import Chuẩn (Import Ordering)
Các file mã nguồn phải tuân thủ thứ tự sắp xếp import từ ngoài vào trong:

```typescript
// 1. External packages & React core
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

// 2. Internal absolute imports (@/components, @/lib, @/store, @/services)
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { useBookingStore } from '@/store/useBookingStore';
import { roomsService } from '@/services/rooms.service';
import { cn } from '@/lib/utils';

// 3. Types and DTOs (using import type)
import type { RoomCardDTO } from '@/types/dto/room.dto';
import type { BookingStatus } from '@/types/booking';

// 4. Local relative imports (if any, within feature boundaries)
import { StepperItem } from './StepperItem';
```

---

## 4. QUY TẮC PHÂN QUYỀN THƯ MỤC VÀ TÁI SỬ DỤNG

1. **Feature-Isolation:**
   - Component chỉ dùng ở 1 trang $\rightarrow$ đặt trong `features/<feature-name>/components/`.
   - Tuyệt đối cấm cross-feature import (`features/booking` không import từ `features/admin`).
2. **Promotion Rule (Nhấc component dùng chung):**
   - Khi một component được trang thứ hai sử dụng $\rightarrow$ di chuyển lên `components/ui/` hoặc `components/layout/`.
   - Không tự ý đoán trước để đặt vào `components/ui/` khi chưa có nhu cầu sử dụng thực tế từ 2 trang.

---
*Tài liệu này là quy ước lập trình bắt buộc đối với toàn bộ thành viên dự án HOTEL SYSTEM.*

