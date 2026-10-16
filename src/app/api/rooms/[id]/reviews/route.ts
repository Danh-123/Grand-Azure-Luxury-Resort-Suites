import { NextRequest, NextResponse } from 'next/server';
import { mockReviews } from '@/mock/reviews.mock';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await sleep(350);

  const { id } = await params;
  const reviews = mockReviews.filter((r) => r.roomId === id);

  return NextResponse.json({
    data: reviews,
    total: reviews.length,
  });
}

