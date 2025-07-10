import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieHeader = (await cookies()).toString();
  const body = await req.json();

  const res = await fetch('https://api.momenty.co.kr/records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader || '',
    },
    body: JSON.stringify({
      title: body.title,
      is_public: body.is_public,
      method: body.method,
      option: body.option,
      unit: body.unit,
    }),
  });

  revalidateTag('records');
  return res;
}

export async function GET() {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch('https://api.momenty.co.kr/records', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader || '',
    },
    next: {
      tags: ['records'],
    },
    cache: 'no-store',
  });

  return res;
}
