import { Review } from '@/types/review';

export const mockReviews: Review[] = [
  {
    id: 'rev-01',
    roomId: 'room-01',
    userId: 'user-guest-01',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    userCountry: 'United Kingdom',
    rating: 5,
    comment:
      'The Presidential Villa exceeded every expectation. Our private butler Duc anticipated every desire, from sunset champagne pairings to arranging a private yacht charter. Unmatched elegance.',
    stayDate: 'September 2026',
    createdAt: '2026-09-18T10:30:00Z',
  },
  {
    id: 'rev-02',
    roomId: 'room-01',
    userId: 'user-guest-02',
    userName: 'Kenji Takahashi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    userCountry: 'Japan',
    rating: 5,
    comment:
      'Impeccable privacy and tranquility. The acoustic insulation is flawless, the bedding offers sublime comfort, and waking up to the ocean breeze was pure magic.',
    stayDate: 'August 2026',
    createdAt: '2026-08-29T16:45:00Z',
  },
  {
    id: 'rev-03',
    roomId: 'room-02',
    userId: 'user-guest-01',
    userName: 'Sophia Laurent',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    userCountry: 'France',
    rating: 5,
    comment:
      'The Imperial Penthouse wrap-around sky terrace is unmatched anywhere in Southeast Asia. Watching fireworks across the bay from the hot tub was unforgettable.',
    stayDate: 'July 2026',
    createdAt: '2026-07-14T21:00:00Z',
  },
  {
    id: 'rev-04',
    roomId: 'room-03',
    userId: 'user-guest-02',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    userCountry: 'United States',
    rating: 5,
    comment:
      'Stepping straight from our bedroom onto the white sandy beach made this our favorite anniversary trip ever. The outdoor rain shower beneath the palms is sublime.',
    stayDate: 'October 2026',
    createdAt: '2026-10-02T11:20:00Z',
  },
  {
    id: 'rev-05',
    roomId: 'room-04',
    userId: 'user-guest-01',
    userName: 'Isabella Chen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    userCountry: 'Singapore',
    rating: 5,
    comment:
      'The Indochine aesthetics and heritage woodwork are museum grade. The copper tub overlooking the private garden courtyard is restorative and peaceful.',
    stayDate: 'August 2026',
    createdAt: '2026-08-15T09:10:00Z',
  },
  {
    id: 'rev-06',
    roomId: 'room-05',
    userId: 'user-guest-02',
    userName: 'Henrik Lindqvist',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    userCountry: 'Sweden',
    rating: 5,
    comment:
      'Exceptional value for an oceanfront deluxe suite. Spotless marble finishes, whisper-quiet air conditioning, and top-tier dining recommendations from guest relations.',
    stayDate: 'June 2026',
    createdAt: '2026-06-25T14:05:00Z',
  },
];

