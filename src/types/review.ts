/**
 * 🏛️ DOMAIN MODEL: REVIEW
 */

export interface Review {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userCountry?: string;
  rating: number; // 1 to 5
  comment: string;
  stayDate: string;
  createdAt: string;
}

