-- ==============================================================================
-- 🏛️ GRAND AZURE LUXURY RESORT & SUITES - PRODUCTION SUPABASE DATABASE SCHEMA
-- Author: Lead PostgreSQL & Supabase Architect
-- Purpose: Complete enterprise-grade schema with strict business constraints,
--          anti-double-booking exclusion locks, RLS security policies, and seed data.
-- How to use: Copy and execute this entire script in Supabase Dashboard -> "SQL Editor"
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
-- btree_gist is REQUIRED for Exclusion Constraint (chống trùng lịch phòng)
CREATE EXTENSION IF NOT EXISTS "btree_gist";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. ENUMS (Kiểu dữ liệu trạng thái chuẩn hóa)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('GUEST', 'RECEPTIONIST', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE room_status AS ENUM ('CLEAN', 'DIRTY', 'MAINTENANCE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('UNPAID', 'PAID', 'REFUNDED', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 3. TABLES & BUSINESS CONSTRAINTS
-- ------------------------------------------------------------------------------

-- 3.1. User Profiles (Mở rộng từ auth.users của Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'GUEST',
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(32),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3.2. Room Types (Hạng phòng)
CREATE TABLE IF NOT EXISTS public.room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(128) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  base_price NUMERIC(12, 2) NOT NULL,
  capacity_adults INT NOT NULL DEFAULT 2,
  capacity_children INT NOT NULL DEFAULT 0,
  size_sqm INT NOT NULL,
  bed_type VARCHAR(64) NOT NULL DEFAULT 'King',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- CHECK CONSTRAINTS: Nghiệp vụ giá & sức chứa
  CONSTRAINT chk_base_price CHECK (base_price > 0),
  CONSTRAINT chk_capacity_adults CHECK (capacity_adults >= 1),
  CONSTRAINT chk_capacity_children CHECK (capacity_children >= 0),
  CONSTRAINT chk_size_sqm CHECK (size_sqm > 0)
);

-- 3.3. Rooms (Phòng thực tế gắn với số phòng)
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number VARCHAR(32) UNIQUE NOT NULL,
  room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE RESTRICT,
  status room_status NOT NULL DEFAULT 'CLEAN',
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_room_number_not_empty CHECK (length(trim(room_number)) >= 1)
);

-- 3.4. Room Images (Thư viện hình ảnh sắc nét)
CREATE TABLE IF NOT EXISTS public.room_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_image_url_format CHECK (image_url ~* '^https?://')
);

-- 3.5. Amenities (Tiện ích chuẩn 5 sao)
CREATE TABLE IF NOT EXISTS public.amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(128) UNIQUE NOT NULL,
  icon VARCHAR(64) NOT NULL,
  category VARCHAR(64) DEFAULT 'General',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3.6. Room Type Amenities (Bảng nối n - n)
CREATE TABLE IF NOT EXISTS public.room_type_amenities (
  room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES public.amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (room_type_id, amenity_id)
);

-- 3.7. Bookings (Đơn đặt phòng)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code VARCHAR(32) UNIQUE NOT NULL,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE RESTRICT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INT NOT NULL DEFAULT 2,
  children INT NOT NULL DEFAULT 0,
  total_price NUMERIC(12, 2) NOT NULL,
  status booking_status NOT NULL DEFAULT 'PENDING',
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(64) NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- CHECK CONSTRAINTS: Nghiệp vụ ngày, số khách & liên hệ
  CONSTRAINT chk_booking_dates CHECK (check_out > check_in),
  CONSTRAINT chk_booking_total_price CHECK (total_price >= 0),
  CONSTRAINT chk_booking_adults CHECK (adults >= 1),
  CONSTRAINT chk_booking_children CHECK (children >= 0),
  CONSTRAINT chk_guest_name CHECK (length(trim(guest_name)) >= 2),
  CONSTRAINT chk_guest_email CHECK (guest_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT chk_guest_phone CHECK (length(trim(guest_phone)) >= 7)
);

-- 3.8. Booking Payments (Giao dịch thanh toán cổng điện tử)
CREATE TABLE IF NOT EXISTS public.booking_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE RESTRICT,
  provider VARCHAR(64) NOT NULL DEFAULT 'STRIPE', -- 'STRIPE', 'VNPAY', 'MOMO', 'CASH'
  transaction_ref VARCHAR(128) UNIQUE NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  status payment_status NOT NULL DEFAULT 'UNPAID',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_payment_amount CHECK (amount >= 0)
);

