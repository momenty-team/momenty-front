import { cookies } from 'next/headers';

export async function GET() {
  const cookieHeader = (await cookies()).toString();

  const res = await fetch('https://api.momenty.co.kr/notices', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader || '',
    },
  });

  return res;
}
