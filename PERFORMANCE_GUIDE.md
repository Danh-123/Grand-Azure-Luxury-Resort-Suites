# ⚡ GRAND AZURE LUXURY RESORT — PERFORMANCE & OPTIMIZATION GUIDE
## Quy tắc Tối ưu Hiệu năng Ứng dụng & Core Web Vitals

> **Mục tiêu:** Đạt chỉ số Core Web Vitals loại Tốt: **LCP < 2.5s**, **CLS < 0.1**, **FID/INP < 100ms**.

---

## 1. TỐI ƯU HÌNH ẢNH (`next/image`) & CHỐNG GIẬT BỐ CỤC (ZERO CLS)

1. **Quy tắc Above-the-fold (Hero Banner):**
   - Hình ảnh xuất hiện ngay khi mở trang chủ hoặc chi tiết phòng (Hero Image) **bắt buộc phải có thuộc tính `priority`**.
   - Điều này giúp trình duyệt ưu tiên tải ảnh sớm nhất, tối ưu hóa điểm số **LCP (Largest Contentful Paint)**.
2. **Quy tắc Below-the-fold:**
   - 100% hình ảnh nằm dưới nếp gấp màn hình phải giữ mặc định `loading="lazy"`.
3. **Triệt tiêu Layout Shift (CLS < 0.1):**
   - Luôn khai báo kích thước chính xác (`width` & `height`) hoặc sử dụng `fill` kèm thẻ cha có kích thước cố định (`aspect-video`, `h-56 w-full relative`).
   - Sử dụng `RoomCardSkeleton` mô phỏng chính xác khung hình ảnh và khối chữ trong khi dữ liệu đang được tải về.

---

## 2. QUY CHUẨN HOẠT HỌA FRAMER MOTION

1. **Giới hạn số lượng hoạt họa:**
   - **Tối đa 2-3 phần tử hoạt họa đồng thời** trên một khung nhìn viewport để tránh giật lag khung hình (60 FPS).
2. **Kích hoạt hoạt họa khi cuộn tới:**
   - Sử dụng thuộc tính `whileInView` kèm `viewport={{ once: true }}` thay vì kích hoạt animation toàn bộ trang khi mount ban đầu:
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
   >
     {children}
   </motion.div>
   ```

---

## 3. CODE SPLITTING VỚI `next/dynamic`

Các thư viện hoặc component tương tác nặng (như Biểu đồ doanh thu Recharts/Chart.js trong Admin, Thư viện Lightbox xem ảnh 360 độ) phải được tải động theo yêu cầu (**Dynamic Import**):

```tsx
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

export const DynamicRevenueChart = dynamic(
  () => import('@/features/admin/components/RevenueChart').then((mod) => mod.RevenueChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-80 w-full rounded-xl" />,
  }
);
```

---

## 4. CHỐNG NGHẼN THÁC DỮ LIỆU (ANTI-WATERFALL DATA FETCHING)

1. **Fetch dữ liệu song song với `Promise.all`:**
   - Tuyệt đối không `await` tuần tự hai truy vấn độc lập:
   ```typescript
   // ❌ SAI (Waterfall: tổng thời gian = t1 + t2):
   const room = await roomsService.getById(id);
   const reviews = await roomsService.getReviews(id);

   // ✅ ĐÚNG (Parallel: tổng thời gian = max(t1, t2)):
   const [room, reviews] = await Promise.all([
     roomsService.getById(id),
     roomsService.getReviews(id),
   ]);
   ```
2. **Debounce Tìm kiếm & Bộ lọc (300ms):**
   - Các ô nhập từ khóa tìm kiếm hoặc thanh kéo khoảng giá phải bọc hàm `debounce(300ms)` trước khi kích hoạt yêu cầu lọc dữ liệu để giảm tải cho server.
3. **Phân trang bắt buộc cho danh sách lớn (> 20 phần tử):**
   - Mọi danh sách phòng, đơn đặt phòng, hay đánh giá người dùng vượt quá 20 mục đều phải phân trang bằng component `Pagination` hoặc infinite scroll.

---
*Tài liệu này là căn cứ kiểm định trong bước QA & DoD của dự án.*

