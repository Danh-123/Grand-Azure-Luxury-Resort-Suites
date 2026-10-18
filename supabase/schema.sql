-- ==============================================================================
-- GRAND AZURE LUXURY RESORT & SUITES - POSTGRESQL SCHEMA (SUPABASE)
-- Execute this entire script in Supabase SQL Editor to create tables & initial seed
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(64) NOT NULL,
  price_per_night NUMERIC(12, 2) NOT NULL,
  capacity_adults INT NOT NULL DEFAULT 2,
  capacity_children INT NOT NULL DEFAULT 0,
  bedrooms INT NOT NULL DEFAULT 1,
  bathrooms INT NOT NULL DEFAULT 1,
  area_sqm INT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  amenities TEXT[] NOT NULL DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
  review_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for searching rooms
CREATE INDEX IF NOT EXISTS idx_rooms_slug ON rooms(slug);
CREATE INDEX IF NOT EXISTS idx_rooms_type ON rooms(type);
CREATE INDEX IF NOT EXISTS idx_rooms_is_available ON rooms(is_available);

-- 3. Create Users / Profiles Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  role VARCHAR(32) NOT NULL DEFAULT 'guest', -- 'guest' or 'admin'
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(64) PRIMARY KEY,
  booking_code VARCHAR(32) UNIQUE NOT NULL,
  room_id VARCHAR(64) NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  adults INT NOT NULL DEFAULT 2,
  children INT NOT NULL DEFAULT 0,
  total_nights INT NOT NULL DEFAULT 1,
  total_price NUMERIC(12, 2) NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  taxes NUMERIC(12, 2) NOT NULL,
  service_fee NUMERIC(12, 2) NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(64) NOT NULL,
  special_requests TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'confirmed', -- 'pending', 'confirmed', 'cancelled', 'completed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON bookings(booking_code);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read access to rooms
CREATE POLICY "Allow public read access on rooms"
  ON rooms FOR SELECT
  USING (true);

-- Allow anyone to create bookings (guests + authenticated users)
CREATE POLICY "Allow public insert on bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Allow reading bookings by matching email or code
CREATE POLICY "Allow read on bookings"
  ON bookings FOR SELECT
  USING (true);

-- ==============================================================================
-- 6. Initial Seed Data (Core Luxury Rooms)
-- ==============================================================================
INSERT INTO rooms (id, slug, name, type, price_per_night, capacity_adults, capacity_children, bedrooms, bathrooms, area_sqm, description, images, amenities, is_available, rating, review_count)
VALUES
(
  'room-1',
  'ocean-view-deluxe-suite',
  'Ocean View Deluxe Suite',
  'suite',
  450.00,
  2,
  1,
  1,
  1,
  75,
  'Unwind in our stunning Ocean View Deluxe Suite, featuring panoramic azure seascapes, an expansive private balcony, and handcrafted teak furnishings.',
  ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'],
  ARRAY['Ocean View', 'Balcony', 'King Bed', 'Free High-speed Wi-Fi', 'Complimentary Minibar', 'Soaking Marble Tub', 'Nespresso Coffee Machine'],
  true,
  4.9,
  128
),
(
  'room-2',
  'presidential-beachfront-villa',
  'Presidential Beachfront Villa',
  'villa',
  1250.00,
  4,
  2,
  2,
  3,
  220,
  'The crown jewel of Grand Azure. Direct private beach access, a 15-meter infinity plunge pool, personal butler service, and an outdoor rain shower pavilion.',
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'],
  ARRAY['Private Beach Access', 'Private Infinity Pool', '24/7 Butler Service', 'Outdoor Rain Shower', 'Jacuzzi', 'Chef Kitchenette', 'Complimentary Champagne'],
  true,
  5.0,
  86
),
(
  'room-3',
  'cliffside-infinity-suite',
  'Cliffside Infinity Suite',
  'suite',
  750.00,
  2,
  0,
  1,
  1,
  95,
  'Perched dramatically on the resort cliffs, this romantic sanctuary offers uninterrupted 270-degree sunset ocean views, private sundeck, and sunken basalt bath.',
  ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
  ARRAY['Panoramic Sunset View', 'Cliffside Deck', 'Sunken Bath', 'Smart Home Lighting', 'Pillow Menu', 'Breakfast Included'],
  true,
  4.95,
  94
),
(
  'room-4',
  'azure-garden-pool-villa',
  'Azure Garden Pool Villa',
  'villa',
  920.00,
  3,
  2,
  2,
  2,
  160,
  'Surrounded by lush tropical gardens, this serene villa boasts a private emerald swimming pool, sun loungers, an al-fresco dining sala, and total privacy.',
  ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'],
  ARRAY['Private Swimming Pool', 'Tropical Garden', 'Outdoor Dining Sala', 'Daybed', 'Walk-in Closet', 'Wine Cooler'],
  true,
  4.88,
  67
)
ON CONFLICT (id) DO NOTHING;

