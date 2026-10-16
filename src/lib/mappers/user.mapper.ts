import { User } from '@/types/user';
import { UserProfileDTO } from '@/types/dto/user.dto';

/**
 * 🏛️ Pure Mapper: Converts User entity to UserProfileDTO
 */
export function toUserProfileDTO(user: User): UserProfileDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    role: user.role,
    createdAt: user.createdAt,
  };
}

