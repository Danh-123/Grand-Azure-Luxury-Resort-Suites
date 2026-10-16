import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/mock/users.mock';
import { toUserProfileDTO } from '@/lib/mappers/user.mapper';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  await sleep(500);

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Hardcoded demo failure case
    if (email.toLowerCase() === 'fail@error.com' || password === 'wrongpassword') {
      return NextResponse.json(
        { error: 'Invalid email or credentials.' },
        { status: 401 }
      );
    }

    // Match existing user or create a guest session
    const existing = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    const user =
      existing ||
      {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'guest' as const,
        createdAt: new Date().toISOString(),
      };

    const userDTO = toUserProfileDTO(user);
    const token = `fake-jwt-token-${user.id}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: userDTO,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      message: 'Logged in successfully.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid request';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

