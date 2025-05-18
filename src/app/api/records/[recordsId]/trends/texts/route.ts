import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface GetWritingTrends {
  params: { recordsId: string };
}

export async function GET(req: NextRequest, { params }: GetWritingTrends)  {
  const { recordsId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const cookieHeader = (await cookies()).toString();

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  if (!year || !month || !day) {
    return new Response(JSON.stringify({ message: '날짜가 필요합니다.' }), { status: 400 });
  }

  const res = await fetch(`https://api.momenty.co.kr/records/${recordsId}/trends/texts?year=${year}&month=${month}&day=${day}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    next: {
      tags: ['recordsDetails'],
    },
  });

  return res;
}