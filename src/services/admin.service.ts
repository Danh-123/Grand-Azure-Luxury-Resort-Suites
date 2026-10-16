import { mockBookings } from '@/mock/bookings.mock';
import { mockRooms } from '@/mock/rooms.mock';
import { mockUsers } from '@/mock/users.mock';
import { mockReviews } from '@/mock/reviews.mock';
import { toBookingSummaryDTO, toBookingDetailDTO } from '@/lib/mappers/booking.mapper';
import { toRoomCardDTO } from '@/lib/mappers/room.mapper';
import { toUserProfileDTO } from '@/lib/mappers/user.mapper';
import { BookingSummaryDTO, BookingDetailDTO } from '@/types/dto/booking.dto';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { UserProfileDTO } from '@/types/dto/user.dto';
import { Review } from '@/types/review';

export interface DashboardStats {
  totalBookings: number;
  bookingsGrowth: string;
  grossRevenue: number;
  formattedRevenue: string;
  revenueGrowth: string;
  occupancyRate: number;
  occupancyGrowth: string;
  totalUsers: number;
  usersGrowth: string;
  monthlyRevenueSeries: {
    month: string;
    revenue: number;
    bookings: number;
  }[];
  roomTypeDistribution: {
    type: string;
    label: string;
    percentage: number;
    revenue: number;
    color: string;
  }[];
}

export const adminService = {
  /**
   * Compute executive dashboard statistics and chart datasets
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const totalBookings = mockBookings.length;
    const grossRevenue = mockBookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

    const availableRooms = mockRooms.filter((r) => r.isAvailable).length;
    const totalRooms = mockRooms.length;
    const occupancyRate = Math.round(((totalRooms - availableRooms) / totalRooms) * 100);

    const totalUsers = mockUsers.length;

    const monthlyRevenueSeries = [
      { month: 'May', revenue: 34500, bookings: 12 },
      { month: 'Jun', revenue: 41200, bookings: 15 },
      { month: 'Jul', revenue: 52800, bookings: 19 },
      { month: 'Aug', revenue: 49100, bookings: 17 },
      { month: 'Sep', revenue: 58300, bookings: 22 },
      { month: 'Oct', revenue: 64900, bookings: 25 },
    ];

    const roomTypeDistribution = [
      { type: 'presidential', label: 'Presidential Villas', percentage: 35, revenue: 58500, color: '#C5A880' },
      { type: 'penthouse', label: 'Penthouse Suites', percentage: 28, revenue: 46800, color: '#8F7A5E' },
      { type: 'suite', label: 'Oceanfront Suites', percentage: 22, revenue: 36700, color: '#4B5563' },
      { type: 'deluxe', label: 'Garden Deluxe', percentage: 15, revenue: 25100, color: '#1F2937' },
    ];

    return {
      totalBookings,
      bookingsGrowth: '+14.2%',
      grossRevenue,
      formattedRevenue: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(grossRevenue),
      revenueGrowth: '+18.6%',
      occupancyRate: occupancyRate || 82,
      occupancyGrowth: '+5.4%',
      totalUsers,
      usersGrowth: '+8.0%',
      monthlyRevenueSeries,
      roomTypeDistribution,
    };
  },

  /**
   * Fetch recent bookings with room metadata
   */
  async getRecentBookings(limit = 5): Promise<BookingSummaryDTO[]> {
    return mockBookings.slice(0, limit).map((booking) => {
      const room = mockRooms.find((r) => r.id === booking.roomId);
      return toBookingSummaryDTO(booking, room);
    });
  },

  /**
   * Fetch all rooms as RoomCardDTOs
   */
  async getRooms(): Promise<RoomCardDTO[]> {
    return mockRooms.map(toRoomCardDTO);
  },

  /**
   * Fetch all bookings as rich BookingDetailDTOs
   */
  async getBookings(): Promise<BookingDetailDTO[]> {
    return mockBookings.map((b) => {
      const room = mockRooms.find((r) => r.id === b.roomId);
      return toBookingDetailDTO(b, room);
    });
  },

  /**
   * Fetch all users as UserProfileDTOs
   */
  async getUsers(): Promise<UserProfileDTO[]> {
    return mockUsers.map(toUserProfileDTO);
  },

  /**
   * Fetch all guest reviews
   */
  async getReviews(): Promise<Review[]> {
    return [...mockReviews];
  },
};

