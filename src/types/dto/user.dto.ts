import { UserRole } from '../user';

/**
 * 🏛️ UI DTO: UserProfileDTO
 * Sanitized profile shape consumed by client components.
 */
export interface UserProfileDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

