import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest)  {
  const searchParams = req.nextUrl.searchParams;
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  if (!year || !month || !day) {
    return new Response(JSON.stringify({ message: '날짜가 필요합니다.' }), { status: 400 });
  }

  const res = await fetch(`https://api.momenty.co.kr/records/feedback?year=${year}&month=${month}&day=${day}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify({
      health_kit: body.health_kit,
    }),
    next: {
      tags: ['recordsDetails'],
    },
  });

  return res;
}