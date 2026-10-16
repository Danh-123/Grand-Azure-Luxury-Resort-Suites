# 📱 GRAND AZURE LUXURY RESORT — RESPONSIVE DESIGN GUIDE
## Quy tắc Thích ứng Đa Màn hình (Mobile, Tablet, Desktop)

> **Căn cứ:** Hiến pháp Kỹ thuật `Antigravity.md` (Điều khoản 7) & `BaseRule.md`.  
> **Cam kết:** 100% trang web đạt chuẩn hiển thị cao cấp trên mọi thiết bị.

---

## 1. HỆ THỐNG BREAKPOINTS CHUẨN MỰC

Ánh xạ trực tiếp từ `src/lib/design-tokens/breakpoints.ts` vào Tailwind CSS:

| Breakpoint | Chiều rộng Viewport | Thiết bị Mục Tiêu | Quy ước Tailwind |
|---|---|---|---|
| **Mobile** | `< 640px` | iPhone, Android, màn hình dọc | Mặc định (không cần prefix) |
| **Tablet** | `640px – 1024px` | iPad, máy tính bảng ngang/dọc | `sm:` (640px) & `md:` (768px) |
| **Desktop** | `> 1024px` | Laptop, MacBook, PC văn phòng | `lg:` (1024px) & `desktop:` |
| **Wide Screen** | `> 1280px / 1536px` | Màn hình Retina lớn, 2K/4K | `xl:` (1280px) & `2xl:` / `wide:` |

---

## 2. QUY TẮC LƯỚI BỐ CỤC (GRID RULES PER SECTION)

1. **Danh sách Phòng & Biệt thự (Room Catalog Grid):**
   - **Mobile (< 640px):** `grid-cols-1` (1 thẻ phòng chiếm trọn chiều rộng để tối đa hóa kích thước ảnh).
   - **Tablet (640px - 1024px):** `grid-cols-2` (2 cột cân đối).
   - **Desktop (> 1024px):** `grid-cols-3` (3 cột chuẩn kèm sidebar bộ lọc cố định).
2. **Tiện ích Khách sạn (Amenities Showcase):**
   - **Mobile:** `grid-cols-2`
   - **Tablet:** `grid-cols-3`
   - **Desktop:** `grid-cols-6`
3. **Bảng Dữ liệu Quản trị & Lịch sử Đơn hàng (Data Tables):**
   - **Mobile & Tablet:** Bọc trong container `overflow-x-auto` với thanh cuộn mượt mà; thẻ tóm tắt dạng danh thiếp nếu cần.
   - **Desktop:** Hiển thị trọn vẹn đầy đủ các cột và nút thao tác trực tiếp.

---

## 3. TYPOGRAPHY CO GIÃN THÔNG MINH (FLUID CLAMP)

Tiêu đề và chữ lớn được co giãn tự động giữa Mobile và Desktop nhằm tránh tràn viền (overflow):

* **Display Heading:**
  * Mobile: `2.5rem` (40px)
  * Desktop: `3.75rem` (60px)
  * CSS Clamp: `clamp(2.5rem, 5vw + 1rem, 3.75rem)`
* **Heading 1 (H1):**
  * Mobile: `2.0rem` (32px)
  * Desktop: `3.0rem` (48px)
  * CSS Clamp: `clamp(2rem, 4vw + 1rem, 3rem)`
* **Heading 2 (H2):**
  * Mobile: `1.75rem` (28px)
  * Desktop: `2.25rem` (36px)

---

## 4. KHOẢNG CÁCH (SPACING & PADDING RULES)

Tuyệt đối không sử dụng pixel tùy ý. Sử dụng token từ `spacing.ts`:

* **Khoảng cách đệm dọc Section (`Section.tsx`):**
  * Mobile: `py-xl` (32px) hoặc `py-2xl` (48px).
  * Desktop: `py-3xl` (64px) hoặc `py-4xl` (96px).
* **Lề ngang Container (`Container.tsx`):**
  * Mobile: `px-md` (16px).
  * Tablet: `px-lg` (24px).
  * Desktop: `px-xl` (32px).

---

## 5. ĐIỀU HƯỚNG VÀ WIDGET ĐẶT PHÒNG ĐẶC BIỆT

1. **Header & Navigation:**
   * **Desktop:** Thanh menu ngang đầy đủ các link, nút CTA "Book Now", selector ngôn ngữ và avatar VIP.
   * **Mobile:** Thu gọn thành nút Hamburger menu; khi chạm sẽ trượt ra một Drawer toàn màn hình với touch targets thoáng đãng.
2. **Quick Booking Bar:**
   * **Desktop:** Thanh ngang tích hợp liền mạch các ô Check-in, Check-out, Guest Counter và nút Search.
   * **Mobile:** Chuyển đổi thành dạng xếp chồng (stacked full-width), kèm **thanh Sticky Bottom Bar cố định ở đáy màn hình** hiển thị giá phòng và nút CTA "Book Now" để khách dễ dàng thao tác bằng ngón tay cái.
3. **Diện tích chạm tối thiểu (Touch Target Minimum):**
   * **100% phần tử tương tác (nút bấm, link, ô chọn, counter) trên Mobile phải đạt diện tích tối thiểu $44 \times 44\text{px}$** (`min-h-touchMin min-w-touchMin`).

---
*Tài liệu này là cẩm nang hướng dẫn bắt buộc cho toàn bộ các màn hình Feature từ Step 13 trở đi.*

