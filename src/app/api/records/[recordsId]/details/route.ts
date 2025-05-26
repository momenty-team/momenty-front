import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  const searchParams = req.nextUrl.searchParams;

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/details?year=${year}&month=${month}&day=${day}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    next: {
      tags: ['recordsDetails'],
    },
    cache: 'no-store',
  });

  return res;
}

export async function POST(req: NextRequest, { params }: { params: { recordsId: string } }) {
  const { recordsId } = await params;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();
  const searchParams = req.nextUrl.searchParams;

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/details?year=${year}&month=${month}&day=${day}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      content: body.content,
      option_ids: body.option_ids,
      is_public: body.is_public,
    }),
  });

  revalidateTag('recordsDetails');
  return res;
}
