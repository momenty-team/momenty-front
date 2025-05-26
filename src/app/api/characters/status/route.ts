import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieHeader = (await cookies()).toString();
  const searchParams = req.nextUrl.searchParams;
  const body = await req.json();

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const res = await fetch(`https://api.momenty.co.kr/characters/status?year=${year}&month=${month}&day=${day}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      health_kit: body.healthKitData || null, 
    }),
    next: {
      tags: ['charactersStatus'],
    },
    cache: 'no-store',
  });

  return res;
}
