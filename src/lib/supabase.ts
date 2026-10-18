import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Database Client for Grand Azure Luxury Resort & Suites
 * Supports both Client-Side (Anon Key) and Server-Side (Service Role Key) operations.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Verifies if Supabase environment variables are properly provided
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
}

/**
 * Public Supabase Client (For Client/Edge components with RLS enforced)
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: true,
    },
  }
);

/**
 * Admin Supabase Client (For API Route handlers & Server actions with elevated privileges)
 */
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * TypeScript Interfaces reflecting real Supabase PostgreSQL tables
 */
export interface SupabaseRoomRow {
  id: string;
  slug: string;
  name: string;
  type: string;
  price_per_night: number;
  capacity_adults: number;
  capacity_children: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  description: string;
  images: string[];
  amenities: string[];
  is_available: boolean;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface SupabaseBookingRow {
  id: string;
  booking_code: string;
  room_id: string;
  user_id: string | null;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  total_nights: number;
  total_price: number;
  subtotal: number;
  taxes: number;
  service_fee: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface SupabaseUserRow {
  id: string;
  email: string;
  password_hash?: string;
  name: string;
  phone?: string;
  role: 'guest' | 'admin';
  avatar_url?: string;
  created_at: string;
}

