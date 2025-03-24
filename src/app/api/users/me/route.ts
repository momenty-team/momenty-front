import { cookies } from 'next/headers';

export async function PUT(req: Request) {
  const body = await req.json();
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  const res = await fetch('https://api.momenty.co.kr/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie || '',
    },
    body: JSON.stringify(body),
  });

  const result = await res.json();
  return new Response(JSON.stringify(result), { status: res.status });
}
