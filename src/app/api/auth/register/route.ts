import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/mock/users.mock';
import { toUserProfileDTO } from '@/lib/mappers/user.mapper';
import { User } from '@/types/user';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  await sleep(600);

  try {
    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required fields.' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'guest',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const userDTO = toUserProfileDTO(newUser);
    const token = `fake-jwt-token-${newUser.id}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: userDTO,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      message: 'Registration completed successfully.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

