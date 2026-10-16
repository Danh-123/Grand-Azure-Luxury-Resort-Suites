# 🎨 GRAND AZURE LUXURY RESORT — GLOBAL UI STATE CONVENTION
## Quy chuẩn 5 Trạng thái Giao diện Bắt buộc & Loading Button Pattern

> **Căn cứ:** Hiến pháp Kỹ thuật `Antigravity.md` (Điều khoản 6) & Definition of Done (DoD).  
> **Nguyên tắc vàng:** Mọi màn hình hoặc danh sách hiển thị dữ liệu đều phải xử lý nhất quán trọn vẹn 5 trạng thái này. Không bao giờ để giao diện rơi vào trạng thái chờ trống rỗng hay spinner toàn màn hình gây giật bố cục.

---

## 1. BẢNG QUY ĐỊNH 5 TRẠNG THÁI GIAO DIỆN

| STT | Trạng thái | Điều kiện Kích hoạt | Component Đảm nhiệm | Quy cách Thể hiện |
|:---:|---|---|---|---|
| **1** | **LOADING** | Đang tải dữ liệu ban đầu hoặc chuyển trang | `Skeleton.tsx` / `RoomCardSkeleton` / `TableRowSkeleton` | Mô phỏng chính xác khung hình ảnh và dòng chữ thực tế. Hiệu ứng pulse nhẹ nhàng; CLS < 0.1 |
| **2** | **EMPTY** | Fetch thành công nhưng kết quả trả về rỗng ($0$ phần tử) | `EmptyState.tsx` | Icon minh họa tinh tế, Tiêu đề thân thiện, Mô tả ngắn gọn kèm nút hành động (CTA) khôi phục bộ lọc |
| **3** | **ERROR** | Yêu cầu fetch hoặc kết nối máy chủ thất bại | `ErrorState.tsx` | Icon cảnh báo, thông điệp lỗi rõ ràng và **bắt buộc có nút "Thử lại" (Retry Button)** kích hoạt lại fetch |
| **4** | **SUCCESS** | Thao tác người dùng hoàn tất (Lưu đơn, Cập nhật hồ sơ) | `Toast.tsx` / `useToast()` | Thông báo nổi thoáng qua, tự đóng sau 3.5s, vị trí cố định góc trên bên phải màn hình |
| **5** | **DISABLED** | Phần tử chưa đủ điều kiện nhấn (thiếu input, form invalid) | Built-in props (`disabled={true}`) | Giảm độ đậm `opacity-50`, đổi con trỏ `cursor-not-allowed`, tắt hover scale, gắn `aria-disabled="true"` |

---

## 2. QUY CHUẨN "LOADING BUTTON PATTERN"

Mọi nút bấm gửi biểu mẫu hoặc kích hoạt mutation (Đặt phòng ngay, Xác nhận thanh toán, Đăng nhập, Hủy phòng) **BẮT BUỘC** phải tuân theo pattern:

```tsx
import { Button } from '@/components/ui/Button';

<Button
  type="submit"
  variant="primary"
  isLoading={isSubmitting} // Hiển thị spinner nội tuyến Lucide Loader2
  disabled={isSubmitting}  // Vô hiệu hóa tránh double-click
>
  Confirm & Pay Reservation
</Button>
```

---

## 3. MẪU XỬ LÝ 5 TRẠNG THÁI TRONG TRANG FEATURE

```tsx
export function RoomCatalogView({ isLoading, isError, rooms, onRetry, onResetFilters }) {
  // 1. Trạng thái Loading:
  if (isLoading) {
    return (
      <Grid cols={3} gap="lg">
        {Array.from({ length: 6 }).map((_, i) => (
          <RoomCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  // 2. Trạng thái Error:
  if (isError) {
    return (
      <ErrorState
        title="Không thể tải danh sách phòng"
        message="Hệ thống máy chủ đang bận xử lý hoặc kết nối mạng bị gián đoạn."
        retryLabel="Thử tải lại"
        onRetry={onRetry}
      />
    );
  }

  // 3. Trạng thái Empty:
  if (rooms.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy phòng phù hợp"
        description="Không có phòng nào phù hợp với bộ lọc giá và tiện ích bạn đã chọn."
        actionLabel="Xóa bộ lọc"
        onAction={onResetFilters}
      />
    );
  }

  // 4. Trạng thái Success: Render danh sách phòng bình thường
  return (
    <Grid cols={3} gap="lg">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </Grid>
  );
}
```

---
*Tài liệu này hoàn tất toàn bộ 12 bước của Giai đoạn 1 (Foundation Architecture). Codebase đã sẵn sàng 100% để bước sang Giai đoạn 2 (Feature Pages).*

