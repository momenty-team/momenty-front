import { cookies } from 'next/headers';

export async function PUT(req: Request) {
  const body = await req.json();
  const cookieHeader = (await cookies()).toString();

  const res = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader || '',
    },
    body: JSON.stringify(body),
  });

  const result = await res.json();
  return new Response(JSON.stringify(result), { status: res.status });
}
