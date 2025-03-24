import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();

  const res = await fetch('https://api.momenty.co.kr/notices', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie || '',
    },
  });

  const result = await res.json();
  return new Response(JSON.stringify(result), { status: res.status });
}
