import { UserProfileDTO } from '@/types/dto/user.dto';

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface AuthResponse {
  user: UserProfileDTO;
  token: string;
  expiresAt: string;
}

export const authService = {
  /**
   * Log in user
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || 'Invalid email or credentials');
    }
    const json = await res.json();
    return json.data;
  },

  /**
   * Register new guest
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || 'Registration failed');
    }
    const json = await res.json();
    return json.data;
  },
};