-- ------------------------------------------------------------------------------
-- 4. ⚡ CHỐNG ĐẶT TRÙNG PHÒNG THỜI GIAN THỰC (EXCLUSION CONSTRAINT)
-- ------------------------------------------------------------------------------
-- Khóa cứng cấp độ CSDL: Ngăn chặn tuyệt đối 2 đơn cùng 1 phòng đè ngày lên nhau
-- Chỉ áp dụng khi đơn chưa bị HỦY ('CANCELLED'). Đơn 'CANCELLED' tự động nhả phòng.
DO $$ BEGIN
  ALTER TABLE public.bookings
  ADD CONSTRAINT chk_no_overlapping_bookings
  EXCLUDE USING gist (
    room_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  )
  WHERE (status <> 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 5. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_bookings_room_dates ON public.bookings (room_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON public.bookings (guest_email);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON public.bookings (booking_code);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_rooms_type_available ON public.rooms (room_type_id, is_available);
CREATE INDEX IF NOT EXISTS idx_room_types_slug ON public.room_types (slug);
CREATE INDEX IF NOT EXISTS idx_booking_payments_ref ON public.booking_payments (transaction_ref);

-- ------------------------------------------------------------------------------
-- 6. TRIGGER TỰ ĐỘNG CẬP NHẬT PROFILES KHI CÓ USER SIGNUP
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone',
    'GUEST'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_type_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_payments ENABLE ROW LEVEL SECURITY;

-- Hàm kiểm tra vai trò Quản trị viên (ADMIN hoặc RECEPTIONIST)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('ADMIN', 'RECEPTIONIST')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7.1. Chính sách cho Catalog Phòng (Công khai cho mọi người xem)
DROP POLICY IF EXISTS "Public can view room types" ON public.room_types;
CREATE POLICY "Public can view room types" ON public.room_types FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view rooms" ON public.rooms;
CREATE POLICY "Public can view rooms" ON public.rooms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view room images" ON public.room_images;
CREATE POLICY "Public can view room images" ON public.room_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view amenities" ON public.amenities;
CREATE POLICY "Public can view amenities" ON public.amenities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view room type amenities" ON public.room_type_amenities;
CREATE POLICY "Public can view room type amenities" ON public.room_type_amenities FOR SELECT USING (true);

-- 7.2. Nhân viên có toàn quyền thêm/sửa/xóa Catalog Phòng
DROP POLICY IF EXISTS "Staff can manage room types" ON public.room_types;
CREATE POLICY "Staff can manage room types" ON public.room_types FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "Staff can manage rooms" ON public.rooms;
CREATE POLICY "Staff can manage rooms" ON public.rooms FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "Staff can manage room images" ON public.room_images;
CREATE POLICY "Staff can manage room images" ON public.room_images FOR ALL USING (public.is_staff());

-- 7.3. Chính sách Đặt phòng (Bookings)
-- Cho phép khách vãng lai và user tạo đơn
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Khách hàng xem đơn của chính họ, Nhân viên xem toàn bộ đơn
DROP POLICY IF EXISTS "Users and staff can view bookings" ON public.bookings;
CREATE POLICY "Users and staff can view bookings" ON public.bookings FOR SELECT
USING (
  auth.uid() = user_id OR
  public.is_staff() OR
  auth.uid() IS NULL -- Cho phép API Server route với Service Role truy vấn
);

-- Khách có thể cập nhật trạng thái hủy đơn của chính mình, Nhân viên có toàn quyền cập nhật
DROP POLICY IF EXISTS "Users can cancel own booking, staff can update all" ON public.bookings;
CREATE POLICY "Users can cancel own booking, staff can update all" ON public.bookings FOR UPDATE
USING (
  (auth.uid() = user_id AND status = 'PENDING') OR
  public.is_staff()
);

-- 7.4. Profiles: User xem và sửa hồ sơ cá nhân, Nhân viên xem tất cả
DROP POLICY IF EXISTS "Users can view and update own profile" ON public.profiles;
CREATE POLICY "Users can view and update own profile" ON public.profiles FOR ALL
USING (auth.uid() = id OR public.is_staff());

-- ------------------------------------------------------------------------------
-- 8. INITIAL SEED DATA (Dữ liệu mẫu sang trọng cho Grand Azure Resort)
-- ------------------------------------------------------------------------------

-- 8.1. Tiện ích (Amenities)
INSERT INTO public.amenities (id, name, icon, category) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Ocean View', 'Waves', 'View'),
  ('a1000000-0000-0000-0000-000000000002', 'Private Infinity Pool', 'Pool', 'Wellness'),
  ('a1000000-0000-0000-0000-000000000003', '24/7 Butler Service', 'UserCheck', 'Service'),
  ('a1000000-0000-0000-0000-000000000004', 'High-Speed Wi-Fi', 'Wifi', 'Technology'),
  ('a1000000-0000-0000-0000-000000000005', 'Soaking Marble Tub', 'Bath', 'Bathroom'),
  ('a1000000-0000-0000-0000-000000000006', 'Nespresso Coffee Bar', 'Coffee', 'Dining'),
  ('a1000000-0000-0000-0000-000000000007', 'Direct Beach Access', 'Compass', 'Outdoors')
ON CONFLICT (name) DO NOTHING;

-- 8.2. Hạng phòng (Room Types)
INSERT INTO public.room_types (id, name, slug, description, base_price, capacity_adults, capacity_children, size_sqm, bed_type) VALUES
(
  'b1000000-0000-0000-0000-000000000001',
  'Ocean View Deluxe Suite',
  'ocean-view-deluxe-suite',
  'Unwind in our stunning Ocean View Deluxe Suite, featuring panoramic azure seascapes, an expansive private balcony, and handcrafted teak furnishings.',
  450.00,
  2,
  1,
  75,
  'King'
),
(
  'b1000000-0000-0000-0000-000000000002',
  'Presidential Beachfront Villa',
  'presidential-beachfront-villa',
  'The crown jewel of Grand Azure. Direct private beach access, a 15-meter infinity plunge pool, personal butler service, and an outdoor rain shower pavilion.',
  1250.00,
  4,
  2,
  220,
  'Super King'
),
(
  'b1000000-0000-0000-0000-000000000003',
  'Cliffside Infinity Suite',
  'cliffside-infinity-suite',
  'Perched dramatically on the resort cliffs, this romantic sanctuary offers uninterrupted 270-degree sunset ocean views, private sundeck, and sunken basalt bath.',
  750.00,
  2,
  0,
  95,
  'King'
),
(
  'b1000000-0000-0000-0000-000000000004',
  'Azure Garden Pool Villa',
  'azure-garden-pool-villa',
  'Surrounded by lush tropical gardens, this serene villa boasts a private emerald swimming pool, sun loungers, an al-fresco dining sala, and total privacy.',
  920.00,
  3,
  2,
  160,
  'Super King'
)
ON CONFLICT (slug) DO NOTHING;

-- 8.3. Gán Tiện ích cho Hạng phòng
INSERT INTO public.room_type_amenities (room_type_id, amenity_id) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004'),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;

-- 8.4. Thư viện hình ảnh
INSERT INTO public.room_images (room_type_id, image_url, is_primary, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80', false, 2),
  ('b1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', false, 2),
  ('b1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', true, 1)
ON CONFLICT DO NOTHING;

-- 8.5. Danh sách Phòng thực tế (Rooms - Gắn với số phòng)
INSERT INTO public.rooms (id, room_number, room_type_id, status, is_available) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Suite 101', 'b1000000-0000-0000-0000-000000000001', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000002', 'Suite 102', 'b1000000-0000-0000-0000-000000000001', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000003', 'Villa 01',  'b1000000-0000-0000-0000-000000000002', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000004', 'Villa 02',  'b1000000-0000-0000-0000-000000000002', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000005', 'Cliff 301', 'b1000000-0000-0000-0000-000000000003', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000006', 'Garden 201','b1000000-0000-0000-0000-000000000004', 'CLEAN', true)
ON CONFLICT (room_number) DO NOTHING;

-- 8.4. Thư viện hình ảnh
INSERT INTO public.room_images (room_type_id, image_url, is_primary, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80', false, 2),
  ('b1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', false, 2),
  ('b1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', true, 1),
  ('b1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', true, 1)
ON CONFLICT DO NOTHING;

-- 8.5. Danh sách Phòng thực tế (Rooms - Gắn với số phòng)
INSERT INTO public.rooms (id, room_number, room_type_id, status, is_available) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Suite 101', 'b1000000-0000-0000-0000-000000000001', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000002', 'Suite 102', 'b1000000-0000-0000-0000-000000000001', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000003', 'Villa 01',  'b1000000-0000-0000-0000-000000000002', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000004', 'Villa 02',  'b1000000-0000-0000-0000-000000000002', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000005', 'Cliff 301', 'b1000000-0000-0000-0000-000000000003', 'CLEAN', true),
  ('c1000000-0000-0000-0000-000000000006', 'Garden 201','b1000000-0000-0000-0000-000000000004', 'CLEAN', true)
ON CONFLICT (room_number) DO NOTHING;

